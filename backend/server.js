import dotenv from 'dotenv';
import { app } from './src/app.js';
import connectDB from './src/database/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`❌ MongoDB connection failed: `, error);
    process.exit(1);
  });
