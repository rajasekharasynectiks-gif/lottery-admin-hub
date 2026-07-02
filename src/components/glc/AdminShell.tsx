import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, FileText, Users, CreditCard, FolderLock, Newspaper,
  Bell, BarChart3, ShieldCheck, UserCog, KeyRound, Server, Plug, LifeBuoy,
  Settings, Search, ChevronRight, Menu, X, HelpCircle, Command, Sun, Moon,
  ShieldAlert, Activity, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Item = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; group: string };

const nav: Item[] = [
  { group: "Overview", to: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
  { group: "Overview", to: "/monitoring", label: "System Monitoring", icon: Activity },
  { group: "Casework", to: "/applications", label: "Applications", icon: FileText, badge: "421" },
  { group: "Casework", to: "/applicants", label: "Applicants", icon: Users },
  { group: "Casework", to: "/documents", label: "Documents", icon: FolderLock },
  { group: "Casework", to: "/support", label: "Support Tickets", icon: LifeBuoy, badge: "43" },
  { group: "Finance", to: "/payments", label: "Payments", icon: CreditCard },
  { group: "Finance", to: "/reports", label: "Reports & BI", icon: BarChart3 },
  { group: "Content", to: "/cms", label: "Content Management", icon: Newspaper },
  { group: "Content", to: "/notifications", label: "Notifications", icon: Bell },
  { group: "Governance", to: "/audit", label: "Audit Logs", icon: ShieldCheck },
  { group: "Governance", to: "/security", label: "Security", icon: ShieldAlert, badge: "7" },
  { group: "Administration", to: "/users", label: "User Management", icon: UserCog },
  { group: "Administration", to: "/roles", label: "Roles & Permissions", icon: KeyRound },
  { group: "Administration", to: "/integrations", label: "Integrations", icon: Plug },
  { group: "Administration", to: "/system", label: "System Administration", icon: Server },
  { group: "Administration", to: "/settings", label: "Settings", icon: Settings },
];

function crumbsFor(pathname: string): { label: string; to?: string }[] {
  if (pathname === "/" || pathname === "/dashboard") return [{ label: "Home", to: "/" }, { label: "Executive Dashboard" }];
  const match = nav.find((n) => pathname.startsWith(n.to));
  const parts: { label: string; to?: string }[] = [{ label: "Home", to: "/" }];
  if (match) parts.push({ label: match.label, to: match.to });
  const rest = pathname.replace(match?.to ?? "", "").split("/").filter(Boolean);
  rest.forEach((r) => parts.push({ label: r.toUpperCase() }));
  return parts;
}

export function AdminShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const crumbs = crumbsFor(pathname);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("glc-admin-sidebar-collapsed");
    const savedTheme = localStorage.getItem("glc-theme") || localStorage.getItem("glc-admin-theme");
    const nextDark = savedTheme === "dark";

    if (!savedTheme) {
      localStorage.setItem("glc-theme", "light");
    }

    setDark(nextDark);
    setCollapsed(savedCollapsed === "true");
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("glc-theme", next ? "dark" : "light");
  }

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem("glc-admin-sidebar-collapsed", String(next));
      return next;
    });
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
          "flex flex-col transition-[width,transform] duration-200 lg:static lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4 lg:px-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground font-bold">G</div>
          <div className={["min-w-0", collapsed ? "lg:hidden" : ""].join(" ")}>
            <div className="text-[13px] font-semibold leading-tight">Georgia Lottery</div>
            <div className="text-[11px] leading-tight text-sidebar-foreground/70">WBRLPS - Admin Portal</div>
          </div>
          <button
            className="ml-auto hidden rounded p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:grid"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            title={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
          <button
            className="ml-auto lg:hidden text-sidebar-foreground/70"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="px-2 py-3">
            {Object.entries(
              nav.reduce<Record<string, Item[]>>((acc, i) => {
                (acc[i.group] ||= []).push(i);
                return acc;
              }, {}),
            ).map(([group, items]) => (
              <div key={group} className="mb-4">
                <div className={["px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/50", collapsed ? "lg:hidden" : ""].join(" ")}>
                  {group}
                </div>
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          title={collapsed ? item.label : undefined}
                          className={[
                            "group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] font-medium",
                            "transition-colors",
                            collapsed ? "lg:justify-center lg:px-2" : "",
                            active
                              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0] shadow-brand"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                          ].join(" ")}
                        >
                          <Icon className="h-4 w-4 shrink-0 opacity-90" />
                          <span className={["truncate", collapsed ? "lg:hidden" : ""].join(" ")}>{item.label}</span>
                          {item.badge && (
                            <span className={["ml-auto rounded bg-brand/90 px-1.5 py-px text-[10px] font-semibold text-brand-foreground tabular", collapsed ? "lg:hidden" : ""].join(" ")}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t border-sidebar-border p-3 text-[11px] text-sidebar-foreground/60">
          <div className="flex items-center justify-between">
            <span className={collapsed ? "lg:hidden" : ""}>v4.2.0 - Prod</span>
            <span className={["inline-flex items-center gap-1", collapsed ? "lg:mx-auto" : ""].join(" ")}>
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className={collapsed ? "lg:hidden" : ""}>All systems normal</span>
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur">
          <button
            className="lg:hidden -ml-1 rounded p-1 text-muted-foreground hover:bg-muted"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-[12px] text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
                ) : (
                  <span className="text-foreground font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </div>

          <div className="relative ml-auto hidden md:block w-[380px] max-w-full">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applications, applicants, documents..."
              className="h-9 pl-8 pr-16 bg-background"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" /> K
            </kbd>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Help">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-[10px]">4 new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                ["Compliance", "3 applications require identity review"],
                ["Payments", "Merchant settlement batch #2681 ready"],
                ["System", "ActivePDF latency degraded - investigating"],
                ["Support", "TCK-4468 escalated to Tier 2"],
              ].map(([t, m]) => (
                <DropdownMenuItem key={t} className="items-start gap-2 py-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                  <div className="min-w-0">
                    <div className="text-[12px] font-medium">{t}</div>
                    <div className="truncate text-[12px] text-muted-foreground">{m}</div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md pl-1 pr-2 py-1 hover:bg-muted">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-navy text-navy-foreground text-[11px] font-semibold">OB</AvatarFallback>
                </Avatar>
                <div className="hidden text-left leading-tight md:block">
                  <div className="text-[12px] font-semibold">Owen Baker</div>
                  <div className="text-[10px] text-muted-foreground">Super Administrator</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Signed in as Owen Baker</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile & preferences</DropdownMenuItem>
              <DropdownMenuItem>Security & MFA</DropdownMenuItem>
              <DropdownMenuItem>Session activity</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="min-h-[calc(100vh-3.5rem-2.75rem)] flex-1">
          <Outlet />
        </main>

        <footer className="border-t border-border bg-surface px-4 py-3 text-[11px] text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>2026 Georgia Lottery Corporation - WBRLPS Admin Portal</span>
            <span className="inline-flex items-center gap-3">
              <span>Env: Production (us-east-1)</span>
              <span className="hidden sm:inline">Session - 00:42:11</span>
              <a href="#" className="hover:text-foreground">Accessibility</a>
              <a href="#" className="hover:text-foreground">Status</a>
              <a href="#" className="hover:text-foreground">Support</a>
            </span>
          </div>
        </footer>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
}
