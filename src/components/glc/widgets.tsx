import { type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title, description, actions, meta,
}: { title: string; description?: string; actions?: ReactNode; meta?: ReactNode }) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[20px] font-semibold leading-tight tracking-tight text-foreground">{title}</h1>
            {description && <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>}
            {meta && <div className="mt-2 text-[12px] text-muted-foreground">{meta}</div>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1600px] px-4 sm:px-6 py-5", className)}>{children}</div>
  );
}

export function StatCard({
  label, value, delta, tone = "neutral", hint, icon,
}: {
  label: string;
  value: string | number;
  delta?: string;
  tone?: "up" | "down" | "neutral" | "warning";
  hint?: string;
  icon?: ReactNode;
}) {
  const toneClass = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
    warning: "text-warning",
  }[tone];
  return (
    <div className="rounded-lg border border-border bg-card p-4 ring-ok">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
        {icon && <div className="text-muted-foreground/80">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-[24px] font-semibold tracking-tight tabular text-foreground">{value}</div>
        {delta && (
          <span className={cn("inline-flex items-center gap-0.5 text-[11px] font-medium tabular", toneClass)}>
            {tone === "up" && <ArrowUpRight className="h-3 w-3" />}
            {tone === "down" && <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function Panel({
  title, subtitle, actions, children, className, padding = true,
}: {
  title?: string; subtitle?: string; actions?: ReactNode; children: ReactNode; className?: string; padding?: boolean;
}) {
  return (
    <section className={cn("rounded-lg border border-border bg-card ring-ok", className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div className="min-w-0">
            {title && <div className="text-[13px] font-semibold text-foreground">{title}</div>}
            {subtitle && <div className="text-[11px] text-muted-foreground">{subtitle}</div>}
          </div>
          <div className="flex items-center gap-1.5">
            {actions}
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="More">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>
      )}
      <div className={padding ? "p-4" : ""}>{children}</div>
    </section>
  );
}

type PillTone = "success" | "warning" | "danger" | "info" | "neutral" | "brand" | "gold";
const pillMap: Record<PillTone, string> = {
  success: "bg-success/12 text-success ring-success/25",
  warning: "bg-warning/15 text-warning-foreground ring-warning/40",
  danger: "bg-destructive/12 text-destructive ring-destructive/25",
  info: "bg-info/12 text-info ring-info/25",
  neutral: "bg-muted text-muted-foreground ring-border",
  brand: "bg-brand/12 text-brand ring-brand/25",
  gold: "bg-gold/25 text-gold-foreground ring-gold/50",
};

export function StatusPill({ tone = "neutral", children, className }: { tone?: PillTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        pillMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function toneForAppStatus(s: string): PillTone {
  switch (s) {
    case "Approved": return "success";
    case "Rejected": return "danger";
    case "In Review": return "info";
    case "Pending Payment": return "warning";
    case "On Hold": return "warning";
    case "Submitted": return "brand";
    default: return "neutral";
  }
}
export function toneForPayment(s: string): PillTone {
  switch (s) {
    case "Paid": return "success";
    case "Pending": return "warning";
    case "Failed": return "danger";
    case "Refunded": return "info";
    case "Chargeback": return "danger";
    default: return "neutral";
  }
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="grid place-items-center rounded-md border border-dashed border-border p-10 text-center">
      <div className="text-[13px] font-medium text-foreground">{title}</div>
      {hint && <div className="mt-1 text-[12px] text-muted-foreground">{hint}</div>}
    </div>
  );
}