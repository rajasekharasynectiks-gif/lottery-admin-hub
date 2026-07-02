import { createFileRoute } from "@tanstack/react-router";
import { Bell, Mail, MessageSquare, Smartphone, Plus } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { notificationTemplates } from "@/lib/glc-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications - GLC Admin" }] }),
  component: Notifications,
});

function channelIcon(c: string) {
  if (c === "Email") return <Mail className="h-3.5 w-3.5" />;
  if (c === "SMS") return <MessageSquare className="h-3.5 w-3.5" />;
  if (c === "In-App") return <Bell className="h-3.5 w-3.5" />;
  return <Smartphone className="h-3.5 w-3.5" />;
}

function Notifications() {
  return (
    <>
      <PageHeader
        title="Notification Center"
        description="Multi-channel templates, delivery status and analytics."
        actions={<Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New template</Button>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Sent (24h)" value="18,214" delta="+3.2%" tone="up" />
          <StatCard label="Delivery rate" value="99.4%" delta="+0.1%" tone="up" />
          <StatCard label="Bounces" value="112" delta="-8" tone="up" />
          <StatCard label="Templates active" value={notificationTemplates.filter((t) => t.status === "Active").length} tone="neutral" />
        </div>

        <div className="mt-4">
          <Panel title="Templates" padding={false}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["Name", "Channel", "Event", "Status", "Updated", ""].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {notificationTemplates.map((t) => (
                  <tr key={`${t.name}-${t.channel}`} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2 font-medium text-foreground">{t.name}</td>
                    <td className="px-3 py-2"><StatusPill tone="info">{channelIcon(t.channel)} {t.channel}</StatusPill></td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{t.event}</td>
                    <td className="px-3 py-2"><StatusPill tone={t.status === "Active" ? "success" : "warning"}>{t.status}</StatusPill></td>
                    <td className="px-3 py-2 text-muted-foreground tabular">{t.updated}</td>
                    <td className="px-3 py-2 text-right"><Button variant="ghost" size="sm">Edit</Button><Button variant="ghost" size="sm">Test</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <Panel title="Delivery status (24h)">
            <ul className="space-y-2 text-[13px]">
              {[["Delivered", 17_638, "success"], ["Queued", 342, "info"], ["Failed / bounce", 112, "danger"], ["Suppressed", 22, "warning"]].map(([label, n, tone]) => (
                <li key={label as string} className="flex items-center justify-between">
                  <span>{label as string}</span>
                  <span className="tabular"><StatusPill tone={tone as "success" | "info" | "danger" | "warning"}>{n as number}</StatusPill></span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Retry policy">
            <p className="text-[13px] text-muted-foreground">Exponential backoff: 30s → 2m → 10m → 1h → 6h · maximum 5 attempts. Failures escalate to Ops after 3 retries.</p>
          </Panel>
        </div>
      </Section>
    </>
  );
}