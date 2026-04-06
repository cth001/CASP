# CASP

Payso digital asset portal prototype repository.

## Project Overview

This repository contains a React + Vite prototype for the CASP web portal. The current version focuses on a controlled digital asset portal experience for both client and institution users, with an institutional fintech visual direction.

The prototype currently includes:

- bilingual interface with Chinese as the default language and English switch support
- role switching for client, admin, operator, and approver views
- state simulation for normal, loading, empty, and error review modes
- institutional dark-theme UI with Web3 / fintech control-console styling
- core portal flows for RFQ trading, order review, withdrawal request and approval, address governance, and notification / collaboration views

## Main Pages Included

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

## Tech Stack

- React
- TypeScript
- Vite
- Custom CSS stylesheet

## Local Installation

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

## Repository Structure

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
      └─ collaborationPages.tsx
```

## Current Scope Notes

This repository now uses a more maintainable multi-file structure while still remaining intentionally prototype-oriented.

The current code organization separates:

- layout and reusable UI helpers
- page-level views
- navigation data
- shared types
- bilingual copy

## Contribution Guidance

Please review `CONTRIBUTING.md` before opening a pull request.

## Usage Notes

This is a front-end prototype and is not connected to live custody, LP execution, ledger, KYC provider, or approval backends.

UI actions such as quote confirmation, address approval, and withdrawal approval are simulated for demonstration and review purposes.
