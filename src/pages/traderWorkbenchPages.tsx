import { useMemo, useState } from 'react'
import { Badge, Metric, Notice, Panel } from '../components/layout'
import type { Language, Page } from '../types'

function text(language: Language) {
  return language === 'zh'
    ? {
        dash: '交易员首页',
        dashDesc: '面向公司交易员的 RFQ 执行驾驶舱，聚焦待报价请求、即将过期报价、LP 健康度与成交转化。',
        queue: 'RFQ 队列',
        queueDesc: '统一管理新进 RFQ、待报价、已报价待确认、即将过期、已过期与异常请求。',
        detail: 'RFQ 详情 / 报价工作台',
        detailDesc: '交易员在这里查看客户 RFQ、市场与 LP 报价、系统建议报价，并进行发送、重报价或拒绝处理。',
        lp: 'LP 健康与路由观察',
        lpDesc: '查看 LP 响应时延、可成交深度、成交成功率与当前路由降级状态。',
        history: '报价历史',
        historyDesc: '复盘 RFQ 报价版本、客户接受率、LP 使用情况与成交转化。',
        exception: '异常处理台',
        exceptionDesc: '处理 LP 超时、深度不足、客户确认后执行异常、TTL 过期与 callback 延迟问题。',
        newRfq: '新进 RFQ',
        quotedWaiting: '已报价待确认',
        nearExpiry: '即将过期',
        quoteRate: '今日报价成功率',
        fillRate: '今日成交转化率',
        rfqHealth: 'LP 健康状态',
        listTitle: 'RFQ 工作列表',
        marketSnap: '市场快照',
        lpQuotes: 'LP 报价面板',
        suggestedQuote: '系统建议报价',
        traderActions: '交易员动作',
        riskAudit: '风控 / 审计 / 历史',
        buy: '买入',
        sell: '卖出',
        status: '状态',
        pair: '交易对',
        client: '客户',
        notional: '请求名义金额',
        ttl: 'TTL',
        owner: '当前负责人',
        requestQuote: '重新询价',
        sendQuote: '发送报价',
        requote: '重报价',
        reject: '拒绝 RFQ',
        escalate: '升级处理',
        routeToLp: '指定 LP',
        quoteHistory: '报价版本历史',
        activity: '事件时间线',
        risk: '风险摘要',
        note: 'Desk Note',
        backQueue: '返回 RFQ 队列',
      }
    : {
        dash: 'Trader Home',
        dashDesc: 'RFQ execution cockpit for internal traders, focused on incoming requests, near-expiry quotes, LP health, and conversion.',
        queue: 'RFQ Queue',
        queueDesc: 'Manage new RFQs, awaiting quote, quoted and pending client confirmation, near expiry, expired, and exception requests.',
        detail: 'RFQ Detail / Quote Workbench',
        detailDesc: 'The trader reviews the client RFQ, LP prices, suggested quote, and decides whether to send, requote, or reject.',
        lp: 'LP Health & Routing Monitor',
        lpDesc: 'Review LP latency, executable depth, fill success, and degraded routing posture.',
        history: 'Quote History',
        historyDesc: 'Replay quote versions, client acceptance, LP usage, and conversion outcomes.',
        exception: 'Exception Desk',
        exceptionDesc: 'Handle LP timeout, insufficient depth, TTL expiry, callback delays, and execution exceptions.',
        newRfq: 'New RFQs',
        quotedWaiting: 'Quoted / Waiting',
        nearExpiry: 'Near Expiry',
        quoteRate: 'Quote Success Today',
        fillRate: 'Fill Conversion Today',
        rfqHealth: 'LP Health',
        listTitle: 'RFQ Working List',
        marketSnap: 'Market Snapshot',
        lpQuotes: 'LP Quote Panel',
        suggestedQuote: 'Suggested Quote',
        traderActions: 'Trader Actions',
        riskAudit: 'Risk / Audit / History',
        buy: 'Buy',
        sell: 'Sell',
        status: 'Status',
        pair: 'Pair',
        client: 'Client',
        notional: 'Requested Notional',
        ttl: 'TTL',
        owner: 'Owner',
        requestQuote: 'Refresh Quotes',
        sendQuote: 'Send Quote',
        requote: 'Requote',
        reject: 'Reject RFQ',
        escalate: 'Escalate',
        routeToLp: 'Select LP',
        quoteHistory: 'Quote Version History',
        activity: 'Event Timeline',
        risk: 'Risk Summary',
        note: 'Desk Note',
        backQueue: 'Back to RFQ Queue',
      }
}

function RfqRow({ id, pair, client, side, amount, status, ttl, owner, tone, onClick }: { id: string; pair: string; client: string; side: string; amount: string; status: string; ttl: string; owner: string; tone: 'info' | 'warning' | 'success' | 'danger'; onClick?: () => void }) {
  return (
    <button className="table-row" onClick={onClick}>
      <div>
        <div className="value" style={{ marginTop: 0 }}>{id}</div>
        <div className="meta">{pair} · {client} · {side}</div>
      </div>
      <div className="meta">{amount} · TTL {ttl} · {owner}</div>
      <div style={{ justifySelf: 'end' }}><Badge text={status} tone={tone} /></div>
    </button>
  )
}

function LpQuoteRow({ lp, bid, ask, size, latency, tone }: { lp: string; bid: string; ask: string; size: string; latency: string; tone: 'success' | 'warning' | 'danger' | 'info' }) {
  return (
    <div className="table-row" style={{ gridTemplateColumns: '1.1fr 1fr 160px' }}>
      <div>
        <div className="value" style={{ marginTop: 0 }}>{lp}</div>
        <div className="meta">{size}</div>
      </div>
      <div className="meta">Bid {bid} · Ask {ask}</div>
      <div style={{ justifySelf: 'end' }}><Badge text={latency} tone={tone} /></div>
    </div>
  )
}

export function TraderDashboardPage({ language, setPage }: { language: Language; setPage: (page: Page) => void }) {
  const t = text(language)
  return (
    <div className="grid">
      <Panel title={t.dash} desc={t.dashDesc}>
        <div className="grid cols-4">
          <Metric title={t.newRfq} value="28" sub="6 high-value / 2 priority institution" />
          <Metric title={t.quotedWaiting} value="17" sub="3 awaiting client PIN confirmation" />
          <Metric title={t.nearExpiry} value="6" sub="2 quotes under 20s TTL" />
          <Metric title={t.rfqHealth} value="LP-A / LP-B" sub="LP-B degraded but available as backup" />
        </div>
        <div className="grid cols-2" style={{ marginTop: 18 }}>
          <Metric title={t.quoteRate} value="96.4%" sub="Quote issued / RFQ received" />
          <Metric title={t.fillRate} value="62.8%" sub="Accepted quotes converted to fills" />
        </div>
      </Panel>
      <div className="grid main-2">
        <Panel title={t.queue} desc={t.queueDesc}>
          <div className="table-list">
            <RfqRow id="RFQ-20260410-001" pair="BTC/USDT" client="Payso Capital" side={t.buy} amount="250,000 USDT" status={language === 'zh' ? '待报价' : 'Awaiting Quote'} ttl="--" owner="Trader A" tone="info" onClick={() => setPage('trader_rfq_detail')} />
            <RfqRow id="RFQ-20260410-002" pair="ETH/USDT" client="Hunter Demo" side={t.sell} amount="120 ETH" status={language === 'zh' ? '待确认' : 'Quoted / Waiting'} ttl="00:34" owner="Trader B" tone="warning" onClick={() => setPage('trader_rfq_detail')} />
            <RfqRow id="RFQ-20260410-003" pair="SOL/USDT" client="Maria Santos" side={t.buy} amount="80,000 USDT" status={language === 'zh' ? '已成交' : 'Filled'} ttl="--" owner="Trader A" tone="success" onClick={() => setPage('trader_rfq_detail')} />
          </div>
        </Panel>
        <Panel title={t.lp} desc={t.lpDesc}>
          <div className="table-list">
            <LpQuoteRow lp="LP-A" bid="69,742.11" ask="69,758.42" size="Executable 4.2 BTC" latency="85ms" tone="success" />
            <LpQuoteRow lp="LP-B" bid="69,730.02" ask="69,770.14" size="Executable 3.7 BTC" latency="322ms" tone="warning" />
            <LpQuoteRow lp="LP-C" bid="69,721.88" ask="69,781.30" size="Executable 2.1 BTC" latency="Degraded" tone="danger" />
          </div>
        </Panel>
      </div>
    </div>
  )
}

export function TraderRfqQueuePage({ language, setPage }: { language: Language; setPage: (page: Page) => void }) {
  const t = text(language)
  return (
    <Panel title={t.queue} desc={t.queueDesc}>
      <div className="button-row" style={{ marginBottom: 14 }}>
        {[language === 'zh' ? '新进 RFQ' : 'New RFQs', language === 'zh' ? '待报价' : 'Awaiting Quote', language === 'zh' ? '待确认' : 'Quoted / Waiting', language === 'zh' ? '即将过期' : 'Near Expiry', language === 'zh' ? '异常' : 'Exceptions'].map((x, i) => <button key={x} className={`btn ${i === 0 ? '' : 'secondary'}`}>{x}</button>)}
      </div>
      <div className="button-row" style={{ marginBottom: 14 }}>
        <input className="search-box" placeholder={language === 'zh' ? '搜索 RFQ、客户、交易对、交易员' : 'Search RFQ, client, pair, trader'} />
        <button className="btn secondary">{language === 'zh' ? '保存视图' : 'Saved Views'}</button>
      </div>
      <div className="table-list">
        <RfqRow id="RFQ-20260410-001" pair="BTC/USDT" client="Payso Capital" side={t.buy} amount="250,000 USDT" status={language === 'zh' ? '待报价' : 'Awaiting Quote'} ttl="--" owner="Trader A" tone="info" onClick={() => setPage('trader_rfq_detail')} />
        <RfqRow id="RFQ-20260410-004" pair="ETH/USDT" client="OTT Demo" side={t.buy} amount="180,000 USDT" status={language === 'zh' ? '待报价' : 'Awaiting Quote'} ttl="--" owner="Trader B" tone="info" onClick={() => setPage('trader_rfq_detail')} />
        <RfqRow id="RFQ-20260410-005" pair="BTC/USDC" client="World Credit" side={t.sell} amount="2.5 BTC" status={language === 'zh' ? '待确认' : 'Quoted / Waiting'} ttl="00:29" owner="Trader A" tone="warning" onClick={() => setPage('trader_rfq_detail')} />
        <RfqRow id="RFQ-20260410-006" pair="SOL/USDT" client="Retail Client A" side={t.buy} amount="90,000 USDT" status={language === 'zh' ? '异常' : 'Exception'} ttl="--" owner="Trader C" tone="danger" onClick={() => setPage('trader_rfq_detail')} />
      </div>
    </Panel>
  )
}

export function TraderRfqDetailPage({ language, setPage }: { language: Language; setPage: (page: Page) => void }) {
  const t = text(language)
  const [quoteVersion, setQuoteVersion] = useState('v2')
  const timeline = useMemo(() => language === 'zh'
    ? ['RFQ 创建：客户请求 BTC/USDT 买入 250,000 USDT。', '系统完成第一轮 LP 拉价，LP-A 被建议为 primary。', 'Quote v1 已发送，因 TTL 到期未确认而失效。', 'Quote v2 生成完成，等待交易员发送。']
    : ['RFQ created for BTC/USDT buy of 250,000 USDT.', 'First LP price pull completed and LP-A is suggested as primary.', 'Quote v1 was sent and expired without confirmation.', 'Quote v2 is prepared and waiting for trader action.'], [language])
  return (
    <div className="grid main-2">
      <div className="grid">
        <Panel title={t.detail} desc={t.detailDesc}>
          <div className="grid cols-2">
            {[[language === 'zh' ? 'RFQ 编号' : 'RFQ ID', 'RFQ-20260410-001'], [t.client, 'Payso Capital'], [t.pair, 'BTC / USDT'], [t.notional, '250,000 USDT'], [language === 'zh' ? '方向' : 'Side', t.buy], [t.status, language === 'zh' ? '待发送报价' : 'Ready to Quote']].map(([k, v]) => <div className="card-block" key={String(k)}><div className="label">{k}</div><div className="value">{v}</div></div>)}
          </div>
        </Panel>
        <div className="grid cols-2">
          <Panel title={t.marketSnap} desc={language === 'zh' ? '实时市场与价差概览。' : 'Live market and spread overview.'}>
            <div className="table-list"><div className="row-between"><span>Mid</span><strong>69,751.27</strong></div><div className="row-between"><span>Spread</span><strong>16.31</strong></div><div className="row-between"><span>{language === 'zh' ? '波动状态' : 'Volatility'}</span><Badge text={language === 'zh' ? '稳定' : 'Stable'} tone="success" /></div></div>
          </Panel>
          <Panel title={t.suggestedQuote} desc={language === 'zh' ? '系统建议报价与推荐 LP。' : 'System-suggested quote and recommended LP.'}>
            <div className="table-list"><div className="row-between"><span>{language === 'zh' ? '推荐 LP' : 'Suggested LP'}</span><strong>LP-A</strong></div><div className="row-between"><span>{language === 'zh' ? '对客价格' : 'Client Price'}</span><strong>69,768.44</strong></div><div className="row-between"><span>{language === 'zh' ? '预计获得' : 'Estimated Receive'}</span><strong>3.582 BTC</strong></div><div className="row-between"><span>{t.ttl}</span><Badge text="00:55" tone="info" /></div></div>
          </Panel>
        </div>
        <Panel title={t.lpQuotes} desc={language === 'zh' ? '可执行 LP 报价对比。' : 'Executable LP quote comparison.'}>
          <div className="table-list"><LpQuoteRow lp="LP-A" bid="69,742.11" ask="69,758.42" size="Executable 4.2 BTC" latency="85ms" tone="success" /><LpQuoteRow lp="LP-B" bid="69,730.02" ask="69,770.14" size="Executable 3.7 BTC" latency="322ms" tone="warning" /><LpQuoteRow lp="LP-C" bid="69,721.88" ask="69,781.30" size="Executable 2.1 BTC" latency="Degraded" tone="danger" /></div>
        </Panel>
        <Panel title={t.traderActions} desc={language === 'zh' ? '交易员控制区：可发报价、重报价、切换 LP 或拒绝。' : 'Trader control area for sending, requoting, routing, or rejecting.'}>
          <div className="button-row" style={{ marginBottom: 14 }}><button className="btn secondary" onClick={() => setQuoteVersion('v1')}>Quote v1</button><button className="btn" onClick={() => setQuoteVersion('v2')}>Quote v2</button></div>
          <div className="form-grid"><input className="input" value={quoteVersion} readOnly /><input className="input" defaultValue="69,768.44" /><input className="input" defaultValue="00:55" /><input className="input" defaultValue="LP-A" /><input className="input full" defaultValue="Use LP-A primary. Keep LP-B as backup. Market stable; no extra buffer needed." /></div>
          <div className="button-row" style={{ marginTop: 14 }}><button className="btn">{t.sendQuote}</button><button className="btn secondary">{t.requote}</button><button className="btn secondary">{t.routeToLp}</button><button className="btn secondary">{t.requestQuote}</button><button className="btn secondary">{t.escalate}</button><button className="btn secondary">{t.reject}</button></div>
        </Panel>
      </div>
      <div className="grid">
        <Panel title={t.riskAudit} desc={language === 'zh' ? '风控结果、报价历史与审计时间线。' : 'Risk result, quote history, and audit trace.'}>
          <div className="section-title">{t.risk}</div>
          <div className="table-list" style={{ marginTop: 0 }}><div className="card-block"><div className="row-between"><span>{language === 'zh' ? '客户权限' : 'Client Access'}</span><Badge text={language === 'zh' ? '允许交易' : 'Trade Allowed'} tone="success" /></div></div><div className="card-block"><div className="row-between"><span>{language === 'zh' ? '额度检查' : 'Limit Check'}</span><Badge text={language === 'zh' ? '通过' : 'Pass'} tone="success" /></div></div><div className="card-block"><div className="row-between"><span>{language === 'zh' ? '价格偏移提醒' : 'Price Deviation Alert'}</span><Badge text={language === 'zh' ? '正常' : 'Normal'} tone="info" /></div></div></div>
          <div className="section-title" style={{ marginTop: 18 }}>{t.quoteHistory}</div>
          <div className="table-list" style={{ marginTop: 0 }}><div className="table-row"><div><div className="value" style={{ marginTop: 0 }}>Quote v1</div><div className="meta">LP-A · TTL 60s</div></div><div className="meta">69,760.11</div><div style={{ justifySelf: 'end' }}><Badge text={language === 'zh' ? '已过期' : 'Expired'} tone="warning" /></div></div><div className="table-row"><div><div className="value" style={{ marginTop: 0 }}>Quote v2</div><div className="meta">LP-A primary / LP-B backup</div></div><div className="meta">69,768.44</div><div style={{ justifySelf: 'end' }}><Badge text={language === 'zh' ? '待发送' : 'Ready'} tone="info" /></div></div></div>
          <div className="section-title" style={{ marginTop: 18 }}>{t.activity}</div>
          <div className="timeline">{timeline.map((item, idx) => <div className="timeline-row" key={idx}><div className="time">2026-04-10 10:4{idx}:12</div><div><div className="event-title">{item}</div></div><div style={{ textAlign: 'right' }}><Badge text={idx < 2 ? 'Recorded' : 'Observed'} tone={idx < 2 ? 'success' : 'info'} /></div></div>)}</div>
          <textarea className="input" placeholder={t.note} style={{ marginTop: 14, minHeight: 110 }} defaultValue="Hold LP-B only as backup. If BTC spot moves above 69,790, trigger new quote pull immediately." />
          <button className="btn secondary" style={{ width: '100%', marginTop: 12 }} onClick={() => setPage('trader_rfq_queue')}>{t.backQueue}</button>
        </Panel>
      </div>
    </div>
  )
}

export function TraderLpMonitorPage({ language }: { language: Language }) {
  const t = text(language)
  return <div className="grid main-2"><Panel title={t.lp} desc={t.lpDesc}><div className="table-list"><LpQuoteRow lp="LP-A" bid="69,742.11" ask="69,758.42" size="Executable 4.2 BTC" latency="85ms" tone="success" /><LpQuoteRow lp="LP-B" bid="69,730.02" ask="69,770.14" size="Executable 3.7 BTC" latency="322ms" tone="warning" /><LpQuoteRow lp="LP-C" bid="69,721.88" ask="69,781.30" size="Executable 2.1 BTC" latency="Degraded" tone="danger" /></div></Panel><Panel title={language === 'zh' ? '路由观察' : 'Routing Watch'} desc={language === 'zh' ? '观察当前 primary / backup 策略与 fallback 命中。' : 'Watch primary / backup posture and fallback hits.'}><div className="table-list"><div className="card-block"><div className="row-between"><span>BTC/USDT</span><Badge text="LP-A primary" tone="success" /></div></div><div className="card-block"><div className="row-between"><span>ETH/USDT</span><Badge text="LP-A primary" tone="success" /></div></div><div className="card-block"><div className="row-between"><span>SOL/USDT</span><Badge text="Fallback 4.2%" tone="warning" /></div></div></div></Panel></div>
}

export function TraderQuoteHistoryPage({ language }: { language: Language }) {
  const t = text(language)
  return <Panel title={t.history} desc={t.historyDesc}><div className="table-list"><RfqRow id="RFQ-20260409-119 / Quote v3" pair="BTC/USDT" client="Payso Capital" side={t.buy} amount="450,000 USDT" status={language === 'zh' ? '客户接受' : 'Accepted'} ttl="--" owner="Trader A" tone="success" /><RfqRow id="RFQ-20260409-088 / Quote v2" pair="ETH/USDT" client="OTT Demo" side={t.sell} amount="220 ETH" status={language === 'zh' ? '已过期' : 'Expired'} ttl="--" owner="Trader B" tone="warning" /><RfqRow id="RFQ-20260409-061 / Quote v1" pair="SOL/USDT" client="Retail Client" side={t.buy} amount="70,000 USDT" status={language === 'zh' ? '拒绝' : 'Rejected'} ttl="--" owner="Trader C" tone="danger" /></div></Panel>
}

export function TraderExceptionDeskPage({ language }: { language: Language }) {
  const t = text(language)
  return <div className="grid main-2"><Panel title={t.exception} desc={t.exceptionDesc}><div className="table-list"><RfqRow id="RFQ-20260410-006" pair="SOL/USDT" client="Retail Client A" side={t.buy} amount="90,000 USDT" status={language === 'zh' ? 'LP 超时' : 'LP Timeout'} ttl="--" owner="Trader C" tone="danger" /><RfqRow id="RFQ-20260410-007" pair="BTC/USDT" client="Hunter Demo" side={t.buy} amount="500,000 USDT" status={language === 'zh' ? '深度不足' : 'Insufficient Depth'} ttl="--" owner="Trader A" tone="warning" /><RfqRow id="RFQ-20260410-008" pair="ETH/USDT" client="World Credit" side={t.sell} amount="300 ETH" status={language === 'zh' ? '客户确认后回调延迟' : 'Callback Delay After Confirm'} ttl="--" owner="Trader B" tone="danger" /></div></Panel><Panel title={language === 'zh' ? '处理建议' : 'Handling Guide'} desc={language === 'zh' ? '异常处理台用于指导交易员下一步动作。' : 'The exception desk guides the trader to the next action.'}><Notice title={language === 'zh' ? '高优先级异常' : 'High Priority Exception'} body={language === 'zh' ? '如果客户已完成正式确认，但 LP callback 未按 SLA 返回，需要立即升级到 execution support。' : 'If the client has formally confirmed and the LP callback misses SLA, escalate to execution support immediately.'} /><div className="button-row" style={{ marginTop: 14 }}><button className="btn">{t.escalate}</button><button className="btn secondary">{t.requestQuote}</button><button className="btn secondary">{t.reject}</button></div></Panel></div>
}
