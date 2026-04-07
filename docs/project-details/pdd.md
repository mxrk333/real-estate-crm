This unified **Product Design Document (PDD)** merges your technical requirements (Next.js, TypeScript, Telegram integration) with the advanced operational logic of the Real Estate ERP/CRM. It is optimized for high-density UI generation in tools like STICH or Figma AI.

---

# Product Design Document: Inner Sparc Realty Hub (ISRH)

## 1. Executive Summary
**ISRH** is an AI-powered Real Estate ERP/CRM designed to bridge the gap between social media lead generation and final downpayment (DP) tracking. It focuses on **Zero-Poaching** through PII masking, **AI Lead Scoring** to prioritize high-intent buyers, and a **Telegram-driven** communication architecture to minimize infrastructure costs.

---

## 2. System Hierarchy & Security (RBAC)
To ensure data integrity and privacy, the system implements **PII Masking** (Personally Identifiable Information). Only the lead owner sees full contact details.

| Role | Visibility Scope | PII Access | Primary UI Focus |
| :--- | :--- | :--- | :--- |
| **Superadmin** | Global | ✅ Full | System audits & Global Workforce management. |
| **IT Admin** | System | ❌ Masked | Bug resolution & IT Ticketing. |
| **Manager** | Department | ✅ Team Only | Source ROI & Recruitment Funnel. |
| **Supervisor** | Team | ✅ Team Only | Lead Load Balancing & "At-Risk" flags. |
| **Agent** | Personal | ✅ Own Leads | The "Closer’s Corner" & Lead Nurturing. |
| **SAO** | Resources | ✅ Restricted | Management of "Other Materials" & Agent Guides. |

---

## 3. The Dashboard Ecosystem (Epic Views)
The UI dynamically shifts based on the logged-in role to present the most relevant "Epic."

### 3.1 The "Pulse" Dashboard (Universal Components)
* **KPI Tiles:** Total Leads, Conversion Rate, Total DP Tracked, Most Inquired Models, Top Projects.
* **Leaderboard:** Top Teams and Top Agents ranking.
* **Recent Activity:** A combined feed of Recent Leads and Recent Memos.

### 3.2 Role-Specific Epics
* **The Closer’s Corner (Agent):** Features a "Next-Best-Action" (NBA) engine powered by AI, showing the top 5 tasks (e.g., "Follow up with Hot Lead"). Includes a personal commission calculator.
* **The Team Pilot (Supervisor):** Visualizes lead distribution across agents to prevent burnout and flags "At-Risk" leads (no contact > 48hrs).
* **The Strategy Room (Manager):** ROI Analytics comparing lead sources (TikTok, FB, YouTube) and an Inventory Heatmap (Cavite, Batangas, Laguna, Rizal).

---

## 4. Core Functional Modules

### 4.1 AI Lead Management & Scoring
* **Temperature Logic:** AI assigns 🔥 **Hot**, ☀️ **Warm**, or ❄️ **Cold** status based on interaction frequency and budget match.
* **The Pipeline:** Inquiry → PKS (Product Knowledge Seminar) → Site Tour → Reservation → Document Submission.
* **Duplicate Detection:** Blocks entries with existing Phone/Email, automatically attributing them to the original agent.

### 4.2 Lead Milestone (DP Tracker)
A specialized ledger for tracking installment-based downpayments.
* **Features:** Payment schedule visualization, "Amount Paid" vs. "Remaining Balance," and digital receipt attachment via Telegram.

### 4.3 Workforce & Resource Management
* **Licensing Tracker:** Monitors the onboarding stages of new recruits from "Applicant" to "Licensed Professional."
* **Other Materials:** A restricted library for Real Estate Agent Guides, training links, and legal handbooks (Managed by Superadmin/SAO).

### 4.4 Communication (Telegram Integration)
* **Messaging Service:** Uses Telegram for all system notifications, lead alerts, and multimedia messaging (Voice/Video/Images).
* **Centralized Memos:** Digital announcements from management with "Mark as Read" receipts.

---

## 5. Technical Architecture (Free-Tier Optimized)
* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS (for rapid UI development).
* **Database:** **Supabase** (PostgreSQL) - Handles relational data, RBAC, and real-time triggers.
* **Storage (Images/Messages):** * **Primary:** Telegram Bot API (using Telegram as an "unlimited" file server by storing `file_id` in Supabase).
    * **Secondary:** Cloudinary (for web-optimized project listing thumbnails).
* **Infrastructure:** Vercel (Frontend hosting) + Supabase (Backend/Database).

---

## 6. UI/UX Design Prompt (For STICH/Figma AI)
> "Design a complex, high-density Real Estate ERP/CRM Dashboard named 'ISRH'. 
> 
> **Layout:** Sidebar-driven navigation with a clean, 'Enterprise Dark' aesthetic (Primary: #0F172A, Accent: #6366F1).
> 
> **Key Screens to Generate:**
> 1. **The Closer’s Corner:** A dashboard showing an 'AI Priority' list of 5 leads with 🔥/☀️/❄️ icons, a commission progress bar, and 'Quick Action' buttons for WhatsApp/Telegram.
> 2. **Lead Milestone Table:** A financial ledger view showing 'DP Tracking' with progress bars for each client's payment status.
> 3. **PII Masking Example:** A list of leads where phone numbers are shown as '0917****89' for Admin views.
> 4. **Project Gallery:** A grid of property models with location tags (Cavite, Rizal) and 'Inquiry Volume' badges.
> 5. **Workforce Management:** A 'Team view' showing agent performance tiles and a 'Licensing Status' stepper for new recruits."

---

## 7. Operational Workflow
1.  **Lead Capture:** Lead enters via social media (Source logged) → System checks for duplicates.
2.  **AI Analysis:** Lead is scored and assigned to an Agent's "Closer’s Corner."
3.  **Nurturing:** Agent uses Telegram-linked triggers to invite the lead to a PKS or Site Tour.
4.  **Conversion:** Once reserved, the lead moves to "Lead Milestone" for DP tracking.
5.  **Feedback:** Any UI issues or bugs are reported via the **IT Reporting** module in Settings.

Would you like to focus on the database schema for the **Duplicate Detection** or the **Telegram Bot** logic first?