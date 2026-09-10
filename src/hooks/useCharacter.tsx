import { GetCharactersByQuery } from "@/api/get-characters-by-query";
import type { DbzProps } from "@/api/type.api";
import { useState } from "react";

export function useCharacter() {
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

  return {
    // Props
    characters,
    value,
    loading,
    error,

    // Methods
    setValue,
    handleSubmit,
    hasSearched,
  };
}
