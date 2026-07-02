import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supportTickets } from "@/lib/glc-data";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support Tickets - GLC Admin" }] }),
  component: Support,
});

const cols = [
  { title: "Open", tone: "info" as const },
  { title: "In Progress", tone: "warning" as const },
  { title: "Escalated", tone: "danger" as const },
  { title: "Resolved", tone: "success" as const },
];

function Support() {
  return (
    <>
      <PageHeader
        title="Support Center"
        description="Applicant support · SLAs · knowledge base."
        actions={<Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New ticket</Button>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Open" value={18} tone="warning" />
          <StatCard label="Escalated" value={4} tone="down" />
          <StatCard label="Avg first response" value="12 min" tone="up" />
          <StatCard label="SLA compliance" value="97.4%" tone="up" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {cols.map((c) => (
            <Panel key={c.title} title={c.title} subtitle={`${supportTickets.filter((t) => t.status === c.title).length} tickets`}>
              <ul className="space-y-2 text-[12.5px]">
                {supportTickets.filter((t) => t.status === c.title).map((t) => (
                  <li key={t.id} className="rounded border border-border p-2 hover:bg-muted/40">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-brand">{t.id}</span>
                      <StatusPill tone={t.priority === "Urgent" ? "danger" : t.priority === "High" ? "warning" : "neutral"}>{t.priority}</StatusPill>
                    </div>
                    <div className="mt-1 font-medium text-foreground truncate">{t.subject}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{t.requester} · {t.assignee} · {t.updated}</div>
                  </li>
                ))}
                {supportTickets.filter((t) => t.status === c.title).length === 0 && (
                  <li className="rounded border border-dashed border-border p-3 text-center text-[12px] text-muted-foreground">Empty</li>
                )}
              </ul>
            </Panel>
          ))}
        </div>

        <div className="mt-4">
          <Panel padding={false} title="All tickets">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search tickets…" className="h-9 pl-7" />
              </div>
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">SLA report</Button>
            </div>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["ID", "Subject", "Requester", "Priority", "Status", "Assignee", "Updated"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((t) => (
                  <tr key={t.id} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2 font-mono text-brand">{t.id}</td>
                    <td className="px-3 py-2">{t.subject}</td>
                    <td className="px-3 py-2">{t.requester}</td>
                    <td className="px-3 py-2"><StatusPill tone={t.priority === "Urgent" ? "danger" : t.priority === "High" ? "warning" : "neutral"}>{t.priority}</StatusPill></td>
                    <td className="px-3 py-2">{t.status}</td>
                    <td className="px-3 py-2">{t.assignee}</td>
                    <td className="px-3 py-2 text-muted-foreground tabular">{t.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
      </Section>
    </>
  );
}