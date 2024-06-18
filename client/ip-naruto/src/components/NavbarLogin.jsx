import { Link, useNavigate } from "react-router-dom";
import Logout from "./logout";

export default function NavbarLogin() {
  return (
    <>
      <div className="container mx-auto">
        <nav className="w-full text-white dark:bg-slate-900 flex p-4 items-center justify-between">
          <div className="inline-flex space-x-2 mr-4">
            <span className="hidden md:block text-slate-900 dark:text-slate-100 font-bold text-2xl">
              NARUTO STORE
            </span>
          </div>
          <ul className="hidden md:flex space-x-2 dark:text-slate-100 text-slate-900">
            <Link
              className="hover:cursor-pointer  rounded-md dark:text-slate-100 dark:hover:bg-red-800  px-4 py-2"
              to="/wiki"
            >
              WIKI
            </Link>
            <Link
              className=" px-4 py-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-red-800  rounded-md"
              to="/store"
            >
              STORE
            </Link>
            <Link
              className=" px-4 py-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-red-800  rounded-md"
              to="/add"
            >
              ADD FIGURE
            </Link>
          </ul>
          <Logout/>
        </nav>
      </div>
    </>
  );
}
