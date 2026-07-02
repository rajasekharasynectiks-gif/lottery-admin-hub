import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, XCircle, MessageSquare, Paperclip, Upload, ShieldAlert,
  Building2, User, MapPin, FileText, CreditCard, ClipboardList, History, StickyNote,
  ShieldCheck, Send,
} from "lucide-react";
import { PageHeader, Panel, Section, StatusPill, toneForAppStatus, toneForPayment } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applications } from "@/lib/glc-data";

export const Route = createFileRoute("/applications/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Application ${params.id} - GLC Admin` }],
  }),
  component: ApplicationDetail,
});

function ApplicationDetail() {
  const { id } = useParams({ from: "/applications/$id" });
  const app = applications.find((a) => a.id === id) ?? applications[0];

  return (
    <>
      <PageHeader
        title={app.number}
        description={`${app.business} · ${app.applicant} · ${app.city}, ${app.county}`}
        meta={
          <span className="inline-flex flex-wrap items-center gap-2">
            <StatusPill tone={toneForAppStatus(app.status)}>{app.status}</StatusPill>
            <StatusPill tone={toneForPayment(app.payment)}>Payment: {app.payment}</StatusPill>
            <StatusPill tone={app.risk === "High" ? "danger" : app.risk === "Medium" ? "warning" : "success"}>Risk: {app.risk}</StatusPill>
            <StatusPill tone="neutral">Assignee: {app.assignee}</StatusPill>
          </span>
        }
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/applications"><ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back</Link>
            </Button>
            <Button variant="outline" size="sm"><MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Message applicant</Button>
            <Button variant="outline" size="sm" className="text-destructive"><XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject</Button>
            <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90"><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Approve</Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start overflow-x-auto rounded-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="owners">Owners</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="audit">Audit</TabsTrigger>
                <TabsTrigger value="comms">Communication</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-3 space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <Panel title="Business information" subtitle="Retailer profile">
                    <dl className="grid grid-cols-3 gap-y-2 text-[13px]">
                      <dt className="col-span-1 text-muted-foreground">Legal name</dt><dd className="col-span-2 font-medium">{app.business} LLC</dd>
                      <dt className="col-span-1 text-muted-foreground">DBA</dt><dd className="col-span-2">{app.business}</dd>
                      <dt className="col-span-1 text-muted-foreground">EIN</dt><dd className="col-span-2 font-mono">58-24{app.id.slice(-4)}</dd>
                      <dt className="col-span-1 text-muted-foreground">Address</dt><dd className="col-span-2">128 Peachtree St NE, {app.city}, GA</dd>
                      <dt className="col-span-1 text-muted-foreground">County</dt><dd className="col-span-2">{app.county}</dd>
                      <dt className="col-span-1 text-muted-foreground">Location type</dt><dd className="col-span-2">Convenience / Gas</dd>
                    </dl>
                  </Panel>
                  <Panel title="Applicant" subtitle="Primary contact">
                    <dl className="grid grid-cols-3 gap-y-2 text-[13px]">
                      <dt className="col-span-1 text-muted-foreground">Full name</dt><dd className="col-span-2 font-medium">{app.applicant}</dd>
                      <dt className="col-span-1 text-muted-foreground">Role</dt><dd className="col-span-2">Owner (65%)</dd>
                      <dt className="col-span-1 text-muted-foreground">Email</dt><dd className="col-span-2">{app.applicant.toLowerCase().replace(" ", ".")}@retailer.example</dd>
                      <dt className="col-span-1 text-muted-foreground">Phone</dt><dd className="col-span-2 tabular">+1 (404) 555-01{app.id.slice(-2)}</dd>
                      <dt className="col-span-1 text-muted-foreground">Verified</dt><dd className="col-span-2 inline-flex items-center gap-1 text-success"><ShieldCheck className="h-3.5 w-3.5" /> Melissa Data · matched</dd>
                      <dt className="col-span-1 text-muted-foreground">Background</dt><dd className="col-span-2">Clear (pending refresh)</dd>
                    </dl>
                  </Panel>
                </div>

                <Panel title="Risk & compliance" subtitle="Automated flags and manual review">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-md border border-warning/40 bg-warning/10 p-3">
                      <div className="flex items-center gap-2 text-warning-foreground font-medium text-[13px]">
                        <ShieldAlert className="h-4 w-4" /> Address partially matched
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">Melissa Data returned a suite mismatch. Recommend requesting utility bill.</p>
                    </div>
                    <div className="rounded-md border border-success/40 bg-success/10 p-3">
                      <div className="flex items-center gap-2 text-success font-medium text-[13px]">
                        <ShieldCheck className="h-4 w-4" /> Background clear
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">No adverse findings in criminal or GLC exclusion lists.</p>
                    </div>
                    <div className="rounded-md border border-info/40 bg-info/10 p-3">
                      <div className="flex items-center gap-2 text-info font-medium text-[13px]">
                        <ClipboardList className="h-4 w-4" /> Distance rule met
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">Nearest retailer: 0.84 mi (min 0.5 mi).</p>
                    </div>
                  </div>
                </Panel>
              </TabsContent>

              <TabsContent value="business" className="mt-3"><Panel title="Business information"><div className="text-[13px] text-muted-foreground">Detailed business profile, entity structure, tax IDs and location details.</div></Panel></TabsContent>
              <TabsContent value="owners" className="mt-3"><Panel title="Owners"><div className="text-[13px] text-muted-foreground">Ownership over 10%, officers, and identity verifications.</div></Panel></TabsContent>
              <TabsContent value="documents" className="mt-3"><Panel title="Documents"><div className="text-[13px] text-muted-foreground">Uploaded evidence, retention schedules, encryption and virus-scan status.</div></Panel></TabsContent>
              <TabsContent value="payments" className="mt-3"><Panel title="Payments"><div className="text-[13px] text-muted-foreground">MerchantOne transactions, refunds, chargebacks and reconciliation.</div></Panel></TabsContent>
              <TabsContent value="timeline" className="mt-3"><Panel title="Timeline"><div className="text-[13px] text-muted-foreground">Full lifecycle timeline of the application.</div></Panel></TabsContent>
              <TabsContent value="notes" className="mt-3"><Panel title="Notes"><div className="text-[13px] text-muted-foreground">Internal case notes visible only to GLC staff.</div></Panel></TabsContent>
              <TabsContent value="audit" className="mt-3"><Panel title="Audit"><div className="text-[13px] text-muted-foreground">Immutable audit trail for this application.</div></Panel></TabsContent>
              <TabsContent value="comms" className="mt-3"><Panel title="Communication"><div className="text-[13px] text-muted-foreground">Email / SMS / in-app messages with the applicant.</div></Panel></TabsContent>
              <TabsContent value="history" className="mt-3"><Panel title="History"><div className="text-[13px] text-muted-foreground">Prior submissions and renewals from this business.</div></Panel></TabsContent>
            </Tabs>
          </div>

          {/* Right rail */}
          <div className="space-y-3">
            <Panel title="Application timeline">
              <ol className="relative space-y-3 border-l border-border pl-4 text-[12.5px]">
                {[
                  ["Submitted", "Jun 12, 09:14", "success"],
                  ["Payment received", "Jun 12, 09:16", "success"],
                  ["Assigned to R. Cooper", "Jun 12, 10:02", "info"],
                  ["Documents requested", "Jun 13, 08:41", "warning"],
                  ["Compliance review", "Jun 15, 11:20", "info"],
                  ["Awaiting final approval", "Now", "brand"],
                ].map(([label, when, tone], i) => (
                  <li key={i} className="relative">
                    <span className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background bg-${tone === "brand" ? "brand" : tone === "success" ? "success" : tone === "warning" ? "warning" : "info"}`} />
                    <div className="text-foreground font-medium">{label}</div>
                    <div className="text-[11px] text-muted-foreground tabular">{when}</div>
                  </li>
                ))}
              </ol>
            </Panel>

            <Panel title="Quick actions">
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <Button variant="outline" size="sm" className="justify-start"><Upload className="mr-1.5 h-3.5 w-3.5" /> Upload doc</Button>
                <Button variant="outline" size="sm" className="justify-start"><Paperclip className="mr-1.5 h-3.5 w-3.5" /> Attach note</Button>
                <Button variant="outline" size="sm" className="justify-start"><Send className="mr-1.5 h-3.5 w-3.5" /> Send email</Button>
                <Button variant="outline" size="sm" className="justify-start"><History className="mr-1.5 h-3.5 w-3.5" /> View audit</Button>
              </div>
            </Panel>

            <Panel title="Compliance flags">
              <ul className="space-y-2 text-[12.5px]">
                <li className="flex items-start gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 text-warning" /> Address suite mismatch (Melissa Data)</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-success" /> Identity verified</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-success" /> No sanctions matches</li>
                <li className="flex items-start gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 text-warning" /> Owner missing W-9 signature date</li>
              </ul>
            </Panel>
          </div>
        </div>
      </Section>
    </>
  );
}