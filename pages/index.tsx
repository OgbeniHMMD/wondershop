import Link from "next/link";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [products, setProducts] = useState<product[]>([]);

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
            ? products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${product.id}`}
                  className="border-2 border-black hover:scale-105 duration-300 flex flex-col"
                >
                  <div
                    className="py-20 bg-contain bg-no-repeat bg-center m-2"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="border-t-2 border-black p-2 sm:py-4 bg-gray-100 flex-grow">
                    <div className="capitalize text-sm font-medium pb-2">{product.title}</div>
                    <div className="text-xs text-gray-500 font-bold">₦ {(product.price + 1000).toLocaleString()}</div>
                  </div>
                </Link>
              ))
            : [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-2 border-gray-200 p-2 sm:py-4 gap-2 flex flex-col animate-pulse">
                  <div className="bg-gray-100 w-full p-2" />
                  <div className="bg-gray-100 w-10/12 p-2" />
                  <div className="bg-gray-100 w-6/12 p-2" />
                </div>
              ))}
        </div>
      </div>
    </main>
  );
}

interface product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
