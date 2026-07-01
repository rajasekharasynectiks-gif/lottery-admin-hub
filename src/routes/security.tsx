import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Section, StatCard, StatusPill } from "@/components/glc/widgets";
import { ShieldAlert, ShieldCheck, Lock, KeyRound, AlertTriangle } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/security")({
  head: () => ({ meta: [{ title: "Security — GLC Admin" }] }),
  component: Security,
});

const attempts = Array.from({ length: 24 }).map((_, i) => ({ h: `${i}:00`, failed: 3 + ((i * 17) % 22), success: 40 + ((i * 11) % 60) }));

function Security() {
  return (
    <>
      <PageHeader
        title="Security Dashboard"
        description="MFA · anomalous access · certificates · vulnerabilities."
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard label="MFA coverage" value="100%" tone="up" icon={<ShieldCheck className="h-4 w-4" />} />
          <StatCard label="Failed logins (24h)" value="184" delta="-6%" tone="up" icon={<Lock className="h-4 w-4" />} />
          <StatCard label="Locked accounts" value="12" tone="warning" icon={<KeyRound className="h-4 w-4" />} />
          <StatCard label="Suspicious activities" value="3" tone="warning" icon={<AlertTriangle className="h-4 w-4" />} />
          <StatCard label="Encryption" value="AES-256" tone="up" hint="Voltage FPE at rest" icon={<ShieldCheck className="h-4 w-4" />} />
          <StatCard label="Vulnerabilities" value="0 Critical" tone="up" hint="Last scan · 6h ago" icon={<ShieldCheck className="h-4 w-4" />} />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title="Authentication attempts · 24h" subtitle="Success vs failed" className="lg:col-span-2">
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={attempts}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
                  <XAxis dataKey="h" fontSize={11} stroke="var(--color-muted-foreground)" />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                  <Line type="monotone" dataKey="success" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="failed" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Certificates">
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center justify-between"><span>admin.glc.ga.gov</span><StatusPill tone="success">Valid · 214d</StatusPill></li>
              <li className="flex items-center justify-between"><span>api.glc.ga.gov</span><StatusPill tone="success">Valid · 189d</StatusPill></li>
              <li className="flex items-center justify-between"><span>activepdf.glc.internal</span><StatusPill tone="warning">Expires · 14d</StatusPill></li>
              <li className="flex items-center justify-between"><span>voltage.svc.internal</span><StatusPill tone="success">Valid · 322d</StatusPill></li>
            </ul>
          </Panel>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Panel title="Recent security events">
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-start gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 text-warning" /> Impossible-travel detected for <span className="font-mono">g.han</span> · Atlanta → Frankfurt in 22m</li>
              <li className="flex items-start gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 text-warning" /> 5 failed logins for <span className="font-mono">m.delgado</span> · rate-limited</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-success" /> MFA challenge succeeded for <span className="font-mono">o.baker</span> (WebAuthn)</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-success" /> Nightly vulnerability scan · 0 findings</li>
            </ul>
          </Panel>
          <Panel title="Risk dashboard">
            <dl className="grid grid-cols-2 gap-y-2 text-[13px]">
              <dt className="text-muted-foreground">Compliance posture</dt><dd><StatusPill tone="success">SOC 2 · Aligned</StatusPill></dd>
              <dt className="text-muted-foreground">Data classification</dt><dd>PII · PCI · Regulated</dd>
              <dt className="text-muted-foreground">Encryption at rest</dt><dd>AES-256 · Voltage FPE</dd>
              <dt className="text-muted-foreground">TLS</dt><dd>1.3 · HSTS enforced</dd>
              <dt className="text-muted-foreground">DDoS</dt><dd>Edge WAF · 0 events</dd>
              <dt className="text-muted-foreground">Pen-test</dt><dd className="tabular">Apr 22, 2026 · No highs</dd>
            </dl>
          </Panel>
        </div>
      </Section>
    </>
  );
}