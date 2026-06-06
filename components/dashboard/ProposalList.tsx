import React from "react";

type Proposal = {
  id: string;
  client: string;
  amount: string;
  status: "Accepted" | "Pending" | "Rejected" | string;
};

const SAMPLE: Proposal[] = [
  { id: "P-2026-01", client: "Acme Co.", amount: "$8,000", status: "Pending" },
  { id: "P-2026-02", client: "Beta LLC", amount: "$3,500", status: "Accepted" },
  { id: "P-2026-03", client: "Gamma Inc.", amount: "$1,200", status: "Pending" },
];

export function ProposalList() {
  return (
    <ul className="space-y-3">
      {SAMPLE.map((p) => (
        <li key={p.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <div>
            <div className="font-medium">{p.client}</div>
            <div className="text-sm text-gray-600">{p.id}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{p.amount}</div>
            <div className={`text-xs ${p.status === "Accepted" ? "text-green-600" : "text-gray-600"}`}>{p.status}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProposalList;
