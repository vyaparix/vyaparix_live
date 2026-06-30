import hmac
import hashlib
import secrets
from datetime import date

SECRET_KEY = b"VYPX-HMAC-SECRET-KEY-2026-v1"

PLAN_MAP = {'1_year': 0, '3_year': 1, 'lifetime': 2, '5_year': 3}
PLAN_DURATION = {'1_year': 365, '3_year': 1095, 'lifetime': 0, '5_year': 1825}
PLAN_REVERSE = {0: '1_year', 1: '3_year', 2: 'lifetime', 3: '5_year'}

BASE36_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'


def _to_base36(data: bytes) -> str:
    num = int.from_bytes(data, 'big')
    if num == 0:
        return '0' * 16
    chars = []
    while num > 0:
        chars.append(BASE36_ALPHABET[num % 36])
        num //= 36
    return ''.join(reversed(chars)).zfill(16)


def _from_base36(s: str) -> bytes:
    num = 0
    for c in s:
        num = num * 36 + BASE36_ALPHABET.index(c)
    byte_count = 10
    return num.to_bytes(byte_count, 'big')


def make_code(plan: str) -> str:
    plan_id = PLAN_MAP[plan]
    duration_days = PLAN_DURATION[plan]
    rand = secrets.randbits(12)

    msg_int = (plan_id << 26) | (duration_days << 12) | rand
    msg_bytes = msg_int.to_bytes(4, 'big')

    sig = hmac.new(SECRET_KEY, msg_bytes, hashlib.sha256).digest()[:6]

    combined = msg_bytes + sig
    encoded = _to_base36(combined)

    groups = [encoded[i:i + 4] for i in range(0, 16, 4)]
    return '-'.join(groups)


def verify_code(code: str) -> dict:
    clean = code.upper().replace('-', '')
    if len(clean) != 16:
        raise ValueError("Invalid code length")

    try:
        combined = _from_base36(clean)
    except Exception:
        raise ValueError("Invalid code format")

    if len(combined) != 10:
        raise ValueError("Invalid code format")

    msg_bytes = combined[:4]
    sig = combined[4:]

    expected = hmac.new(SECRET_KEY, msg_bytes, hashlib.sha256).digest()[:6]
    if not hmac.compare_digest(sig, expected):
        raise ValueError("Invalid license code")

    msg_int = int.from_bytes(msg_bytes, 'big')
    plan_id = (msg_int >> 26) & 0x3
    duration_days = (msg_int >> 12) & 0x3FFF
    rand_val = msg_int & 0xFFF

    plan = PLAN_REVERSE.get(plan_id)
    if plan is None:
        raise ValueError("Invalid license plan")

    return {
        'plan': plan,
        'duration_days': duration_days,
        'nonce': rand_val,
    }


if __name__ == '__main__':
    for plan in ['1_year', '3_year', '5_year', 'lifetime']:
        code = make_code(plan)
        r = verify_code(code)
        print(f'{plan:10s} -> {code} -> duration={r["duration_days"]}d nonce={r["nonce"]}')
