# Water Polo Stats API

Express + Prisma + PostgreSQL backend for tracking water polo game statistics.

## Setup
```bash
npm install
cp .env.example .env  # Add DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing tokens |
| `PORT` | Server port (default: 8000) |

## Scripts

- `npm run dev` — Development server
- `npm run build` — Build for production
- `npm start` — Run production build
