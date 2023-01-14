import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function Homepage() {
  const [isHydrated, setIsHydrated] = useState(false);
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
  }, [cartItems]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <div className="">
      <div className="container max-w-screen-lg mx-auto">
        <header className="text-lg font-medium p-4 uppercase">Shopping Cart</header>

        <div className="">
          {cartItems.length ? (
            <div className="md:flex gap-4 md:gap-8 p-4">
              <div className="flex-grow p--4">
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product, i) => (
                    <div key={i} className="border-2 border-black p-4">
                      <div>{product?.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {console.log(products)}
              <div className="md:max-w-sm w-full ">
                <div className="border-2 border-black p-4 mb-4">
                  <h2 className="text-lg font-medium pb-4">Order Summary</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between gap-4">
                      <div suppressHydrationWarning>Items ({totalItems()}): </div>
                      <div>{subTotal()}</div>
                    </div>
                    <div className="flex justify-between gap-4">
                      <div>Shipping & handling:</div>
                      <div>0.00</div>
                    </div>

                    <div className="flex justify-between gap-4 border-t pt-2">
                      <div className="text-lg font-medium">Order total:</div>
                      <div>{subTotal()}</div>
                    </div>
                  </div>
                </div>

                <button className="p-1 px-4 border-2 border-black font-medium text-white text-lg bg-black hover:bg-black/75 hover:text-white w-full">
                  CHECKOUT
                </button>
              </div>
            </div>
          ) : (
            <div>Nothing to show</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
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
