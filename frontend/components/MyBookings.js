import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const MyBookings = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const fetchBookings = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        params: { email: userEmail }
      });
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      setDeletingId(bookingId);
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      setError('Failed to delete booking');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">My Bookings</h2>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No bookings found</p>
                <button
                  onClick={() => router.push('/booking')}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                >
                  Book a Table
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking._id} 
                  className="border border-orange-100 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg text-gray-800 font-medium">{booking.name}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                      <p className="text-sm text-gray-600">{booking.guests} guests</p>
                    </div>
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      disabled={deletingId === booking._id}
                      className={`px-4 py-2 rounded-lg text-white transition-all ${
                        deletingId === booking._id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {deletingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;