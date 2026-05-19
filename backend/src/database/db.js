import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n🔗 MongoDB connected successfully! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('❌ MongoDB connection FAILED: ', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
