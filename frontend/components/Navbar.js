import Link from 'next/link';
import { useRouter } from 'next/router';  // Changed from next/navigation

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Link href="/" passHref className="text-2xl font-serif text-orange-600 hover:text-orange-700 transition-colors">
          Restaurant
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        
      </div>
    </div>
  );
};

export default Navbar;