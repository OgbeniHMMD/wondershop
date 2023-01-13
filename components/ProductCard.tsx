import Link from "next/link";
import { ProductType } from "../pages";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/${product?.id}`} className="border-2 border-black hover:scale-105 duration-300 flex flex-col">
      <div
        className="py-20 bg-contain bg-no-repeat bg-center m-2"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="border-t-2 border-black p-2 sm:py-4 bg-gray-100 flex-grow">
        <div className="capitalize text-sm font-medium pb-2">{product.title}</div>
        <div className="text-xs text-gray-500 font-bold">₦ {(product.price + 1000).toLocaleString()}</div>
      </div>
    </Link>
  );
}
