import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormEditFigure() {
  //   const [title, setTitle] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const [price, setPrice] = useState("");
  const [figure, setFigure] = useState({
    title: "",
    imageUrl: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/figure/" + id,
      });
      console.log(data);
      setFigure(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFigure((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (el) => {
    el.preventDefault();
    try {
      await axios.put("http://localhost:3000/figure/" + id, figure, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/Store");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <form
          onSubmit={handleEdit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Update Action Figure
          </h1>
          <div className="mb-3">
            <label htmlFor="register-title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              name="title"
              value={figure.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-imgUrl" className="form-label">
              Image URL <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              id="register-imgUrl"
              name="imgUrl"
              value={figure.imageUrl}
              onChange={handleChange}
              placeholder={figure.imageUrl}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-title" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              id="price"
              name="price"
              value={figure.price}
              onChange={handleChange}
              placeholder={figure.price}
              required
            />
          </div>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
