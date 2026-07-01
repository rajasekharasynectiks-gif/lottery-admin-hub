import { createFileRoute } from "@tanstack/react-router";
import { Folder, FileText, Search, Upload, Grid3x3, Rows, ShieldCheck, ShieldAlert, Lock, Download } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { documents } from "@/lib/glc-data";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — GLC Admin" }] }),
  component: Documents,
});

const folders = [
  { name: "W-9 & Tax", count: 1_284 }, { name: "Identity", count: 3_812 }, { name: "Lease & Location", count: 2_104 },
  { name: "Licenses", count: 1_502 }, { name: "Insurance", count: 812 }, { name: "Banking", count: 964 },
  { name: "Correspondence", count: 6_240 }, { name: "Archived", count: 12_884 },
];

function Documents() {
  return (
    <>
      <PageHeader
        title="Document Management"
        description="Secure repository · encryption · virus scanning · retention."
        actions={<><Button variant="outline" size="sm"><Upload className="mr-1.5 h-3.5 w-3.5" /> Upload</Button></>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total documents" value="29,612" delta="+312 / 24h" tone="up" />
          <StatCard label="Encrypted (Voltage)" value="100%" tone="up" />
          <StatCard label="Quarantined" value="4" tone="warning" hint="pending review" />
          <StatCard label="Retention actions" value="18" tone="neutral" hint="due this month" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Panel title="Folders">
            <ul className="space-y-0.5 text-[13px]">
              {folders.map((f, i) => (
                <li key={f.name} className={`flex items-center gap-2 rounded px-2 py-1.5 ${i === 0 ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60"}`}>
                  <Folder className="h-4 w-4" />
                  <span className="flex-1 truncate">{f.name}</span>
                  <span className="tabular text-[11px]">{f.count}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel padding={false}>
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search documents, metadata, application #…" className="h-9 pl-7" />
              </div>
              <div className="ml-auto flex items-center rounded border border-border">
                <button className="grid h-8 w-8 place-items-center bg-muted"><Rows className="h-3.5 w-3.5" /></button>
                <button className="grid h-8 w-8 place-items-center"><Grid3x3 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                    {["Name", "Type", "Size", "Encryption", "Scan", "Retention", "Uploaded", ""].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {documents.map((d) => (
                    <tr key={d.name} className="border-b border-border/60 hover:bg-muted/40">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground truncate">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2">{d.type}</td>
                      <td className="px-3 py-2 tabular">{d.size}</td>
                      <td className="px-3 py-2">
                        <StatusPill tone="success"><Lock className="h-3 w-3" /> AES-256 · Voltage</StatusPill>
                      </td>
                      <td className="px-3 py-2">
                        {d.scanned === "Clean"
                          ? <StatusPill tone="success"><ShieldCheck className="h-3 w-3" /> Clean</StatusPill>
                          : <StatusPill tone="danger"><ShieldAlert className="h-3 w-3" /> {d.scanned}</StatusPill>}
                      </td>
                      <td className="px-3 py-2">{d.retention}</td>
                      <td className="px-3 py-2 tabular text-muted-foreground">{d.uploaded}</td>
                      <td className="px-3 py-2 text-right"><Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /></Button></td>
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