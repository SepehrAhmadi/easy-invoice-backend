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
| `LOG_LEVEL` | Optional log level (`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`) |

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
| `/notification` | App notification |
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
├── services/        # App services
├── swagger/         # Swagger documentation
├── uploads/         # User-uploaded files
├── public/          # Static assets
├── views/           # HTML views (404 page)
├── logs/            # Request and error logs
└── server.js        # App entry point
```

## Logging

Request and error logging is handled by **Winston** and **Morgan**.

- **Morgan** captures every HTTP request and streams it into Winston.
- **Winston** writes logs to multiple transports depending on the environment:

| Transport | Environment | Details |
|-----------|-------------|---------|
| Console | Development | Colorized output |
| Daily rotate file (`logs/requests/`) | Development | HTTP-level logs, kept 14 days |
| Daily rotate file (`logs/errors/`) | Development | Error-level logs, kept 30 days |
| MongoDB `logs` collection | Always | All logs at `info` level and above |

Log level defaults to `info` and can be overridden with the `LOG_LEVEL` environment variable.

## Notifications

The notification service provides real-time and persistent notifications for CRUD operations across major entities in the system.

### Key Features
- **Real-time Delivery:** Notifications are instantly pushed to clients via **Socket.IO**.
- **Bilingual Support:** Every notification includes both English (`en`) and Farsi (`fa`) titles and messages.
- **Persistent Storage:** All notifications are saved in the `notifications` collection in MongoDB.
- **Automatic Triggering:** Notifications are automatically created when entities are created, updated, or deleted.

### Supported Entities
Notifications are triggered for the following operations:
- **Base Data:** Companies, Brands, Categories, and Products.
- **Operations:** Invoices.

### Notification Types
The system supports 15 specific notification types:
- `company_created`, `company_updated`, `company_deleted`
- `brand_created`, `brand_updated`, `brand_deleted`
- `category_created`, `category_updated`, `category_deleted`
- `product_created`, `product_updated`, `product_deleted`
- `invoice_created`, `invoice_updated`, `invoice_deleted`

## Swagger
Interactive API docs are available at:

```
http://localhost:<PORT>/api-docs
```

The docs are built with **swagger-jsdoc** and **swagger-ui-express** (OpenAPI 3.0). JSDoc annotations live in `swagger/docs/`:

```
swagger/
├── definition.js        # OpenAPI metadata, server URL, security scheme
├── setup.js             # swagger-jsdoc configuration
└── docs/
    ├── auth.docs.js
    ├── dashboard.docs.js
    ├── notification.docs.js
    ├── profile.docs.js
    ├── base/
    │   ├── brand.docs.js
    │   ├── category.docs.js
    │   ├── company.docs.js
    │   └── product.docs.js
    ├── dropdown/
    │   └── dropdown.docs.js
    ├── operation/
    │   ├── invoice.docs.js
    │   └── invoiceItem.docs.js
    └── report/
        ├── company.docs.js
        └── packaging.docs.js
```

All protected endpoints include a `bearerAuth` security scheme — use the **Authorize** button in Swagger UI to paste your JWT.

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
