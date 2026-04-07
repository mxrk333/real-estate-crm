Balancing a side project with a full-time software engineering job is a marathon, not a sprint. Since you have **28 hours a week** (4 hours x 7 days), your "Part-Time Velocity" is roughly equivalent to **50-60% of a full-time developer's output**, accounting for the "brain fog" that hits after a full workday.

To keep this achievable without burnout, I’ve mapped out a **12-week (3-month) timeline**. This uses **2-week sprints**, giving you enough "night-time" cycles to handle complex bugs without falling behind.

---

### 📅 The 12-Week Development Roadmap

#### **Month 1: The Core Architecture**
*Focus: Getting the "plumbing" right so you don't have to refactor later.*

* **Sprint 1 (Weeks 1-2): Foundation & Auth**
    * **Week 1:** Initialize Next.js, Tailwind, and Supabase. Setup the Sidebar/Layout shell.
    * **Week 2:** Implement Supabase Auth. Define the `profiles` table and the RBAC (Role-Based Access Control) middleware.
    * **Goal:** You can log in and see a different sidebar based on your role.
* **Sprint 2 (Weeks 3-4): The Lead Engine & Security**
    * **Week 3:** Create `leads` table and "All Leads" UI. Implement the **PII Masking utility**.
    * **Week 4:** Build the **Duplicate Detection** logic and the basic Lead Entry form.
    * **Goal:** A secure CRM where agents can add leads, and admins see masked data.

---

#### **Month 2: Intelligence & Integration**
*Focus: Adding the "Magic" features (AI and Messaging).*

* **Sprint 3 (Weeks 5-6): AI Lead Scoring (The "Brain")**
    * **Week 5:** Connect Gemini API. Write the prompt logic for "Lead Temperature" scoring.
    * **Week 6:** Create the **Closer’s Corner Dashboard**. Build the AI-prioritized "Top 5" task list.
    * **Goal:** The system automatically tells agents which leads are 🔥 "Hot."
* **Sprint 4 (Weeks 7-8): Telegram Storage & Alerts**
    * **Week 7:** Setup Telegram Bot webhook. Implement "New Lead" push notifications to agents.
    * **Week 8:** Build the "Telegram as Storage" bridge—uploading receipts/images to a channel and saving the ID.
    * **Goal:** Real-time mobile alerts and "unlimited" free image hosting.

---

#### **Month 3: Operations & Launch**
*Focus: Financial tracking, project data, and workforce management.*

* **Sprint 5 (Weeks 9-10): Financials (DP Tracker) & Projects**
    * **Week 9:** Build the **Lead Milestone (DP Tracker)** ledger. Add progress bars for payments.
    * **Week 10:** Build the **Project Listing Gallery** and "Other Materials" library for Agent Guides.
    * **Goal:** You can now track the money and provide training resources to agents.
* **Sprint 6 (Weeks 11-12): Workforce & UI Polish**
    * **Week 11:** Implement **Workforce Management** (Team CRUD) and the Licensing Tracker.
    * **Week 12:** Final UI polish (Shadcn/UI components), IT Ticketing form, and Vercel deployment.
    * **Goal:** The system is ready for the first batch of users.

---

### 💡 Strategy for the "4-Hour Evening"
Since you’re already coding all day, use these **Software Engineer "Cheat Codes"** to stay productive:

1.  **The 20-Minute "Warm-up":** Don't start coding immediately. Spend the first 20 minutes reviewing your TDD and the specific JIRA-style task for the night.
2.  **No-Code Weekends:** Use Saturdays for "Deep Work" (Architecting DB schemas or complex AI prompts). Use weekday evenings for "UI/Frontend" tasks which are usually less mentally taxing.
3.  **The "Context Carry-over":** Before you close your laptop at night, leave a `TODO:` comment in your code exactly where you need to start the next day. This kills the "start-up friction."
4.  **Leverage Shadcn/UI:** Do not build components from scratch. Use **Shadcn** or **Radix UI** to save 40+ hours of CSS work.

### 🛑 Buffer & Health Check
* **Week 13 (Optional):** Keep this as a "Buffer Week." In real estate, requirements often shift (e.g., a new field needed for Pag-IBIG processing). 
* **The "Burnout Rule":** If your full-time job has a "crunch week," **skip the side project.** Missing 3 days won't kill the project; burning out will.

Does this 12-week pace feel realistic given your current workload at your day job?