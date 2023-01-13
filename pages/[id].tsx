import { useEffect, useState } from "react";

export default function Homepage() {
  const [product, setProduct] = useState<product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  return (
    <div className="container max-w-screen-lg mx-auto">
      <div className="p-4">
        <div>xxxxx</div>
        <div>xxxxx</div>
      </div>
    </div>
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
