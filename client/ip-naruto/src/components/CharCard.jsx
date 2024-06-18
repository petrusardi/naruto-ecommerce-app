import { Link, NavLink } from "react-router-dom";

export default function CharCard({ item }) {
  return (
    <>
      <div className="grid px-5">
        <div className="shadow dark:shadow-none p-4 rounded">
          <article className="flex flex-col">
            <img
              src={item.images[0]}
              alt="blog"
              className="w-full h-48 object-cover object-center rounded-md"
            />
            <h3 className="py-2">
              <p
                href="#"
                className="text-gray-900 dark:text-gray-100 title-font text-xl font-medium"
              >
                {item.name}
              </p>
            </h3>
            <p className="mt-1 font-light text-sm text-white">
              Nature Type :{" "}
              {Array.isArray(item.natureType) && item.natureType.length > 0
                ? `${item.natureType[0]}, ${item.natureType[1]}`
                : "Unknown"}
            </p>
            <p className="mt-1 font-light text-sm text-white">
              Jutsu :{" "}
              {Array.isArray(item.jutsu) && item.jutsu.length > 0
                ? `${item.jutsu[0]}, ${item.jutsu[1]}`
                : "Unknown"}
            </p>
            <p className="mt-1 font-light text-sm text-white">
              Village :{" "}
              {Array.isArray(item.personal.affiliation) && item.personal.affiliation.length > 0
                ? item.personal.affiliation[0]
                : "Unknown"}
            </p>
          </article>
          <span className="hover:text-gray-800 dark:text-gray-400 text-white group">
            <Link href="#" className="inline-flex items-center mt-2" to="/detail">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className=" w-4 h-4 group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
