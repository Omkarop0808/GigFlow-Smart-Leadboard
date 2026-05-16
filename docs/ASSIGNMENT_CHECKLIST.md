# Smart Leads Dashboard — Assignment Checklist

Use this before submission. Check each box manually in the app and repo.

**Quick test accounts** (with `SEED_DEMO_DATA=true`):

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gigflow.com` | `Admin@123456` |
| Sales | `sales@gigflow.com` | `Sales@123456` |

**Run locally:** `backend` → `npm run dev` · `frontend` → `npm run dev` · MongoDB on `127.0.0.1:27017`

---

## Tech stack

- [ ] **React + TypeScript** — `frontend/src/**/*.tsx`, no plain `.js` app code
- [ ] **Tailwind CSS** — styling via Tailwind v4 (`frontend/src/index.css`)
- [ ] **Node + Express + TypeScript** — `backend/src/**/*.ts`
- [ ] **MongoDB + Mongoose** — `backend/src/models/`
- [ ] **Interfaces/types defined** — `frontend/src/types/`, `backend/src/types/`
- [ ] **Minimal `any`** — grep project; only justified uses

---

## 1. Authentication

| Requirement | How to verify | Pass |
|-------------|---------------|------|
| User registration | `/register` → create account → lands on dashboard | ☐ |
| User login | `/login` with seeded admin | ☐ |
| Protected routes | Visit `/dashboard` logged out → redirect to login | ☐ |
| Password hashing (bcrypt) | `backend/src/controllers/authController.ts` uses `bcrypt.hash` | ☐ |
| Auth middleware | API without token → 401; `Authorization: Bearer` works | ☐ |
| JWT handling | Token in `localStorage`, sent on API calls | ☐ |
| Validation & errors | Bad email/password shows error UI | ☐ |

---

## 2. Leads CRUD

| Field / action | How to verify | Pass |
|----------------|---------------|------|
| Name, Email, Status, Source, Created At | Visible in table & detail view | ☐ |
| Status: New, Contacted, Qualified, Lost | Create/edit dropdowns | ☐ |
| Source: Website, Instagram, Referral | Create/edit dropdowns | ☐ |
| Create lead | **Create Lead** → save → appears in list | ☐ |
| Update lead | Edit lead → change status → saved | ☐ |
| Delete lead | **Admin only** — trash icon works | ☐ |
| Sales cannot delete | Login as `sales@gigflow.com` — no delete button | ☐ |
| View list | Dashboard table with seeded leads | ☐ |
| View single | Eye icon → detail page | ☐ |

---

## 3. Advanced filtering & search

Test **combined** filters (all at once):

- [ ] Filter **Status** = Qualified  
- [ ] Filter **Source** = Instagram  
- [ ] **Search** = `Rahul` (or partial name/email)  
- [ ] **Sort** = Latest / Oldest  
- [ ] Results update correctly when all filters applied together  
- [ ] **Debounced search** — type fast; API not called every keystroke (~400ms delay)

---

## 4. Pagination

- [ ] Exactly **10 leads per page** (if total > 10)
- [ ] **Next / Prev** works
- [ ] Metadata shown (page X of Y, total count)
- [ ] Backend uses skip/limit — inspect Network tab: `page=1`, `page=2`
- [ ] API response includes `pagination` object — see `docs/API.md`

---

## 5. Frontend UI

- [ ] **Responsive** — resize to mobile; usable layout
- [ ] **Reusable components** — `components/ui/`, `components/leads/`
- [ ] **Folder structure** — `pages/`, `hooks/`, `services/`, `context/`
- [ ] **Loading states** — skeletons while fetching leads
- [ ] **Empty states** — filter until no results → empty message
- [ ] **Error UI** — stop backend → friendly error (not blank screen)
- [ ] **Form validation** — submit empty lead form → field errors
- [ ] **Landing page** — `/` with Sign in, Get started, Growaz-style hero

---

## 6. API standards

- [ ] REST routes: `/api/auth/*`, `/api/leads/*`
- [ ] Status codes: 200, 201, 400, 401, 403, 404
- [ ] Centralized errors — `backend/src/middleware/errorHandler.ts`
- [ ] Request validation — express-validator on routes
- [ ] Response shape — `{ success, message, data }` / `{ pagination }`

---

## Mandatory extras

| Feature | How to verify | Pass |
|---------|---------------|------|
| Debounced search | Network tab: fewer requests while typing | ☐ |
| CSV export | **Export CSV** downloads file with filtered leads | ☐ |
| RBAC Admin | Admin can delete leads | ☐ |
| RBAC Sales | Sales can create/edit/view, not delete | ☐ |
| Docker | `docker compose up --build` (Mongo + API + frontend) | ☐ |

---

## Bonus

- [ ] **Dark mode toggle** — sun/moon in dashboard header; theme persists

---

## Submission package

- [ ] GitHub repo URL (public or shared)
- [ ] Updated resume
- [ ] `README.md` — setup, env, features
- [ ] `.env.example` — root, `backend/`, `frontend/` (no real secrets)
- [ ] `docs/API.md` — API documentation
- [ ] Setup instructions work on a fresh clone
- [ ] Deployment link (optional but preferred)
- [ ] Email: **ritik.yadav@servicehive.tech**  
      Subject: `MERN Internship Assignment Submission - Your Name`
- [ ] **2‑min demo video** — follow `docs/VIDEO_DEMO_SCRIPT.md`

---

## Automatic rejection — avoid these

- [ ] No plain JavaScript-only source (TypeScript required)
- [ ] No hardcoded API URLs in components (use `VITE_API_URL`)
- [ ] No missing loading/error/empty states
- [ ] No giant single-file components (split pages/components)
- [ ] `.env` not committed (only `.env.example`)

---

## File map (reviewer quick reference)

```
backend/src/
  controllers/   authController, leadController
  middleware/    auth, errorHandler, validate
  models/        User, Lead
  routes/        authRoutes, leadRoutes
  validators/    authValidator, leadValidator
  config/        seedDemoData, database, env

frontend/src/
  pages/         LandingPage, Dashboard, Login, Register, Lead*
  components/    landing/, leads/, ui/, layout/
  hooks/         useLeads, useDebounce
  services/      api.ts
  context/       AuthContext, ThemeContext
```

**Last verified:** _______________  **Name:** _______________
