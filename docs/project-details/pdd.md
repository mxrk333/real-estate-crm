# Product Design Document: Real Estate ERP/CRM (ISRH)

## 1. Executive Summary

**Real Estate ERP/CRM** is an integrated Real Estate ERP and CRM designed to streamline property discovery and lead conversion. It leverages AI to prioritize high-intent buyers, protects agent data through advanced masking, and manages the entire sales lifecycle—from social media inquiry to final downpayment tracking and agent licensing.

---

## 2. User Roles & Access Control (RBAC)

To prevent "lead poaching" and ensure data integrity, the system uses a strict hierarchy of visibility.

| Role           | Visibility Scope | PII Access (Name/Phone/Email)        | Primary Focus                                    |
| -------------- | ---------------- | ------------------------------------ | ------------------------------------------------ |
| **Superadmin** | **Global**       | ✅ Full Access                       | Total oversight, system config, and audits.      |
| **Admin**      | **Operational**  | ❌ **Masked** (e.g., 0917\*\*\*\*89) | Inventory management and company-wide reporting. |
| **Manager**    | **Department**   | ✅ Full (Team Only)                  | Strategy, ROI, and recruitment pipeline.         |
| **Supervisor** | **Team**         | ✅ Full (Team Only)                  | Coaching agents and lead distribution.           |
| **Agent**      | **Personal**     | ✅ Full (Own Leads)                  | Lead nurturing and closing sales.                |
| **IT Admin**   | **System**       | ❌ Masked                            | Technical maintenance and bug resolution.        |

---

## 3. The Core Product: AI Lead Management

The heart of the system is a dynamic CRM that classifies leads based on behavior and profile.

### 3.1 AI Agent & Lead Scoring

The AI analyzes lead data (source, profile, and engagement) to assign a "Temperature":

- 🔥 **Hot:** High intent, complete profile, frequent interaction.
- ☀️ **Warm:** Interested but requires nurturing or document assistance.
- ❄️ **Cold:** No response or low budget/mismatch.

### 3.2 Status Pipeline & Source Tracking

- **Lead Journey:** Inquiring → PKS (Product Knowledge Seminar) → Site Tour → Reservation → Document Submission.
- **Lead Types:** Local, OFW, or Self-Employed.
- **Source Logging:** Tracks origin URLs from TikTok, Facebook, YouTube, and more.

---

## 4. Role-Specific Dashboard Epics

### 4.1 Epic: "The Closer’s Corner" (Agent Dashboard)

- **Next-Best-Action (NBA) Engine:** AI-prioritized "Top 5" tasks for the day.
- **Personal Commission Calculator:** Visualizes potential earnings based on the current pipeline.
- **Quick-Response Templates:** One-click WhatsApp/SMS triggers for PKS invites or follow-ups.

### 4.2 Epic: "The Team Pilot" (Supervisor Dashboard)

- **Lead Load Balancer:** View of "Hot" lead distribution across the team to prevent burnout.
- **"At-Risk" Flags:** Automated alerts for leads that haven't been contacted in 48 hours.
- **Real-Time Activity Feed:** Live updates on team successes (e.g., "Agent X just booked a Site Tour").

### 4.3 Epic: "The Strategy Room" (Manager Dashboard)

- **Source ROI Analytics:** Which platform (TikTok vs. FB) is actually closing sales?
- **Inventory Heatmap:** Sales velocity by location (Cavite, Batangas, Laguna, Rizal).
- **Recruitment Funnel:** Tracking new agents from "Applicant" to "Licensed Professional."

---

## 5. Operations & Workforce Management

### 5.1 Project & Model House Inventory

- **Location-Based Filtering:** Dynamic property listings for the Philippines market.
- **Media Gallery:** High-res images and videos for specific house models.

### 5.2 Communication & Memos

- **Memo Release:** Official digital announcements from Superadmin/Management.
- **Multimedia Messaging:** Internal chat supporting Voice Messages, Video, and Images for team-specific or company-wide updates.

### 5.3 Workforce & Resources

- **Licensing Tracker:** Monitors the licensing stages of new recruits.
- **Knowledge Base:** A "Materials & Resources" section for handbooks and quick links to training channels.

---

## 6. Financials & Technical Support

### 6.1 Downpayment (DP) Tracker

- A ledger for clients and agents to track payment milestones throughout the sales process, ensuring no client falls behind on their schedule.

### 6.2 IT Ticketing System

- **Direct Reporting:** Users can flag bugs or UI issues.
- **Resolution Pipeline:** IT Admins manage tickets to ensure 100% system uptime.

---

## 7. Data Security & Conflict Prevention

- **Duplicate Detection:** The system blocks the entry of a lead if the Phone/Email already exists, attributing the lead to the original agent.
- **PII Masking:** Admins see high-level trends but cannot see the contact details of leads assigned to specific agents/teams.

---
