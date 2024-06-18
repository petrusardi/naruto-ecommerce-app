import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/character", {
        params: { search: searchTerm },
      });
      navigate(`/detail/${response.data[0].id}`);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <label className="input input-bordered flex items-center gap-2 px-10 py-10">
        <input
          type="text"
          className="grow p-5 rounded-md "
          placeholder="Search for Character"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ms-2 bg-red-600 p-5 text-white rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </label>
    </>
  );
}
