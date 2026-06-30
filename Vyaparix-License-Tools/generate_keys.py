#!/usr/bin/env python
"""
Standalone Vyaparix License Key Generator (Duration-based)
Completely independent — no Django, no database needed.

Usage:
    python generate_keys.py --plan 1_year
    python generate_keys.py --plan lifetime --count 5

Output format: XXXX-XXXX-XXXX-XXXX
"""

import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "Vyaparix"))

try:
    from license_crypto import make_code, PLAN_DURATION
except ImportError:
    print("Error: license_crypto.py not found. Copy it from the project root or place it next to this script.")
    sys.exit(1)

PLAN_DISPLAY = {'1_year': '365 Days (1 Year)', '3_year': '1095 Days (3 Years)',
                '5_year': '1825 Days (5 Years)', 'lifetime': 'Lifetime'}


def main():
    parser = argparse.ArgumentParser(description="Generate Vyaparix license keys")
    parser.add_argument("--plan", required=True, choices=["1_year", "3_year", "5_year", "lifetime"],
                        help="License plan")
    parser.add_argument("--count", type=int, default=1, help="Number of keys to generate (default: 1)")
    args = parser.parse_args()

    codes = []
    for i in range(args.count):
        code = make_code(args.plan)
        codes.append(code)

    print()
    print("=" * 50)
    print(f"  {len(codes)} License Key(s) Generated")
    print("=" * 50)
    for code in codes:
        print(f"  {code}")
    print()
    print(f"  Plan:     {args.plan}")
    print(f"  Duration: {PLAN_DISPLAY.get(args.plan, args.plan)}")
    print("=" * 50)
    print()


if __name__ == "__main__":
    main()
