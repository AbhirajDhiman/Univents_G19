# 🎉 UniVents – Event Management System

UniVents is a full-stack Event Management System (EMS) built as a campus marketplace-style platform where students, organizers, and administrators can discover, create, manage, and participate in events.

It is designed with modern UI/UX, role-based access, and a scalable architecture that supports event discovery, moderation, registration, and notifications.

## 🚀 Features

- **Role-based Access Control (RBAC)**: Admin, Organizer, Participant
- **Dashboards**: Role-specific dashboards with KPIs and event summaries
- **Event Lifecycle**: Create → Draft → Submit for Approval → Approved/Rejected → Archived
- **Event Discovery**: Search, filters, categories, and recommendations
- **Registration System**: Capacity management, join/cancel, attendance tracking
- **Moderation**: Admin event approval/rejection with audit logs
- **User Management**: Roles, status updates, suspensions/reactivations
- **Notifications**: In-app + email templates, announcements, reminders
- **Profile & Settings**: Personal info, preferences, dark/light mode
- **Responsive & Accessible**: Mobile-first, WCAG AA ready
- **Seed Data**: Preloaded users, events, categories, venues, and registrations

## 🛠️ Tech Stack

**Frontend**
- React + Vite + TypeScript
- Tailwind CSS v4 with shadcn/ui
- Framer Motion for animations
- React Router v6 for navigation

**Backend**
- Node.js + Express.js
- Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- JWT Authentication with role-based guards
- REST API Endpoints for users, events, registrations, notifications

**Other**
- ESLint + Prettier for code quality
- dotenv for environment configuration
- Jest (optional) for tests

## 📂 Project Structure
univents/
├── client/                  # Frontend (React + Vite + TS)
│   ├── src/
│   │   ├── components/      # UI components (e.g., buttons, cards)
│   │   ├── pages/           # Role-based pages (e.g., Admin, Organizer, Participant)
│   │   ├── routes/          # React Router v6 route definitions
│   │   └── styles/          # Tailwind CSS config & shadcn/ui styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.app.json
│   └── tailwind.config.ts
│
├── server/                  # Backend (Node.js + Express + Prisma)
│   ├── src/
│   │   ├── controllers/     # Express request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Authentication & validation functions
│   │   ├── prisma/          # Prisma schema & migration setup
│   │   └── utils/           # Helper functions/utilities
│   ├── .env.example         # Example environment variables
│   ├── package.json
│   └── bun.lockb            # bun package-lock file (if using bun)
│
├── prisma/                  # Database schema & seeding
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.ts              # Seed script to populate DB
│
├── .gitignore
├── README.md                # Project overview, setup, usage
├── components.json          # Design system config (if applicable)
├── eslint.config.js         # Linting setup (ESLint + Prettier)
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # Root TypeScript configuration
└── package-lock.json        # npm lock file (if using npm)


## 🔑 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Full access, manage users, approve/reject events, send announcements, settings |
| **Organizer** | Create/manage events, track registrations, view analytics |
| **Participant** | Discover events, register/cancel, track history in My Events |

## 📜 API Endpoints

**Auth**
- `POST /auth/signup` – Register user
- `POST /auth/login` – Authenticate and receive JWT
- `POST /auth/forgot-password` – Password reset flow

**Events**
- `GET /events` – List approved events (filters, search, pagination)
- `POST /events` – Create new event (Organizer only)
- `PATCH /events/:id` – Update event (Owner/Admin)
- `GET /events/:slug` – Event detail page

**Moderation (Admin)**
- `GET /moderation/events` – List pending events
- `PATCH /moderation/events/:id` – Approve/reject event

**Registrations**
- `POST /registrations` – Register for event
- `DELETE /registrations/:id` – Cancel registration
- `GET /registrations/event/:id` – Organizer/Admin view registrations

**Notifications**
- `POST /notifications` – Create announcement/template
- `GET /notifications` – Fetch user notifications

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (>=18)
- npm or yarn
- PostgreSQL (for production)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/univents.git
cd univents

### 2. Install dependencies
# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install

###3. 3. Environment Variables
Create a .env file in server/ based on .env.example:
DATABASE_URL="postgresql://user:password@localhost:5432/univents"
JWT_SECRET="your_secret_key"

### 4. Database Setup
bash
cd server
npx prisma migrate dev
npx prisma db seed


### 5. Run the App
bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev

App will be available at:

Frontend: http://localhost:5173

Backend: http://localhost:5000

🌱 Seed Data
The seed script creates:

1 Admin, 2 Organizers, 5 Participants

8 Categories, 4 Venues

12 Events (draft, pending, approved, archived)

40+ Registrations

3 Notification templates

Test Credentials:

Admin: admin@univents.com / admin123

Organizer: organizer1@univents.com / org123

Participant: user1@univents.com / user123

📊 Future Enhancements
Payment integration for ticketed events

Analytics dashboard with charts

Multi-language support (i18n)

Live chat / event Q&A

Calendar sync (Google/Outlook)

🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

📜 License
MIT License © 2025 UniVents

