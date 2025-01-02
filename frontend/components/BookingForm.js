import { useState } from "react";
import BookingSummary from "./BookingSummary";
import Navbar from "./Navbar";

const AVAILABLE_TIME_SLOTS = {
  lunch: ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"],
  dinner: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
    guests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successfulBooking, setSuccessfulBooking] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([
    ...AVAILABLE_TIME_SLOTS.lunch,
    ...AVAILABLE_TIME_SLOTS.dinner,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setSuccessfulBooking(data);
    } catch (err) {
      setError(err.message || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (date) => {
    setFormData((prev) => ({ ...prev, date: new Date(date), time: "" }));
    setAvailableSlots([...AVAILABLE_TIME_SLOTS.lunch, ...AVAILABLE_TIME_SLOTS.dinner]);
  };

  if (successfulBooking) {
    return <BookingSummary booking={successfulBooking} />;
  }

  return (
    <div >
      <div className="bg-gradient-to-r from-white via-orange-50 to-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-orange-50 to-orange-100 p-6">
      
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-serif text-gray-800 mb-2 text-center">
          Make a Reservation
        </h2>
        <p className="text-center text-gray-600 mb-8">Reserve your table for a memorable dining experience</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />

            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date.toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />

            <input
              type="number"
              placeholder="Number of Guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={(e) => setFormData((prev) => ({ ...prev, guests: parseInt(e.target.value) }))}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    formData.time === slot
                      ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                      : "bg-white text-gray-700 border-orange-200 hover:border-orange-400 hover:bg-orange-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || !formData.time}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 
                     disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {loading ? "Processing..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BookingForm;