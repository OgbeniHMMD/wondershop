import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function OrderConfirmationPage() {
  const cartItems = useCartStore((x: any) => x.cartItems);
  const UPDATE_CART = useCartStore((x: any) => x.UPDATE_CART);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const totalItems = () => {
    return products.reduce((prev: number, el: ProductType) => prev + el.quantity, 0);
  };

  const subTotal = () => {
    return products.reduce((prev: number, el: ProductType) => prev + +el.price * el.quantity, 0);
  };

  const fetchData = async () => {
    setLoading(true);
    const _products = [];
    for (let i = 0; i < cartItems.length; i++) {
      const { id, quantity } = cartItems[i];
      const data = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());
      _products[i] = { ...data, id, quantity };
    }
    setLoading(false);
    setProducts(_products);
  };

  const updateCart = (i: number, qty: number) => {
    const payload = products;
    payload[i].quantity = qty;
    const result = payload.filter((x: ProductType) => x?.quantity > 0);

    setProducts(result);
    UPDATE_CART(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="container max-w-screen-lg mx-auto">
        <div className="p-8 text-center">
          <div className="p-8 text-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-20 h-20 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <div className="pt-4">Order Received</div>
          </div>
          <Link
            href="/"
            className="p-2 px-8 border-2 border-black font-medium text-white text-sm bg-black hover:bg-black/75 hover:text-white w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
}
