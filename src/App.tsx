import { useEffect, useMemo, useState } from 'react'
import type { Language, ModalType, Page, Role, UiMode } from './types'
import { tFactory } from './i18n'
import { navSections } from './data/navigation'
import { ContextStrip, HeaderControls, ModalDialog, Notice, Sidebar, StateShell, Toast } from './components/layout'
import { AccountDetailPage, AccountsPage, DashboardPage, DepositPage, KycPage } from './pages/overviewPages'
import { OrderDetailPage, OrdersPage, TradePage } from './pages/tradingPages'
import { AddressApprovalDetailPage, AddressBookPage, AddAddressPage, ApprovalHistoryPage, ApprovalsPage, WithdrawPage, WithdrawSubmittedPage, WithdrawTrackingPage } from './pages/operationsPages'
import { ChatPage, MessagesPage, TeamPage } from './pages/collaborationPages'

const modalContentMap = {
  zh: {
    submitWithdrawal: { title: '确认提交提币申请', body: '该动作会创建一笔新的提币请求对象，并进入待审批状态。此时不会广播链上交易，也不会直接扣减最终余额。', nextPage: 'withdraw_submitted' as Page, toast: '提币申请已提交' },
    approveWithdrawal: { title: '确认批准提币请求', body: '批准后，请求将进入下一执行阶段，并可能继续进入广播与链上跟踪。该动作会留下审批证据与决策备注引用。', nextPage: 'withdraw_tracking' as Page, toast: '提币请求已批准' },
    approveAddress: { title: '确认批准目标地址', body: '批准后，该地址会进入当前账户范围内的可选提币地址集合。审批前，地址展示不构成地址可用事实。', nextPage: 'address_book' as Page, toast: '目标地址已批准' },
    confirmTrade: { title: '确认交易授权', body: '该动作会创建正式交易授权记录，并与报价、会话、设备和操作者上下文绑定。只有授权成功的报价才能进入冻结与建单路径。', nextPage: 'order_detail' as Page, toast: '交易授权已确认' },
  },
  en: {
    submitWithdrawal: { title: 'Confirm withdrawal request submission', body: 'This action creates a new withdrawal request object and places it into approval-pending state.', nextPage: 'withdraw_submitted' as Page, toast: 'Withdrawal request submitted' },
    approveWithdrawal: { title: 'Confirm withdrawal approval', body: 'Approving the request moves it into the next execution stage and may later lead to broadcast and on-chain tracking.', nextPage: 'withdraw_tracking' as Page, toast: 'Withdrawal request approved' },
    approveAddress: { title: 'Confirm destination approval', body: 'Approving the destination makes it selectable for withdrawals within the current account scope.', nextPage: 'address_book' as Page, toast: 'Destination approved' },
    confirmTrade: { title: 'Confirm trade authorization', body: 'This action creates a formal trade authorization record bound to quote, session, device, and actor context.', nextPage: 'order_detail' as Page, toast: 'Trade authorization confirmed' },
  },
}

export default function App() {
  const [role, setRole] = useState<Role>('operator')
  const [page, setPage] = useState<Page>('accounts')
  const [uiMode, setUiMode] = useState<UiMode>('normal')
  const [language, setLanguage] = useState<Language>('zh')
  const [modal, setModal] = useState<ModalType>(null)
  const [toast, setToast] = useState<string | null>(null)
  const t = tFactory(language)

  useEffect(() => {
    const defaults: Record<Role, Page> = { client: 'dashboard', admin: 'accounts', operator: 'accounts', approver: 'approvals' }
    setPage(defaults[role])
  }, [role])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const modalContent = useMemo(() => {
    if (!modal) return null
    return modalContentMap[language][modal]
  }, [modal, language])

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage t={t} />
      case 'kyc': return <KycPage t={t} />
      case 'accounts': return <AccountsPage t={t} setPage={setPage} />
      case 'account_detail': return <AccountDetailPage t={t} setPage={setPage} />
      case 'deposit': return <DepositPage t={t} />
      case 'trade': return <TradePage t={t} setModal={setModal} />
      case 'orders': return <OrdersPage t={t} setPage={setPage} />
      case 'order_detail': return <OrderDetailPage t={t} setPage={setPage} />
      case 'withdraw': return <WithdrawPage t={t} setPage={setPage} setModal={setModal} />
      case 'withdraw_submitted': return <WithdrawSubmittedPage t={t} setPage={setPage} />
      case 'withdraw_tracking': return <WithdrawTrackingPage t={t} setPage={setPage} />
      case 'approvals': return <ApprovalsPage t={t} setPage={setPage} setModal={setModal} />
      case 'approval_history': return <ApprovalHistoryPage t={t} />
      case 'address_book': return <AddressBookPage t={t} setPage={setPage} />
      case 'add_address': return <AddAddressPage t={t} setPage={setPage} />
      case 'address_approval_detail': return <AddressApprovalDetailPage t={t} setModal={setModal} />
      case 'messages': return <MessagesPage t={t} />
      case 'chat': return <ChatPage t={t} />
      case 'team': return <TeamPage t={t} />
      default: return null
    }
  }

  return (
    <div className="app-shell">
      <div className="layout">
        <Sidebar sections={navSections} page={page} setPage={setPage} role={role} t={t} />
        <main className="content">
          <HeaderControls role={role} setRole={setRole} uiMode={uiMode} setUiMode={setUiMode} language={language} setLanguage={setLanguage} t={t} />
          <ContextStrip role={role} t={t} />
          {uiMode === 'normal' && <Notice title={t('review_note_title')} body={t('review_note_body')} />}
          <StateShell uiMode={uiMode} t={t}>{renderPage()}</StateShell>
        </main>
      </div>
      <ModalDialog
        open={!!modalContent}
        title={modalContent?.title ?? ''}
        body={modalContent?.body ?? ''}
        confirmText={language === 'zh' ? '确认' : 'Confirm'}
        cancelText={language === 'zh' ? '取消' : 'Cancel'}
        onCancel={() => setModal(null)}
        onConfirm={() => {
          if (!modalContent) return
          setModal(null)
          setToast(modalContent.toast)
          setPage(modalContent.nextPage)
        }}
      />
      {toast && <Toast text={toast} />}
    </div>
  )
}
