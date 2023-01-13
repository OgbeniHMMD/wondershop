import { useEffect, useState } from "react";

export default function Homepage() {
  const [product, setProduct] = useState<product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  return (
    <div className="">
      <div className="container max-w-screen-lg mx-auto md:flex gap-4 md:gap-8 py-8">
        <div className="flex-grow p--4">
          <header className="text-lg font-medium pb-4">CART</header>
          <div>xxxx</div>
          <div>xxx</div>
        </div>
        <div className="md:max-w-sm w-full px-4 border-2 border-black">xxxxx</div>
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
