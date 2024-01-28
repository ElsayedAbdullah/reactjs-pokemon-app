import { useEffect, useState } from "react";
import styles from "./pokemoncard.module.css";

interface IProps {
  selectedPokemon: string;
  clearHandler: () => void;
  parentUrl: string;
}

interface IPokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
}

const PokemonCard = ({ selectedPokemon, clearHandler, parentUrl }: IProps) => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);
  const [loading, setLoading] = useState(true);

  const url = parentUrl + "/" + selectedPokemon;
  async function fetchData(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
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
      <div className={styles.card}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={pokemon?.sprites?.front_default} alt={selectedPokemon} />
          <h1>
            {selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1)}
          </h1>
        </div>
        <button style={{ cursor: "pointer" }} onClick={clearHandler}>
          &times;
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <h2>Stats</h2>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name}>
              <p>
                <span style={{ opacity: 0.5 }}>{stat.stat.name}</span>:
                <span> {stat.base_stat}</span>
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
