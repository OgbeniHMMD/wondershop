import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Homepage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <main className="flex-grow">
      <div className="container max-w-screen-lg mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {products.length
            ? products.map((product, i) => <ProductCard key={i} product={product} />)
            : [...Array(6)].map((x, i) => <SkeletonLoader key={i} />)}
        </div>
      </div>
    </main>
  );
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
