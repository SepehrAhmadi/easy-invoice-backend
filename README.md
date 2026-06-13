# Easy Invoice Backend

A REST API for managing invoices, products, and business data. Built with Node.js, Express, and MongoDB.

## Features

- JWT authentication with access and refresh tokens
- Role-based access control (Admin, Editor, User)
- Invoice management with line items and print support
- Master data: companies, brands, categories, products
- Reports for packaging and company data
- User profiles with avatar upload
- Dashboard summary endpoint
- Request logging and centralized error handling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens, bcrypt
- **Other:** CORS, Multer, cookie-parser

## Prerequisites

- Node.js (v18 or later recommended)
- MongoDB (local instance or MongoDB Atlas)

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd easy-invoice-backend
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp example.env .env
```

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (`develop`, `production`, etc.) |
| `PORT` | Server port (default: `3500` if not set) |
| `ACCESS_TOKEN_SECRET` | Secret for signing access tokens |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens |
| `DATABASE_ATLAS_URI` | MongoDB connection string (used by the app) |
| `DATABASE_LOCAL_URI` | Optional local MongoDB URI |

Generate secure token secrets in Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. CORS (optional)

If your frontend runs on a different origin, add it to `config/allowedOrigins.js`.

### 4. Run the server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

The server starts after MongoDB connects. Default URL: `http://localhost:3500` (or your `PORT` value).

### 5. Health check

```bash
GET /health
```

## Authentication

Public routes:

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/register` | Create a new user |
| POST | `/auth` | Login |
| POST | `/refresh` | Refresh access token |
| POST | `/logout` | Logout |

Protected routes require an `Authorization` header:

```
Authorization: Bearer <access_token>
```

## API Overview

All routes below require a valid JWT unless noted.

| Prefix | Description |
|--------|-------------|
| `/dashboard` | Dashboard data |
| `/profile` | User profile and password |
| `/dropdown` | Dropdown/select options |
| `/base/company` | Companies |
| `/base/brand` | Brands |
| `/base/category` | Categories |
| `/base/product` | Products |
| `/operation/invoice` | Invoices and invoice items |
| `/report/packaging` | Packaging reports |
| `/report/company` | Company reports |

Uploaded files are served from `/uploads`.

## Project Structure

```
├── config/          # Database, CORS, roles
├── controllers/     # Route handlers
├── middleware/      # Auth, logging, errors, file upload
├── model/           # Mongoose schemas
├── routes/          # Express routes
├── uploads/         # User-uploaded files
├── public/          # Static assets
├── views/           # HTML views (404 page)
├── logs/            # Request and error logs
└── server.js        # App entry point
```

## Roles

| Role | Code |
|------|------|
| Admin | 1010 |
| Editor | 1011 |
| User | 1012 |

Some endpoints (e.g. creating products or invoices) are restricted to Admin or Editor roles.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the server |
| `npm run dev` | Start with nodemon |

## License

ISC
