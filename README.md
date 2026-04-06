# 🌍 Wanderlust | Full-Stack Airbnb Clone

[![Node.js](https://img.shields.io/badge/Node.js-v24_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Cloud_Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **A production-ready property rental platform.** Engineered from the ground up to demonstrate mastery of the modern Node.js ecosystem, MVC architecture, and secure cloud deployment. 

---

## 🏗️ Architecture & Engineering

This application was deliberately built without a heavy frontend SPA framework (like React) to showcase a deep understanding of server-side rendering, middleware pipelines, and robust backend infrastructure.

### 1. Backend Pipeline & State Management
* **MVC Architecture:** Routes, logic, and data models are strictly decoupled. 
* **Middleware Mastery:** HTTP is stateless, so `express-session` was implemented. A strict execution pipeline ensures sessions initialize *before* `passport` (for authentication) and `connect-flash` (for UI notifications).
* **Global Error Handling:** Wrapped all asynchronous operations in custom error-handling classes. A global fallback route acts as a safety net, injecting defensive `res.locals` variables to guarantee the UI renders a friendly 500 error page even during fatal database timeouts.

### 2. Security & Authentication
* **Passport.js Integration:** Implemented local strategies with salted password hashing for secure user serialization/deserialization.
* **Modern Cloud Sessions:** Bypassed default memory storage by integrating `connect-mongo` (v6). User login states are securely and permanently saved to the MongoDB Atlas cloud.
* **Environment Segregation:** Zero hardcoded secrets. Database URIs and Session Secrets are strictly isolated using `dotenv` locally and secured via Environment Variables in production.

### 3. Frontend & UI Engineering
* **Server-Side Rendering (SSR):** Utilized **EJS** and **EJS-Mate** to construct a DRY (Don't Repeat Yourself) layout structure, injecting dynamic views into a unified boilerplate.
* **Utility-First Styling:** Integrated **Tailwind CSS v4** directly into the build pipeline for a highly responsive, mobile-first design without the bloat of custom CSS files.
* **Defensive Rendering:** UI components (like navigation dropdowns) utilize strict variable checking (`locals.currUser`) to prevent the rendering engine from crashing if middleware is bypassed.

### 4. Production Deployment (Render)
* **Dynamic Environment Binding:** Engineered the server to dynamically accept Render's assigned ports (`process.env.PORT || 3000`), preventing boot timeouts.
* **Engine Locking:** Locked the `package.json` to the strict `Node v24.12.0 LTS` environment to guarantee perfect parity between the local development machine and the cloud production server.

---

## 🚀 Core Functionality

* **Complete Property CRUD:** Authenticated users can create, read, update, and delete global property listings.
* **Interactive Review System:** Users can leave star ratings and comments tied relationally to specific properties.
* **Strict Authorization:** Backend route protection prevents users from editing, deleting, or altering properties and reviews they do not own.
* **Persistent Authentication:** Users remain securely logged in across browser restarts and server redeployments via cloud cookies.

---

## 💻 Technical Stack Overview

| Category | Technologies Used |
| :--- | :--- |
| **Environment** | Node.js (v24.12.0 LTS) |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Auth & Security** | Passport.js, express-session, connect-mongo (v6) |
| **Frontend** | EJS, EJS-Mate, Tailwind CSS |
| **Deployment** | Render Cloud Hosting |
