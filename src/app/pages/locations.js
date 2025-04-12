import Head from 'next/head';
import Header from '../components/Header';
import StoreLocator from '../components/StoreLocator';

export default function Locations() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Locations | YourBrand</title>
        <meta name="description" content="Find our physical store locations" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Visit Our Stores</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our products in person at these locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StoreLocator />
          
          {/* Second location example */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Downtown Location</h3>
              <div className="mb-4">
                <p className="text-gray-700">456 Downtown Ave</p>
                <p className="text-gray-700">Your City, State 10002</p>
                <p className="text-gray-700">Phone: (123) 456-7891</p>
              </div>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=456+Downtown+Ave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
            <div className="h-64 bg-gray-200">
              {/* Map placeholder */}
              <div className="h-full flex items-center justify-center text-gray-500">
                Map would display here
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Store Hours</h2>
          <ul className="space-y-2">
            <li className="flex justify-between max-w-xs">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium">9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between max-w-xs">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium">10:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between max-w-xs">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium">11:00 AM - 5:00 PM</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}