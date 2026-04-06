import type { Language, Page, Role, Tone, UiMode } from '../types'
import type { NavSection } from '../data/navigation'

export function Badge({ text, tone = 'neutral' }: { text: string; tone?: Tone }) {
  return <span className={`badge ${tone === 'neutral' ? '' : tone}`.trim()}>{text}</span>
}

export function Panel({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return <section className="panel"><h3 className="panel-title">{title}</h3>{desc ? <p className="panel-desc">{desc}</p> : null}<div style={{ marginTop: 16 }}>{children}</div></section>
}

export function Notice({ title, body, error = false }: { title: string; body: string; error?: boolean }) {
  return <div className={error ? 'notice-error' : 'notice'}><h3>{title}</h3><p>{body}</p></div>
}

export function Metric({ title, value, sub }: { title: string; value: string; sub: string }) {
  return <div className="metric-card"><div className="metric-kicker">{title}</div><div className="metric-value">{value}</div><div className="metric-sub">{sub}</div></div>
}

export function Sidebar({ sections, page, setPage, role, t }: { sections: NavSection[]; page: Page; setPage: (p: Page) => void; role: Role; t: (key: string) => string }) {
  return (
    <aside className="sidebar">
      <div className="brand"><div className="brand-badge">P</div><div><div className="brand-title">Payso Digital</div><div className="brand-subtitle">{role === 'client' ? t('sidebar_client') : t('sidebar_institution')}</div></div></div>
      {sections.map(section => {
        const items = section.items.filter(item => item.roles.includes(role))
        if (!items.length) return null
        return <div className="nav-group" key={section.label}><div className="nav-label">{section.label}</div>{items.map(item => <button key={item.key} className={`nav-item ${page === item.key ? 'active' : ''}`} onClick={() => setPage(item.key)}>{t(item.labelKey)}</button>)}</div>
      })}
      <div className="sidebar-footer"><div className="footer-title">{t('account_controls')}</div><div className="footer-row"><span>{t('mfa')}</span><Badge text={t('approved')} tone="success" /></div><div className="footer-row"><span>{t('pin_required')}</span><Badge text={t('enabled')} tone="info" /></div><div className="footer-row"><span>{t('mode')}</span><Badge text={t('normal')} tone="neutral" /></div></div>
    </aside>
  )
}

export function HeaderControls({ role, setRole, uiMode, setUiMode, language, setLanguage, t }: { role: Role; setRole: (r: Role) => void; uiMode: UiMode; setUiMode: (m: UiMode) => void; language: Language; setLanguage: (l: Language) => void; t: (key: string) => string }) {
  return (
    <div className="topbar">
      <div className="title"><h1>{t('app_title')}</h1><p>{t('app_subtitle')}</p></div>
      <div className="controls">
        <div className="control-group">{(['client','admin','operator','approver'] as Role[]).map(r => <button key={r} className={`control-chip ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>{t(`role_${r}`)}</button>)}</div>
        <div className="control-group">{(['normal','loading','empty','error'] as UiMode[]).map(m => <button key={m} className={`control-chip ${uiMode === m ? 'active' : ''}`} onClick={() => setUiMode(m)}>{t(m)}</button>)}</div>
        <div className="control-group">{(['zh','en'] as Language[]).map(l => <button key={l} className={`control-chip ${language === l ? 'active' : ''}`} onClick={() => setLanguage(l)}>{t(`lang_${l}`)}</button>)}</div>
        <input className="search-box" placeholder={t('search_placeholder')} />
      </div>
    </div>
  )
}

export function ContextStrip({ role, t }: { role: Role; t: (key: string) => string }) {
  if (role === 'client') return null
  return <div className="context-strip"><div className="context-pill">{t('institution')}：{t('institution_name')}</div><div className="context-pill">{t('role')}：{role === 'admin' ? t('institution_admin') : role === 'operator' ? t('institution_operator') : t('institution_approver')}</div><div className="context-pill">{t('acting_account')}：Treasury Main / OTC Desk A</div></div>
}

export function ModalDialog({ open, title, body, confirmText, cancelText, onConfirm, onCancel }: { open: boolean; title: string; body: string; confirmText: string; cancelText: string; onConfirm: () => void; onCancel: () => void }) {
  if (!open) return null
  return <div className="modal-backdrop"><div className="modal"><h3>{title}</h3><p>{body}</p><div className="button-row"><button className="btn secondary" onClick={onCancel}>{cancelText}</button><button className="btn" onClick={onConfirm}>{confirmText}</button></div></div></div>
}

export function Toast({ text }: { text: string }) { return <div className="toast">{text}</div> }

export function StateShell({ uiMode, t, children }: { uiMode: UiMode; t: (key: string) => string; children: React.ReactNode }) {
  if (uiMode === 'loading') return <div className="empty"><div><h3>Loading...</h3><p>Rendering simulated loading state for review walkthrough.</p></div></div>
  if (uiMode === 'empty') return <div className="empty"><div><h3>{t('no_data')}</h3><p>{t('no_data_body')}</p></div></div>
  if (uiMode === 'error') return <Notice title={t('error_title')} body={t('error_body')} error />
  return <>{children}</>
}
