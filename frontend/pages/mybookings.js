import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MyBookings from '../components/MyBookings';
import Navbar from '../components/Navbar';

export default function MyBookingsPage() {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage or any other state management solution you're using
    const email = localStorage.getItem('userEmail');
    if (!email) {
      router.push('/booking'); // Redirect to booking if no email is found
    } else {
      setUserEmail(email);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {userEmail && <MyBookings userEmail={userEmail} />}
    </div>
  );
}