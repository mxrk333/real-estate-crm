This **Technical Design Document (TDD)** serves as the engineering blueprint for the **Real Estate ERP/CRM**. It bridges the high-level goals of your PDD with the specific constraints of **DreamHost Shared Unlimited** hosting.

# Technical Design Document: Real Estate ERP/CRM

## 1. System Architecture Overview

The system follows a **Decoupled Client-Server Architecture** to optimize for DreamHost Shared Hosting limitations while providing a modern user experience.

- **Frontend:** React.js (Single Page Application).
- **Backend API:** Modular PHP (Restful API).
- **Database:** MySQL (Relational).
- **AI Integration:** Gemini 1.5 Flash via REST API.

---

## 2. Technical Stack Specifications

| Layer              | Technology            | Version      | Hosting Detail                                 |
| ------------------ | --------------------- | ------------ | ---------------------------------------------- |
| **Frontend**       | React + Vite          | 18.x / 5.x   | Build locally; deploy `dist` to `/public_html` |
| **Backend**        | PHP (Lumen or Slim)   | 8.2+         | Native DreamHost PHP runtime                   |
| **Database**       | MySQL                 | 8.0+         | Hosted on DreamHost MySQL Grid                 |
| **Authentication** | JWT (JSON Web Tokens) | Lcobucci/JWT | Stateless auth (no PHP sessions needed)        |
| **AI Processing**  | Google Gemini API     | v1.5 Flash   | Free tier (up to 15 RPM)                       |

---

## 3. Database Design (Data Schema)

Since we are tracking leads across different sources (TikTok, FB) and roles (Agent, Supervisor), the relational structure is critical.

### 3.1 Primary Entities

- **`users`**: `id`, `username`, `password_hash`, `role` (ENUM), `team_id`, `is_active`.
- **`leads`**: `id`, `full_name`, `phone_masked`, `email`, `source_url`, `assigned_to` (FK), `ai_score`, `status`.
- **`teams`**: `id`, `supervisor_id` (FK), `team_name`.
- **`dp_tracker`**: `id`, `lead_id` (FK), `total_amount`, `paid_amount`, `next_due_date`.

---

## 4. API & Integration Design

### 4.1 The PHP "Bridge" Logic

Because we cannot connect React directly to MySQL, PHP acts as the secure middleman.

- **Endpoint:** `POST /api/leads/score`
- **Logic Flow:** 1. Receive Lead Data from React.

2. PHP calls Gemini API with a specialized prompt.
3. Gemini returns a JSON score (e.g., `{ "score": 85, "class": "Hot" }`).
4. PHP saves the score and lead data into MySQL.

### 4.2 Security: Data Masking Implementation

To protect lead PII (Personally Identifiable Information) from Admins:

- **Frontend Logic:** React checks the `user.role` from the JWT.
- **Backend Logic:** The PHP API will redact strings before sending them to the client.
- _Formula:_ `substr($phone, 0, 4) . "****" . substr($phone, -2)`

---

## 5. Deployment Plan (Agile/Terminal)

### 5.1 Environment Setup

1. **Local:** Install Node.js (for React) and XAMPP/MAMP (for PHP/MySQL).
2. **Staging:** Create a subdomain `dev.yourdomain.com` on DreamHost for testing.
3. **Production:** Main domain `yourdomain.com`.

### 5.2 Terminal Deployment Script

We will use a **Post-Receive Hook** in Git. Whenever you run `git push dreamhost main`:

1. The server receives the code.
2. The script moves the PHP files to the `/api` folder.
3. The script moves the React `dist` files to the `/public_html` folder.

---

## 6. Testing Strategy (Agile Sprints)

- **Unit Testing:** Use **Jest** for React component logic.
- **API Testing:** Use **Postman** or **Insomnia** to verify PHP endpoints before connecting them to React.
- **User Acceptance (UAT):** Real agents test the "Closer's Corner" dashboard on their mobile phones to ensure field usability.

---

[Building a Full Stack CRM with PHP and AI](https://www.youtube.com/watch?v=8zh7ZEG9GEA)

This video is highly relevant as it demonstrates the exact process of building a functional CRM using PHP and AI tools for free, aligning perfectly with your goal of a cost-effective, AI-driven real estate hub.
