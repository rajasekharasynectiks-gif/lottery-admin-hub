import { createFileRoute } from "@tanstack/react-router";
import { Plus, KeyRound, Lock, Unlock, MoreHorizontal, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { glcUsers } from "@/lib/glc-data";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "User Management — GLC Admin" }] }),
  component: UserMgmt,
});

function UserMgmt() {
  return (
    <>
      <PageHeader
        title="User Management"
        description="Administer GLC staff accounts, MFA, sessions and devices."
        actions={<Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> Create user</Button>}
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total staff users" value={glcUsers.length} />
          <StatCard label="MFA enrolled" value={`${glcUsers.filter((u) => u.mfa).length} / ${glcUsers.length}`} tone="up" />
          <StatCard label="Locked" value={glcUsers.filter((u) => u.status === "Locked").length} tone="warning" />
          <StatCard label="Active sessions" value={12} />
        </div>

        <div className="mt-4">
          <Panel padding={false}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["User", "Role", "MFA", "Status", "Last login", "Actions"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {glcUsers.map((u) => (
                  <tr key={u.email} className="border-b border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-navy text-navy-foreground text-[10px] font-semibold">{u.name.split(" ").map((w) => w[0]).join("")}</div>
                        <div>
                          <div className="font-medium text-foreground">{u.name}</div>
                          <div className="text-[11px] text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">{u.role}</td>
                    <td className="px-3 py-2">{u.mfa
                      ? <StatusPill tone="success"><ShieldCheck className="h-3 w-3" /> Enrolled</StatusPill>
                      : <StatusPill tone="warning"><ShieldAlert className="h-3 w-3" /> Missing</StatusPill>}</td>
                    <td className="px-3 py-2">{u.status === "Active"
                      ? <StatusPill tone="success">Active</StatusPill>
                      : <StatusPill tone="danger"><Lock className="h-3 w-3" /> Locked</StatusPill>}</td>
                    <td className="px-3 py-2 text-muted-foreground tabular">{u.lastLogin}</td>
                    <td className="px-3 py-2">
                      <Button variant="ghost" size="sm"><KeyRound className="mr-1 h-3 w-3" /> Reset</Button>
                      <Button variant="ghost" size="sm">{u.status === "Locked" ? <><Unlock className="mr-1 h-3 w-3" /> Unlock</> : "Disable"}</Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                    </td>
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