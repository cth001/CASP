# Contributing

Thank you for contributing to CASP.

## Scope

This repository currently contains a front-end prototype for a digital asset portal. Contributions should keep the project aligned with the following goals:

- institutional fintech visual quality
- controlled workflow design
- bilingual UX support
- maintainable React + TypeScript structure

## Development Workflow

1. Create a feature branch from `main`
2. Make focused changes with clear commit messages
3. Test locally before opening a pull request
4. Keep changes small and reviewable whenever possible

## Local Setup

```bash
git clone https://github.com/cth001/CASP.git
cd CASP
npm install
npm run dev
```

## Coding Guidelines

- Use TypeScript strictly
- Prefer small, composable React components
- Keep layout, page, and data concerns separated
- Do not introduce unnecessary dependencies for simple UI behavior
- Preserve bilingual support when editing visible copy
- Keep dark-theme visual consistency across new pages and components

## Pull Request Expectations

A pull request should include:

- a concise summary of what changed
- screenshots or short notes for UI changes
- any follow-up refactor or cleanup items
- confirmation that the app still runs locally

## Suggested Structure

- `src/components/` for reusable UI and layout pieces
- `src/pages/` for page-level views
- `src/i18n/` for translation dictionaries and helpers
- `src/data/` for local navigation or mock data
- `src/types.ts` for shared types

## Non-Goals for This Prototype

Unless explicitly planned, avoid:

- wiring to live back-end services
- introducing real secrets or credentials
- over-optimizing for production deployment before the information architecture is stable
