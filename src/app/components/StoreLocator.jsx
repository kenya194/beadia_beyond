import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.712776, // Replace with your store's latitude
  lng: -74.005974 // Replace with your store's longitude
};

export default function StoreLocator() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Our Store Location</h3>
        <div className="mb-4">
          <p className="text-gray-700">123 Main Street</p>
          <p className="text-gray-700">Your City, State 10001</p>
          <p className="text-gray-700">Phone: (123) 456-7890</p>
        </div>
        <div className="mt-4">
          <a
            href="https://maps.google.com/?q=123+Main+Street"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            Get Directions →
          </a>
        </div>
      </div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}