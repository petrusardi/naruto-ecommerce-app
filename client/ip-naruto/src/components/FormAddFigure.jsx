import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FormAddFigure() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (el) => {
    el.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/figure",
        { title, imageUrl, price },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/Store");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <form
          onSubmit={handleAdd}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Add Action Figure</h1>
          <div className="mb-3">
            <label htmlFor="register-title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title ..."
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
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Image URL ..."
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price ..."
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
