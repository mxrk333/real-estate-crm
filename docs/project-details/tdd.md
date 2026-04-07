This **Technical Design Document (TDD)** translates the functional requirements of the **Inner Sparc Realty Hub (ISRH)** into a scalable, type-safe system architecture. It prioritizes "free tier" efficiency and robust data security.

---

# Technical Design Document: Inner Sparc Realty Hub (ISRH)

## 1. Tech Stack & Infrastructure
* **Framework:** Next.js (App Router) + TypeScript.
* **Styling:** Tailwind CSS + Shadcn/UI (for high-density dashboard components).
* **Backend/Database:** **Supabase** (PostgreSQL, Auth, and Row Level Security).
* **Messaging & Storage:** **Telegram Bot API** (Messaging notifications and "unlimited" image/video hosting via `file_id`).
* **Media Optimization:** **Cloudinary** (For generating project thumbnails and UI assets).
* **Deployment:** Vercel (Frontend) + Supabase Edge Functions (Webhooks).

---

## 2. System Architecture
The system follows a **Serverless/Edge** architecture to ensure low latency and zero server maintenance costs.

### A. The Telegram Storage Bridge
To avoid storage limits on free-tier databases:
1.  User uploads a document/image via the CRM.
2.  The Next.js Server Action forwards the file to a private **Telegram Channel** via the Bot.
3.  Telegram returns a unique `file_id` and `message_id`.
4.  Only the `file_id` is stored in Supabase.
5.  When viewed, the system generates a temporary download link via the Bot.

---

## 3. Database Schema (PostgreSQL)

### `profiles` (Extended User Data)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (links to `auth.users`). |
| `role` | enum | superadmin, admin, manager, supervisor, agent, sao, it_admin. |
| `team_id` | UUID | Foreign Key to `teams`. |
| `license_status` | string | status of agent licensing (Applicant, Licensed). |

### `leads` (Core Entity)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key. |
| `full_name` | string | Encrypted or restricted via RLS. |
| `phone` | string | Encrypted or restricted via RLS. |
| `source` | string | TikTok, FB, YouTube, etc. |
| `score` | integer | 0-100 (Calculated by AI engine). |
| `assigned_to` | UUID | FK to `profiles`. |
| `status` | enum | Inquiring, PKS, Site Tour, Reserved, Closed. |

### `dp_milestones` (Financial Tracking)
| Column | Type | Description |
| :--- | :--- | :--- |
| `lead_id` | UUID | FK to `leads`. |
| `total_amount` | decimal | Total downpayment required. |
| `paid_amount` | decimal | Amount currently settled. |
| `receipt_telegram_id` | string | `file_id` of the receipt hosted on Telegram. |

---

## 4. Core Logic Implementations

### 4.1 PII Masking Utility
Data masking is handled at the **Application Level** via a TypeScript utility.

```typescript
// utils/masking.ts
export const maskPII = (value: string, role: string, isOwner: boolean) => {
  if (role === 'superadmin' || isOwner) return value;
  if (value.length < 5) return "****";
  // Masks middle digits: 0917****89
  return `${value.slice(0, 4)}****${value.slice(-2)}`;
};
```

### 4.2 AI Lead Scoring Engine
The "Temperature" is calculated using a weighted engagement formula:
$$Score = (E \times 0.5) + (R \times 0.3) + (B \times 0.2)$$
Where:
* **E (Engagement):** Number of messages/clicks.
* **R (Recency):** Days since last interaction (Inverse).
* **B (Budget):** Match with property price range.

### 4.3 Duplicate Detection
Implemented via a **PostgreSQL Trigger** or a Supabase RPC to prevent lead poaching.
* **Logic:** Before `INSERT`, query `leads` where `phone` or `email` matches. If exists, return the ID of the original Agent and block the write.

---

## 5. API & Integration Design

### 5.1 Telegram Bot Webhook
* **Endpoint:** `/api/webhooks/telegram`
* **Function:** Listens for "Site Tour" confirmations or "Reservation" image uploads. When an agent sends a command like `/dp [LeadID] [Amount]`, the system updates the `dp_milestones` table automatically.

### 5.2 Next.js Server Actions
* **`assignLead()`:** Logic to handle the **Lead Load Balancer** for Supervisors. It checks the current "Hot" lead count of all agents in a team and assigns the new lead to the one with the lowest load.

---

## 6. Security (Row Level Security - RLS)
Supabase RLS policies ensure that data visibility is strictly enforced at the database level.

* **Agent Policy:** `SELECT` leads WHERE `assigned_to = auth.uid()`.
* **Supervisor Policy:** `SELECT` leads WHERE `team_id = (SELECT team_id FROM profiles WHERE id = auth.uid())`.
* **IT Admin Policy:** `SELECT` leads, but `full_name` and `phone` columns are excluded from the view.

---

## 7. Performance & Optimization
* **Caching:** Use Next.js `revalidateTag` for the **Project Listing** gallery to ensure inventory updates are reflected instantly across all agent dashboards.
* **Bundle Size:** Utilize `lucide-react` for icons and dynamic imports for heavy charts (Recharts) in the **Strategy Room** dashboard.

---

### Implementation Roadmap
1.  **Phase 1:** Setup Supabase Auth and RBAC Roles.
2.  **Phase 2:** Build the Lead Table with PII Masking logic.
3.  **Phase 3:** Integrate Telegram Bot for real-time notifications.
4.  **Phase 4:** Develop the DP Tracker and AI Scoring cron jobs.

Would you like the code for the **Supabase RLS Policy** that handles the PII masking for the Admin role?