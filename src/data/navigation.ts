import type { Page, Role } from '../types'

export type NavSection = {
  label: string
  items: Array<{ key: Page; labelKey: string; roles: Role[] }>
}

export const navSections: NavSection[] = [
  {
    label: 'ACCESS',
    items: [
      { key: 'dashboard', labelKey: 'dashboard', roles: ['client', 'admin', 'operator', 'approver'] },
      { key: 'kyc', labelKey: 'kyc', roles: ['client'] },
    ],
  },
  {
    label: 'ASSETS',
    items: [
      { key: 'accounts', labelKey: 'accounts', roles: ['admin', 'operator', 'approver'] },
      { key: 'deposit', labelKey: 'deposit', roles: ['client', 'admin', 'operator', 'approver'] },
      { key: 'withdraw', labelKey: 'withdraw', roles: ['client', 'admin', 'operator'] },
      { key: 'address_book', labelKey: 'address_book', roles: ['admin', 'operator', 'approver'] },
    ],
  },
  {
    label: 'TRADING',
    items: [
      { key: 'trade', labelKey: 'trade', roles: ['client', 'admin', 'operator'] },
      { key: 'orders', labelKey: 'orders', roles: ['client', 'admin', 'operator', 'approver'] },
      { key: 'approvals', labelKey: 'approvals', roles: ['admin', 'operator', 'approver'] },
    ],
  },
  {
    label: 'COLLABORATION',
    items: [
      { key: 'messages', labelKey: 'messages', roles: ['client', 'admin', 'operator', 'approver'] },
      { key: 'chat', labelKey: 'chat', roles: ['client', 'admin', 'operator', 'approver'] },
      { key: 'team', labelKey: 'team', roles: ['admin'] },
    ],
  },
]
