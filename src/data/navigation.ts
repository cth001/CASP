import type { Page, Role } from '../types'

export type NavSection = {
  label: string
  items: Array<{ key: Page; labelKey: string; roles: Role[] }>
}

export const navSections: NavSection[] = [
  {
    label: 'ACCESS',
    items: [
      { key: 'dashboard', labelKey: 'dashboard', roles: ['client', 'operator', 'approver'] },
      { key: 'kyc', labelKey: 'kyc', roles: ['client'] },
      { key: 'admin_business_dashboard', labelKey: 'admin_business_dashboard', roles: ['admin'] },
    ],
  },
  {
    label: 'ASSETS',
    items: [
      { key: 'accounts', labelKey: 'accounts', roles: ['operator', 'approver'] },
      { key: 'deposit', labelKey: 'deposit', roles: ['client', 'operator', 'approver'] },
      { key: 'withdraw', labelKey: 'withdraw', roles: ['client', 'operator'] },
      { key: 'address_book', labelKey: 'address_book', roles: ['operator', 'approver'] },
      { key: 'admin_user_management', labelKey: 'admin_user_management', roles: ['admin'] },
      { key: 'admin_fund_management', labelKey: 'admin_fund_management', roles: ['admin'] },
      { key: 'admin_report_management', labelKey: 'admin_report_management', roles: ['admin'] },
    ],
  },
  {
    label: 'TRADING',
    items: [
      { key: 'trade', labelKey: 'trade', roles: ['client', 'operator'] },
      { key: 'orders', labelKey: 'orders', roles: ['client', 'operator', 'approver'] },
      { key: 'approvals', labelKey: 'approvals', roles: ['operator', 'approver'] },
      { key: 'trader_dashboard', labelKey: 'trader_dashboard', roles: ['operator'] },
      { key: 'trader_rfq_queue', labelKey: 'trader_rfq_queue', roles: ['operator'] },
      { key: 'trader_lp_monitor', labelKey: 'trader_lp_monitor', roles: ['operator'] },
      { key: 'trader_execution_watch', labelKey: 'trader_execution_watch', roles: ['operator'] },
      { key: 'trader_quote_history', labelKey: 'trader_quote_history', roles: ['operator'] },
      { key: 'trader_exception_desk', labelKey: 'trader_exception_desk', roles: ['operator'] },
      { key: 'trader_desk_lead', labelKey: 'trader_desk_lead', roles: ['operator'] },
      { key: 'admin_trade_management', labelKey: 'admin_trade_management', roles: ['admin'] },
      { key: 'admin_risk_management', labelKey: 'admin_risk_management', roles: ['admin'] },
      { key: 'admin_routing_management', labelKey: 'admin_routing_management', roles: ['admin'] },
    ],
  },
  {
    label: 'COLLABORATION',
    items: [
      { key: 'messages', labelKey: 'messages', roles: ['client', 'operator', 'approver'] },
      { key: 'chat', labelKey: 'chat', roles: ['client', 'operator', 'approver'] },
      { key: 'team', labelKey: 'team', roles: ['admin'] },
      { key: 'admin_settings', labelKey: 'admin_settings', roles: ['admin'] },
    ],
  },
]
