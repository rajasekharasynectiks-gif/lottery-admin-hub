import { createFileRoute } from "@tanstack/react-router";
import {
  FileText, Clock, CreditCard, CheckCircle2, XCircle, RefreshCw, Users, ShieldAlert,
  LifeBuoy, DollarSign, Activity, Download, Plus, ChevronRight,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import {
  applicationsTrend, kpis, recentActivity, revenueTrend, statusMix, tasks, currency, num,
} from "@/lib/glc-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — GLC Admin" },
      { name: "description", content: "Real-time KPIs, application volume, revenue and operational health for GLC leadership." },
    ],
  }),
  component: Dashboard,
});

const chartColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        description="Real-time operational picture for the Retailer Licensing program."
        meta={<span>Fiscal period: <span className="text-foreground font-medium">FY26 · Q4</span> · Last refreshed 12s ago</span>}
        actions={
          <>
            <Button variant="outline" size="sm"><RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh</Button>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export</Button>
            <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New application</Button>
          </>
        }
      />

      <Section>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <StatCard label="Total applications" value={num(kpis.totalApplications)} delta="+4.2%" tone="up" hint="vs last 30 days" icon={<FileText className="h-4 w-4" />} />
          <StatCard label="Submitted today" value={num(kpis.submittedToday)} delta="+18" tone="up" hint="live counter" icon={<Clock className="h-4 w-4" />} />
          <StatCard label="Pending review" value={num(kpis.pendingReview)} delta="-6.1%" tone="down" hint="queue depth" icon={<Clock className="h-4 w-4" />} />
          <StatCard label="Payment pending" value={num(kpis.paymentPending)} delta="+2" tone="warning" hint="requires follow-up" icon={<CreditCard className="h-4 w-4" />} />
          <StatCard label="Revenue (MTD)" value={currency(kpis.paymentReceived)} delta="+9.4%" tone="up" hint="captured via MerchantOne" icon={<DollarSign className="h-4 w-4" />} />
          <StatCard label="System health" value={`${kpis.systemHealth}%`} delta="Nominal" tone="up" hint="30d SLA · 99.95%" icon={<Activity className="h-4 w-4" />} />
          <StatCard label="Approved" value={num(kpis.approved)} delta="+312" tone="up" icon={<CheckCircle2 className="h-4 w-4" />} />
          <StatCard label="Rejected" value={num(kpis.rejected)} delta="+11" tone="down" icon={<XCircle className="h-4 w-4" />} />
          <StatCard label="In progress" value={num(kpis.inProgress)} delta="-2.1%" tone="down" icon={<RefreshCw className="h-4 w-4" />} />
          <StatCard label="Active users" value={num(kpis.activeUsers)} delta="+8" tone="up" icon={<Users className="h-4 w-4" />} />
          <StatCard label="Compliance alerts" value={kpis.complianceAlerts} delta="Attention" tone="warning" icon={<ShieldAlert className="h-4 w-4" />} />
          <StatCard label="Support tickets" value={kpis.supportTickets} delta="-4" tone="up" icon={<LifeBuoy className="h-4 w-4" />} />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Application volume" subtitle="Submitted vs approved · last 7 days" className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={applicationsTrend}>
                  <defs>
                    <linearGradient id="gSubmitted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                  <XAxis dataKey="day" fontSize={11} stroke="var(--color-muted-foreground)" />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="submitted" stroke="var(--color-chart-1)" fill="url(#gSubmitted)" strokeWidth={2} />
                  <Area type="monotone" dataKey="approved" stroke="var(--color-chart-2)" fill="url(#gApproved)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Status mix" subtitle="Application pipeline">
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={statusMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {statusMix.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-1 space-y-1.5 text-[12px]">
              {statusMix.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-sm" style={{ background: chartColors[i % chartColors.length] }} />
                    {s.name}
                  </span>
                  <span className="tabular text-muted-foreground">{s.value}%</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Revenue trend" subtitle="Payment capture · rolling 6 months" className="lg:col-span-2">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                  <XAxis dataKey="m" fontSize={11} stroke="var(--color-muted-foreground)" />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => currency(v)} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="revenue" fill="var(--color-gold)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Upcoming tasks" subtitle="Owned by administration">
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li key={t.title} className="flex items-start gap-2">
                  <div className={`mt-1 h-2 w-2 rounded-full ${t.priority === "Urgent" ? "bg-destructive" : t.priority === "High" ? "bg-warning" : "bg-info"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] text-foreground">{t.title}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{t.owner} · due {t.due}</div>
                  </div>
                  <StatusPill tone={t.priority === "Urgent" ? "danger" : t.priority === "High" ? "warning" : "info"}>{t.priority}</StatusPill>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Recent activity" subtitle="System-wide feed" className="lg:col-span-2">
            <ol className="relative space-y-3 border-l border-border pl-4">
              {recentActivity.map((a, i) => (
                <li key={i} className="relative">
                  <span className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background ${
                    a.tone === "success" ? "bg-success" :
                    a.tone === "warning" ? "bg-warning" :
                    a.tone === "danger" ? "bg-destructive" : "bg-info"}`} />
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[12.5px] font-medium text-foreground">{a.who}</span>
                    <span className="text-[12.5px] text-muted-foreground">{a.what}</span>
                    <span className="text-[12.5px] font-mono text-foreground">{a.target}</span>
                    <span className="ml-auto text-[11px] text-muted-foreground tabular">{a.at}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Compliance heat" subtitle="Applications by county · today">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 40 }).map((_, i) => {
                const intensity = ((i * 37) % 100) / 100;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{ background: `color-mix(in oklab, var(--color-brand) ${Math.round(intensity * 90)}%, var(--color-muted))` }}
                    title={`Sample ${i}`}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Low volume</span>
              <span className="tabular">Peak · Fulton (48)</span>
              <span>High volume</span>
            </div>
            <a className="mt-3 inline-flex items-center gap-1 text-[12px] text-brand hover:underline" href="#">
              View county breakdown <ChevronRight className="h-3 w-3" />
            </a>
          </Panel>
        </div>
      </Section>
    </>
  );
}