import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './src/models/user.model.js';
import 'dotenv/config';

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const email = 'jilan2410@gmail.com';
    const password = '123456';

    let admin = await User.findOne({ email });
    if (admin) {
      console.log('Admin already exists, updating password and role...');
      admin.password = password; // Will be hashed by pre-save hook
      admin.role = 'admin';
      await admin.save();
      console.log('Admin updated successfully.');
    } else {
      admin = await User.create({
        name: 'Jilan Mansuri',
        email,
        password,
        role: 'admin'
      });
      console.log('Admin created successfully.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

createAdmin();
