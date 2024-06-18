import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="text-slate-900 dark:text-slate-100 items-center bg-white dark:bg-slate-900">
        <div className="h-screen relative flex justify-center w-full bg-cover bg-[url('https://images3.alphacoders.com/134/1342988.png')]">
          <div className="absolute inset-0 bg-white opacity-40" />
          <div className="w-full relative z-50 p-4 space-y-4 max-w-xl flex items-center text-center mt-8 flex-col">
            <h1 className="lg:text-7xl text-5xl  dark:text-slate-900 font-bold leading-tight">
              NARUTO
              <span className="text-red-600"> API</span>
            </h1>
            <Link
              className="bg-red-600 w-full  md:w-auto py-3 px-8 rounded-md text-lg text-slate-100"
              to="/wiki"
            >
              WIKI
            </Link>
            <button className="bg-black w-full  md:w-auto py-3 px-8 rounded-md text-lg text-white-500">
              SHOP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
