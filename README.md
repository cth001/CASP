# CASP

Payso digital asset portal prototype repository.

## English

### Project Overview

This repository contains a React + Vite prototype for the CASP web portal. The current version focuses on a controlled digital asset portal experience for both client and institution users, with an institutional fintech visual direction.

The prototype currently includes:

- bilingual interface with Chinese as the default language and English switch support
- role switching for client, admin, operator, and approver views
- state simulation for normal, loading, empty, and error review modes
- institutional dark-theme UI with Web3 / fintech control-console styling
- core portal flows for RFQ trading, order review, withdrawal request and approval, address governance, and notification / collaboration views
- admin workbench modules for business dashboard, user management, trade management, funds management, risk management, routing management, report management, and system settings

### Main Pages Included

#### User / Institution Portal

- Dashboard / Overview
- KYC & Access
- Accounts / Account Detail
- Deposit
- RFQ Trade
- Orders / Order Detail
- Withdrawals / Submitted / Tracking
- Approval Center / Approval History
- Address Book / Add Address / Address Approval Detail
- Notification Center
- Trading Collaboration
- Team & Access

#### Admin Workbench

- Business Dashboard
- User Management
- Trade Management
- Funds Management
- Risk Management
- Routing Management
- Report Management
- System Settings

### Tech Stack

- React
- TypeScript
- Vite
- Custom CSS stylesheet

### Local Installation

Clone the repository:

```bash
git clone https://github.com/cth001/CASP.git
cd CASP
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Repository Structure

```text
CASP/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ LICENSE
├─ CONTRIBUTING.md
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles.css
   ├─ types.ts
   ├─ i18n/
   │  └─ index.ts
   ├─ data/
   │  └─ navigation.ts
   ├─ components/
   │  └─ layout.tsx
   └─ pages/
      ├─ overviewPages.tsx
      ├─ tradingPages.tsx
      ├─ operationsPages.tsx
      ├─ collaborationPages.tsx
      ├─ adminConsolePages.tsx
      └─ adminWorkbenchPages.tsx
```

### Current Scope Notes

This repository uses a maintainable multi-file structure while remaining intentionally prototype-oriented.

The current code organization separates:

- layout and reusable UI helpers
- page-level views
- navigation data
- shared types
- bilingual copy
- separate admin workbench modules for the latest back-office prototype

### Contribution Guidance

Please review `CONTRIBUTING.md` before opening a pull request.

### Usage Notes

This is a front-end prototype and is not connected to live custody, LP execution, ledger, KYC provider, or approval backends.

UI actions such as quote confirmation, address approval, withdrawal approval, and admin workbench operations are simulated for demonstration and review purposes.

---

## 中文说明

### 项目简介

本仓库是 Payso CASP Web Portal 的 React + Vite 原型项目。当前版本聚焦于受控数字资产门户体验，覆盖个人 / 机构用户端，以及管理后台工作台，整体视觉方向偏向 institutional fintech / Web3 control console。

当前原型主要包含：

- 默认中文、可切换英文的双语界面
- client、admin、operator、approver 多角色切换
- normal、loading、empty、error 等评审态模拟
- 深色系 Web3 / fintech 管理台视觉风格
- RFQ 交易、订单查询、提币申请与审批、地址治理、消息与协作等核心门户流程
- 管理后台工作台模块，包括业务仪表盘、用户管理、交易管理、出入金管理、风险管理、路由管理、报表管理、系统设置

### 页面范围

#### 用户 / 机构门户

- 总览
- KYC 与准入
- 账户 / 账户详情
- 入金
- RFQ 交易
- 订单 / 订单详情
- 提币 / 提交成功 / 跟踪
- 审批中心 / 审批历史
- 地址簿 / 新增地址 / 地址审批详情
- 通知中心
- 交易协作
- 团队与权限

#### 管理后台工作台

- 业务仪表盘
- 用户管理
- 交易管理
- 出入金管理
- 风险管理
- 路由管理
- 报表管理
- 系统设置

### 技术栈

- React
- TypeScript
- Vite
- 自定义 CSS 样式

### 本地安装与运行

克隆仓库：

```bash
git clone https://github.com/cth001/CASP.git
cd CASP
```

安装依赖：

```bash
npm install
```

启动本地开发环境：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run preview
```

### 目录结构

```text
CASP/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ LICENSE
├─ CONTRIBUTING.md
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles.css
   ├─ types.ts
   ├─ i18n/
   │  └─ index.ts
   ├─ data/
   │  └─ navigation.ts
   ├─ components/
   │  └─ layout.tsx
   └─ pages/
      ├─ overviewPages.tsx
      ├─ tradingPages.tsx
      ├─ operationsPages.tsx
      ├─ collaborationPages.tsx
      ├─ adminConsolePages.tsx
      └─ adminWorkbenchPages.tsx
```

### 当前代码组织说明

这个仓库目前已经采用更易维护的多文件结构，但仍然保持“原型优先”的定位。

目前代码主要拆分为：

- layout 与复用 UI 组件
- 页面级视图文件
- 导航配置数据
- 通用类型定义
- 中英文文案
- 最新版本的后台工作台原型模块

### 协作说明

提交 PR 之前，请先阅读 `CONTRIBUTING.md`。

### 使用说明

当前项目是前端原型，不连接真实的 custody、LP execution、ledger、KYC provider 或 approval backend。

报价确认、地址审批、提币审批、后台管理动作等交互，当前均为评审与演示用途的模拟行为，不代表真实后端事实执行。
