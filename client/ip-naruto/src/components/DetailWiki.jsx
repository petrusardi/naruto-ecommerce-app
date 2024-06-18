import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    const readCharacter = async () => {
      try {
        let { data } = await axios({
          method: "get",
          url: "https://narutodb.xyz/api/character/" + id,
        });
        console.log(data);
        setCharacter(data);
      } catch (error) {
        console.log(error);
      }
    };
    readCharacter();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex px-10 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center bg-white dark:bg-slate-900">
        <div className="w-full p- space-y-4">
          <h1 className="text-5xl font-bold leading-tight">{character.name}</h1>
          <div className="text-white font-light text-lg">
            <h2 className="font-bold leading-tight">Village :</h2>
            {character.personal?.affiliation?.[0]}
          </div>
          <div className="text-white font-light text-lg">
            <h2 className="font-bold leading-tight">Jutsu :</h2>
            {character.jutsu &&
              character.jutsu.map((char, index) => {
                if (index < 5) return <p>{char}</p>;
              })}
          </div>
          <div className="text-white font-light text-lg">
            <h2 className="font-bold leading-tight">Nature Type :</h2>
            {character.natureType &&
              character.natureType.map((char, index) => {
                if (index < 2) return <p>{char}</p>;
              })}
          </div>
          <div className="text-white font-light text-lg">
            <h2 className="font-bold leading-tight">Tools :</h2>
            {character.tools &&
              character.tools.map((char, index) => {
                if (index < 5) return <p>{char}</p>;
              })}
          </div>
        </div>
        <figure className="w-full">
          <img
            src={character.images?.[0]}
            className="w-full h-96 object-cover"
            alt="hero"
          />
        </figure>
      </div>
    </>
  );
}
