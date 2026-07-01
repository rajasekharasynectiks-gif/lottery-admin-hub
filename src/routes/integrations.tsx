import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { integrations } from "@/lib/glc-data";
import { Activity, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Integrations — GLC Admin" }] }),
  component: Integrations,
});

function Integrations() {
  return (
    <>
      <PageHeader
        title="Integrations"
        description="Third-party services powering the licensing platform."
        actions={<Button variant="outline" size="sm"><RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Health check all</Button>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Operational" value={integrations.filter((i) => i.status === "Operational").length} tone="up" />
          <StatCard label="Degraded" value={integrations.filter((i) => i.status === "Degraded").length} tone="warning" />
          <StatCard label="Avg latency" value={`${Math.round(integrations.reduce((s, i) => s + i.latency, 0) / integrations.length)} ms`} />
          <StatCard label="Composite uptime" value="99.86%" tone="up" hint="30-day" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((it) => (
            <Panel key={it.name} title={it.name} subtitle={it.desc}>
              <div className="mt-1 flex items-center justify-between text-[12px]">
                <StatusPill tone={it.status === "Operational" ? "success" : "warning"}>{it.status}</StatusPill>
                <span className="text-muted-foreground tabular">Uptime {it.uptime}%</span>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[12.5px]">
                <dt className="text-muted-foreground">Latency</dt><dd className="col-span-2 tabular">{it.latency} ms</dd>
                <dt className="text-muted-foreground">Retry queue</dt><dd className="col-span-2 tabular">{it.status === "Degraded" ? "18 pending" : "0"}</dd>
                <dt className="text-muted-foreground">Last event</dt><dd className="col-span-2">2m ago</dd>
              </dl>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="w-full"><Activity className="mr-1.5 h-3.5 w-3.5" /> Logs</Button>
                <Button variant="outline" size="sm" className="w-full">Configure</Button>
              </div>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}