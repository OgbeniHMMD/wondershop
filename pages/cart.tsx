import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function CartPage() {
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

  const updateCart = (index: number, qty: number) => {
    const payload = products;
    payload[index].quantity = qty;
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
        {products.length ? (
          <>
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
              <div className="md:flex gap-4 md:gap-8 p-4">
                <div className="">
                  <div className="grid grid-cols-1 gap-4">
                    {products.map((product: ProductType, i) => (
                      <div key={i} className="flex gap-4 border-4 border-black p-4">
                        <div className="">
                          <div
                            className="w-24 h-24 bg-contain bg-no-repeat bg-center"
                            style={{ backgroundImage: `url(${product.image})` }}
                          />
                        </div>

                        <div className="flex-grow flex flex-col justify-between gap-4">
                          <div className="capitalize text-sm font-medium">{product.title}</div>
                          <div className="text-sm text-gray-700 font-medium">₦ {product.price.toLocaleString()}</div>
                          <div className="flex gap-4 items-center justify-between">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateCart(i, product.quantity > 0 ? product.quantity - 1 : 0)}
                                className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-sm hover:bg-black hover:text-white"
                              >
                                -
                              </button>
                              <p className="px-4 text-sm">{product.quantity}</p>
                              <button
                                onClick={() => updateCart(i, product.quantity + 1)}
                                className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-sm hover:bg-black hover:text-white"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => updateCart(i, 0)}
                              className="p-1 px-4 border-2 border-red-500 bg-red-200 font-medium text-xs hover:bg-red-500 hover:text-white"
                            >
                              DELETE
                            </button>
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

                      <div className="flex justify-between gap-4 border-t-2 pt-2">
                        <div className="text-lg font-medium">Order total:</div>
                        <div>₦ {subTotal().toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <button className="p-2 px-4 border-2 border-black font-medium text-white text-sm bg-black hover:bg-black/75 hover:text-white w-full">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : loading ? (
          <div className="p-4 gap-4 flex flex-col animate-pulse">
            <div className="bg-gray-200 w-full p-4" />
            <div className="bg-gray-100 w-10/12 p-4" />
            <div className="bg-gray-200 w-6/12 p-4" />
          </div>
        ) : (
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
              <div className="pt-4">No products in your cart</div>
            </div>
            <Link
              href="/"
              className="p-2 px-8 border-2 border-black font-medium text-white text-sm bg-black hover:bg-black/75 hover:text-white w-full"
            >
              Continue Shopping
            </Link>
          </div>
        )}
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
