import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BookingSummary = ({ booking }) => {
  const router = useRouter();

  useEffect(() => {
    // Save email when booking is confirmed
    if (booking?.email) {
      localStorage.setItem('userEmail', booking.email);
    }
  }, [booking]);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-orange-100 p-6">

        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Thank you for choosing our restaurant</p>
          </div>
  
          <div className="space-y-4">
            <div className="border-b border-orange-200 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Reservation Details</h3>
              <p className="text-lg text-gray-800">{booking.name}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                <p className="text-gray-800">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
                <p className="text-gray-800">{booking.time}</p>
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Guests</h3>
                <p className="text-gray-800">{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Booking ID</h3>
                <p className="text-gray-800 font-mono">{booking._id?.slice(-6).toUpperCase()}</p>
              </div>
            </div>
  
            <div className="bg-orange-50 rounded-lg p-4 mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
              <p className="text-gray-600">{booking.email}</p>
              <p className="text-gray-600">{booking.phone}</p>
            </div>
          </div>
  
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.print()} 
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Print Confirmation
            </button>
            <button
            onClick={() => router.push('/mybookings')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
          >
            View All Bookings
          </button>
          </div>
         
        </div>
        {/* <div>
        <MyBookings userEmail={booking.email}/></div> */}
      </div>
    );
  };
  
  export default BookingSummary;