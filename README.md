# Gigflow — Smart Leads Dashboard

Full-stack MERN lead management dashboard with JWT auth, RBAC, advanced filtering, pagination, CSV export, and a premium dark UI (Growaz-inspired) built with React, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn-style UI, Framer Motion, React Three Fiber |
| Backend | Node.js, Express, TypeScript, MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| DevOps | Docker, Docker Compose |

## Documentation

- **[Assignment checklist](docs/ASSIGNMENT_CHECKLIST.md)** — verify every requirement before submit
- **[API reference](docs/API.md)**

## Features

- **Landing page** at `/` with Sign in & Get started (Growaz-inspired)
- User registration & login with JWT
- Protected routes & auth middleware
- Lead CRUD (create, read, update, delete)
- Filter by status, source; search by name/email; sort latest/oldest (combined filters)
- Server-side pagination (10 per page)
- Debounced search (400ms)
- CSV export with current filters
- Role-based access: **Admin** (delete leads), **Sales** (manage leads)
- Dark mode toggle (bonus)
- Three.js particle background + Framer Motion animations

## Project Structure

```
Gigflow/
├── backend/          # Express API
├── frontend/         # React dashboard
├── docker-compose.yml
├── .env.example
└── docs/API.md
```

## Quick Start (Local)

### Prerequisites

- Node.js 20+
- MongoDB running locally (or use Docker for MongoDB only)

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

### Seeded accounts (when `SEED_DEMO_DATA=true`)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gigflow.com` | `Admin@123456` |
| Sales | `sales@gigflow.com` | `Sales@123456` |

18 demo leads are inserted on first run (skipped if leads already exist). Register more users via `/register`.

## Docker

```bash
cp .env.example .env
# Edit JWT_SECRET in .env
docker compose up --build
```

- Frontend: http://localhost
- API: http://localhost:5000/api
- MongoDB: localhost:27017

## API Documentation

See [docs/API.md](docs/API.md).

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | `development` or `production` |
| `PORT` | API port (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `CORS_ORIGIN` | Allowed origins (comma-separated) |
| `SEED_ADMIN_EMAIL` | Optional admin seed email |
| `SEED_ADMIN_PASSWORD` | Optional admin seed password |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base URL (e.g. `http://localhost:5000/api`) |

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| backend | `npm run dev` | Dev server with hot reload |
| backend | `npm run build` | Compile TypeScript |
| frontend | `npm run dev` | Vite dev server |
| frontend | `npm run build` | Production build |

## License

MIT
