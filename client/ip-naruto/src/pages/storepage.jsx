import { useState, useEffect } from "react";
import axios from "axios";
import FigCard from "../components/FigCard";

export default function Store() {
  const [figure, setFigure] = useState([]);

  const fetchData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/figure",
      });
      console.log(data);
      setFigure(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/figure/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchData();
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-5 px-5 py-5">
        {figure &&
          figure.map((fig, index) => {
            return <FigCard key={fig.id} item={fig} handleDelete={() => handleDelete(fig.id)}/>;
          })}
      </div>
    </>
  );
}
