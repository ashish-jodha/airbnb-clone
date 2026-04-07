# 🌍 Wanderlust | Airbnb Clone

[![Node.js](https://img.shields.io/badge/Node.js-v24_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Cloud_Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A full-stack property rental web application featuring dynamic listings, user authentication, and secure cloud-based session management. 

---

## 📌 Overview

Wanderlust is a complete MVC (Model-View-Controller) application built to handle the core functionalities of a property rental platform. It utilizes server-side rendering and a robust Node.js/Express backend to deliver a fast, responsive, and secure user experience.

## ✨ Core Features

* **Property Management:** Authenticated users can perform full CRUD (Create, Read, Update, Delete) operations on their own property listings.
* **Interactive Reviews:** Users can leave ratings and comments on properties.
* **Secure Authentication:** User registration, login, and protected routes managed via Passport.js.
* **Persistent Cloud Sessions:** User login states are securely saved to MongoDB Atlas, keeping users logged in across server restarts.
* **Responsive UI:** Mobile-first design implemented using Tailwind CSS.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Backend** | Node.js (v24 LTS), Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | Passport.js, Local Strategy |
| **Session Management** | express-session, connect-mongo (v6) |
| **Frontend** | EJS, EJS-Mate, Tailwind CSS (v4) |
| **Deployment** | Render Cloud Hosting |

---

## 🏗️ Architecture & Implementation Details

### Backend Pipeline & Security
* **Middleware Structure:** Because HTTP is stateless, `express-session` is utilized to maintain state. The middleware pipeline is strictly ordered to initialize sessions before authentication (`passport`) and UI notifications (`connect-flash`).
* **Environment Segregation:** Sensitive credentials (database URIs, session secrets) are isolated using `dotenv` locally and secured via environment variables in production.
* **Data Security:** Implemented salted password hashing via `passport-local-mongoose` before storing user data in the database. Cookies are configured with `httpOnly: true` to prevent Cross-Site Scripting (XSS) access.

### Frontend & Server-Side Rendering (SSR)
* **Templating:** Utilized EJS and EJS-Mate to create a modular layout system, reducing code duplication and injecting dynamic views into a unified boilerplate structure.
* **Error Handling & Fallbacks:** Asynchronous route operations are wrapped in custom error-handling functions. A global fallback route acts as a safety net, injecting default `locals` variables to ensure the UI successfully renders a friendly 500 error page during database timeouts or unexpected crashes.

### Database & Deployment
* **MongoDB Integration:** Mongoose ODM is used to enforce strict data schemas and manage relational references between Users, Listings, and Reviews.
* **Modern Session Storage:** Integrated `connect-mongo` v6 to transition session storage from local server memory to the cloud database, ensuring session persistence.
* **Cloud Deployment:** The application is deployed via Render. The server is configured to accept dynamically assigned deployment ports (`process.env.PORT`) and is locked to the Node `v24.12.0` engine in the `package.json` to ensure exact parity between local development and the live production environment.
