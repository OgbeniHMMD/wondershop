import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";

export default function Homepage() {
  const router = useRouter();
  const { id } = router.query;

  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState<product | null>(null);

  const cartItems = useCartStore((x: any) => x.cartItems);
  const UPDATE_CART = useCartStore((x: any) => x.UPDATE_CART);

  const dataExist = () => cartItems.findIndex((x: any) => x?.id == id);

  useEffect(() => {
    if (!id && dataExist() <= 0) return;

    const item = cartItems[dataExist()];
    setQuantity(+item?.quantity || 0);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  useEffect(() => {
    const payload = [...cartItems];
    if (dataExist() >= 0) {
      payload[dataExist()] = { id, quantity };
    } else {
      payload.push({ id, quantity });
    }

    // Save updated cart data to localStorage
    UPDATE_CART(payload.filter((x) => x?.quantity > 0));
  }, [quantity]);

  return (
    <div className="container max-w-screen-lg mx-auto">
      <nav className="flex gap-2 text-gray-500 text-sm p-4">
        <Link href="/" className="text-black hover:underline">
          Home
        </Link>
        &raquo;
        <Link href="#" className="hover:underline">
          Product Details
        </Link>
      </nav>

      {product ? (
        <>
          <div className="sm:flex-row flex-col flex gap-8 p-4 py-8 border-y-4">
            <div className="border-2 border-black h-64 sm:w-64 md:w-96 w-full p-4">
              <div
                className="bg-contain bg-center bg-no-repeat w-full h-full"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </div>

            <div className="flex flex-col gap-4 justify-between">
              <div className="">
                <div className="text-xl font-medium pb-4">{product.title}</div>
                <div className="font-medium text-sm text-gray-500">₦ {product.price.toLocaleString()}</div>
              </div>

              <div className="flex gap-2 text-sm items-center">
                {quantity ? (
                  <>
                    <button
                      onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                      className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-lg hover:bg-black hover:text-white"
                    >
                      -
                    </button>
                    <p className="p-2">{quantity}</p>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 px-4 border-2 border-black bg-gray-200 font-medium text-lg hover:bg-black hover:text-white"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 px-4 border-2 border-black text-sm font-medium bg-black/20 hover:bg-black hover:text-white"
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 py-8">
            <h2 className="text-lg font-medium pb-4 text-gray-700 uppercase">Description</h2>
            <p className="text-gray-500 max-w-lg leading-relaxed">{product.description}</p>
          </div>
        </>
      ) : (
        <div className="p-4 gap-4 flex flex-col animate-pulse">
          <div className="bg-gray-200 w-full p-4" />
          <div className="bg-gray-100 w-10/12 p-4" />
          <div className="bg-gray-200 w-6/12 p-4" />
        </div>
      )}
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
