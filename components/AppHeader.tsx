import Link from "next/link";

export default function AppHeader() {
  return (
    <header className=" bg-gray-100 border-b-2 border-black fixed w-full z-50">
      <div className="container max-w-screen-lg mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          WONDERSHOP
        </Link>

        <div className="flex justify-between items-center">
          <a href="/cart" title="Cart">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
          </a>
        </div>
      </div>
    </header>
  );
}
