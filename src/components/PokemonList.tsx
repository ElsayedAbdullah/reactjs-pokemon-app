import { useEffect, useState } from "react";
import styles from "./pokemonlist.module.css";

interface IProps {
  url: string;
  setUrl: (url: string) => void;
  handleSelectPokemon: (name: string) => void;
}

const PokemonList = ({ url, setUrl, handleSelectPokemon }: IProps) => {
  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState(
    JSON.parse(localStorage.getItem("pokemon-data")!) || []
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    setPokemonData(data.results);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
    setLoading(false);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* search pokemon */}
      <input
        type="search"
        className={styles.search}
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* pokemon list */}
      <ul className={styles.list}>
        {pokemonData
          .filter(({ name }: { name: string }) => name.includes(search))
          .map(({ name }: { name: string }) => (
            <li
              onClick={() => handleSelectPokemon(name)}
              key={name}
              className={styles.item}
            >
              {name}
            </li>
          ))}
      </ul>

      {/* pagination buttons */}
      <div className={styles.buttons}>
        <button
          onClick={() => setUrl(prevPageUrl ? prevPageUrl : "")}
          disabled={!prevPageUrl}
        >
          previous
        </button>
        <button onClick={() => setUrl(nextPageUrl ? nextPageUrl : "")}>
          next
        </button>
      </div>
    </>
  );
};

export default PokemonList;
