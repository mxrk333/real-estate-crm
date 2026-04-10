import type {
  MemoItem,
  NavItem,
  PriorityLead,
  StatMetric,
} from "@/types/dashboard";

export const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    href: "/",
  },
  { id: "leads", label: "Leads", icon: "person_search", href: "/leads" },
  {
    id: "milestones",
    label: "Milestones",
    icon: "event_available",
    href: "/milestones",
  },
  { id: "projects", label: "Projects", icon: "account_tree", href: "/projects" },
  {
    id: "materials",
    label: "Materials",
    icon: "inventory_2",
    href: "/materials",
  },
];

export const stats: StatMetric[] = [
  {
    id: "leads",
    label: "Total Leads",
    value: "1,284",
    icon: "group",
    footer: {
      type: "trend",
      text: "+12.5% this month",
      icon: "trending_up",
      tone: "primary",
    },
  },
  {
    id: "conversion",
    label: "Conversion %",
    value: "24.8%",
    icon: "analytics",
    footer: {
      type: "badge",
      text: "Top 5% in Region",
      icon: "stars",
      tone: "tertiary",
    },
  },
  {
    id: "dp",
    label: "DP Tracked",
    value: "₱14.2M",
    icon: "payments",
    footer: { type: "target", text: "Target: ₱20.0M", tone: "muted" },
  },
  {
    id: "earnings",
    label: "Earnings",
    value: "₱842K",
    icon: "account_balance_wallet",
    footer: {
      type: "status",
      text: "Payout Pending",
      icon: "check_circle",
      tone: "primary",
    },
  },
];

export const priorityLeads: PriorityLead[] = [
  {
    id: "1",
    name: "Maria Clarissa Rivera",
    subtitle: "Metro Manila • High Intent • ₱4.5M Portfolio",
    temperature: "hot",
    activeLabel: "Active 2m ago",
    actionLabel: "Call Now",
    emoji: "🔥",
  },
  {
    id: "2",
    name: "Dominic Tan",
    subtitle: "Cebu City • Repeat Buyer • ₱12.0M Portfolio",
    temperature: "hot",
    activeLabel: "Active 15m ago",
    actionLabel: "Send Proposal",
    emoji: "🔥",
  },
  {
    id: "3",
    name: "Jaime Zobel",
    subtitle: "Makati • Information Request • ₱2.1M Portfolio",
    temperature: "warm",
    activeLabel: "Active 1h ago",
    actionLabel: "Email Info",
    emoji: "☀️",
  },
  {
    id: "4",
    name: "Elena Guinto",
    subtitle: "Davao City • Follow-up • ₱800k Portfolio",
    temperature: "warm",
    activeLabel: "Active 3h ago",
    actionLabel: "Schedule Call",
    emoji: "☀️",
  },
  {
    id: "5",
    name: "Roberto Sy",
    subtitle: "Quezon City • Referral • ₱3.2M Portfolio",
    temperature: "warm",
    activeLabel: "Active 5h ago",
    actionLabel: "Intro Text",
    emoji: "☀️",
  },
];

export const memos: MemoItem[] = [
  {
    id: "1",
    category: "Policy Update",
    categoryTone: "primary",
    title: "New KYC Requirements for Corporate Entities",
    excerpt:
      "Effective immediately, all corporate accounts require notarized SEC documents...",
    meta: "10:45 AM • HQ",
    accent: "primary",
  },
  {
    id: "2",
    category: "Announcement",
    categoryTone: "muted",
    title: "Q4 Kick-off Townhall",
    excerpt:
      "Join the executive team at the Grand Ballroom for the annual strategic review.",
    meta: "Yesterday • Operations",
    accent: "subtle",
  },
  {
    id: "3",
    category: "System Alert",
    categoryTone: "muted",
    title: "CRM Maintenance Window",
    excerpt:
      "The portal will be offline for scheduled updates this Sunday from 2 AM to 5 AM.",
    meta: "Oct 24 • IT Department",
    accent: "subtle",
  },
  {
    id: "4",
    category: "Achievement",
    categoryTone: "muted",
    title: "New Sales Record: Makati Branch",
    excerpt:
      "Congratulations to the team for exceeding the quarterly target by 40%.",
    meta: "Oct 23 • Communications",
    accent: "subtle",
  },
];

export const userProfile = {
  name: "Gabriel Libacao Jr.",
  role: "Chief Executive Officer",
  avatarSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2cQl7vQvBYfwFM2L3TNxh9wvjMWuGJc03z9hOxfxFuwTtL9Cjzl_qU-z5OYEik4-KnVpi8vzRd7ZCnuv4VfQZoDL5q2sPJPUP9c8OMRRsaizpMGLqV5tgI3po01Ls6UHEh422CQMypYgxKYplAqPdzyzb82uUVTwy1CnbmtY_bz6E1EGz41MpRUMlhsp6gSLYHZp70IlGeyc1IzGZpHhbpwirX6eWen8KK_qdkHSqoA3Iiame8opY6YvrHBx8-TNUxTMVeU_Z9kw",
  avatarAlt:
    "Professional portrait of a confident executive in business attire with a neutral grey background",
} as const;
