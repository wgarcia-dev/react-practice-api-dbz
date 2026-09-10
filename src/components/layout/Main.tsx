import { Characters } from "@components/ui/Characters";
import { SearchBar } from "@components/ui/SearchBar";
import { useState } from "react";
import { GetCharactersByQuery } from "@api/get-characters-by-query";
import type { DbzProps } from "@api/type.api";

export function Main() {
  const [characters, setCharacters] = useState<DbzProps[]>([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = value.trim();

    setLoading(true);

    try {
      const result = await GetCharactersByQuery(query);
      setHasSearched(true);
      setCharacters(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-180px)] bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
        <SearchBar
          placeholder="Busca un personaje..."
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />

        <Characters
          characters={characters}
          loading={loading}
          hasSearched={hasSearched}
          error={error}
        />
      </div>
    </main>
  );
}
