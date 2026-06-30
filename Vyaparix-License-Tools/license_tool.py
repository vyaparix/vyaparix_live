import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sys
import json
import csv
import winsound
import threading
import struct
import math
import os
import tempfile
from pathlib import Path
from datetime import datetime, date, timedelta

sys.path.insert(0, str(Path(__file__).resolve().parent))
from license_crypto import make_code, verify_code

HISTORY_FILE = Path(__file__).resolve().parent / 'key_history.json'

# ── Color palette ──────────────────────────────────────────
BG         = '#f1f5f9'
CARD_BG    = '#ffffff'
PRIMARY    = '#3b82f6'
PRIMARY_HV = '#2563eb'
SUCCESS    = '#10b981'
EXPIRED    = '#ef4444'
TEXT       = '#0f172a'
MUTED      = '#64748b'
BORDER     = '#e2e8f0'
HDR_BG     = '#f8fafc'

FONT = 'Segoe UI'

plan_display_map = {
    '1 Year Access': '1 Year',
    '3 Year Access': '3 Years',
    '5 Year Access': '5 Years',
    'Lifetime Access': 'Lifetime',
}

PLAN_DURATION_MAP = {
    '1 Year Access': 365,
    '3 Year Access': 1095,
    '5 Year Access': 1825,
    'Lifetime Access': 0,
}

DURATION_DISPLAY = {
    365: '365 Days (1 Year)',
    1095: '1095 Days (3 Years)',
    1825: '1825 Days (5 Years)',
    0: 'Lifetime',
}


class App:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Vyaparix License Key Generator")
        self.root.geometry("1100x760")
        self.root.configure(bg=BG)

        self.generated_keys = []
        self.filtered_keys = []
        self._sort_col = None
        self._sort_rev = False

        self.root.protocol('WM_DELETE_WINDOW', self._on_close)
        self._build_ui()
        self._load_history()
        self.root.mainloop()

    # ── Helpers ─────────────────────────────────────────────

    def _mkbtn(self, parent, text, cmd, bg=PRIMARY, fg='#ffffff', **kw):
        def _wrapper():
            self._play_click_sound()
            cmd()
        kwargs = dict(
            bg=bg, fg=fg, bd=0,
            font=(FONT, 10, 'bold'),
            padx=14, pady=5,
            cursor='hand2',
            activebackground=bg,
            activeforeground=fg,
            command=_wrapper,
        )
        kwargs.update(kw)
        return tk.Button(parent, text=text, **kwargs)

    def _card(self, parent, **kw):
        return tk.Frame(parent, bg=CARD_BG, highlightbackground=BORDER,
                        highlightthickness=1, **kw)

    def _update_summary(self):
        total = len(self.generated_keys)
        self._stat_total.config(text=str(total))
        self._stat_active.config(text=str(total))
        self._stat_expired.config(text=str(0))

    def _refresh_table(self):
        for row in self.tree.get_children():
            self.tree.delete(row)
        query = self._search_var.get().strip().lower()
        self.filtered_keys = [
            k for k in self.generated_keys
            if not query or query in k[0].lower()
            or query in k[3].lower() or query in k[4].lower()
            or query in k[1].lower() or query in k[2].lower()
        ]
        if self._sort_col is not None:
            col_map = {0: 0, 1: 3, 2: 4, 3: 1, 4: 2, 5: 0}
            idx = col_map.get(self._sort_col, 0)
            def skey(k):
                v = k[idx]
                if idx == 2:
                    return v if isinstance(v, int) else 0
                return v.lower() if isinstance(v, str) else str(v).lower()
            self.filtered_keys.sort(key=skey, reverse=self._sort_rev)
        for idx, k in enumerate(self.filtered_keys, 1):
            code, plan, duration, client, contact = k
            dur_display = DURATION_DISPLAY.get(duration, f'{duration} Days')
            self.tree.insert('', 'end', iid=str(idx),
                             values=(idx, client or '-', contact or '-',
                                     plan_display_map.get(plan, plan),
                                     dur_display, code, 'Copy'))
        self._count_lbl.config(text=f"Keys ({len(self.filtered_keys)}/{len(self.generated_keys)})")
        self._update_summary()

    def _on_search(self, *a):
        self._refresh_table()

    def _on_tree_click(self, event):
        col = self.tree.identify_column(event.x)
        if col == '#7':
            row_id = self.tree.identify_row(event.y)
            if row_id:
                vals = self.tree.item(row_id, 'values')
                if vals:
                    self.root.clipboard_clear()
                    self.root.clipboard_append(vals[5])
                    self.status_lbl.config(text=f"Copied: {vals[5]}")

    def _on_tree_sort(self, col):
        if self._sort_col == col:
            self._sort_rev = not self._sort_rev
        else:
            self._sort_col = col
            self._sort_rev = False
        for cid in ('#1', '#2', '#3', '#4', '#5', '#6'):
            self.tree.heading(cid, text=self.tree.heading(cid)['text'].replace(' \u25b2', '').replace(' \u25bc', ''))
        arrow = ' \u25b2' if not self._sort_rev else ' \u25bc'
        h = self.tree.heading(col)
        self.tree.heading(col, text=h['text'].rstrip(' \u25b2\u25bc') + arrow)
        self._refresh_table()

    # ── Sound effects ──────────────────────────────────────

    _tmp_wavs = []

    @staticmethod
    def _make_wav(tone_spec, sample_rate=22050):
        samples = []
        for freq, dur_ms in tone_spec:
            n = int(sample_rate * dur_ms / 1000)
            omega = 2 * math.pi * freq
            for i in range(n):
                t = i / sample_rate
                val = int(0.4 * 32767 * math.copysign(1, math.sin(omega * t)))
                samples.append(struct.pack('<h', val))
        data = b''.join(samples)
        data_size = len(data)
        header = struct.pack('<4sI4s4sIHHIIHH4sI',
            b'RIFF', 36 + data_size, b'WAVE',
            b'fmt ', 16, 1, 1, sample_rate, sample_rate * 2, 2, 16,
            b'data', data_size)
        return header + data

    def _play_wav(self, wav_bytes):
        try:
            tmp = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
            tmp.write(wav_bytes)
            tmp.close()
            self._tmp_wavs.append(tmp.name)
            winsound.PlaySound(tmp.name, winsound.SND_FILENAME | winsound.SND_ASYNC)
        except Exception as e:
            print(f'WAV error: {e}')

    def _play_click_sound(self):
        wav = self._make_wav([
            (1200, 80), (1600, 60), (1200, 50),
        ])
        self._play_wav(wav)

    def _play_generate_sound(self):
        tones = [
            (600, 150), (900, 120), (1200, 100),
            (1500, 80), (2000, 300),
        ]
        wav = self._make_wav(tones)
        self._play_wav(wav)

    def _play_type_sound(self):
        wav = self._make_wav([
            (1400, 30), (1800, 20),
        ])
        self._play_wav(wav)

    def _cleanup_sounds(self):
        for p in self._tmp_wavs:
            try:
                os.unlink(p)
            except:
                pass
        self._tmp_wavs.clear()

    def _on_close(self):
        self._cleanup_sounds()
        self.root.destroy()

    # ── Build UI ────────────────────────────────────────────

    def _build_ui(self):
        # ── Header ──────────────────────────────────────
        hdr = tk.Frame(self.root, bg=CARD_BG, highlightbackground=BORDER,
                       highlightthickness=0)
        hdr.pack(fill='x', padx=20, pady=(16, 0))
        inner = tk.Frame(hdr, bg=CARD_BG)
        inner.pack(fill='x', padx=20, pady=(14, 10))
        tk.Label(inner, text="Vyaparix License Key Generator",
                 font=(FONT, 20, 'bold'), bg=CARD_BG, fg=TEXT).pack(anchor='w')
        tk.Label(inner, text="Generate & verify license keys \u2014 fully offline",
                 font=(FONT, 10), bg=CARD_BG, fg=MUTED).pack(anchor='w')

        # separator
        ttk.Separator(self.root, orient='horizontal').pack(fill='x', padx=20, pady=0)

        # ── Main content area ───────────────────────────
        main = tk.Frame(self.root, bg=BG)
        main.pack(fill='both', expand=True, padx=20, pady=(12, 0))

        nb = ttk.Notebook(main)
        nb.pack(fill='both', expand=True)

        gtab = tk.Frame(nb, bg=BG)
        vtab = tk.Frame(nb, bg=BG)
        nb.add(gtab, text="  Generate Keys  ")
        nb.add(vtab, text="  Verify Code  ")

        self._build_generate(gtab)
        self._build_verify(vtab)

        # ── Status bar ──────────────────────────────────
        sb = tk.Frame(self.root, bg=HDR_BG, highlightbackground=BORDER,
                      highlightthickness=1, height=30)
        sb.pack(fill='x')
        self.status_lbl = tk.Label(sb, text="Ready", font=(FONT, 9),
                                    bg=HDR_BG, fg=MUTED, anchor='w')
        self.status_lbl.pack(side='left', padx=14, pady=3)
        tk.Label(sb, text="Vyaparix License Tools v2.0",
                 font=(FONT, 8), bg=HDR_BG, fg=BORDER).pack(side='right', padx=14, pady=3)

    # ═══════════════ GENERATE TAB ═══════════════════════════

    def _build_generate(self, parent):
        # ── Summary cards ───────────────────────────────
        sc = tk.Frame(parent, bg=BG)
        sc.pack(fill='x', pady=(16, 0), padx=0)
        stats = [
            ('Total Keys', '#3b82f6', '_stat_total'),
            ('Active Keys', '#10b981', '_stat_active'),
            ('Expired Keys', '#ef4444', '_stat_expired'),
        ]
        for lbl, clr, attr in stats:
            card = tk.Frame(sc, bg=CARD_BG, highlightbackground=clr,
                            highlightthickness=2, highlightcolor=clr)
            card.pack(side='left', fill='x', expand=True, padx=(0, 10))
            tk.Label(card, text=lbl, font=(FONT, 9), bg=CARD_BG,
                     fg=MUTED).pack(anchor='w', padx=14, pady=(10, 0))
            lbl_w = tk.Label(card, text="0", font=(FONT, 26, 'bold'),
                             bg=CARD_BG, fg=clr)
            lbl_w.pack(anchor='w', padx=14, pady=(0, 6))
            setattr(self, attr, lbl_w)
        # fill last card separator
        tk.Frame(sc, bg=BG, width=0).pack(side='left', fill='x', expand=True)

        # ── Form card ───────────────────────────────────
        fcard = self._card(parent)
        fcard.pack(fill='x', pady=(14, 0))
        pad = 16

        # row: Plan | Count
        r0 = tk.Frame(fcard, bg=CARD_BG)
        r0.pack(fill='x', padx=pad, pady=(pad, 4))

        tk.Label(r0, text="Plan", font=(FONT, 10, 'bold'),
                 bg=CARD_BG, fg=TEXT).pack(side='left', padx=(0, 4))
        self.plan_var = tk.StringVar(value='1 Year Access')
        plan_cb = ttk.Combobox(r0, textvariable=self.plan_var, state='readonly', width=14)
        plan_cb['values'] = ['1 Year Access', '3 Year Access', '5 Year Access', 'Lifetime Access']
        plan_cb.pack(side='left', padx=(0, 14))
        plan_cb.bind('<<ComboboxSelected>>', lambda e: self._play_click_sound())

        tk.Label(r0, text="Count", font=(FONT, 10, 'bold'),
                 bg=CARD_BG, fg=TEXT).pack(side='left', padx=(0, 4))
        self.cnt_var = tk.StringVar(value='1')
        self._cnt_spin = ttk.Spinbox(r0, from_=1, to=100, textvariable=self.cnt_var, width=5)
        self._cnt_spin.pack(side='left')
        self._cnt_spin.bind('<Key>', lambda e: self._play_type_sound())

        self._mkbtn(r0, " Generate Keys ", self._generate, bg=PRIMARY,
                    font=(FONT, 11, 'bold'), padx=22, pady=7).pack(side='right')

        # row: Client | Contact
        r1 = tk.Frame(fcard, bg=CARD_BG)
        r1.pack(fill='x', padx=pad, pady=(2, pad))

        tk.Label(r1, text="Client Name", font=(FONT, 10, 'bold'),
                 bg=CARD_BG, fg=TEXT).pack(side='left', padx=(0, 4))
        self.client_var = tk.StringVar()
        self._client_entry = ttk.Entry(r1, textvariable=self.client_var, width=18)
        self._client_entry.pack(side='left', padx=(0, 14))
        self._client_entry.bind('<Key>', lambda e: self._play_type_sound())

        tk.Label(r1, text="Contact", font=(FONT, 10, 'bold'),
                 bg=CARD_BG, fg=TEXT).pack(side='left', padx=(0, 4))
        self.contact_var = tk.StringVar()
        self._contact_entry = ttk.Entry(r1, textvariable=self.contact_var, width=18)
        self._contact_entry.pack(side='left', padx=(0, 14))
        self._contact_entry.bind('<Key>', lambda e: self._play_type_sound())

        tk.Label(r1, text="(optional)", font=(FONT, 8),
                 bg=CARD_BG, fg='#9ca3af').pack(side='left')

        # ── Search / Actions bar ────────────────────────
        abar = tk.Frame(parent, bg=BG)
        abar.pack(fill='x', pady=(12, 0))

        tk.Label(abar, text="\U0001f50d", font=(FONT, 11), bg=BG).pack(side='left', padx=(0, 4))
        self._search_var = tk.StringVar()
        self._search_var.trace_add('write', self._on_search)
        self._search_entry = ttk.Entry(abar, textvariable=self._search_var, width=28)
        self._search_entry.pack(side='left')
        self._search_entry.bind('<Key>', lambda e: self._play_type_sound())

        self._count_lbl = tk.Label(abar, text="Keys (0)", font=(FONT, 11, 'bold'),
                                   bg=BG, fg=TEXT)
        self._count_lbl.pack(side='left', padx=(14, 0))

        btn_bar = tk.Frame(abar, bg=BG)
        btn_bar.pack(side='right')
        for (txt, cmd, clr) in [
            ("Copy All", self._copy_all, PRIMARY),
            ("CSV", self._export_csv, PRIMARY),
            ("TXT", self._export_txt, PRIMARY),
            ("Clear", self._clear, EXPIRED),
        ]:
            self._mkbtn(btn_bar, txt, cmd, bg=clr, font=(FONT, 9, 'bold'),
                        padx=10, pady=3).pack(side='left', padx=2)

        # ── Table ───────────────────────────────────────
        tframe = tk.Frame(parent, bg=CARD_BG, highlightbackground=BORDER,
                          highlightthickness=1)
        tframe.pack(fill='both', expand=True, pady=(8, 0))

        cols = ('#', 'Client Name', 'Contact', 'Plan', 'Duration', 'License Key', 'Action')
        self.tree = ttk.Treeview(tframe, columns=cols, show='headings',
                                  selectmode='none', height=12)
        vsb = ttk.Scrollbar(tframe, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=vsb.set)

        col_widths = [40, 120, 110, 95, 95, 220, 65]
        sort_cols = ['#1', '#2', '#3', '#4', '#5', '#6']
        for i, (cid, txt, w) in enumerate(zip(cols, cols, col_widths)):
            self.tree.heading(f'#{i+1}', text=txt,
                              command=lambda c=f'#{i+1}': self._on_tree_sort(c) if c in sort_cols else None)
            self.tree.column(f'#{i+1}', width=w, anchor='center', minwidth=40)
        self.tree.column('#7', anchor='center', width=65, minwidth=55)

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('Treeview', rowheight=34, font=(FONT, 10), borderwidth=0)
        style.configure('Treeview.Heading', font=(FONT, 10, 'bold'), borderwidth=0)
        style.map('Treeview', background=[('selected', '#e0f2fe')],
                  foreground=[('selected', TEXT)])

        self.tree.tag_configure('even', background=CARD_BG)
        self.tree.tag_configure('odd', background='#f8fafc')
        self.tree.tag_configure('expired', foreground=EXPIRED)
        self.tree.bind('<ButtonRelease-1>', self._on_tree_click)

        self.tree.pack(side='left', fill='both', expand=True)
        vsb.pack(side='right', fill='y')

    # ── Form actions ───────────────────────────────────────

    def _get_plan_code(self):
        return {'1 Year Access': '1_year', '3 Year Access': '3_year',
                '5 Year Access': '5_year',
                'Lifetime Access': 'lifetime'}.get(self.plan_var.get(), '1_year')

    def _get_plan_display(self, code):
        return {'1_year': '1 Year Access', '3_year': '3 Year Access',
                '5_year': '5 Year Access',
                'lifetime': 'Lifetime Access'}.get(code, code)

    def _generate(self):
        plan_code = self._get_plan_code()
        plan_display = self.plan_var.get()
        duration = PLAN_DURATION_MAP.get(plan_display, 365)
        client_name = self.client_var.get().strip()
        contact = self.contact_var.get().strip()
        try:
            cnt = int(self.cnt_var.get())
        except ValueError:
            messagebox.showerror("Error", "Invalid count")
            return
        if cnt < 1 or cnt > 100:
            messagebox.showerror("Error", "Count 1-100")
            return

        keys = []
        for _ in range(cnt):
            code = make_code(plan_code)
            keys.append((code, plan_display, duration, client_name, contact))

        self.generated_keys.extend(keys)
        self._refresh_table()
        self.client_var.set('')
        self.contact_var.set('')
        self.status_lbl.config(text=f"Generated {cnt} key(s) \u2014 {plan_display} \u2014 {DURATION_DISPLAY.get(duration, f'{duration} Days')}")
        self._play_generate_sound()
        self._save_history()

    # ── Export / Copy / Clear ──────────────────────────────

    def _copy_all(self):
        if not self.generated_keys:
            return
        text = '\n'.join(k[0] for k in self.generated_keys)
        self.root.clipboard_clear()
        self.root.clipboard_append(text)
        messagebox.showinfo("Copied", f"{len(self.generated_keys)} keys copied!")

    def _export_txt(self):
        if not self.generated_keys:
            return
        p = filedialog.asksaveasfilename(defaultextension='.txt',
                                         filetypes=[('Text', '*.txt')],
                                         initialfile=f"keys_{date.today()}")
        if not p:
            return
        with open(p, 'w') as f:
            f.write("VYAPARIX LICENSE KEYS\n")
            f.write(f"Generated: {datetime.now():%Y-%m-%d %H:%M}\n\n")
            for k in self.generated_keys:
                c, pl, dur, cn, ct = k
                dur_display = DURATION_DISPLAY.get(dur, f'{dur} Days')
                extra = f"  |  Client: {cn}" if cn else ''
                extra += f"  |  Contact: {ct}" if ct else ''
                f.write(f"{c}  |  {pl}  |  Duration: {dur_display}{extra}\n")
        messagebox.showinfo("Saved", f"Saved to {p}")

    def _export_csv(self):
        if not self.generated_keys:
            return
        p = filedialog.asksaveasfilename(defaultextension='.csv',
                                         filetypes=[('CSV', '*.csv')],
                                         initialfile=f"keys_{date.today()}")
        if not p:
            return
        with open(p, 'w', newline='') as f:
            w = csv.writer(f)
            w.writerow(['License Key', 'Plan', 'Duration (Days)', 'Client Name', 'Contact'])
            for k in self.generated_keys:
                w.writerow([k[0], k[1], k[2], k[3], k[4]])
        messagebox.showinfo("Saved", f"Saved to {p}")

    def _clear(self):
        self.generated_keys.clear()
        self.filtered_keys.clear()
        self._refresh_table()
        self._update_summary()
        self.status_lbl.config(text="Cleared all keys")

    # ── History ────────────────────────────────────────────

    def _save_history(self):
        try:
            existing = []
            if HISTORY_FILE.exists():
                with open(HISTORY_FILE) as f:
                    existing = json.load(f)
            existing_codes = {e['code'] for e in existing}
            for k in self.generated_keys:
                entry = {'code': k[0], 'plan': k[1], 'duration': k[2], 'client': k[3], 'contact': k[4]}
                if entry['code'] not in existing_codes:
                    existing.append(entry)
                    existing_codes.add(entry['code'])
            with open(HISTORY_FILE, 'w') as f:
                json.dump(existing, f, indent=2)
        except:
            pass

    def _load_history(self):
        try:
            if HISTORY_FILE.exists():
                with open(HISTORY_FILE) as f:
                    data = json.load(f)
                for item in data:
                    c = item.get('code', '')
                    p = item.get('plan', '')
                    d = item.get('duration', item.get('expiry', ''))
                    cn = item.get('client', '')
                    ct = item.get('contact', '')
                    if isinstance(d, str):
                        d = 365
                    if c and p and d != '':
                        self.generated_keys.append((c, p, d, cn, ct))
                if self.generated_keys:
                    self._refresh_table()
        except:
            pass

    # ═══════════════ VERIFY TAB ═════════════════════════════

    def _build_verify(self, parent):
        card = self._card(parent)
        card.pack(fill='x', pady=(20, 0), padx=0)

        tk.Label(card, text="License Code", font=(FONT, 12, 'bold'),
                 bg=CARD_BG, fg=TEXT).pack(anchor='w', padx=20, pady=(20, 6))

        row = tk.Frame(card, bg=CARD_BG)
        row.pack(fill='x', padx=20)

        self.v_code = tk.StringVar()
        self.v_code.trace_add('write', self._fmt)
        v_entry = ttk.Entry(row, textvariable=self.v_code, width=26,
                            font=(FONT, 12))
        v_entry.pack(side='left')
        v_entry.bind('<Return>', lambda e: self._verify())

        self._mkbtn(row, " Verify ", self._verify, bg=PRIMARY,
                    font=(FONT, 11, 'bold'), padx=22, pady=7).pack(side='left', padx=(12, 0))

        tk.Label(card, text="Format: XXXX-XXXX-XXXX-XXXX",
                 font=(FONT, 8), bg=CARD_BG, fg='#9ca3af').pack(anchor='w', padx=20, pady=(6, 20))

        # ── Result card ─────────────────────────────────
        self.res_card = self._card(parent)
        self.res_card.pack(fill='both', expand=True, pady=(16, 0))

        self.res_inner = tk.Frame(self.res_card, bg=CARD_BG)
        self.res_inner.pack(fill='both', expand=True, padx=30, pady=30)

        self.res_icon = tk.Label(self.res_inner, text="\u2139",
                                 font=(FONT, 36), bg=CARD_BG)
        self.res_icon.pack(pady=(0, 8))

        self.res_status = tk.Label(self.res_inner, text="Enter a code and click Verify",
                                   font=(FONT, 12), bg=CARD_BG, fg=MUTED)
        self.res_status.pack()

        self.res_detail = tk.Label(self.res_inner, text="", font=(FONT, 11),
                                   bg=CARD_BG, fg=TEXT, justify='center')
        self.res_detail.pack(pady=(10, 0))

    def _fmt(self, *a):
        raw = self.v_code.get().upper().replace('-', '').replace(' ', '')
        raw = ''.join(c for c in raw if c.isalnum())[:16]
        fmt = '-'.join(raw[i:i+4] for i in range(0, len(raw), 4))
        self.v_code.set(fmt)

    def _verify(self):
        code = self.v_code.get().strip()
        if not code:
            messagebox.showwarning("Empty", "Enter a code")
            return

        try:
            r = verify_code(code)
            plan = self._get_plan_display(r['plan'])

            client = '-'
            contact = '-'
            try:
                if HISTORY_FILE.exists():
                    with open(HISTORY_FILE) as f:
                        for entry in json.load(f):
                            if entry.get('code', '').replace('-', '') == code.replace('-', ''):
                                client = entry.get('client', '') or '-'
                                contact = entry.get('contact', '') or '-'
                                break
            except:
                pass

            self.res_card.configure(highlightbackground=SUCCESS)
            self.res_inner.configure(bg='#f0fdf4')
            self.res_icon.configure(text="\u2705", bg='#f0fdf4')
            self.res_status.configure(text="VALID LICENSE",
                                       font=(FONT, 18, 'bold'),
                                       fg=SUCCESS, bg='#f0fdf4')
            duration_days = r['duration_days']
            dur_display = DURATION_DISPLAY.get(duration_days, f'{duration_days} Days')
            self.res_detail.configure(
                text=f"Plan: {plan}\nDuration: {dur_display}\n"
                     f"Client: {client}\nContact: {contact}\nStatus: Genuine",
                bg='#f0fdf4', fg='#065f46')
            self.status_lbl.config(text=f"Verified: VALID \u2014 {plan} \u2014 {client} \u2014 {dur_display}")
        except ValueError as e:
            self.res_card.configure(highlightbackground=EXPIRED)
            self.res_inner.configure(bg='#fef2f2')
            self.res_icon.configure(text="\u274c", bg='#fef2f2')
            self.res_status.configure(text="INVALID CODE",
                                       font=(FONT, 18, 'bold'),
                                       fg=EXPIRED, bg='#fef2f2')
            self.res_detail.configure(
                text=f"Reason: {str(e)}", bg='#fef2f2', fg='#991b1b')
            self.status_lbl.config(text=f"Verification failed: {e}")


if __name__ == '__main__':
    App()
