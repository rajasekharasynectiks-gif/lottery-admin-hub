import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, ShieldCheck, ShieldAlert, Lock } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applications } from "@/lib/glc-data";

export const Route = createFileRoute("/applicants")({
  head: () => ({ meta: [{ title: "Applicants - GLC Admin" }] }),
  component: Applicants,
});

function Applicants() {
  const unique = Array.from(new Map(applications.map((a) => [a.applicant, a])).values()).slice(0, 24);
  return (
    <>
      <PageHeader
        title="Applicants"
        description="Directory of retailer applicants, profiles and account security."
        actions={<><Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export</Button></>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total applicants" value="8,412" delta="+124" tone="up" />
          <StatCard label="MFA enrolled" value="94.2%" delta="+1.1%" tone="up" />
          <StatCard label="Locked accounts" value="12" delta="+2" tone="warning" />
          <StatCard label="Suspicious logins" value="3" delta="24h" tone="down" />
        </div>

        <div className="mt-4">
          <Panel padding={false}>
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search applicants by name, email, business…" className="h-9 pl-7" />
              </div>
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                    {["Applicant", "Business", "Applications", "MFA", "Account", "Last login", "Actions"].map((h) => (
                      <th key={h} className="px-3 py-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unique.map((a, i) => (
                    <tr key={a.applicant} className="border-b border-border/60 hover:bg-muted/40">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-navy text-navy-foreground text-[10px] font-semibold">
                            {a.applicant.split(" ").map((w) => w[0]).join("")}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{a.applicant}</div>
                            <div className="text-[11px] text-muted-foreground">{a.applicant.toLowerCase().replace(" ", ".")}@retailer.example</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">{a.business}</td>
                      <td className="px-3 py-2 tabular">{(i % 4) + 1}</td>
                      <td className="px-3 py-2">
                        {i % 7 === 0 ? <StatusPill tone="warning"><ShieldAlert className="h-3 w-3" /> Not enrolled</StatusPill>
                          : <StatusPill tone="success"><ShieldCheck className="h-3 w-3" /> Enrolled</StatusPill>}
                      </td>
                      <td className="px-3 py-2">
                        {i % 11 === 0 ? <StatusPill tone="danger"><Lock className="h-3 w-3" /> Locked</StatusPill> : <StatusPill tone="success">Active</StatusPill>}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground tabular">{i}h ago</td>
                      <td className="px-3 py-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Reset</Button>
                      </td>
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