import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Section, StatusPill } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/system")({
  head: () => ({ meta: [{ title: "System Administration — GLC Admin" }] }),
  component: SysAdmin,
});

const groups = [
  { title: "Business rules", items: [
    ["Auto-assign new applications by county", true],
    ["Require compliance review for high-risk applicants", true],
    ["Auto-approve renewals with clear background", false],
  ] as const },
  { title: "Workflow rules", items: [
    ["Escalate tickets after 4h without response", true],
    ["Route Urgent priority to on-call queue", true],
  ] as const },
  { title: "Document rules", items: [
    ["Reject uploads over 20 MB", true],
    ["Quarantine unsigned PDFs", true],
  ] as const },
  { title: "Payment configuration", items: [
    ["Enable ACH via MerchantOne", true],
    ["Allow partial refunds", false],
  ] as const },
  { title: "Feature flags", items: [
    ["New applicant portal (v4)", true],
    ["AI risk scoring (beta)", false],
  ] as const },
];

function SysAdmin() {
  return (
    <>
      <PageHeader
        title="System Administration"
        description="Business rules, workflows, policies and feature flags."
      />
      <Section>
        <div className="grid gap-3 md:grid-cols-2">
          {groups.map((g) => (
            <Panel key={g.title} title={g.title}>
              <ul className="divide-y divide-border">
                {g.items.map(([label, on]) => (
                  <li key={label as string} className="flex items-center justify-between py-2.5">
                    <span className="text-[13px]">{label as string}</span>
                    <Switch defaultChecked={on as boolean} />
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
          <Panel title="Password policy">
            <dl className="grid grid-cols-2 gap-y-2 text-[13px]">
              <dt className="text-muted-foreground">Minimum length</dt><dd className="tabular">12 characters</dd>
              <dt className="text-muted-foreground">Complexity</dt><dd>Upper + lower + number + symbol</dd>
              <dt className="text-muted-foreground">Rotation</dt><dd>90 days</dd>
              <dt className="text-muted-foreground">Reuse</dt><dd>Last 12 disallowed</dd>
              <dt className="text-muted-foreground">HIBP check</dt><dd><StatusPill tone="success">Enabled</StatusPill></dd>
              <dt className="text-muted-foreground">MFA</dt><dd><StatusPill tone="success">Required for all staff</StatusPill></dd>
            </dl>
          </Panel>
          <Panel title="Retention & backup">
            <dl className="grid grid-cols-2 gap-y-2 text-[13px]">
              <dt className="text-muted-foreground">Documents</dt><dd>7 years</dd>
              <dt className="text-muted-foreground">Audit logs</dt><dd>10 years (WORM)</dd>
              <dt className="text-muted-foreground">PII purge</dt><dd>Automated on retention exit</dd>
              <dt className="text-muted-foreground">Backup cadence</dt><dd>Every 6h, cross-region</dd>
              <dt className="text-muted-foreground">Last restore drill</dt><dd className="tabular">Jun 08, 2026</dd>
              <dt className="text-muted-foreground">RPO / RTO</dt><dd>15 min / 1 hr</dd>
            </dl>
            <Button variant="outline" size="sm" className="mt-3">Run test restore</Button>
          </Panel>
        </div>
      </Section>
    </>
  );
}