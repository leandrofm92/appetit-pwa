# APPetit+ — Nutrition PWA

> A modern Progressive Web App connecting patients with nutritionists — built with Next.js 16, Supabase, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)

---

## Overview

APPetit+ is a SaaS nutrition platform that bridges the gap between nutritionists and their patients. Nutritionists manage clients and content through a dedicated panel, while patients access personalized meal plans, recipes, and nutritional guidance via a mobile-first PWA.

## Features

- **Patient App**
  - Personalized nutrition dashboard
  - Recipe library with search and filtering
  - Educational content feed
  - Subscription plans with Stripe integration

- **Nutritionist Panel**
  - Client management dashboard
  - Content and recipe publishing

- **Platform**
  - PWA — installable on iOS and Android
  - Authentication (login, register) via Supabase Auth
  - Role-based access control (patient vs. nutritionist)
  - Smooth animations with Framer Motion
  - Form validation with React Hook Form + Zod

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Backend & DB | Supabase (PostgreSQL + Auth + Storage) |
| PWA | @ducanh2912/next-pwa |
| Payments | Stripe |
| State | Zustand |
| UI | Radix UI + Lucide React |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |

## Project Structure

```
src/
  app/
    (app)/          — patient area (dashboard, recipes, search, content)
    (auth)/         — login & register
    (nutricionista)/— nutritionist panel
    planos/         — subscription plans
  components/
    layout/         — Header, BottomNav
    ui/             — reusable UI components
  lib/
    supabase/       — client & server Supabase helpers
```

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, STRIPE_SECRET_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

*Built with [Claude Code](https://claude.ai/code) — AI-accelerated development.*
