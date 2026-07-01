import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, Search } from "lucide-react";
import { PageHeader, Panel, Section, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auditEvents } from "@/lib/glc-data";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit Logs — GLC Admin" }] }),
  component: Audit,
});

function Audit() {
  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Immutable, tamper-evident event log across the entire platform."
        actions={<>
          <Button variant="outline" size="sm"><Filter className="mr-1.5 h-3.5 w-3.5" /> Filter</Button>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV</Button>
        </>}
      />
      <Section>
        <Panel padding={false}>
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by user, resource, action, IP…" className="h-9 pl-7" />
            </div>
            <select className="h-9 rounded border border-border bg-background px-2 text-[13px]">
              <option>All actions</option><option>Login</option><option>Data Access</option><option>Update</option><option>Delete</option><option>Payment</option><option>Config Change</option>
            </select>
            <select className="h-9 rounded border border-border bg-background px-2 text-[13px]">
              <option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[10.5px] uppercase tracking-wide text-muted-foreground">
                  {["Timestamp", "Event", "Actor", "Action", "Resource", "IP", "Outcome"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody className="font-mono">
                {auditEvents.map((e) => (
                  <tr key={e.id} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2 tabular text-muted-foreground">{new Date(e.at).toLocaleString()}</td>
                    <td className="px-3 py-2 text-brand">{e.id}</td>
                    <td className="px-3 py-2">{e.actor}</td>
                    <td className="px-3 py-2">{e.action}</td>
                    <td className="px-3 py-2">{e.resource}</td>
                    <td className="px-3 py-2">{e.ip}</td>
                    <td className="px-3 py-2">
                      <StatusPill tone={e.outcome === "Success" ? "success" : "danger"}>{e.outcome}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </Section>
    </>
  );
}