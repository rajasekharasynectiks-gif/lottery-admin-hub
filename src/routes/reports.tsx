import { createFileRoute } from "@tanstack/react-router";
import { Download, Calendar, Plus } from "lucide-react";
import { PageHeader, Panel, Section } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Bar, BarChart } from "recharts";
import { applicationsTrend, revenueTrend, currency } from "@/lib/glc-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports & BI - GLC Admin" }] }),
  component: Reports,
});

const reports = [
  "Application Volume", "Approval Rates", "Payment Revenue", "Application Status",
  "Processing Time", "Document Statistics", "User Activity", "System Usage",
  "Compliance Reports", "Operational Metrics",
];

const processing = Array.from({ length: 12 }).map((_, i) => ({
  wk: `W${i + 1}`, avgHrs: 24 + ((i * 11) % 18), p95: 68 + ((i * 7) % 24),
}));

function Reports() {
  return (
    <>
      <PageHeader
        title="Reporting Dashboard"
        description="Enterprise business intelligence for licensing operations."
        actions={<>
          <Button variant="outline" size="sm"><Calendar className="mr-1.5 h-3.5 w-3.5" /> Schedule</Button>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export</Button>
          <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> Build report</Button>
        </>}
      />
      <Section>
        <div className="grid gap-3 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Panel title="Report library">
            <ul className="space-y-0.5 text-[13px]">
              {reports.map((r, i) => (
                <li key={r} className={`rounded px-2 py-1.5 ${i === 0 ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/60"}`}>{r}</li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Panel title="Application volume · FY26">
                <div className="h-56">
                  <ResponsiveContainer>
                    <AreaChart data={applicationsTrend}>
                      <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                      <XAxis dataKey="day" fontSize={11} stroke="var(--color-muted-foreground)" />
                      <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                      <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                      <Area type="monotone" dataKey="submitted" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.15} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Revenue by month">
                <div className="h-56">
                  <ResponsiveContainer>
                    <BarChart data={revenueTrend}>
                      <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                      <XAxis dataKey="m" fontSize={11} stroke="var(--color-muted-foreground)" />
                      <YAxis fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip formatter={(v: number) => currency(v)} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                      <Bar dataKey="revenue" fill="var(--color-gold)" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <Panel title="Processing time · avg vs p95 (hours)">
              <div className="h-56">
                <ResponsiveContainer>
                  <LineChart data={processing}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                    <XAxis dataKey="wk" fontSize={11} stroke="var(--color-muted-foreground)" />
                    <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                    <Line type="monotone" dataKey="avgHrs" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="p95" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>
        </div>
      </Section>
    </>
  );
}