import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import axios from "axios";
import CharCard from "../components/CharCard";

export default function WikiPage() {
  const [characters, setCharacters] = useState([]);

  const fetchData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/character",
      });
      console.log(data);
      setCharacters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Search />
      <div className="grid grid-cols-3 gap-5">
          {characters &&
            characters.map((character, index) => {
              return <CharCard key={character.id} item={character} />;
            })}
        </div>
    </>
  );
}
