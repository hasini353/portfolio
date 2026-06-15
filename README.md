# Premium Engineering Portfolio & System Design Sandbox

A complete, production-ready MERN Stack portfolio website custom-tailored for recruiters from leading tech companies (Google, Microsoft, Amazon, Atlassian, Adobe, ServiceNow, and high-growth startups).

This website showcases B.Tech IT engineering credentials, internships, achievements, and detailed project case studies complete with **interactive system design, database, API flow, and deployment diagrams**.

---

## ⚡ Key Features

1. **Cinematic Loading Screen:** Terminal boot diagnostic sequence loading simulated assets.
2. **Interactive Skill Universe:** Neon glowing matrix grouping languages, cloud databases, systems design, and AI/ML categories.
3. **Dedicated Case Studies:** Deep-dives into **DigiDiary** and **Career Advisor** containing **live SVG diagrams** (System Architecture, DB Schemas, API Flow Paths, Deployment Topologies) that respond to click filters.
4. **System Design Playground:** In-browser interactive sandboxes showing round-robin load distribution, Redis caching hits/misses, and JWT authorization structures.
5. **AWS Cloud Pipeline:** A simulator mapping data flow from S3 storage, serverless AWS Lambda triggers, SageMaker inferences, and CloudWatch telemetry monitors.
6. **AI/ML Lab Simulation:** A terminal console sandbox letting users tune epochs and learning rates to watch neural networks converge in real time.
7. **Coding Analytics Dashboard:** LeetCode statistics (400+ solved, rating: 1544) plotted using custom responsive vector charts.
8. **Recruiter contact portal:** Form inputs validation saving messages to MongoDB.
9. **Admin Panel Control:** Secure administration console (protected by JWT token signatures) supporting analytics graphs, message management, and full CRUD operations (add/edit/delete) for projects, blogs, and skills.

---

## 🏗️ Architecture

```
pf/
├── package.json               # Root config for concurrent development
├── README.md                  # Setup & Deployment Guide
├── .env.example               # Root template for environment variables
├── backend/
│   ├── package.json
│   ├── server.js              # Express app entry point
│   ├── config/
│   │   ├── db.js              # Mongoose connection & local file DB fallback
│   │   ├── localDb.js         # Fallback database storage system
│   │   └── seed.js            # Auto-seeder for resume data
│   ├── models/                # Database schemas (User, Project, Blog, Skill, Cert, etc.)
│   ├── controllers/           # MVC controllers
│   ├── routes/                # Express API endpoints
│   └── middleware/            # JWT validation, visitor tracking logs
└── frontend/
    ├── package.json
    ├── vite.config.js         # Vite proxy configurations
    ├── tailwind.config.js     # Premium dark theme configurations
    ├── index.html
    └── src/
        ├── index.css          # Global styles, glassmorphism, animations
        ├── main.jsx
        ├── App.jsx            # React Router shell
        ├── components/        # Particles canvas, loader transitions, layout navbar/footer
        ├── pages/             # All interactive views (System Design, AWS, AI Lab, Admin dashboard)
        ├── services/          # HTTP adapter client
        └── utils/             # Lightweight Markdown parser and chart SVGs
```

---

## 🛡️ Database Fallback Layer (High-Reliability Mode)

To allow the application to run **instantly out-of-the-box** without requiring MongoDB installation or Atlas credentials, the database adapter is written with a high-reliability fallback.
* If a valid `MONGO_URI` is specified, it connects securely to MongoDB.
* If no database URI is provided or connection attempts timeout, it seamlessly falls back to a **local JSON database engine** (`backend/config/localDb.js`), reading and writing data records under the `backend/data/` folder. All features, logins, and dashboard CRUD operations remain **100% operational**.

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file inside the root directory:

```env
# Port for backend service
PORT=5000

# MongoDB URI (Leave empty to use the local JSON file database fallback)
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT Secret for session signatures
JWT_SECRET=your_jwt_secret_key_here
```

---

## 🚀 Getting Started (Local Setup)

### 1. Install Dependencies
Execute the command in the root folder to install all root, backend, and frontend packages:
```bash
npm run install-all
```

### 2. Run the Application
Execute the command in the root folder to boot both the Express server (port 5000) and Vite React app (port 3000) concurrently:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Admin Console Credentials
The database seeder automatically bootstraps administrative login credentials on startup if the database is empty:
* **Admin User:** `admin@hasini.dev`
* **Secret Password:** `admin12345`

*To modify the seeded dataset or update blogs, navigate to the Admin Shield icon in the top right navbar.*

---

## 🛜 Production Deployment

### 💻 Frontend (Vercel)
Vite React builds static files:
1. Set the root build command to `npm run build` and publish directory to `dist`.
2. Configure rewriting rules in `vercel.json` if using client router redirects.

### ⚙️ Backend (Render / Heroku)
Deploy the Node/Express service:
1. Configure start script: `node backend/server.js`.
2. Bind the port parameter dynamically using `process.env.PORT`.
3. Set your production `MONGO_URI` and `JWT_SECRET` key variables under Render Dashboard settings.
