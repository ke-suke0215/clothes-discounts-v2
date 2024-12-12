import { Link } from "@remix-run/react";
import { type Product } from "~/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link key={product.id} to={`/products/${product.id}`} className="block">
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-90 object-cover"
        />
        <div className="p-4">
          <h2 className="text-l mb-2">{product.name}</h2>
        </div>
      </div>
    </Link>
  );
}
