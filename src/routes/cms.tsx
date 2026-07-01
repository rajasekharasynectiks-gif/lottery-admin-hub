import { createFileRoute } from "@tanstack/react-router";
import { Plus, Eye, Clock, History, CheckCircle2 } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { cmsPages } from "@/lib/glc-data";

export const Route = createFileRoute("/cms")({
  head: () => ({ meta: [{ title: "Content Management — GLC Admin" }] }),
  component: CMS,
});

function CMS() {
  return (
    <>
      <PageHeader
        title="Content Management"
        description="Publish and govern public-facing content, announcements and policies."
        actions={<>
          <Button variant="outline" size="sm"><Eye className="mr-1.5 h-3.5 w-3.5" /> Preview site</Button>
          <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New page</Button>
        </>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Published pages" value={cmsPages.filter((p) => p.status === "Published").length} tone="up" />
          <StatCard label="Drafts" value={cmsPages.filter((p) => p.status === "Draft").length} tone="warning" />
          <StatCard label="Scheduled" value={2} tone="info" />
          <StatCard label="Approvals pending" value={1} tone="warning" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Pages" className="lg:col-span-2" padding={false}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["Title", "URL", "Status", "Author", "Updated", ""].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {cmsPages.map((p) => (
                  <tr key={p.slug} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2 font-medium text-foreground">{p.title}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{p.slug}</td>
                    <td className="px-3 py-2"><StatusPill tone={p.status === "Published" ? "success" : "warning"}>{p.status}</StatusPill></td>
                    <td className="px-3 py-2">{p.author}</td>
                    <td className="px-3 py-2 text-muted-foreground tabular">{p.updated}</td>
                    <td className="px-3 py-2 text-right"><Button variant="ghost" size="sm">Edit</Button><Button variant="ghost" size="sm">History</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <div className="space-y-3">
            <Panel title="Announcements">
              <ul className="space-y-2 text-[12.5px]">
                <li className="rounded border border-border p-2">
                  <div className="flex items-center justify-between"><span className="font-medium">System maintenance — Jul 12</span><StatusPill tone="info">Scheduled</StatusPill></div>
                  <p className="mt-1 text-muted-foreground">Portal will be unavailable 02:00–04:00 ET for planned upgrades.</p>
                </li>
                <li className="rounded border border-border p-2">
                  <div className="flex items-center justify-between"><span className="font-medium">New retailer onboarding webinar</span><StatusPill tone="success">Live</StatusPill></div>
                  <p className="mt-1 text-muted-foreground">Homepage banner active until Jul 05.</p>
                </li>
              </ul>
            </Panel>

            <Panel title="Approval workflow">
              <ol className="space-y-2 text-[12.5px]">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Drafted by S. Iverson</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Reviewed by K. Fisher</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-warning" /> Awaiting Legal approval</li>
                <li className="flex items-center gap-2 text-muted-foreground"><History className="h-4 w-4" /> Publish</li>
              </ol>
            </Panel>
          </div>
        </div>
      </Section>
    </>
  );
}