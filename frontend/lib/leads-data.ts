import type { LedgerAgent } from "@/types/leads";

export const ledgerAgents: LedgerAgent[] = [
  {
    id: "1",
    name: "Elena Sterling",
    email: "esterling@isr.arch.com",
    role: "manager",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTviUGVKrRNiBMLieVpWp8GV0NibjTryxtAxcbhFLXzs6s7PWX4-92OsQ94LSwKTkYI-Z_OduaSqjxE_Y3z081W5OTMKmr2jMOCiD7sldOw0c_A-mohHSB7Ztw5M8ecplvNqUfkZ-sjjTaQgJn56w8OopuPIfWNe_gfLdQZycmPZOZSTJtDEv0fmEhKyK4OGwxjw-Kv9T8X7HM1Okpj_8yusD52XOTXw-XsUEAMsph1Z2jaUJpEdWeiw1LV3NQAE9LzUrOoJHagEE",
    avatarAlt:
      "Confident professional woman in business casual attire, executive headshot, bright modern office",
    license: {
      state: "licensed",
      statusLabel: "Licensed",
      statusClassName: "text-wfm-on-tertiary-fixed-variant",
    },
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@isr.arch.com",
    role: "agent",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_xJgbtaypqoKto4cIkH50_Wun6Vfa3CJcqSVjCp51-XoiwbfoCodrR2RVkihlUMs-0_yNd-BWFn_Yk35ImVBvDHtkZ60eMyMGlPM1FJ6h61iha3XYkzHSzN4UzTCs3vAK0y0tpt8f4gLYb5xk3Rqn7-jreiaWeIaZQMQtnc9SBLxytbW25eCYiVu435ssxeesABvnhCrpH0H_mdXaUz1HCbJp6DF8Iu1USKSwKxXA4KaNHafHu8iStvg4jzjAlENuZgx0El9Znts",
    avatarAlt:
      "Focused male professional in tailored navy suit, minimalist white architectural interior",
    license: {
      state: "applicant",
      statusLabel: "Applicant",
      statusClassName: "text-wfm-secondary",
    },
  },
  {
    id: "3",
    name: "Sarah Vance",
    email: "svance@isr.arch.com",
    role: "agent",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Jk0_OTn_QGdFC-Izx-cld8hiJzN6aYY5bCNyeOVayjcZbX497O97xo39itqtbvb6zq14fn8UXQcYS3zBLfX0gcQeckalCy17yMBai1dugfJmmqkveaguRuENBUil9hKBa5-tMZtDSOTvrMtnKa82xbCb3VJE6qAozM56vQPdf4BW7JjeWYBeIgiZPOfsYuWRYaS17aq5peeE9wPVRhHx5_C8iRzMOV2jXGY8aF07bKWeRkCmRBaNBuWqnU8VitdUUIYoI_AoPN0",
    avatarAlt:
      "Smiling modern businesswoman in soft window light, neutral professional background",
    license: {
      state: "review",
      statusLabel: "Review",
      statusClassName: "text-wfm-on-secondary-fixed-variant",
    },
  },
  {
    id: "4",
    name: "Julian Reed",
    email: "jreed@isr.arch.com",
    role: "manager",
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOvqx_8SgodL70wylpuJKV27_S3l8RRxGZu3DFhVZaiq4YXBTAhFV8rR-7DbTHaElqii730JKJDM4LzHQ8zmHpbiznvLTzQB6WZs9YfczNlp1BNtYl_HjMyUd933VJcZBWYdlNZp-lZMg0BOChNWxme5Q5dlZdazdGfhImRBLTV88r7pY3HHswfSJsqjbyNofHo0fflDrXl7VK2zRv1zwTIuJuq2tLpq84b87MmNN1juCPDmZ95mr4-scW7z-js_edokLIWL4DqJQ",
    avatarAlt:
      "Confident professional male with arms crossed, high-end office, soft natural lighting",
    license: {
      state: "licensed",
      statusLabel: "Licensed",
      statusClassName: "text-wfm-on-tertiary-fixed-variant",
    },
  },
];
