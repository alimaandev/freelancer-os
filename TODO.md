# Freelancer OS - Dashboard Rebuild TODO

- [x] Step 1: Replace `app/dashboard/page.tsx` with new production dashboard layout (KPI strip + tables + activity feed + AI/Copilot panel).

- [x] Step 2: Implement typed in-memory store (Context/Reducer) for clients, invoices, proposals; expose selectors + actions.

- [ ] Step 3: Replace old sample components:
  - [ ] `components/dashboard/AIInsights.tsx`
  - [ ] `components/dashboard/ClientCard.tsx`
  - [ ] `components/dashboard/InvoiceList.tsx`
  - [ ] `components/dashboard/ProposalList.tsx`
- [ ] Step 4: Add reusable UI helpers (StatusPill, TableToolbar, EmptyState, LoadingState, Modal/Drawer shells).
- [ ] Step 5: Update dashboard layout (if needed) for full “app-like” scrolling + spacing.
- [ ] Step 6: Run lint/build/dev to verify no TS/React errors.
- [ ] Step 7: Manually verify dashboard interactions (search/filter/sort; row actions update counts).

