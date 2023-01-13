import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className=" bg-gray-100 border-b-2 border-black">
          <div className="container max-w-screen-lg mx-auto p-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-medium">
              Wondershop
            </Link>

            <div className="flex justify-between items-center">
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
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="container max-w-screen-lg mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="border-2 border-black hover:scale-105 duration-300">
                  <div
                    className="py-20 bg-cover"
                    style={{ backgroundImage: `url(https://picsum.photos/300?random=${i})` }}
                  />
                  <div className="border-t-2 border-black p-2 sm:py-4">
                    <div className="capitalize text-sm font-bold pb-2">main main</div>
                    <div className="text-xs text-gray-600 font-medium">₦1,0000</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="text-white bg-black">
          <div className="container max-w-screen-lg mx-auto px-4 py-20">
            <div className="text-center text-sm">
              Made with &hearts; by{" "}
              <a href="https://www.linkedin.com/in/OgbeniHMMD" className="font-medium hover:underline">
                Hammed A. Olajide
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
