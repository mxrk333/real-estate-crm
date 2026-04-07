export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export type StatMetric = {
  id: string;
  label: string;
  value: string;
  icon: string;
  footer: {
    type: "trend" | "badge" | "target" | "status";
    text: string;
    icon?: string;
    tone?: "primary" | "tertiary" | "muted";
  };
};

export type LeadTemperature = "hot" | "warm";

export type PriorityLead = {
  id: string;
  name: string;
  subtitle: string;
  temperature: LeadTemperature;
  activeLabel: string;
  actionLabel: string;
  emoji: string;
};

export type MemoItem = {
  id: string;
  category: string;
  categoryTone: "primary" | "muted";
  title: string;
  excerpt: string;
  meta: string;
  accent: "primary" | "subtle";
};
