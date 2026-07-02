import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Filter, Plus, Search, SlidersHorizontal, Star, MoreHorizontal, ChevronDown } from "lucide-react";
import { PageHeader, Panel, Section, StatCard, StatusPill, toneForAppStatus, toneForPayment } from "@/components/glc/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { applications, num } from "@/lib/glc-data";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications - GLC Admin" },
      { name: "description", content: "Retailer license case management. Search, filter, assign and process applications." },
    ],
  }),
  component: Applications,
});

const savedSearches = ["My open cases", "Pending payment > 7d", "Flagged for compliance", "Urgent priority", "High-risk applicants"];

function Applications() {
  return (
    <>
      <PageHeader
        title="Applications"
        description="Case management for retailer licensing. 12,847 total · 421 in review."
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV</Button>
            <Button variant="outline" size="sm"><SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" /> Columns</Button>
            <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-1.5 h-3.5 w-3.5" /> New application</Button>
          </>
        }
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="All applications" value={num(12847)} delta="+4.2%" tone="up" />
          <StatCard label="In review" value={421} delta="-6.1%" tone="down" />
          <StatCard label="Pending payment" value={96} delta="+2" tone="warning" />
          <StatCard label="Approved today" value={38} delta="+11" tone="up" />
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Filter panel */}
          <Panel title="Filters" subtitle="Refine results">
            <div className="space-y-4 text-[12.5px]">
              <div>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Saved searches</div>
                <ul className="space-y-1">
                  {savedSearches.map((s) => (
                    <li key={s} className="flex items-center gap-2 rounded px-1.5 py-1 hover:bg-muted">
                      <Star className="h-3.5 w-3.5 text-gold" />
                      <span className="truncate">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Status</div>
                <div className="space-y-1.5">
                  {["Draft", "Submitted", "In Review", "Pending Payment", "Approved", "Rejected", "On Hold"].map((s) => (
                    <label key={s} className="flex items-center gap-2">
                      <Checkbox defaultChecked={["In Review", "Pending Payment"].includes(s)} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Priority</div>
                <div className="space-y-1.5">
                  {["Urgent", "High", "Normal", "Low"].map((s) => (
                    <label key={s} className="flex items-center gap-2">
                      <Checkbox defaultChecked={s === "Urgent" || s === "High"} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Date range</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <Input placeholder="From" className="h-8 text-[12px]" />
                  <Input placeholder="To" className="h-8 text-[12px]" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Reset filters</Button>
            </div>
          </Panel>

          <Panel padding={false}>
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by application #, business, applicant, EIN…" className="h-9 pl-7 text-[13px]" />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-1.5 h-3.5 w-3.5" /> Advanced</Button>
              <div className="ml-auto flex items-center gap-1 text-[12px] text-muted-foreground">
                <span className="tabular">1-20 of 12,847</span>
                <Button variant="ghost" size="sm">Prev</Button>
                <Button variant="ghost" size="sm">Next</Button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-border bg-surface-2/50 px-3 py-1.5 text-[12px]">
              <Checkbox />
              <span className="text-muted-foreground">Bulk actions:</span>
              <Button variant="ghost" size="sm">Assign</Button>
              <Button variant="ghost" size="sm">Approve</Button>
              <Button variant="ghost" size="sm">Reject</Button>
              <Button variant="ghost" size="sm">Export</Button>
              <Button variant="ghost" size="sm">Archive</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                    <th className="w-8 px-3 py-2"><Checkbox /></th>
                    {["Application #", "Business", "Applicant", "Status", "Payment", "Amount", "Submitted", "Assignee", "Priority", ""].map((h) => (
                      <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">{h}{h && h !== "" && <ChevronDown className="h-3 w-3 opacity-50" />}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 20).map((a) => (
                    <tr key={a.id} className="border-b border-border/60 hover:bg-muted/40">
                      <td className="px-3 py-2"><Checkbox /></td>
                      <td className="px-3 py-2 font-mono">
                        <Link to="/applications/$id" params={{ id: a.id }} className="text-brand hover:underline">{a.number}</Link>
                      </td>
                      <td className="px-3 py-2">
                        <div className="font-medium text-foreground">{a.business}</div>
                        <div className="text-[11px] text-muted-foreground">{a.city}, {a.county}</div>
                      </td>
                      <td className="px-3 py-2">{a.applicant}</td>
                      <td className="px-3 py-2"><StatusPill tone={toneForAppStatus(a.status)}>{a.status}</StatusPill></td>
                      <td className="px-3 py-2"><StatusPill tone={toneForPayment(a.payment)}>{a.payment}</StatusPill></td>
                      <td className="px-3 py-2 tabular">${a.amount}</td>
                      <td className="px-3 py-2 tabular whitespace-nowrap">{new Date(a.submitted).toLocaleDateString()}</td>
                      <td className="px-3 py-2">{a.assignee}</td>
                      <td className="px-3 py-2">
                        <StatusPill tone={a.priority === "Urgent" ? "danger" : a.priority === "High" ? "warning" : "neutral"}>{a.priority}</StatusPill>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
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