import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";

export function AIInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">AI Insights</CardTitle>
        <CardDescription>Actionable suggestions for your business</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>• Suggest following up with 5 warm leads this week.</li>
          <li>• Consider offering a bundled proposal to increase average deal size.</li>
          <li>• Late invoices: send automated reminders after 3 days overdue.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default AIInsights;
