import { Link, NavLink, useParams } from "react-router-dom";

export default function FigCard({ item, handleDelete }) {
  return (
    <>
      <div className="grid px-5 border rounded-md">
        <div className="shadow dark:shadow-none p-4 rounded">
          <article className="flex flex-col">
            <img
              src={item.imageUrl}
              alt="blog"
              className="w-full h-100 object-cover object-center rounded-md "
            />
            <h3 className="py-2">
              <p className="text-gray-900 dark:text-gray-100 title-font text-xl font-medium">
                {item.title}
              </p>
            </h3>
            <p className="mb-2 font-light text-sm text-white">
              Price : {item.price}
            </p>
            <Link
              className="bg-green-600 md:w-auto px-6 py-4 rounded-md text-lg text-slate-100 text-center"
              to="/register"
            >
              Buy
            </Link>
            <div className="flex justify-center gap-3 mt-3">
              <Link
                className="bg-blue-600 md:w-auto px-6 py-4 rounded-md text-lg text-slate-100 text-center"
                to={`/edit/${item.id}`}
              >
                Edit
              </Link>
              <button
                className="bg-red-600 md:w-auto px-6 py-4 rounded-md text-lg text-slate-100 text-center"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
