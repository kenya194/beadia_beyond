import Head from 'next/head';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Product 1',
    description: 'High-quality product with excellent features',
    price: 99.99,
    image: '/images/product1.jpg',
  },
  {
    id: 2,
    name: 'Deluxe Product 2',
    description: 'Luxury version of our best-selling item',
    price: 149.99,
    image: '/images/product2.jpg',
  },
  // Add more products as needed
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>YourBrand | Premium Products</title>
        <meta name="description" content="Discover our premium physical products" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-primary text-white rounded-xl p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Premium Physical Products</h1>
          <p className="text-xl mb-6">Visit our store to experience quality in person</p>
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Find Our Location
          </button>
        </div>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ready to See Our Products in Person?</h2>
          <p className="text-gray-600 mb-6">
            Visit our store location to view, touch, and purchase our premium products.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            Get Directions
          </button>
        </section>
      </main>
    </div>
  );
}