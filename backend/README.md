# Full Stack Vehicle Booking System - Backend

This is the production-ready backend initialization for the Vehicle Booking System.

## Architecture Decisions

The backend is built using a modern **Node.js, Express, and MongoDB** stack with **Mongoose**. It employs a clean **Model-View-Controller (MVC)** architecture (minus the Views, as this is a pure API) and separates concerns into logical layers:

1.  **Controllers (`src/controllers`)**: Handle incoming HTTP requests, process data by calling services, and return the appropriate HTTP responses.
2.  **Services (`src/services`)**: Contain the core business logic. They decouple business logic from the controllers, making it reusable and easier to test.
3.  **Routes (`src/routes`)**: Define API endpoints and map them to specific controller functions.
4.  **Models (`src/models`)**: Define Mongoose schemas for MongoDB data structure and interact with the database.
5.  **Middlewares (`src/middlewares`)**: Centralize common operations like error handling, authentication, logging, and rate limiting.
6.  **Validators (`src/validators`)**: Keep input validation separate from controllers to ensure request data is correct before processing.
7.  **Utils (`src/utils`)**: Provide common, reusable helper functions (e.g., standardizing API responses, error formatting).

This architecture is chosen because it allows the application to scale, is easy to maintain, and separates responsibilities clearly, enabling multiple engineers to work on different layers seamlessly. ES Modules (ESM) with `async/await` are used for modern Javascript standards and cleaner asynchronous code.

## Key Packages & Why They Are Used

*   **`express`**: Fast, minimalist web framework for building the API routing layer.
*   **`mongoose`**: Elegant MongoDB object modeling providing a straight-forward, schema-based solution to model application data.
*   **`dotenv`**: Loads environment variables from a `.env` file into `process.env`, keeping sensitive credentials out of the codebase.
*   **`cors`**: Middleware to enable Cross-Origin Resource Sharing, allowing our frontend to communicate with the backend.
*   **`morgan`**: HTTP request logger middleware used in development to see incoming requests and debug issues.
*   **`helmet`**: Helps secure Express apps by setting various HTTP headers to mitigate common web vulnerabilities.
*   **`bcryptjs`**: Library to hash passwords securely before saving them to the database.
*   **`jsonwebtoken`**: Used for creating JSON Web Tokens (JWT) for authentication and authorization.
*   **`express-rate-limit`**: Basic rate-limiting middleware to prevent brute-force and DDoS attacks.
*   **`cookie-parser`**: Parse Cookie header and populate `req.cookies`, vital for secure authentication flows.
*   **`nodemon` (devDependency)**: Utility that automatically restarts the node application when file changes in the directory are detected, drastically improving developer experience.

## Setup Instructions

1.  **Environment Setup**:
    *   Ensure you have Node.js (v18+) and MongoDB installed.
    *   Duplicate the `.env.example` file (if provided) to `.env` or just use the generated `.env` file.
    *   Update `MONGODB_URI` with your local or cloud MongoDB connection string.

2.  **Installation**:
    From this `backend` directory, run:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    Start the server with auto-restart enabled:
    ```bash
    npm run dev
    ```

## NPM Scripts

*   `npm start`: Runs the server in production mode using Node directly (`node server.js`).
*   `npm run dev`: Runs the server in development mode using Nodemon, watching for file changes (`nodemon server.js`).

## Recommended Development Workflow

1.  **Define Model**: Start by creating the Mongoose schema and model in `src/models`.
2.  **Create Service**: Write business logic in `src/services` for creating, reading, updating, or deleting the data.
3.  **Write Controller**: Create a handler in `src/controllers` using `asyncHandler`. Call the relevant service and format the response using `ApiResponse`.
4.  **Set up Routes**: Add the endpoint to `src/routes` and link it to the controller.
5.  **Apply Middleware**: Attach validators or auth middleware to the route as needed.

## Health Check
To ensure the backend is running properly, the API includes a health check route:
*   `GET /api/v1/health`
