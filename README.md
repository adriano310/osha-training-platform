# OSHA Training Booking Platform

A web-based platform for managing in-person OSHA safety training sessions.  
Clients can browse available trainings and submit booking requests, while administrators manage requests, scheduling, and client records.

## Core Features
- Client-facing training browsing and booking requests
- User authentication with role-based access (client vs admin)
- Administrative dashboard for managing requests and schedules
- End-to-end workflow from request submission to approval

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js App Router + Route Handlers
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Custom admin cookie session auth

## Vercel Deployment Checklist
1. Create a hosted PostgreSQL database such as Vercel Postgres, Neon, or Supabase.
2. Add the environment variables from `.env.example` to your Vercel project.
3. Run `npm install` and `npm run build` locally to verify the app before pushing.
4. For a fresh hosted database, run `npx prisma db push` once to sync the schema.
5. Deploy the repository to Vercel and test the booking form, contact form, and admin login.

## Milestones
- **End of February:** Core client pages and navigation
- **End of March:** Authentication and admin dashboard
- **End of April:** Connected client–admin workflows
- **End of Semester:** MVP + testing

## Status
In active development
