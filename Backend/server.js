import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './Utils/dbConnect.js';
import bookingRoutes from './Routes/bookingRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Connect to database
dbConnect();

// Routes with /api prefix
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for http://localhost:3000`);
});