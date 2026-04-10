To make the **Inner Sparc Realty Hub (ISRH)** development manageable, we’ll break the TDD into a **6-Sprint Agile Roadmap**. Each sprint is designed to deliver a "Minimum Viable Product" (MVP) feature set, ensuring you aren't overwhelmed by the scope.

---

## 🏗️ Sprint 1: Foundation & Identity (The "Skeleton")
**Goal:** Establish the database, authentication, and the core UI shell.

* **Task 1.1:** Initialize **Next.js 15** project with TypeScript and Tailwind CSS.
* **Task 1.2:** Setup **Supabase** project: Create `profiles` table and enable Auth (Email/OTP).
* **Task 1.3:** Implement **RBAC Middleware**: Create a logic to redirect users based on their `role` (Admin, Agent, etc.).
* **Task 1.4:** Build the **Navigation Sidebar**: High-density sidebar with all routes mapped out (even if they are empty for now).

---

## 📈 Sprint 2: The Lead Engine (The "Heart")
**Goal:** Create the basic CRM functionality with security layers.

* **Task 2.1:** Create the `leads` table with **Row Level Security (RLS)** to ensure Agents only see their own data.
* **Task 2.2:** Build the **"All Leads" Table**: Implement basic CRUD (Create, Read, Update, Delete).
* **Task 2.3:** Develop the **PII Masking Utility**: Apply the function to the UI so Admins see masked phone numbers (e.g., `0917****89`).
* **Task 2.4:** Implement **Duplicate Detection**: A database function that checks for existing Phone/Email before a new lead is saved.

---

## 🧠 Sprint 3: AI Intelligence & Analytics (The "Brain")
**Goal:** Integrate Gemini API for automated lead classification.

* **Task 3.1:** Setup **Gemini 1.5 Flash** API via Google AI Studio.
* **Task 3.2:** Build the **Scoring Service**: A server action that sends lead activity to Gemini and receives a $Temperature$ score ($0-100$).
* **Task 3.3:** Create the **Closer’s Corner UI**: A dedicated dashboard view for Agents showing "Top 5" prioritized tasks based on AI scores.
* **Task 3.4:** Build the **Dashboard Analytics Cards**: Total Leads, Conversion Rate, and Most Inquired Models widgets.

---

## 🤖 Sprint 4: The Telegram Bridge (The "Voice")
**Goal:** Leverage Telegram for free notifications and "unlimited" file storage.

* **Task 4.1:** Create a **Telegram Bot** via @BotFather and connect it to the Next.js backend via webhooks.
* **Task 4.2:** Implement **Lead Alerts**: Automatically send a Telegram message to an Agent when a new "Hot" lead is assigned to them.
* **Task 4.3:** Build the **Telegram Storage Handler**: Logic to upload property images/receipts to a private Telegram channel and store the `file_id` in Supabase.
* **Task 4.4:** Develop the **Messaging Feed**: A UI component to view lead-specific messages synced from Telegram.

---

## 💰 Sprint 5: Financials & Resources (The "ERP")
**Goal:** Manage money tracking and agent training materials.

* **Task 5.1:** Build the **DP Tracker (Milestones)**: A financial ledger UI where agents input payment dates and amounts.
* **Task 5.2:** Create the **Project Listing Gallery**: A searchable grid of property models, locations, and pricing for landing page synchronization.
* **Task 5.3:** Implement **"Other Materials" Module**: A restricted file repository for Agent Guides and Handbooks (Admin/SAO access only).
* **Task 5.4:** Create the **Memo System**: A broadcast tool for management to send company-wide digital announcements.

---

## 🛠️ Sprint 6: Workforce & Optimization (The "Admin")
**Goal:** Finalize management tools and system stability.

* **Task 6.1:** Build **Workforce Management**: A CRUD interface for Superadmins to manage users, teams, and licensing statuses.
* **Task 6.2:** Develop the **IT Ticketing System**: A simple form for users to report bugs or UI feedback.
* **Task 6.3:** Implement **Lead Load Balancing**: Logic for Supervisors to see lead volume across their team and re-assign "At-Risk" leads.
* **Task 6.4:** **Final QA & Deployment**: End-to-end testing of RBAC and deploying to Vercel.

---

### Agile Task Comparison Table

| Sprint | Complexity | Main Output | Risk Level |
| :--- | :--- | :--- | :--- |
| **1. Foundation** | Low | Auth & Sidebar | 🟢 Low |
| **2. Engine** | Medium | Secure Lead CRM | 🟡 Medium |
| **3. Brain** | High | AI Scoring/Dash | 🔴 High |
| **4. Bridge** | Medium | Telegram Sync | 🟡 Medium |
| **5. ERP** | Medium | DP Tracker/Gallery | 🟢 Low |
| **6. Admin** | Low | Team Management | 🟢 Low |

Which specific task from **Sprint 1** or **Sprint 2** would you like to see the initial code structure for first?