import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/monitoring")({
  head: () => ({ meta: [{ title: "System Monitoring - GLC Admin" }] }),
  component: Monitoring,
});

function series(seed: number) {
  return Array.from({ length: 30 }).map((_, i) => ({ t: `${i}`, v: 40 + Math.round(Math.sin((i + seed) / 3) * 12 + ((i * seed) % 10)) }));
}

function Monitoring() {
  return (
    <>
      <PageHeader
        title="System Monitoring"
        description="Live health of the WBRLPS platform stack."
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="CPU" value="42%" delta="stable" tone="up" />
          <StatCard label="Memory" value="61%" delta="+2%" tone="warning" />
          <StatCard label="Database" value="Healthy" tone="up" hint="RDS · Multi-AZ" />
          <StatCard label="Storage" value="38%" hint="of 4 TB" />
          <StatCard label="API p95" value="184 ms" delta="-8ms" tone="up" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {[
            ["CPU utilization", 1],
            ["Memory utilization", 3],
            ["API response time (ms)", 5],
            ["Error rate (%)", 7],
          ].map(([title, seed]) => (
            <Panel key={title as string} title={title as string}>
              <div className="h-48">
                <ResponsiveContainer>
                  <AreaChart data={series(seed as number)}>
                    <defs>
                      <linearGradient id={`g${seed}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                    <XAxis dataKey="t" fontSize={10} stroke="var(--color-muted-foreground)" />
                    <YAxis fontSize={10} stroke="var(--color-muted-foreground)" />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                    <Area type="monotone" dataKey="v" stroke="var(--color-chart-1)" fill={`url(#g${seed})`} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-4">
          <Panel title="Active alerts" padding={false}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["Severity", "Service", "Message", "Since", "Owner"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60"><td className="px-3 py-2"><StatusPill tone="warning">Warn</StatusPill></td><td className="px-3 py-2">ActivePDF</td><td className="px-3 py-2">Render latency above 800ms threshold</td><td className="px-3 py-2 tabular">32m</td><td className="px-3 py-2">Ops</td></tr>
                <tr className="border-b border-border/60"><td className="px-3 py-2"><StatusPill tone="info">Info</StatusPill></td><td className="px-3 py-2">Auth service</td><td className="px-3 py-2">Elevated MFA challenge rate</td><td className="px-3 py-2 tabular">1h</td><td className="px-3 py-2">Security</td></tr>
                <tr><td className="px-3 py-2"><StatusPill tone="success">Info</StatusPill></td><td className="px-3 py-2">Backup</td><td className="px-3 py-2">Nightly snapshot completed · 3.2 GB</td><td className="px-3 py-2 tabular">6h</td><td className="px-3 py-2">Ops</td></tr>
              </tbody>
            </table>
          </Panel>
        </div>
      </Section>
    </>
  );
}