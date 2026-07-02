import { createFileRoute } from "@tanstack/react-router";
import { Plus, Check, X } from "lucide-react";
import { PageHeader, Panel, Section } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/glc-data";

export const Route = createFileRoute("/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions - GLC Admin" }] }),
  component: Roles,
});

const modules = ["Applications", "Applicants", "Payments", "Documents", "CMS", "Notifications", "Reports", "Audit", "Users", "System"];
const matrix: Record<string, Record<string, "R" | "W" | "A" | "-">> = {};
roles.forEach((r) => {
  matrix[r.role] = {};
  modules.forEach((m, i) => {
    if (r.role === "GLC Super Administrator") matrix[r.role][m] = "A";
    else if (r.role === "Read Only Auditor") matrix[r.role][m] = "R";
    else if (r.role === "Licensing Administrator") matrix[r.role][m] = ["Applications","Applicants","Documents"].includes(m) ? "W" : (["Payments","Reports"].includes(m) ? "R" : "-");
    else if (r.role === "Compliance Officer") matrix[r.role][m] = ["Applications","Audit","Reports"].includes(m) ? "W" : (m === "Applicants" ? "R" : "-");
    else if (r.role === "Customer Support") matrix[r.role][m] = ["Applicants"].includes(m) ? "W" : (["Applications","Documents"].includes(m) ? "R" : "-");
    else if (r.role === "Finance Team") matrix[r.role][m] = ["Payments","Reports"].includes(m) ? "W" : (m === "Audit" ? "R" : "-");
    else if (r.role === "Operations Manager") matrix[r.role][m] = ["System"].includes(m) ? "W" : "R";
    else if (r.role === "System Administrator") matrix[r.role][m] = ["Users","System"].includes(m) ? "A" : (m === "Audit" ? "R" : "-");
    else matrix[r.role][m] = i % 2 === 0 ? "R" : "-";
  });
});

function cell(v: "R" | "W" | "A" | "-") {
  if (v === "-") return <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />;
  const map = { R: ["bg-info/12 text-info", "R"], W: ["bg-warning/15 text-warning-foreground", "W"], A: ["bg-brand/12 text-brand", "A"] } as const;
  const [cls, label] = map[v];
  return <span className={`mx-auto inline-flex h-5 w-6 items-center justify-center rounded text-[10px] font-semibold tabular ${cls}`}>{label}</span>;
}

function Roles() {
  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        description="RBAC across every module. R = Read, W = Write, A = Admin."
        actions={<Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New role</Button>}
      />
      <Section>
        <div className="grid gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Panel title="Roles">
            <ul className="space-y-1 text-[13px]">
              {roles.map((r) => (
                <li key={r.role} className="rounded border border-border p-2">
                  <div className="font-medium">{r.role}</div>
                  <div className="text-[11px] text-muted-foreground">{r.users} users · {r.scope}</div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Permission matrix" padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                    <th className="sticky left-0 z-10 bg-surface-2/40 px-3 py-2 font-medium">Role</th>
                    {modules.map((m) => <th key={m} className="px-2 py-2 text-center font-medium">{m}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => (
                    <tr key={r.role} className="border-b border-border/60">
                      <td className="sticky left-0 z-10 bg-card px-3 py-2 font-medium whitespace-nowrap">{r.role}</td>
                      {modules.map((m) => <td key={m} className="px-2 py-1.5 text-center">{cell(matrix[r.role][m])}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border p-3 text-[11px] text-muted-foreground">
              Approval matrix: application approval requires <span className="text-foreground font-medium">Licensing Admin</span> + <span className="text-foreground font-medium">Compliance Officer</span> when risk = High.
            </div>
          </Panel>
        </div>
      </Section>
    </>
  );
}