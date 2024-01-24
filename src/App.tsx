import { useEffect, useState } from "react";
import styles from "./app.module.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [search, setSearch] = useState("");

  // to cancel request on cleanup function
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchPokemonData = async () => {
    try {
      const res = await fetch(url, { signal });
      const data = await res.json();
      setPokemonData(data.results);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return (
    <div className={styles.container}>
      {/* title */}
      <h1>Pokemon App</h1>

      {/* search pokemon */}
      <input
        type="text"
        className={styles.search}
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* pokemon list */}
      <ul>
        {pokemonData
          .filter(({ name }: { name: string }) => name.includes(search))
          .map(({ name }: { name: string }) => (
            <li key={name}>{name}</li>
          ))}
      </ul>

      {/* pagination buttons */}
      <div className={styles.buttons}>
        <button
          onClick={() => setUrl(prevPageUrl ? prevPageUrl : "")}
          style={{
            opacity: prevPageUrl ? 1 : 0.5,
            cursor: prevPageUrl ? "pointer" : "not-allowed",
          }}
          disabled={!prevPageUrl}
        >
          previous
        </button>
        <button onClick={() => setUrl(nextPageUrl ? nextPageUrl : "")}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
