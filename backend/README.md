# Full Stack Vehicle Booking System - Backend

This is the production-ready backend for the Vehicle Booking System, built with **Node.js, Express, and MongoDB (Mongoose)**. It follows a strict **Model-View-Controller (MVC)** architecture (Services & Controllers separated).

## 🏗️ Architecture Layers

1. **Routes (`src/routes`)**: Define API endpoints and apply middlewares (Auth, Rate Limiting).
2. **Controllers (`src/controllers`)**: Parse incoming requests (`req.body`, `req.query`), call the appropriate Service, and return standardized HTTP responses.
3. **Services (`src/services`)**: Contain the core business logic, database queries, and aggregations.
4. **Models (`src/models`)**: Define Mongoose schemas, relationships (ObjectIds), and apply plugins like pagination.
5. **Middlewares (`src/middlewares`)**: Handle JWT authentication (`verifyJWT`), role-based access (`isAdmin`), and global error catching.
6. **Utils (`src/utils`)**: Reusable helpers like `ApiResponse.js`, `ApiError.js`, `asyncHandler.js`, and the powerful `queryBuilder.js`.

## 📦 Key Packages

* **`express`**: Minimalist web framework.
* **`mongoose`**: MongoDB object modeling and schema validation.
* **`mongoose-paginate-v2`**: Provides robust pagination capabilities for large datasets natively.
* **`jsonwebtoken` & `bcryptjs`**: Secure authentication, password hashing, and token generation.
* **`dotenv`, `cors`, `helmet`, `express-rate-limit`, `morgan`**: Security, environment config, and request logging.

## 🚀 Setup Instructions

1. **Environment Setup**:
   * Ensure Node.js (v18+) and MongoDB are installed.
   * Verify the `.env` file exists in the `backend` directory.
   * Update `MONGODB_URI` with your connection string.

2. **Installation**:
   ```bash
   npm install
   ```

3. **Database Seeding (Crucial Step)**:
   This project includes a powerful seeder script to populate the database from the provided JSON dataset.
   Run the following command to clean the database and insert the normalized data:
   ```bash
   npm run seed
   # Or directly: node src/database/seeder.js
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints Overview

All APIs return a standardized JSON format:
```json
{
  "success": true,
  "message": "Descriptive message here",
  "data": { ... }
}
```

### Core Routes
* `GET /health` - System health check
* `GET /version` - API version info

### Authentication (`/auth`)
* `POST /auth/register` - Register a new user/admin
* `POST /auth/login` - Login and get JWT cookies
* `GET /auth/me` - Get current logged-in user (Protected)
* `POST /auth/logout` - Logout (Protected)

### Bookings (`/bookings`)
* `GET /bookings` - Get all bookings with dynamic filtering
* `GET /bookings/stats` - Get aggregation stats (Admin only)
* `GET /bookings/:id` - Get booking by ID
* `POST /bookings` - Create new booking (Protected)
* `PUT /bookings/:id` - Update booking (Protected)
* `DELETE /bookings/:id` - Soft delete booking (Admin only)

### Other Entities (Full CRUD)
* `/customers`
* `/drivers`
* `/vehicles`
* `/locations`
* `/payments`

## 🔍 Advanced Querying & Filtering

Our APIs support powerful dynamic querying right from the URL, powered by `queryBuilder.js`:

* **Pagination & Sorting**: `GET /bookings?page=2&limit=50&sort=-fare`
* **Regex Search**: `GET /bookings?keyword=Indira`
* **Exact Matching**: `GET /bookings?status=Success&vehicle=Bike`
* **Range Filtering**: `GET /bookings?minFare=500&maxFare=1500&minRating=4`
