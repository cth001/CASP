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
      { key: 'admin_console', labelKey: 'admin_console', roles: ['admin'] },
    ],
  },
  {
    label: 'ASSETS',
    items: [
      { key: 'accounts', labelKey: 'accounts', roles: ['operator', 'approver'] },
      { key: 'deposit', labelKey: 'deposit', roles: ['client', 'operator', 'approver'] },
      { key: 'withdraw', labelKey: 'withdraw', roles: ['client', 'operator'] },
      { key: 'address_book', labelKey: 'address_book', roles: ['operator', 'approver'] },
      { key: 'admin_users', labelKey: 'admin_users', roles: ['admin'] },
      { key: 'admin_ledger', labelKey: 'admin_ledger', roles: ['admin'] },
    ],
  },
  {
    label: 'TRADING',
    items: [
      { key: 'trade', labelKey: 'trade', roles: ['client', 'operator'] },
      { key: 'orders', labelKey: 'orders', roles: ['client', 'operator', 'approver'] },
      { key: 'approvals', labelKey: 'approvals', roles: ['operator', 'approver'] },
      { key: 'admin_monitoring', labelKey: 'admin_monitoring', roles: ['admin'] },
      { key: 'admin_risk', labelKey: 'admin_risk', roles: ['admin'] },
      { key: 'admin_liquidity', labelKey: 'admin_liquidity', roles: ['admin'] },
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
