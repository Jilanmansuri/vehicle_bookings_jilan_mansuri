# 🚖 NexRide - Full Stack Vehicle Booking Management System

<div align="center">
  <h3>An Enterprise-Grade, Uber/Ola-style Vehicle Booking and Fleet Management Platform</h3>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</div>

## 📑 Table of Contents

- [Project Title](#-nexride---full-stack-vehicle-booking-management-system)
- [Project Description](#-project-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Running the Project](#-running-the-project)
- [API Structure](#-api-structure)
- [Authentication Flow](#-authentication-flow)
- [Database Design Overview](#-database-design-overview)
- [MongoDB Collections](#-mongodb-collections)
- [Middleware Overview](#-middleware-overview)
- [Validation System](#-validation-system)
- [Error Handling](#-error-handling)
- [Search / Filter / Pagination](#-search--filter--pagination)
- [Aggregation Features](#-aggregation-features)
- [Security Features](#-security-features)
- [Rate Limiting](#-rate-limiting)
- [API Response Format](#-api-response-format)
- [Deployment Ready Features](#-deployment-ready-features)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Screenshots Placeholder Section](#-screenshots-placeholder-section)
- [API Documentation Section](#-api-documentation-section)
- [Postman Collection Section](#-postman-collection-section)
- [Contributing Guidelines](#-contributing-guidelines)
- [Git Workflow](#-git-workflow)
- [Commit Naming Convention](#-commit-naming-convention)
- [License](#-license)
- [Author Section](#-author-section)

---

## 📝 Project Description

NexRide is a comprehensive, scalable, and highly secure vehicle booking management system designed to emulate the core functionalities of industry-leading ride-hailing applications like Uber and Ola. The platform seamlessly bridges the gap between passengers seeking reliable transportation and drivers offering their services. It features role-based access control, real-time fare estimation, geo-spatial driver tracking, and an extensive admin dashboard for fleet management and analytics. Built using the robust MERN stack, the application ensures high performance, maintainability, and scalability to handle thousands of concurrent ride requests.

---

## ✨ Features

### For Passengers (Riders)
* **Secure Onboarding:** Email verification and OTP-based secure login.
* **Ride Booking:** Select pickup/drop-off locations with Google Maps integration.
* **Fare Estimation:** Dynamic pricing algorithm based on distance, time, and vehicle category.
* **Ride Tracking:** View driver location and estimated time of arrival (ETA).
* **Payment Integration:** Cash or Wallet/Card integration for seamless checkout.
* **Rating System:** Rate drivers and provide feedback on completed rides.
* **Ride History:** Detailed pagination-supported list of all past and upcoming rides.

### For Drivers
* **Status Management:** Toggle online/offline status to start receiving ride requests.
* **Ride Requests:** Accept or reject incoming ride requests with upfront distance and payout details.
* **Navigation Tracking:** In-built map navigation from pickup to drop-off.
* **Earnings Dashboard:** Detailed daily, weekly, and monthly revenue analytics.

### For Administrators
* **Fleet Management:** Approve, suspend, or ban user and driver accounts.
* **Vehicle Verification:** Verify uploaded vehicle documents (Registration, Insurance).
* **Financial Analytics:** Aggregate revenue data, commission deductions, and payout logs.
* **System Settings:** Configure surge pricing parameters and base vehicle fares.

---

## 🛠 Tech Stack

* **Frontend:** React.js, Context API (State Management), Tailwind CSS, Axios, React Router Dom
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose (ODM)
* **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing
* **Location/Mapping:** Google Maps API (Geocoding, Distance Matrix)
* **Image Hosting:** Cloudinary / AWS S3
* **Validation:** Joi / Express-Validator

---

## 🏗 System Architecture

The system utilizes a modern, decoupled client-server architecture:

1. **Client Tier (React):** Single Page Application (SPA) consuming RESTful APIs, providing distinct interfaces for Riders, Drivers, and Admins.
2. **API Gateway / Application Tier (Express/Node):** Handles business logic, authentication, request validation, and routing. Exposes a strictly versioned RESTful API (`/api/v1/`).
3. **Data Tier (MongoDB):** A NoSQL database storing flexible JSON-like documents, utilizing GeoJSON objects for advanced geospatial querying to locate nearby drivers.

---

## 📂 Folder Structure

```text
nex-ride-platform/
├── backend/
│   ├── config/             # Database and environment configurations
│   ├── controllers/        # Route controllers (req, res handling)
│   ├── middleware/         # Custom middlewares (Auth, Error Handler, Logger)
│   ├── models/             # Mongoose schemas (User, Ride, Vehicle)
│   ├── routes/             # Express routes definitions
│   ├── utils/              # Helper functions, Error classes
│   ├── validations/        # Joi schema validations
│   ├── .env.example        # Environment variables template
│   └── server.js           # Express application entry point
├── frontend/
│   ├── public/             # Static assets (Favicons, manifest)
│   ├── src/
│   │   ├── assets/         # Images, global CSS
│   │   ├── components/     # Reusable React components (Buttons, Modals)
│   │   ├── context/        # React Context API providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts (Navbar, Sidebar, Footer)
│   │   ├── pages/          # Application views (Login, Home, Dashboard)
│   │   ├── services/       # Axios API client setup and calls
│   │   └── App.js          # Main React component and Router
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

---

## 🚀 Installation Guide

**Prerequisites:** Node.js (v16+), MongoDB (Local or Atlas account), Git.

1. **Clone the repository:**
```bash
git clone https://github.com/Jilanmansuri/vehicle_bookings_jilan_mansuri.git
cd vehicle_bookings_jilan_mansuri
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexride?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Payment Gateway (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

---

## ⚙️ Backend Setup

Once the `.env` file is configured, start the backend server:

```bash
cd backend

# For development with nodemon
npm run dev

# For production
npm start
```
*The server will start on `http://localhost:5000` (or your defined PORT).*

---

## 💻 Frontend Setup

To configure the frontend to talk to your backend, ensure the API Base URL is set correctly (e.g., in `frontend/src/config.js` or via `.env`). Then run:

```bash
cd frontend

# Start React development server
npm start
```
*The application will launch in your browser at `http://localhost:3000`.*

---

## 🏃 Running the Project

For a seamless development experience, you can run both the frontend and backend simultaneously using a tool like `concurrently` (if configured in the root `package.json`), or simply open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

---

## 🗺 API Structure

The backend follows RESTful API conventions. All routes are prefixed with `/api/v1`.

| Resource | Methods | Endpoints | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/auth/register` | Register a new user/driver |
| **Auth** | POST | `/auth/login` | Authenticate user & get token |
| **Auth** | GET | `/auth/me` | Get current logged in user |
| **Users** | GET, PUT, DEL | `/users`, `/users/:id` | Manage user profiles (Admin) |
| **Vehicles** | POST, GET | `/vehicles` | Add/list vehicles |
| **Rides** | POST | `/rides/book` | Create a new ride request |
| **Rides** | PUT | `/rides/:id/status` | Update ride status (accept, complete) |

---

## 🔑 Authentication Flow

1. **Client Request:** User submits credentials (email/password) to `/api/v1/auth/login`.
2. **Server Validation:** Express backend verifies credentials against hashed passwords in MongoDB.
3. **Token Generation:** A JWT is signed with a secret key, containing the user ID and role.
4. **Response:** The JWT is returned to the client and stored (e.g., HTTP-only cookie or local storage).
5. **Authorized Requests:** Subsequent requests to protected routes include the JWT in the `Authorization: Bearer <token>` header. The `protect` middleware validates the token before granting access.

---

## 🗄 Database Design Overview

The system uses a highly normalized document approach suitable for NoSQL, preventing deep nesting while maintaining fast read times. Geospatial indexes (`2dsphere`) are applied to location coordinates to quickly calculate nearest drivers.

---

## 📚 MongoDB Collections

1. **Users:** Stores authentication credentials, profile data, roles (`rider`, `driver`, `admin`), and current status.
2. **Vehicles:** Links to `driver_id`. Stores vehicle make, model, registration number, category (Mini, Sedan, SUV), and capacity.
3. **Rides:** The core transaction record. Stores `rider_id`, `driver_id`, pickup/drop-off GeoJSON coordinates, fare amount, status (`requested`, `accepted`, `in_progress`, `completed`, `cancelled`), and timestamps.
4. **Payments:** Stores transaction IDs, amounts, payment methods, and status linked to a specific `ride_id`.
5. **Reviews:** Stores ratings (1-5 stars) and text feedback given by riders to drivers (and vice versa) linked to a `ride_id`.

---

## 🛡 Middleware Overview

* `auth.js`: Verifies JWT tokens and checks user roles (e.g., `authorize('admin')`).
* `error.js`: Global error handling middleware that captures unhandled exceptions and formats them into standardized JSON responses.
* `logger.js`: Logs incoming request methods, URLs, and status codes for debugging.
* `advancedResults.js`: Processes queries for filtering, selecting, sorting, and pagination on generic GET routes.

---

## ✅ Validation System

Data integrity is maintained using robust validation at the controller level before database interaction. We utilize **express-validator** (or Joi) to ensure:
* Emails are properly formatted.
* Passwords meet complexity requirements (length, alphanumeric).
* Geospatial coordinates fall within valid ranges (Latitude -90 to 90, Longitude -180 to 180).
* Required fields for ride bookings are not missing.

---

## 🛑 Error Handling

A custom `ErrorResponse` class extends the built-in Node Error object. The global error handler catches:
* Mongoose bad ObjectIDs (CastError) -> Returns 404.
* Mongoose duplicate keys -> Returns 400.
* Mongoose validation errors -> Returns 400.
* JWT authentication errors -> Returns 401.

---

## 🔍 Search / Filter / Pagination

The API supports advanced query strings for retrieving lists (like Ride History):
* **Select specific fields:** `?select=fare,status`
* **Sort:** `?sort=-createdAt` (descending)
* **Filter:** `?status=completed&fare[gt]=50`
* **Pagination:** `?page=2&limit=10`

---

## 📊 Aggregation Features

The MongoDB Aggregation Framework is utilized for complex analytics on the Admin Dashboard:
* **Total Revenue:** Aggregating the sum of fares for all completed rides within a date range.
* **Average Ratings:** Calculating the mean rating of a driver based on all their reviews.
* **Driver Performance:** Grouping rides by driver to show acceptance rates and total completed trips.

---

## 🔒 Security Features

* **Helmet:** Sets secure HTTP headers (X-Frame-Options, DNS Prefetch Control).
* **CORS:** Cross-Origin Resource Sharing is restricted to allowed frontend domains.
* **Mongo Sanitize:** Prevents NoSQL injection attacks by sanitizing request data.
* **XSS Clean:** Sanitizes user input to prevent Cross-Site Scripting.
* **HPP:** Protects against HTTP Parameter Pollution.

---

## ⏱ Rate Limiting

To prevent Brute Force and DDoS attacks, `express-rate-limit` is implemented globally and specifically on auth routes:
* **Global API:** Max 100 requests per 10 minutes per IP.
* **Login Route:** Max 5 login attempts per 15 minutes per IP.

---

## 📩 API Response Format

The backend strictly adheres to a unified JSON response format for consistency across the frontend application.

**Success Response:**
```json
{
  "success": true,
  "count": 1,
  "data": {
    "rideId": "60d5ecb8b392d700155b8e90",
    "status": "completed",
    "fare": 125.50
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

---

## 📦 Deployment Ready Features

* **Environment Separation:** Configured for distinct development, testing, and production environments.
* **Gzip Compression:** Implemented `compression` middleware to reduce payload sizes and improve load times.
* **Process Management:** Ready for deployment using PM2 to manage clustering and auto-restarts on failure.
* **Docker Support:** Dockerfiles included for containerizing both frontend and backend for easy CI/CD pipelines.

---

## 🔮 Future Improvements

* **WebSockets (Socket.io):** Transition from HTTP polling to true real-time bidirectional communication for live driver tracking on the map.
* **Microservices Architecture:** Break down monolithic backend into separate Auth, Booking, and Payment services for independent scaling.
* **Push Notifications:** Implement Firebase Cloud Messaging (FCM) to notify users of ride status changes even when the app is backgrounded.
* **Surge Pricing ML Model:** Implement a machine learning model to dynamically predict demand and adjust surge pricing more intelligently.

---

## 🎓 Learning Outcomes

* Mastery of the complete MERN stack for enterprise-level applications.
* Understanding and implementing complex geospatial queries (`$near`, `$geoWithin`) in MongoDB.
* Building a secure, role-based RESTful API with advanced middleware architecture.
* Translating complex real-world business logic (fare calculation, driver matching) into scalable code.

---

## 🖼 Screenshots Placeholder Section

> *Below are visual representations of the application UI. Replace the image URLs with actual screenshots of your running application.*

| Passenger Dashboard | Driver Dashboard |
| :---: | :---: |
| ![Passenger UI](https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Passenger+Dashboard+Screenshot) | ![Driver UI](https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Driver+Dashboard+Screenshot) |

| Booking Interface | Admin Analytics Panel |
| :---: | :---: |
| ![Booking UI](https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Ride+Booking+Interface) | ![Admin Panel](https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Admin+Analytics+Panel) |

---

## 📖 API Documentation Section

Comprehensive API documentation is available. The APIs are documented to ensure clear contracts between the frontend and backend teams.
* For visual exploration and testing, a Swagger UI integration is planned for the `/api-docs` endpoint.

---

## 📮 Postman Collection Section

You can easily test the backend API using our pre-configured Postman Collection.
1. Download the [Postman Collection JSON file](./docs/NexRide_API_Collection.json). *(Add your actual file path here)*
2. Import it into your Postman workspace.
3. Configure the `{{baseUrl}}` variable to point to your local or staging server.

---

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes following the commit naming conventions.
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request for review.

---

## 🌿 Git Workflow

This project follows a simplified Git Flow methodology:
* `main` - Production-ready, stable code.
* `develop` - Integration branch for features.
* `feature/*` - New features being developed.
* `hotfix/*` - Critical fixes for production.

Always branch off from `develop` for new features and submit Pull Requests back to `develop`.

---

## 💬 Commit Naming Convention

We strictly follow Conventional Commits:
* `feat:` A new feature.
* `fix:` A bug fix.
* `docs:` Documentation only changes.
* `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc).
* `refactor:` A code change that neither fixes a bug nor adds a feature.
* `test:` Adding missing tests or correcting existing tests.
* `chore:` Changes to the build process or auxiliary tools and libraries.

*Example:* `feat: integrate stripe payment gateway for rides`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author Section

**Jilan Mansuri**
* 💼 **LinkedIn:** [linkedin.com/in/jilanmansuri](https://linkedin.com/in/jilanmansuri)
* 🐙 **GitHub:** [@Jilanmansuri](https://github.com/Jilanmansuri)
* 📧 **Email:** jilanmansuri@example.com

> If you found this project helpful, please give it a ⭐️ on GitHub!