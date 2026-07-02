// Mock enterprise data for GLC WBRLPS Admin Portal (Phase 4).
// Deterministic so the UI stays stable across renders.

export type AppStatus =
  | "Draft"
  | "Submitted"
  | "In Review"
  | "Pending Payment"
  | "Approved"
  | "Rejected"
  | "On Hold";

export type PayStatus = "Paid" | "Pending" | "Failed" | "Refunded" | "Chargeback";

export interface Application {
  id: string;
  number: string;
  business: string;
  applicant: string;
  city: string;
  county: string;
  status: AppStatus;
  payment: PayStatus;
  amount: number;
  submitted: string;
  updated: string;
  assignee: string;
  priority: "Low" | "Normal" | "High" | "Urgent";
  risk: "Low" | "Medium" | "High";
}

const businesses = [
  "Peachtree Market", "Savannah Fuel Stop", "Athens Corner Store", "Macon Quick Mart",
  "Augusta Package", "Columbus Food Mart", "Marietta Grocery", "Alpharetta Gas & Go",
  "Roswell Deli", "Sandy Springs Wine", "Decatur Convenience", "Douglasville Foods",
  "Kennesaw Fresh Market", "Smyrna Petroleum", "Duluth Snack Shop", "Woodstock Beverage",
  "Valdosta One Stop", "Rome Neighborhood Store", "Gainesville Express", "Lawrenceville Market",
];
const names = [
  "Maria Alvarez", "James Whitmore", "Priya Patel", "David Nguyen", "Ayana Brooks",
  "Marcus Reid", "Sofia Chen", "Ethan Cole", "Naomi Johnson", "Rahul Mehta",
  "Grace Han", "Isaac Levine", "Lena Ortiz", "Owen Baker", "Amelia Ford",
];
const counties = ["Fulton", "DeKalb", "Cobb", "Gwinnett", "Chatham", "Clarke", "Bibb", "Muscogee", "Cherokee", "Hall"];
const statuses: AppStatus[] = ["Draft", "Submitted", "In Review", "Pending Payment", "Approved", "Rejected", "On Hold"];
const payments: PayStatus[] = ["Paid", "Pending", "Failed", "Refunded", "Chargeback"];
const assignees = ["A. Bennett", "R. Cooper", "M. Delgado", "K. Fisher", "S. Iverson", "L. Nakamura"];

function pad(n: number, w = 6) {
  return String(n).padStart(w, "0");
}

export const applications: Application[] = Array.from({ length: 64 }).map((_, i) => {
  const submitted = new Date(2026, 5, 1 + ((i * 7) % 28), 8 + (i % 10), (i * 13) % 60);
  const updated = new Date(submitted.getTime() + ((i % 5) + 1) * 3600 * 1000 * 6);
  return {
    id: `APP-${pad(1000 + i)}`,
    number: `WBRL-2026-${pad(i + 1, 5)}`,
    business: businesses[i % businesses.length],
    applicant: names[i % names.length],
    city: ["Atlanta", "Savannah", "Athens", "Macon", "Augusta", "Columbus", "Marietta"][i % 7],
    county: counties[i % counties.length],
    status: statuses[i % statuses.length],
    payment: payments[i % payments.length],
    amount: 275 + (i % 6) * 50,
    submitted: submitted.toISOString(),
    updated: updated.toISOString(),
    assignee: assignees[i % assignees.length],
    priority: (["Low", "Normal", "High", "Urgent"] as const)[i % 4],
    risk: (["Low", "Medium", "High"] as const)[i % 3],
  };
});

export const kpis = {
  totalApplications: 12_847,
  submittedToday: 138,
  pendingReview: 421,
  paymentPending: 96,
  paymentReceived: 1_248_320,
  approved: 9_612,
  rejected: 342,
  inProgress: 1_874,
  activeUsers: 214,
  complianceAlerts: 7,
  supportTickets: 43,
  systemHealth: 99.982,
};

export const applicationsTrend = [
  { day: "Mon", submitted: 112, approved: 84, rejected: 6 },
  { day: "Tue", submitted: 138, approved: 96, rejected: 9 },
  { day: "Wed", submitted: 154, approved: 118, rejected: 4 },
  { day: "Thu", submitted: 142, approved: 110, rejected: 8 },
  { day: "Fri", submitted: 168, approved: 132, rejected: 11 },
  { day: "Sat", submitted: 88, approved: 62, rejected: 3 },
  { day: "Sun", submitted: 74, approved: 48, rejected: 2 },
];

export const revenueTrend = [
  { m: "Jan", revenue: 812_400 },
  { m: "Feb", revenue: 902_100 },
  { m: "Mar", revenue: 988_200 },
  { m: "Apr", revenue: 1_042_800 },
  { m: "May", revenue: 1_128_900 },
  { m: "Jun", revenue: 1_248_320 },
];

export const statusMix = [
  { name: "Approved", value: 62 },
  { name: "In Review", value: 18 },
  { name: "Pending Payment", value: 9 },
  { name: "Rejected", value: 4 },
  { name: "On Hold", value: 7 },
];

export const recentActivity = [
  { who: "R. Cooper", what: "Approved application", target: "WBRL-2026-00812", at: "2m ago", tone: "success" as const },
  { who: "System", what: "Payment reconciliation completed", target: "1,248 records", at: "14m ago", tone: "info" as const },
  { who: "M. Delgado", what: "Flagged for compliance review", target: "WBRL-2026-00778", at: "23m ago", tone: "warning" as const },
  { who: "A. Bennett", what: "Requested additional documents", target: "WBRL-2026-00791", at: "41m ago", tone: "info" as const },
  { who: "System", what: "Melissa Data verification failed", target: "WBRL-2026-00803", at: "58m ago", tone: "danger" as const },
  { who: "K. Fisher", what: "Assigned support ticket", target: "TCK-4471", at: "1h ago", tone: "info" as const },
  { who: "S. Iverson", what: "Published CMS announcement", target: "Retailer newsletter", at: "2h ago", tone: "info" as const },
  { who: "System", what: "Nightly backup succeeded", target: "3.2 GB", at: "6h ago", tone: "success" as const },
];

export const tasks = [
  { title: "Review 24 applications flagged for identity mismatch", due: "Today", owner: "Compliance", priority: "High" as const },
  { title: "Reconcile Merchant One settlement batch #2681", due: "Today", owner: "Finance", priority: "High" as const },
  { title: "Approve CMS update - Homepage banner", due: "Tomorrow", owner: "Content", priority: "Normal" as const },
  { title: "Quarterly access review - Licensing team", due: "Fri", owner: "SysAdmin", priority: "Normal" as const },
  { title: "Renew ActivePDF service certificate", due: "Jul 14", owner: "Ops", priority: "Urgent" as const },
];

export const roles = [
  { role: "GLC Super Administrator", users: 3, scope: "All modules, unrestricted" },
  { role: "Licensing Administrator", users: 14, scope: "Applications, Applicants, Documents" },
  { role: "Compliance Officer", users: 9, scope: "Applications, Audit, Risk, Reports" },
  { role: "Customer Support", users: 22, scope: "Tickets, Applicants, Communication" },
  { role: "Finance Team", users: 11, scope: "Payments, Reconciliation, Reports" },
  { role: "Operations Manager", users: 6, scope: "Dashboard, Monitoring, Integrations" },
  { role: "System Administrator", users: 4, scope: "Users, Roles, System, Security" },
  { role: "Read Only Auditor", users: 5, scope: "Read-only across all modules" },
];

export const integrations = [
  { name: "Melissa Data", desc: "Address & identity verification", status: "Operational", latency: 142, uptime: 99.98 },
  { name: "MerchantOne", desc: "Card & ACH payment processing", status: "Operational", latency: 288, uptime: 99.94 },
  { name: "ActivePDF", desc: "Server-side PDF generation", status: "Degraded", latency: 812, uptime: 99.12 },
  { name: "Voltage SecureData", desc: "Format-preserving encryption", status: "Operational", latency: 64, uptime: 99.99 },
  { name: "SMTP Relay", desc: "Transactional email delivery", status: "Operational", latency: 96, uptime: 99.97 },
  { name: "GLC Internal APIs", desc: "Retailer & compliance services", status: "Operational", latency: 42, uptime: 99.99 },
];

export const supportTickets = [
  { id: "TCK-4471", subject: "Cannot upload IRS W-9 document", requester: "Peachtree Market", priority: "High", status: "Open", assignee: "K. Fisher", updated: "5m" },
  { id: "TCK-4468", subject: "Payment declined but funds withdrawn", requester: "Savannah Fuel Stop", priority: "Urgent", status: "Escalated", assignee: "M. Delgado", updated: "22m" },
  { id: "TCK-4462", subject: "MFA reset for owner account", requester: "Athens Corner Store", priority: "Normal", status: "In Progress", assignee: "R. Cooper", updated: "1h" },
  { id: "TCK-4459", subject: "Application status not updating", requester: "Macon Quick Mart", priority: "Normal", status: "Open", assignee: "Unassigned", updated: "2h" },
  { id: "TCK-4451", subject: "Request receipt reissue for Q2 payments", requester: "Augusta Package", priority: "Low", status: "Resolved", assignee: "S. Iverson", updated: "6h" },
];

export const auditEvents = Array.from({ length: 24 }).map((_, i) => {
  const actions = ["Login", "Logout", "Data Access", "Update", "Delete", "Payment", "Download", "Upload", "Approval", "Config Change"];
  const actors = ["mdelgado", "acooper", "kfisher", "sisverson", "system", "abennett", "lnakamura"];
  return {
    id: `EVT-${pad(90_000 + i)}`,
    at: new Date(Date.now() - i * 7 * 60_000).toISOString(),
    actor: actors[i % actors.length],
    action: actions[i % actions.length],
    resource: i % 3 === 0 ? `WBRL-2026-${pad((i * 17) % 999, 5)}` : `USR-${pad(200 + i, 4)}`,
    ip: `10.24.${(i * 7) % 250}.${(i * 13) % 250}`,
    outcome: i % 9 === 0 ? "Denied" : "Success",
  };
});

export const notificationTemplates = [
  { name: "Application Received", channel: "Email", event: "application.submitted", updated: "Jun 12", status: "Active" },
  { name: "Application Received", channel: "SMS", event: "application.submitted", updated: "Jun 12", status: "Active" },
  { name: "Payment Confirmation", channel: "Email", event: "payment.captured", updated: "Jun 04", status: "Active" },
  { name: "Document Requested", channel: "Email", event: "document.requested", updated: "May 22", status: "Active" },
  { name: "Application Approved", channel: "Email", event: "application.approved", updated: "May 22", status: "Active" },
  { name: "Application Rejected", channel: "Email", event: "application.rejected", updated: "May 20", status: "Draft" },
  { name: "Suspicious Login", channel: "In-App", event: "auth.suspicious", updated: "Apr 30", status: "Active" },
];

export const cmsPages = [
  { title: "Home Page", slug: "/", status: "Published", updated: "Jun 22", author: "S. Iverson" },
  { title: "FAQ", slug: "/faq", status: "Published", updated: "Jun 21", author: "S. Iverson" },
  { title: "Documents", slug: "/documents", status: "Published", updated: "Jun 18", author: "A. Bennett" },
  { title: "About Us", slug: "/about", status: "Published", updated: "May 14", author: "S. Iverson" },
  { title: "Contact Us", slug: "/contact", status: "Draft", updated: "Jun 27", author: "K. Fisher" },
  { title: "Terms of Service", slug: "/terms", status: "Published", updated: "Apr 02", author: "Legal" },
  { title: "Privacy Policy", slug: "/privacy", status: "Published", updated: "Apr 02", author: "Legal" },
  { title: "SMS Terms", slug: "/sms-terms", status: "Published", updated: "Apr 02", author: "Legal" },
];

export const glcUsers = [
  { name: "Alicia Bennett", email: "a.bennett@galottery.gov", role: "Licensing Administrator", mfa: true, status: "Active", lastLogin: "2m ago" },
  { name: "Ryan Cooper", email: "r.cooper@galottery.gov", role: "Licensing Administrator", mfa: true, status: "Active", lastLogin: "12m ago" },
  { name: "Marta Delgado", email: "m.delgado@galottery.gov", role: "Compliance Officer", mfa: true, status: "Active", lastLogin: "1h ago" },
  { name: "Kevin Fisher", email: "k.fisher@galottery.gov", role: "Customer Support", mfa: true, status: "Active", lastLogin: "3h ago" },
  { name: "Sasha Iverson", email: "s.iverson@galottery.gov", role: "Operations Manager", mfa: true, status: "Active", lastLogin: "Yesterday" },
  { name: "Lena Nakamura", email: "l.nakamura@galottery.gov", role: "Finance Team", mfa: true, status: "Active", lastLogin: "Yesterday" },
  { name: "David Park", email: "d.park@galottery.gov", role: "System Administrator", mfa: true, status: "Active", lastLogin: "2d ago" },
  { name: "Grace Han", email: "g.han@galottery.gov", role: "Read Only Auditor", mfa: false, status: "Locked", lastLogin: "5d ago" },
  { name: "Owen Baker", email: "o.baker@galottery.gov", role: "GLC Super Administrator", mfa: true, status: "Active", lastLogin: "10m ago" },
];

export const documents = [
  { name: "IRS_W9_PeachtreeMarket.pdf", type: "W-9", size: "184 KB", encrypted: true, scanned: "Clean", uploaded: "Jun 30", retention: "7 yr" },
  { name: "GA_DriversLicense_Alvarez.jpg", type: "ID", size: "2.1 MB", encrypted: true, scanned: "Clean", uploaded: "Jun 30", retention: "7 yr" },
  { name: "Lease_Agreement_2026.pdf", type: "Lease", size: "612 KB", encrypted: true, scanned: "Clean", uploaded: "Jun 29", retention: "7 yr" },
  { name: "Business_License_Athens.pdf", type: "License", size: "244 KB", encrypted: true, scanned: "Clean", uploaded: "Jun 29", retention: "10 yr" },
  { name: "Insurance_COI.pdf", type: "Insurance", size: "398 KB", encrypted: true, scanned: "Clean", uploaded: "Jun 28", retention: "5 yr" },
  { name: "Voided_Check.pdf", type: "Banking", size: "112 KB", encrypted: true, scanned: "Quarantined", uploaded: "Jun 28", retention: "3 yr" },
];

export function currency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
export function num(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}