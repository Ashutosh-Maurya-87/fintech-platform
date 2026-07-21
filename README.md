# FinTech OS - Enterprise Loan Origination & Management System (LOS/LMS)
## *Full-Stack FinTech Monorepo for Financial Institutions*

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development Guide](#development-guide)
- [Contributing](#contributing)

---

## 📝 Overview

A modern, production-grade full-stack FinTech application engineered by Ashutosh Maurya for financial institutions. It streamlines the complete lifecycle of a loan—from multi-step borrower origination and underwriting review to dynamic portfolio metrics tracking, secure loan repayments, and backend RESTful architectures.

**FinTech OS** provides:
- **Loan Origination System (LOS):** Streamlined intake forms with multi-step borrower application wizards
- **Loan Management System (LMS):** Comprehensive portfolio management with underwriting approvals and collections monitoring
- **Real-time Analytics:** Dynamic KPI dashboards tracking portfolio metrics, pending reviews, and loan statuses
- **Secure Payment Processing:** Interactive repayment dialogs with overpayment protection and multi-channel payment logs

---

## 🚀 Key Features

### Frontend Features
- **FinTech OS Dashboard Layout:** Responsive sidebar navigation managing overview metrics, loan origination workflows, and active loan management tables
- **Multi-Step Borrower Application Wizard:** Breadcrumb step tracker (Personal Info → Loan Details → Review & Confirm) with strict form state validation guards preventing premature submissions
- **Portfolio Overview Metrics:** Real-time KPI summary cards dynamically tracking:
  - Total applications
  - Pending underwriting reviews
  - Approved volumes
  - Total active portfolio funds
- **Loan Origination System (LOS):** Streamlined intake forms mapped securely to backend API services with automated default application statuses
- **Loan Management System (LMS):** Comprehensive portfolio tables supporting:
  - Secure document reference URL attachments
  - Underwriting approvals
  - Escrow tracking
  - Collections monitoring
- **Loan Repayment Modal:** Interactive repayment dialog featuring:
  - Live remaining balance checks
  - Overpayment protection
  - Multi-channel payment method logs (Bank Transfer, Credit Card, ACH, etc.)

### Backend Features
- **RESTful API Architecture:** Clean controller-service routing model supporting full CRUD operations for loans and repayments
- **Loan Lifecycle Endpoints:** Dedicated routes for:
  - Creating loan applications
  - Updating underwriting statuses
  - Fetching portfolio analytics
  - Processing installment payments
- **Data Validation & Error Handling:** Robust middleware protecting database transactions and validating payload inputs against overpayments or missing parameters
- **Environment Security:** Secure configuration management using environment variables for database URIs and port bindings
- **Database Persistence:** MongoDB/Mongoose ODM with support for loan models, borrower profiles, and transaction logs

---

## 🛠️ Tech Stack

### Frontend Stack
| Component           | Technology        | Version |
|---------------------|-------------------|---------|
| **Core Framework**  | React.js          | v19.2.7 |
| **Routing**         | React Router      | v7.18.1 |
| **Styling**         | Tailwind CSS      | v4.3.3  |
| **CSS Build Tool**  | Tailwind CSS Vite | v4.3.3  |
| **Build Tool**      | Vite              | v8.1.1  |
| **HTTP Client**     | Axios             | v1.18.1 |
| **Form Validation** | Zod               | v4.4.3  |
| **UI Icons**        | Lucide React      | v1.25.0 |
| **Linting**         | ESLint            | v10.6.0 |

### Backend Stack
| Component              | Technology         | Version    |
|------------------------|--------------------|------------|
| **Runtime**            | Node.js            | Latest LTS |
| **Framework**          | Express.js         | v5.2.1     |
| **Database**           | MongoDB + Mongoose | v9.8.0     |
| **CORS Middleware**    | cors               | v2.8.6     |
| **Environment Config** | dotenv             | v17.4.2    |
| **Request Parsing**    | body-parser        | v2.3.0     |
| **Dev Server**         | Nodemon            | v3.1.14    |

---

## 📂 Repository Structure

```text
fintech-platform/
│
├── 📁 loan-system-frontend/                        # React.js client application (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                              # Reusable UI components
│   │   │   │   ├── BorrowerApplicationWizard.jsx    # Multi-step form wizard
│   │   │   │   ├── DataTable.jsx                    # Portfolio data table
│   │   │   │   ├── InputFields.jsx                  # Form input components
│   │   │   │   ├── LoanReviewModal.jsx              # Review & confirm modal
│   │   │   │   └── StatsOverview.jsx                # KPI summary cards
│   │   │   └── layout/
│   │   │       └── DashboardLayout.jsx              # Main layout wrapper with sidebar
│   │   ├── features/
│   │   │   ├── application/
│   │   │   │   └── loanForm.jsx                     # Loan application form
│   │   │   ├── auth/                                # Authentication features (TBD)
│   │   │   └── management/
│   │   │       └── LmsDashboard.jsx                 # Loan management dashboard
│   │   ├── pages/
│   │   │   └── Overview.jsx                         # Portfolio metrics overview page
│   │   ├── services/
│   │   │   ├── apiClient.js                         # Axios instance configuration
│   │   │   └── loanService.js                       # API endpoint wrappers
│   │   ├── store/                                   # Redux/State management (TBD)
│   │   ├── utils/                                   # Utility functions
│   │   ├── hooks/                                   # Custom React hooks (TBD)
│   │   ├── assets/                                  # Static images, icons
│   │   ├── App.jsx                                  # Root component with routing
│   │   ├── main.jsx                                 # Application entry point
│   │   ├── App.css                                  # Global styles
│   │   └── index.css                                # Tailwind CSS imports
│   ├── public/                                      # Static assets
│   ├── package.json
│   ├── vite.config.js                               # Vite build configuration
│   ├── eslint.config.js                             # ESLint configuration
│   ├── index.html                                   # HTML entry point
│   └── README.md
│
├── 📁 loan-system-backend/           # Node.js + Express server (API & Database)
│   ├── models/
│   │   └── Loan.js                                   # Mongoose loan schema
│   ├── utils/
│   │   ├── creditBureau.js                           # Credit bureau integration
│   │   ├── financialCalculator.js                    # Financial calculations
│   │   └── loanCalculator.js                         # Loan-specific calculations
│   ├── server.js                                     # Express server entry point
│   ├── package.json
│   ├── .env.example                                  # Environment variables template
│   └── README.md
│
├── .gitignore                                        # Git ignore rules
├── README.md                                         # Project documentation (this file)
└── package.json                                      # Optional root monorepo config

```

---

## 🏗️ Project Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────┐
│         React Application (Vite)            │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │     DashboardLayout (Sidebar Nav)    │  │
│  ├──────────────────────────────────────┤  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │   Page Routes (React Router)    │ │  │
│  │  │                                 │ │  │
│  │  │  1. Overview Page               │ │  │
│  │  │     └─ StatsOverview (KPIs)     │ │  │
│  │  │                                 │ │  │
│  │  │  2. Application Page            │ │  │
│  │  │     └─ BorrowerApplicationWizard│ │  │
│  │  │        └─ LoanReviewModal       │ │  │
│  │  │                                 │ │  │
│  │  │  3. Management Dashboard        │ │  │
│  │  │     └─ DataTable                │ │  │
│  │  │     └─ LoanReviewModal          │ │  │
│  │  │                                 │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │      Services Layer                  │  │
│  │  - loanService.js (API calls)        │  │
│  │  - apiClient.js (Axios config)       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │      Data Validation (Zod)           │  │
│  │      Form State (React Hooks)        │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
         ↓ HTTP/REST Calls ↓
┌─────────────────────────────────────────────┐
│         Backend API Server                  │
└─────────────────────────────────────────────┘
```

### Backend Architecture

```
┌──────────────────────────────────────────────────┐
│         Express.js Server (Node.js)              │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │      Middleware Stack                      │ │
│  │  - CORS (Cross-Origin Resource Sharing)   │ │
│  │  - Body Parser (JSON/URL-encoded)         │ │
│  │  - Error Handler                          │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │      API Routes                            │ │
│  │  - POST /api/loans              (Create)  │ │
│  │  - GET  /api/loans/:id          (Read)   │ │
│  │  - PUT  /api/loans/:id          (Update) │ │
│  │  - GET  /api/loans              (List)   │ │
│  │  - DELETE /api/loans/:id        (Delete) │ │
│  │  - POST /api/repayments         (Payment)│ │
│  │  - GET  /api/analytics          (Stats)  │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │      Business Logic Layer                  │ │
│  │  - Loan validation                        │ │
│  │  - Credit bureau integration              │ │
│  │  - Financial calculations                 │ │
│  │  - Payment processing                     │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │      Data Access Layer                     │ │
│  │  - Loan Model (Mongoose)                  │ │
│  │  - Database operations                    │ │
│  │  - Data persistence                       │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
         ↓ MongoDB Connection ↓
┌──────────────────────────────────────────────────┐
│         MongoDB Database                         │
│  - Loan Collection                              │
│  - Transaction Logs                             │
│  - Borrower Profiles                            │
└──────────────────────────────────────────────────┘
```

---

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (Local or Atlas Cloud) - [Download/Create](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)
- **Text Editor/IDE** - VS Code recommended

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ashutosh-Maurya-87/fintech-platform.git
cd fintech-platform
```

### Step 2: Setup Backend Server

```bash
# Navigate to backend directory
cd loan-system-backend

# Install dependencies
npm install

# Create .env file and configure
# Copy the template below and update with your values
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fintech-db
NODE_ENV=development
EOF

# Start the backend server
npm run dev
# Server will start at http://localhost:5000
```

### Step 3: Setup Frontend Application (Open a new terminal)

```bash
# Navigate to frontend directory
cd loan-system-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
# Application will be available at http://localhost:5173
```

### ✅ Verification

Once both servers are running:
- **Frontend:** Visit [http://localhost:5173](http://localhost:5173)
- **Backend API:** Visit [http://localhost:5000/api/loans](http://localhost:5000/api/loans)
- Check browser console for any API errors

---

## 📱 Frontend Documentation

### Frontend Overview

The frontend is a modern React application built with **Vite**, **Tailwind CSS**, and **React Router v6**. It provides a responsive, intuitive interface for loan origination and management workflows.

### Running Frontend Locally

```bash
cd loan-system-frontend
npm install
npm run dev
```

The application will start at `http://localhost:5173`

### Available Frontend Scripts

| Command           | Purpose |
|-------------------|---------|
| `npm run dev`     | Start Vite dev server with hot-reload |
| `npm run build`   | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint code quality checks |

### Key Frontend Components

#### **DashboardLayout.jsx**
- Main layout wrapper with sidebar navigation
- Routes management
- Global state setup

#### **BorrowerApplicationWizard.jsx**
- Multi-step form wizard (3 steps)
- Form validation with Zod
- Step navigation and progress tracking

#### **StatsOverview.jsx**
- KPI cards showing portfolio metrics
- Real-time data from backend API
- Responsive grid layout

#### **DataTable.jsx**
- Portfolio loan listing
- Sortable columns
- Pagination support
- Action buttons (Edit, Delete, View)

#### **LoanReviewModal.jsx**
- Loan review and approval interface
- Repayment calculation display
- Status update controls

### API Integration (Frontend)

The frontend communicates with the backend through `loanService.js`:

```javascript
// Example API calls
import { loanService } from './services/loanService';

// Create new loan
const response = await loanService.createLoan(loanData);

// Fetch all loans
const loans = await loanService.fetchLoans();

// Get loan details
const loan = await loanService.getLoanById(loanId);

// Update loan status
await loanService.updateLoanStatus(loanId, newStatus);

// Process repayment
await loanService.processRepayment(loanId, repaymentData);
```

---

## ⚙️ Backend Documentation

### Backend Overview

The backend is a Node.js + Express REST API server that handles:
- Loan lifecycle management
- Database persistence with MongoDB/Mongoose
- Business logic for lending operations
- Financial calculations and validations
- Credit bureau integrations

### Running Backend Locally

```bash
cd loan-system-backend
npm install
npm run dev
```

The server will start at `http://localhost:5000`

### Available Backend Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start server with Nodemon (auto-restart) |
| `npm start` | Start production server |
| `npm test` | Run test suite (to be implemented) |

### Backend Project Structure

```
loan-system-backend/
├── models/
│   └── Loan.js                 # Mongoose loan schema & model
├── utils/
│   ├── creditBureau.js         # Credit score lookup integration
│   ├── financialCalculator.js  # EMI, interest calculations
│   └── loanCalculator.js       # Loan-specific business logic
├── server.js                   # Express app & routes
├── .env                        # Environment configuration
└── package.json
```

### Database Models

#### **Loan Model** (Mongoose Schema)

```javascript
{
  _id: ObjectId,
  borrowerName: String,
  borrowerEmail: String,
  loanAmount: Number,
  interestRate: Number,
  loanTerm: Number,        // in months
  status: String,           // 'Pending', 'Approved', 'Rejected', 'Active', 'Closed'
  startDate: Date,
  approvalDate: Date,
  documents: [String],      // Document URLs
  creditScore: Number,
  monthlyPayment: Number,
  remainingBalance: Number,
  repayments: [{
    date: Date,
    amount: Number,
    method: String         // 'Bank Transfer', 'Credit Card', 'ACH'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Backend Configuration

Create a `.env` file in the `loan-system-backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/fintech-db
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fintech-db

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Logging
LOG_LEVEL=debug
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

### Loan Endpoints

#### Create Loan Application
```http
POST /api/loans
Content-Type: application/json

{
  "borrowerName": "Ashu Test",
  "borrowerEmail": "as@example.com",
  "loanAmount": 50000,
  "interestRate": 7.5,
  "loanTerm": 60,
  "documents": ["url-to-document-1", "url-to-document-2"]
}
```

**Response:** `201 Created`
```json
{
  "_id": "loan-id",
  "borrowerName": "Ashu Test",
  "status": "Pending",
  "monthlyPayment": 944.56,
  "createdAt": "2026-07-21T10:00:00Z"
}
```

#### Get All Loans
```http
GET /api/loans?status=Pending&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "loans": [...],
  "total": 45,
  "page": 1,
  "limit": 10
}
```

#### Get Loan by ID
```http
GET /api/loans/:id
```

**Response:** `200 OK`
```json
{
  "_id": "loan-id",
  "borrowerName": "John Doe",
  "loanAmount": 50000,
  "status": "Pending",
  "monthlyPayment": 944.56,
  "remainingBalance": 50000,
  "repayments": []
}
```

#### Update Loan Status
```http
PUT /api/loans/:id
Content-Type: application/json

{
  "status": "Approved",
  "approvalDate": "2026-07-21"
}
```

**Response:** `200 OK`

#### Delete Loan
```http
DELETE /api/loans/:id
```

**Response:** `200 OK`

### Repayment Endpoints

#### Process Repayment
```http
POST /api/repayments
Content-Type: application/json

{
  "loanId": "loan-id",
  "amount": 1000,
  "method": "Bank Transfer"
}
```

**Response:** `201 Created`
```json
{
  "loanId": "loan-id",
  "amount": 1000,
  "remainingBalance": 49000,
  "date": "2026-07-21T10:00:00Z"
}
```

### Analytics Endpoints

#### Get Portfolio Analytics
```http
GET /api/analytics
```

**Response:** `200 OK`
```json
{
  "totalApplications": 150,
  "pendingReview": 25,
  "approved": 100,
  "totalPortfolioValue": 5000000,
  "averageInterestRate": 7.2
}
```

---

## ⚙️ Configuration

### Frontend Configuration

**Environment Variables** (`loan-system-frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=FinTech OS
```

**Vite Configuration** (`vite.config.js`):
- Configured with React plugin
- Tailwind CSS integration
- Auto JSX refresh

### Backend Configuration

See Backend Configuration section above for `.env` setup.

---

## 💻 Development Guide

### Frontend Development Workflow

1. **Component Development**
   - Create components in `src/components/`
   - Use functional components with hooks
   - Follow naming conventions: PascalCase for components

2. **Styling**
   - Use Tailwind CSS utility classes
   - Custom styles in component CSS files when needed
   - Follow responsive design patterns (mobile-first)

3. **API Integration**
   - Use `loanService.js` for all API calls
   - Handle errors with try-catch
   - Implement loading states

4. **Form Validation**
   - Use Zod for schema validation
   - Validate on submit
   - Display user-friendly error messages

5. **Routing**
   - Define routes in `App.jsx`
   - Use `useNavigate()` for programmatic navigation
   - Implement lazy loading for code splitting

### Backend Development Workflow

1. **Database Operations**
   - Use Mongoose models for data persistence
   - Implement proper error handling
   - Validate input data

2. **API Development**
   - Follow RESTful conventions
   - Use proper HTTP status codes
   - Implement comprehensive error responses

3. **Business Logic**
   - Keep logic separate from routes
   - Use utility functions for calculations
   - Add detailed comments for complex logic

4. **Testing**
   - Write unit tests for utility functions
   - Implement integration tests for API endpoints
   - Test edge cases and error scenarios

### Code Quality

**Frontend:**
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

**Best Practices:**
- Use meaningful variable names
- Keep components small and focused
- Implement error boundaries
- Log important events for debugging
- Use semantic HTML

---

## 🤝 Contributing

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Ashutosh-Maurya-87/fintech-platform.git
   cd fintech-platform
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow code style guidelines
   - Write descriptive commit messages
   - Test your changes thoroughly

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit Pull Request**
   - Provide clear description of changes
   - Link related issues
   - Request review from maintainers

### Commit Message Convention

```
feat:   New feature
fix:    Bug fix
docs:   Documentation changes
style:  Code style changes (formatting, missing semicolons, etc.)
refactor: Code refactoring
perf:   Performance improvements
test:   Test additions or updates
chore:  Build process, dependencies, tools
```

### Code Style Guidelines

- **Indentation:** 2 spaces
- **Line Length:** Max 100 characters
- **Quotes:** Single quotes for strings
- **Semicolons:** Always use
- **Naming:**
  - Variables & functions: camelCase
  - Components: PascalCase
  - Constants: UPPER_SNAKE_CASE

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)

---

## 📄 License

Copyright (c) 2026 Ashutosh Maurya. All rights reserved.

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this file and its contents, via any medium, is strictly prohibited.
---

## 👥 Support

For questions, issues, or suggestions:
- **Issues:** Open an issue on GitHub
- **Discussions:** Use GitHub Discussions for general questions
- **Email:** ashumaurya486@gmail.com

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] User authentication & authorization
- [ ] Two-factor authentication (2FA)
- [ ] Advanced analytics dashboard
- [ ] Email notifications for loan status updates
- [ ] Mobile app (React Native)
- [ ] Automated credit score integration
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Audit logging system
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting & caching

### Known Issues
- Authentication system not yet implemented
- Email notifications pending SMTP configuration
- Mobile responsiveness needs testing on devices

---

**Last Updated:** July 21, 2026  
**Version:** 1.0.0  
**Maintainer:** Ashutosh Maurya

**Built with Ashutosh Maurya ❤️ using React.js + Vite and Tailwind Css**