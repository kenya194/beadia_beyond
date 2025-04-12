import Link from 'next/link';
import { ShoppingBagIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            YourBrand
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-gray-900 hover:text-primary">
              Products
            </Link>
            <Link href="/locations" className="text-gray-900 hover:text-primary">
              Locations
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/locations" 
              className="flex items-center text-gray-900 hover:text-primary"
            >
              <MapPinIcon className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Visit Us</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}