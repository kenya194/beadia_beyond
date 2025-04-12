import { useRouter } from 'next/router';
import Header from '../../components/Header';

const productData = {
  1: {
    name: 'Premium Product 1',
    description: 'Detailed description of this amazing product. Highlight its features and benefits.',
    price: 99.99,
    image: '/images/product1.jpg',
    specs: [
      'High-quality materials',
      'Handcrafted with care',
      'Available in multiple colors'
    ]
  },
  2: {
    name: 'Deluxe Product 2',
    description: 'Detailed description of this luxury product. Explain why it stands out.',
    price: 149.99,
    image: '/images/product2.jpg',
    specs: [
      'Premium materials',
      'Limited edition',
      'Includes warranty'
    ]
  }
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = productData[id];

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-900 mb-4">${product.price}</p>
              
              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock - Available for In-Store Purchase
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Features</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors">
                Visit Store to Purchase
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}