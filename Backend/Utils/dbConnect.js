import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default dbConnect;
