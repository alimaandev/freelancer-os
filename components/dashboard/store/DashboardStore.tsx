"use client";

import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

export type ClientStatus = "Active" | "Inactive";

export type Client = {
  id: string;
  name: string;
  email: string;
  status: ClientStatus;
  lastContactISO?: string;
  industry?: string;
  accountOwner?: string;
};

export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type Invoice = {
  id: string;
  clientId: string;
  amountCents: number;
  dueDateISO: string; // yyyy-mm-dd
  status: InvoiceStatus;
};

export type ProposalStatus = "Accepted" | "Pending" | "Rejected";

export type Proposal = {
  id: string;
  clientId: string;
  amountCents: number;
  status: ProposalStatus;
  createdISO: string;
};

export type DateRangeKey = "7d" | "30d" | "90d";

export type DashboardState = {
  dateRange: DateRangeKey;
  globalSearch: string;

  clientStatusFilter: ClientStatus | "All";
  invoiceStatusFilter: InvoiceStatus | "All";
  proposalStatusFilter: ProposalStatus | "All";
};

type Action =
  | { type: "SET_DATE_RANGE"; payload: DateRangeKey }
  | { type: "SET_GLOBAL_SEARCH"; payload: string }
  | { type: "SET_CLIENT_STATUS_FILTER"; payload: DashboardState["clientStatusFilter"] }
  | { type: "SET_INVOICE_STATUS_FILTER"; payload: DashboardState["invoiceStatusFilter"] }
  | { type: "SET_PROPOSAL_STATUS_FILTER"; payload: DashboardState["proposalStatusFilter"] }
  | { type: "MARK_INVOICE_PAID"; payload: { invoiceId: string } }
  | { type: "SEND_INVOICE_REMINDER"; payload: { invoiceId: string } }
  | { type: "SET_PROPOSAL_STATUS"; payload: { proposalId: string; status: ProposalStatus } };

export type DashboardStoreShape = {
  state: DashboardState;
  clients: Client[];
  invoices: Invoice[];
  proposals: Proposal[];
  markInvoicePaid: (invoiceId: string) => void;
  sendInvoiceReminder: (invoiceId: string) => void;
  setProposalStatus: (proposalId: string, status: ProposalStatus) => void;
  actions: {
    setDateRange: (range: DateRangeKey) => void;
    setGlobalSearch: (q: string) => void;
    setClientStatusFilter: (v: DashboardState["clientStatusFilter"]) => void;
    setInvoiceStatusFilter: (v: DashboardState["invoiceStatusFilter"]) => void;
    setProposalStatusFilter: (v: DashboardState["proposalStatusFilter"]) => void;
  };
};

const initialClients: Client[] = [
  {
    id: "c_1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "Active",
    lastContactISO: "2026-05-20",
    industry: "Recruiting",
    accountOwner: "You",
  },
  {
    id: "c_2",
    name: "Michael Chen",
    email: "michael@example.com",
    status: "Active",
    lastContactISO: "2026-05-27",
    industry: "E-commerce",
    accountOwner: "You",
  },
  {
    id: "c_3",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "Inactive",
    lastContactISO: "2026-04-15",
    industry: "SaaS",
    accountOwner: "You",
  },
];

const initialInvoices: Invoice[] = [
  { id: "#1001", clientId: "c_1", amountCents: 120000, dueDateISO: "2026-05-15", status: "Paid" },
  { id: "#1002", clientId: "c_2", amountCents: 250000, dueDateISO: "2026-06-01", status: "Pending" },
  { id: "#1003", clientId: "c_3", amountCents: 45000, dueDateISO: "2026-04-10", status: "Overdue" },
];

const initialProposals: Proposal[] = [
  { id: "P-2026-01", clientId: "c_2", amountCents: 800000, status: "Pending", createdISO: "2026-05-12" },
  { id: "P-2026-02", clientId: "c_1", amountCents: 350000, status: "Accepted", createdISO: "2026-05-03" },
  { id: "P-2026-03", clientId: "c_3", amountCents: 120000, status: "Pending", createdISO: "2026-04-26" },
];

const initialState: DashboardState = {
  dateRange: "30d",
  globalSearch: "",
  clientStatusFilter: "All",
  invoiceStatusFilter: "All",
  proposalStatusFilter: "All",
};

function reducer(
  state: DashboardState,
  action: Action
): DashboardState {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, dateRange: action.payload };
    case "SET_GLOBAL_SEARCH":
      return { ...state, globalSearch: action.payload };
    case "SET_CLIENT_STATUS_FILTER":
      return { ...state, clientStatusFilter: action.payload };
    case "SET_INVOICE_STATUS_FILTER":
      return { ...state, invoiceStatusFilter: action.payload };
    case "SET_PROPOSAL_STATUS_FILTER":
      return { ...state, proposalStatusFilter: action.payload };
    default:
      return state;
  }
}

const DashboardStoreContext = createContext<DashboardStoreShape | null>(null);

function formatISOToDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function makeSummaryText() {
  // Used only for stable UI copy; kept out of render for deterministic output.
  return "Realtime demo state updates (no backend required).";
}

export function DashboardStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [clients, setClients] = React.useState<Client[]>(initialClients);
  const [invoices, setInvoices] = React.useState<Invoice[]>(initialInvoices);
  const [proposals, setProposals] = React.useState<Proposal[]>(initialProposals);

  const markInvoicePaid = useCallback((invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: "Paid" } : inv))
    );
  }, []);

  const sendInvoiceReminder = useCallback((_invoiceId: string) => {
    // Demo-only: in a real system you would call an endpoint.
    // Here we do nothing but keep action available.
  }, []);

  const setProposalStatus = useCallback((proposalId: string, status: ProposalStatus) => {
    setProposals((prev) => prev.map((p) => (p.id === proposalId ? { ...p, status } : p)));
  }, []);

  const actions = useMemo(
    () => ({
      setDateRange: (range: DateRangeKey) => dispatch({ type: "SET_DATE_RANGE", payload: range }),
      setGlobalSearch: (q: string) => dispatch({ type: "SET_GLOBAL_SEARCH", payload: q }),
      setClientStatusFilter: (v: DashboardState["clientStatusFilter"]) =>
        dispatch({ type: "SET_CLIENT_STATUS_FILTER", payload: v }),
      setInvoiceStatusFilter: (v: DashboardState["invoiceStatusFilter"]) =>
        dispatch({ type: "SET_INVOICE_STATUS_FILTER", payload: v }),
      setProposalStatusFilter: (v: DashboardState["proposalStatusFilter"]) =>
        dispatch({ type: "SET_PROPOSAL_STATUS_FILTER", payload: v }),

      // data actions (demo)
      markInvoicePaid: (invoiceId: string) => markInvoicePaid(invoiceId),
      sendInvoiceReminder: (invoiceId: string) => sendInvoiceReminder(invoiceId),
      setProposalStatus: (proposalId: string, status: ProposalStatus) =>
        setProposalStatus(proposalId, status),
    }),
    [markInvoicePaid, sendInvoiceReminder, setProposalStatus]
  );


  const value: DashboardStoreShape = useMemo(
    () => ({
      state,
      clients,
      invoices,
      proposals,
      markInvoicePaid,
      sendInvoiceReminder,
      setProposalStatus,
      actions,
    }),
    [
      state,
      clients,
      invoices,
      proposals,
      markInvoicePaid,
      sendInvoiceReminder,
      setProposalStatus,
      actions,
    ]
  );

  return <DashboardStoreContext.Provider value={value}>{children}</DashboardStoreContext.Provider>;
}

export function useDashboardStore() {
  const ctx = useContext(DashboardStoreContext);
  if (!ctx) throw new Error("useDashboardStore must be used within DashboardStoreProvider");
  return ctx;
}

export function useDashboardDerived() {
  const store = useDashboardStore();

  const { state, clients, invoices, proposals } = store;

  const search = state.globalSearch.trim().toLowerCase();

  const clientById = useMemo(() => {
    const m = new Map<string, Client>();
    for (const c of clients) m.set(c.id, c);
    return m;
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const statusOk = state.clientStatusFilter === "All" ? true : c.status === state.clientStatusFilter;
      const searchOk =
        search.length === 0
          ? true
          : [c.name, c.email, c.industry, c.accountOwner]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(search));
      return statusOk && searchOk;
    });
  }, [clients, state.clientStatusFilter, search]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const statusOk = state.invoiceStatusFilter === "All" ? true : inv.status === state.invoiceStatusFilter;
      const c = clientById.get(inv.clientId);
      const searchOk =
        search.length === 0
          ? true
          : [inv.id, c?.name, c?.email]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(search));
      return statusOk && searchOk;
    });
  }, [invoices, state.invoiceStatusFilter, search, clientById]);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const statusOk = state.proposalStatusFilter === "All" ? true : p.status === state.proposalStatusFilter;
      const c = clientById.get(p.clientId);
      const searchOk =
        search.length === 0
          ? true
          : [p.id, c?.name, c?.email]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(search));
      return statusOk && searchOk;
    });
  }, [proposals, state.proposalStatusFilter, search, clientById]);

  const kpis = useMemo(() => {
    const totalClients = clients.length;
    const activeClients = clients.filter((c) => c.status === "Active").length;
    const pendingInvoices = invoices.filter((i) => i.status === "Pending").length;
    const overdueInvoices = invoices.filter((i) => i.status === "Overdue").length;

    const revenueCents = invoices
      .filter((i) => i.status === "Paid" || i.status === "Pending")
      .reduce((sum, i) => sum + i.amountCents, 0);

    const acceptedProposals = proposals.filter((p) => p.status === "Accepted").length;

    return {
      totalClients,
      activeClients,
      pendingInvoices,
      overdueInvoices,
      revenueCents,
      acceptedProposals,
      summaryText: makeSummaryText(),
      lastInvoiceDue: invoices
        .slice()
        .sort((a, b) => a.dueDateISO.localeCompare(b.dueDateISO))
        .at(-1)?.dueDateISO,
      formatISOToDate,
    };
  }, [clients, invoices, proposals]);

  return {
    clientById,
    filteredClients,
    filteredInvoices,
    filteredProposals,
    kpis,
  };
}

export function moneyFromCents(cents: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

