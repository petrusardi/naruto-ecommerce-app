import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="container mx-auto">
        <nav className="w-full text-white dark:bg-slate-900 flex p-4 items-center justify-between">
          <div className="inline-flex space-x-2 mr-4">
            <span className="hidden md:block text-slate-900 dark:text-slate-100 font-bold text-2xl">
              NARUTO FANPAGE
            </span>
          </div>
          <ul className="hidden md:flex space-x-2 dark:text-slate-100 text-slate-900">
            <Link className="hover:cursor-pointer  rounded-md dark:text-slate-100 dark:hover:bg-red-800  px-4 py-2" to="/wiki">
              WIKI
            </Link>
            <Link className=" px-4 py-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-red-800  rounded-md" to="/store">
              STORE
            </Link>
          </ul>
          <div className="space-x-1 hidden md:block">
            <button
              type="button"
              className="px-6 py-2 border rounded-full dark:text-slate-100 text-red-900"
            >
              Sign Up
            </button>
            <Link
              className="px-6 py-2 border border-red-600 bg-red-600  text-slate-100  rounded-full" to="/login"
            >
              Sign In
            </Link>
          </div>
          <button className="rounded-full bg-red-600 p-2 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-6 text-slate-100"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
}
