import type { Language } from '../types'
import { Badge, Panel } from '../components/layout'

const zh = {
  adminDesc: '面向管理后台的高保真评审版页面流，重点覆盖用户/KYC、订单与提币监控、风险规则、账务对账、流动性与平台配置。',
  usersDesc: '集中管理个人客户、机构客户、KYC 状态、冻结控制和访问限制。',
  monitoringDesc: '聚合订单、RFQ、提币、入金和异常处理队列，适合值班监控与问题调查。',
  riskDesc: '定义交易限额、提币阈值、黑白名单、审查路径和人工复核规则。',
  ledgerDesc: '查看账本余额、冻结、费用、通道对账结果与 break 处理情况。',
  liquidityDesc: '查看 LP 连接、路由策略、报价 TTL、通道健康度和降级开关。',
  settingsDesc: '平台参数、角色权限、通知策略、展示口径与多语言配置入口。',
}
const en = {
  adminDesc: 'High-fidelity back-office review flow focused on user/KYC operations, order and withdrawal monitoring, risk rules, ledger reconciliation, liquidity operations, and platform configuration.',
  usersDesc: 'Centralized management for retail clients, institutions, KYC states, freeze controls, and access restrictions.',
  monitoringDesc: 'Aggregated order, RFQ, withdrawal, deposit, and exception queues for shift monitoring and investigation.',
  riskDesc: 'Configure trading limits, withdrawal thresholds, allow/deny lists, review paths, and manual intervention rules.',
  ledgerDesc: 'Inspect ledger balances, freezes, fees, channel reconciliation results, and break handling.',
  liquidityDesc: 'Inspect LP connectivity, routing policy, quote TTL, channel health, and degradation switches.',
  settingsDesc: 'Manage platform parameters, role permissions, notification policy, display posture, and language configuration.',
}
function copy(language: Language) { return language === 'zh' ? zh : en }

export function AdminConsolePage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <div className="grid"><Panel title={t('admin_console')} desc={c.adminDesc}><div className="grid cols-4">{[['Active Clients','18,420','info'],['Open Cases','124','warning'],['High Risk Alerts','9','danger'],['System Health','Normal','success']].map(([k,v,tone]) => <div className="card-block" key={k}><div className="row-between"><span className="label">{k}</span><Badge text={String(tone).toUpperCase()} tone={tone as any} /></div><div className="value">{v}</div></div>)}</div><div className="grid main-2" style={{marginTop:16}}><div className="table-list">{['Client onboarding SLA within target range','No unresolved custody connectivity incident in current review window','Approval backlog remains below configured threshold'].map(x => <div className="card-block hero-note" key={x}>• {x}</div>)}</div><div className="table-list">{[['Users & KYC','1,204 pending reviews'],['Orders & Transfers','3 degraded items'],['Risk Rules','12 active policy sets'],['Ledger & Reconciliation','2 breaks under review']].map(([k,v]) => <div className="row-between card-block" key={k}><strong>{k}</strong><span className="meta">{v}</span></div>)}</div></div></Panel></div>
}

export function AdminUsersPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_users')} desc={c.usersDesc}><div className="table-list">{[['USR-10021','Retail','KYC Approved','Active'],['INS-20008','Institution','KYB Pending','Restricted'],['USR-10077','Retail','Enhanced Review','Frozen']].map(([id,type,kyc,status]) => <div className="table-row" key={id}><div><div className="value" style={{marginTop:0}}>{id}</div><div className="meta">{type} · {kyc}</div></div><div><div className="meta">Case owner: Compliance Desk</div></div><div style={{justifySelf:'end'}}><Badge text={status} tone={status === 'Active' ? 'success' : status === 'Restricted' ? 'warning' : 'danger'} /></div></div>)}</div></Panel>
}

export function AdminMonitoringPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_monitoring')} desc={c.monitoringDesc}><div className="table-list">{[['RFQ Queue','2 expiring quotes','info'],['Withdrawal Queue','3 awaiting chain completion','warning'],['Deposit Exceptions','1 deprecated address hit','danger'],['Broadcast Jobs','12 healthy / 1 retried','success']].map(([k,v,tone]) => <div className="row-between card-block" key={k}><div><div className="value" style={{marginTop:0}}>{k}</div><div className="meta">{v}</div></div><Badge text={String(tone).toUpperCase()} tone={tone as any} /></div>)}</div></Panel>
}

export function AdminRiskPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_risk')} desc={c.riskDesc}><div className="grid cols-2">{[['Daily Withdrawal Threshold','100,000 USDT'],['High-Risk Wallet Rule','Enabled'],['Sanctions Screening','Provider + internal list'],['Manual Review Path','Tiered by amount and score']].map(([k,v]) => <div className="card-block" key={k}><div className="label">{k}</div><div className="value">{v}</div></div>)}</div></Panel>
}

export function AdminLedgerPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_ledger')} desc={c.ledgerDesc}><div className="table-list">{[['Customer Asset Ledger','Balanced'],['Network Fee Reserve','Monitored'],['Daily Reconciliation','2 breaks'],['Finance Export','Available']].map(([k,v]) => <div className="row-between card-block" key={k}><strong>{k}</strong><span className="meta">{v}</span></div>)}</div></Panel>
}

export function AdminLiquidityPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_liquidity')} desc={c.liquidityDesc}><div className="table-list">{[['LP-A','Healthy','85 ms'],['LP-B','Degraded','322 ms'],['Custody Channel','Healthy','92 ms'],['Fallback Routing','Enabled','Policy P-7']].map(([name,status,detail]) => <div className="table-row" key={name}><div><div className="value" style={{marginTop:0}}>{name}</div><div className="meta">{detail}</div></div><div></div><div style={{justifySelf:'end'}}><Badge text={status} tone={status === 'Healthy' || status === 'Enabled' ? 'success' : 'warning'} /></div></div>)}</div></Panel>
}

export function AdminSettingsPage({ t, language }: { t: (key: string) => string; language: Language }) {
  const c = copy(language)
  return <Panel title={t('admin_settings')} desc={c.settingsDesc}><div className="grid cols-2">{[['Role Permission Matrix','Configured'],['Notification Templates','8 active'],['Client-visible Status Mapping','Version 3'],['Language Packs','ZH / EN']].map(([k,v]) => <div className="card-block" key={k}><div className="label">{k}</div><div className="value">{v}</div></div>)}</div></Panel>
}
