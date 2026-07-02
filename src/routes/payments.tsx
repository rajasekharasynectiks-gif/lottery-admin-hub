import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, RefreshCw, CreditCard, Landmark } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill, toneForPayment } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applications, currency } from "@/lib/glc-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments - GLC Admin" }] }),
  component: Payments,
});

const daily = Array.from({ length: 14 }).map((_, i) => ({
  d: `${i + 1}`, ach: 12000 + (i * 731) % 9000, card: 22000 + (i * 511) % 15000,
}));

function Payments() {
  const txns = applications.slice(0, 16);
  return (
    <>
      <PageHeader
        title="Payment Administration"
        description="Merchant One operations · reconciliation · refunds · chargebacks."
        actions={<>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export</Button>
          <Button variant="outline" size="sm"><RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Reconcile now</Button>
        </>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard label="Captured MTD" value={currency(1_248_320)} delta="+9.4%" tone="up" />
          <StatCard label="Pending" value="96" delta="+2" tone="warning" />
          <StatCard label="Failed" value="14" delta="-3" tone="up" />
          <StatCard label="Refunds" value="7" delta="-1" tone="up" />
          <StatCard label="Chargebacks" value="2" delta="0" tone="neutral" />
          <StatCard label="Reconciled" value="99.8%" delta="Batch #2681" tone="up" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Daily settlement" subtitle="ACH vs Card · last 14 days" className="lg:col-span-2">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={daily}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                  <XAxis dataKey="d" fontSize={11} stroke="var(--color-muted-foreground)" />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => currency(v)} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="ach" stackId="a" fill="var(--color-chart-2)" />
                  <Bar dataKey="card" stackId="a" fill="var(--color-chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Channel mix">
            <ul className="space-y-3 text-[13px]">
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><CreditCard className="h-4 w-4 text-info" /> Credit / Debit</span><span className="tabular">64%</span></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-success" /> ACH</span><span className="tabular">33%</span></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand" /> Merchant One direct</span><span className="tabular">3%</span></li>
            </ul>
            <div className="mt-4 rounded-md border border-border bg-surface-2/40 p-3 text-[12px]">
              <div className="font-medium">Next settlement</div>
              <div className="text-muted-foreground">Batch #2682 · ETA today 17:00 ET</div>
            </div>
          </Panel>
        </div>

        <div className="mt-4">
          <Panel padding={false} title="Transactions" subtitle="MerchantOne feed">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by ref, app #, amount, last-4…" className="h-9 pl-7" />
              </div>
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Reconcile</Button>
              <Button variant="outline" size="sm">Audit</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                    {["Reference", "Application", "Method", "Amount", "Status", "Captured", "Actions"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t, i) => (
                    <tr key={t.id} className="border-b border-border/60 hover:bg-muted/40">
                      <td className="px-3 py-2 font-mono">MO-{9814210 + i}</td>
                      <td className="px-3 py-2 font-mono text-brand">{t.number}</td>
                      <td className="px-3 py-2">{i % 3 === 0 ? "ACH" : `Visa ····${1000 + i}`}</td>
                      <td className="px-3 py-2 tabular">${t.amount}.00</td>
                      <td className="px-3 py-2"><StatusPill tone={toneForPayment(t.payment)}>{t.payment}</StatusPill></td>
                      <td className="px-3 py-2 tabular text-muted-foreground">{new Date(t.updated).toLocaleString()}</td>
                      <td className="px-3 py-2"><Button variant="ghost" size="sm">Receipt</Button><Button variant="ghost" size="sm">Refund</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </Section>
    </>
  );
}