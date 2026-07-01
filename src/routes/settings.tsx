import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Section } from "@/components/glc/widgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — GLC Admin" }] }),
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Personal preferences and workspace configuration." />
      <Section>
        <Tabs defaultValue="profile" className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <TabsList className="flex h-auto flex-col gap-1 rounded-md p-2">
            {["profile", "notifications", "security", "workspace", "api"].map((v) => (
              <TabsTrigger key={v} value={v} className="w-full justify-start capitalize">{v}</TabsTrigger>
            ))}
          </TabsList>

          <div className="space-y-3">
            <TabsContent value="profile">
              <Panel title="Profile">
                <div className="grid gap-3 md:grid-cols-2">
                  <div><Label>Full name</Label><Input defaultValue="Owen Baker" /></div>
                  <div><Label>Title</Label><Input defaultValue="GLC Super Administrator" /></div>
                  <div><Label>Email</Label><Input defaultValue="o.baker@galottery.gov" /></div>
                  <div><Label>Phone</Label><Input defaultValue="+1 (404) 555-0123" /></div>
                </div>
                <div className="mt-3 flex justify-end"><Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">Save changes</Button></div>
              </Panel>
            </TabsContent>
            <TabsContent value="notifications">
              <Panel title="Notifications">
                <ul className="divide-y divide-border">
                  {["Case assigned", "High-risk flag raised", "Payment failed", "Weekly executive digest"].map((n) => (
                    <li key={n} className="flex items-center justify-between py-2.5 text-[13px]">
                      <span>{n}</span>
                      <Switch defaultChecked />
                    </li>
                  ))}
                </ul>
              </Panel>
            </TabsContent>
            <TabsContent value="security"><Panel title="Security"><p className="text-[13px] text-muted-foreground">MFA is enforced for all staff. WebAuthn recommended.</p></Panel></TabsContent>
            <TabsContent value="workspace"><Panel title="Workspace"><p className="text-[13px] text-muted-foreground">Fiscal calendar, timezone (America/New_York), and default filters.</p></Panel></TabsContent>
            <TabsContent value="api"><Panel title="API access"><p className="text-[13px] text-muted-foreground">Personal access tokens are disabled by policy. Use SSO-federated service accounts instead.</p></Panel></TabsContent>
          </div>
        </Tabs>
      </Section>
    </>
  );
}