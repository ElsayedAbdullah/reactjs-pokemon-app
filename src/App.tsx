import { useState } from "react";
import styles from "./app.module.css";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  function handleSelectPokemon(pokemon: string) {
    setSelectedPokemon(pokemon);
  }

  return (
    <>
      {/* title */}
      <h1 style={{ textAlign: "center" }}>Pokemon App</h1>
      <div className={styles.container}>
        {selectedPokemon ? (
          <PokemonCard
            selectedPokemon={selectedPokemon}
            parentUrl={url}
            clearHandler={() => setSelectedPokemon(null)}
          />
        ) : (
          <PokemonList
            url={url}
            setUrl={setUrl}
            handleSelectPokemon={handleSelectPokemon}
          />
        )}
      </div>
    </>
  );
}

export default App;
