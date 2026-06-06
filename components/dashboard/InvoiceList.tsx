import React from "react";

type Invoice = {
  id: string;
  amount: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | string;
};

const SAMPLE: Invoice[] = [
  { id: "#1001", amount: "$1,200.00", dueDate: "2026-05-15", status: "Paid" },
  { id: "#1002", amount: "$2,500.00", dueDate: "2026-06-01", status: "Pending" },
  { id: "#1003", amount: "$450.00", dueDate: "2026-04-10", status: "Overdue" },
];

export function InvoiceList() {
  return (
    <ul className="space-y-3">
      {SAMPLE.map((inv) => (
        <li key={inv.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <div>
            <div className="font-medium">{inv.id}</div>
            <div className="text-sm text-gray-600">Due: {inv.dueDate}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{inv.amount}</div>
            <div className={`text-xs ${inv.status === "Overdue" ? "text-red-600" : "text-gray-600"}`}>{inv.status}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default InvoiceList;
