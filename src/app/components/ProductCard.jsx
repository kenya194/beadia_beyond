import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-700">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-900 font-medium">${product.price}</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            In Stock
          </span>
        </div>
        <div className="mt-4">
          <Link
            href={`/products/${product.id}`}
            className="block w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}