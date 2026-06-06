import React from "react";

type Props = {
  name: string;
  email?: string;
  lastContact?: string;
  status?: "Active" | "Inactive" | string;
};

export function ClientCard({ name, email, lastContact, status = "Active" }: Props) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <div>
        <div className="font-medium text-gray-900">{name}</div>
        {email && <div className="text-sm text-gray-600">{email}</div>}
        {lastContact && <div className="text-xs text-gray-500">Last contact: {lastContact}</div>}
      </div>
      <div className="flex flex-col items-end">
        <span className={`px-2 py-1 rounded text-xs ${status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default ClientCard;
