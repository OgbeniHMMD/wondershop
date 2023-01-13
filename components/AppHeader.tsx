import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function AppHeader() {
  const [count, setCount] = useState(0);
  const cartItems = useCartStore((x: any) => x.cartItems);

  useEffect(() => {
    setCount(cartItems.length);
  }, [cartItems]);

  return (
    <header className=" bg-gray-100 border-b-2 border-black fixed w-full z-50">
      <div className="container max-w-screen-lg mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-medium">
          WONDERSHOP
        </Link>

        <div className="flex justify-between items-center gap-2">
          <Link href="#" title="Your Profile" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>

          <Link href="/cart" title="Cart" className="p-1">
            {!!count && (
              <div className="absolute -mt-2 ml-4">
                <div className="text-xs h-6 w-6 rounded-full bg-red-500 text-white text-center flex justify-center items-center font-medium">
                  {count}
                </div>
              </div>
            )}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
