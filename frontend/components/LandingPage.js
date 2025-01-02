import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import BookingForm from './BookingForm';
import ani from '../public/ani.json';
import Navbar from './Navbar';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false
});

const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBookingClick = () => {
    router.push('/bookings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-orange-50 to-orange-100">
   
      <div className="bg-gradient-to-r from-white via-orange-50 to-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>
      

      <div className="container mx-auto px-6 py-">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-3">
              <p className="text-orange-600 font-medium tracking-wide">WELCOME TO OUR RESTAURANT</p>
              <h2 className="text-5xl font-serif font-light text-gray-800">
                Where Every Meal is a
                <span className="text-orange-500"> Special </span>
                Occasion
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join us for an unforgettable dining experience where exceptional cuisine meets warm hospitality. 
              Our carefully crafted menu celebrates both traditional flavors and contemporary innovation.
            </p>
            <div className="flex gap-4">
            <button
                onClick={handleBookingClick}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg 
                         hover:bg-orange-600 transition-all duration-300 
                         text-lg font-medium tracking-wide
                         shadow-lg hover:shadow-xl
                         hover:translate-y-[-2px]"
              >
                Book a Table
              </button>
              <button
                className="bg-white text-orange-500 px-8 py-4 rounded-lg 
                         border-2 border-orange-500 hover:bg-orange-50 
                         transition-all duration-300 text-lg font-medium tracking-wide"
              >
                View Menu
              </button>
            </div>

            {/* Feature badges */}
            <div className="flex gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Open Hours</p>
                  <p className="text-sm text-gray-600">12 PM - 12 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Reservations</p>
                  <p className="text-sm text-gray-600">+1 234 567 8900</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden ">
              {isMounted ? (
                <div className="aspect-video flex items-center justify-center p-6">
                 <Lottie animationData={ani}/>
                 
                </div>
              ) : (
                <div className="aspect-video bg-white flex items-center justify-center">
                  <p className="text-gray-400">Loading...</p>
                </div>
              )}
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;