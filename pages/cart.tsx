import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function Homepage() {
  const cartItems = useCartStore((x: any) => x.cartItems);
  const [products, setProducts] = useState<product[]>([]);

  const totalItems = () => {
    return products.reduce((prev: number, el) => prev + +el.quantity, 0);
  };

  const subTotal = () => {
    return products.reduce((prev: number, el) => prev + +el.price * +el.quantity, 0);
  };

  const fetchData = async () => {
    const _products = [];
    for (let i = 0; i < cartItems.length; i++) {
      const { id, quantity } = cartItems[i];
      const data = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());
      _products[i] = { ...data, id, quantity };
    }

    setProducts(_products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="container max-w-screen-lg mx-auto">
        <nav className="flex gap-2 text-gray-500 border-b-4 text-sm p-4">
          <Link href="/" className="text-black hover:underline">
            Home
          </Link>
          &raquo;
          <Link href="#" className="hover:underline">
            Shopping Cart
          </Link>
        </nav>

        <header className="text-lg font-medium p-4 uppercase ">Shopping Cart</header>

        <div className="">
          {products.length ? (
            <div className="md:flex gap-4 md:gap-8 p-4">
              <div className="">
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product, i) => (
                    <div key={i} className="flex gap-4 border-4 border-black p-4">
                      <div className="">
                        <div
                          className="w-24 h-24 bg-contain bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                      </div>

                      <div className="flex-grow flex flex-col justify-between gap-4">
                        <div className="capitalize text-sm font-medium">{product.title}</div>
                        <div className="flex gap-4 items-center justify-between">
                          <div className="text-sm text-gray-700 font-medium">₦ {product.price.toLocaleString()}</div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-lg hover:bg-black hover:text-white">
                              -
                            </button>
                            <p className="px-4 text-sm">{product.quantity}</p>
                            <button className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-lg hover:bg-black hover:text-white">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:max-w-sm w-full ">
                <div className="border-4 border-black p-4 mb-4">
                  <h2 className="text-lg font-medium pb-4">Order Summary</h2>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <div suppressHydrationWarning>Items ({totalItems().toLocaleString()}): </div>
                      <div>₦ {subTotal().toLocaleString()}</div>
                    </div>
                    <div className="flex justify-between gap-4">
                      <div>Shipping & handling:</div>
                      <div>₦ 0.00</div>
                    </div>

                    <div className="flex justify-between gap-4 border-t pt-2">
                      <div className="text-lg font-medium">Order total:</div>
                      <div>₦ {subTotal().toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <button className="p-1 px-4 border-2 border-black font-medium text-white text-lg bg-black hover:bg-black/75 hover:text-white w-full">
                  CHECKOUT
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 gap-4 flex flex-col animate-pulse">
              <div className="bg-gray-200 w-full p-4" />
              <div className="bg-gray-100 w-10/12 p-4" />
              <div className="bg-gray-200 w-6/12 p-4" />
            </div>
          )}
        </div>
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
