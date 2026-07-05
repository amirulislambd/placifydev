# 🚀 Playcifydev - The Modern Job Hunting Portal

Playcifydev is a full-featured job hunting portal that bridges the gap between job seekers and employers. It streamlines job discovery, application management, and company recruitment—all in one unified platform. The system supports role-based dynamic dashboards, subscription-based premium features, and an advanced management toolkit for platform administrators.

## 🌟 Key Features

### 👤 1. Seeker Dashboard
- **Profile Management:** Create and maintain a personal profile with skills, bio, resume upload (PDF), and avatar.
- **Job Discovery:** Browse and search jobs with advanced filters (location, salary, job type, and category).
- **Application Tracking:** Apply to jobs directly, monitor application statuses in real-time (Applied, Under Review, Shortlisted, Rejected, Offered), and view historical records.
- **Analytics:** Visualized insights via Recharts (Pie/Bar charts) showing application status distribution.
- **Subscription Management:** Stripe-integrated billing to upgrade to Pro or Premium plans for unlocking unlimited applications.

### 🏢 2. Recruiter Dashboard
- **Company Management:** Register and edit company profiles (Logo, description, location, employee count).
- **Job Post Management:** Post, edit, close, or remove job listings with a rich text editor for responsibilities and requirements.
- **Applicant Tracking System (ATS):** Review applicant profiles, download resumes, and update applicant status with automated email notifications.
- **Usage Indicator:** Live limit-tracking based on the company's subscription plan (Free, Growth, Enterprise).

### 🛠️ 3. Admin Dashboard
- **User Management:** Monitor all platform users, manage roles (Seeker/Recruiter), and suspend or activate accounts.
- **Company Moderation:** Review, approve, or reject new company registrations.
- **Job Moderation:** Overview and moderate all active or closed job listings across the platform.
- **Revenue & Analytics:** Real-time metrics on user growth, job post distribution per category, and overall Stripe platform revenue.

---

## 🛠️ Tech Stack

**Client-Side:**
- React.js / Next.js
- Tailwind CSS
- Recharts (for Data Visualization)
- Framer Motion (for smooth animations)

**Server-Side & Database:**
- Node.js & Express.js
- MongoDB 

**Payment & Authentication:**
- Stripe Integration (Prorated subscription billing)
- Firebase Auth / JWT

---

## 📋 System Workflows

### 🔄 Application Status Flow
`Job Posted` ➡️ `Seeker Applies` ➡️ `Under Review` ➡️ `Shortlisted` ➡️ `Offered / Rejected`

### 💳 Subscription Tiers

#### For Job Seekers
| Plan | Price | Key Features |
| :--- | :--- | :--- |
| **Free** | $0/forever | Browse & save up to 10 jobs, apply to 3 jobs/month. |
| **Pro** | $19/month | Apply to 30 jobs/month, unlimited saved jobs, salary insights. |
| **Premium** | $39/month | Unlimited applications, profile boost, early access to jobs. |

#### For Recruiters
| Plan | Price | Key Features |
| :--- | :--- | :--- |
| **Free** | $0/forever | Up to 3 active job posts, basic applicant management. |
| **Growth** | $49/month | Up to 10 active job posts, applicant tracking, basic analytics. |
| **Enterprise**| $149/month | Up to 50 active job posts, advanced analytics, custom branding. |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/hireloop.git](https://github.com/amirulislambd/placifydev.git)
cd placifydev