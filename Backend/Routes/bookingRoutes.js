import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../Models/booking.js';

const router = express.Router();

// Validation middleware
const validateBooking = [
  body('name').notEmpty().trim(),
  body('email').isEmail(),
  body('phone').notEmpty(),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('guests').isInt({ min: 1, max: 10 })
];


router.get('/my-bookings', async (req, res) => {
    try {
      const { email } = req.query;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const bookings = await Booking.find({ 
        email: email.toLowerCase() 
      }).sort({ date: 1 });
  
      res.json(bookings);
    } catch (error) {
      console.error('Error in my-bookings route:', error);
      res.status(500).json({ message: error.message });
    }
  });
// Create booking
router.post('/', validateBooking, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check for existing booking with same email, date and time
    const existingBooking = await Booking.findOne({
      date: req.body.date,
      time: req.body.time
    });

    if (existingBooking) {
      return res.status(409).json({ 
        message: 'This time slot is already booked' 
      });
    }

    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;