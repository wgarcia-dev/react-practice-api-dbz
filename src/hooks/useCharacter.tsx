import { useEffect, useRef, useState } from "react";
import { GetCharactersByQuery } from "@api/get-characters-by-query";
import type { DbzProps } from "@api/type.api";

export function useCharacter() {
  const [characters, setCharacters] = useState<DbzProps[]>([]);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const characterCache = useRef<Record<string, DbzProps[]>>({});

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [terms, setTerms] = useState<string[]>(() => {
    const searches = localStorage.getItem("searches");
    return searches ? JSON.parse(searches) : [];
  });

  const runSearch = async (query: string) => {
    const queryFormatted = query.toLowerCase();
    if (!queryFormatted) return;

    setError("");
    setLoading(true);

    if (characterCache.current[query]) {
      setCharacters(characterCache.current[query]);
      setLoading(false);
      return;
    }

    try {
      const result = await GetCharactersByQuery(queryFormatted);
      setHasSearched(true);
      setCharacters(result);
      characterCache.current[query] = result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleTermClicked = (term: string) => {
    const termFormatted = term.trim().toLowerCase();
    if (!termFormatted) return;

    setValue(termFormatted);
    runSearch(termFormatted);
  };

  const handleTerms = (term: string = "") => {
    const termFormatted = term.toLowerCase();

    if (termFormatted.length === 0) return;
    if (terms.includes(termFormatted)) return;

    setTerms((previousTerms) => [termFormatted, ...previousTerms].slice(0, 7));
  };

  useEffect(() => {
    localStorage.setItem("searches", JSON.stringify(terms));
  }, [terms]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = value.trim();
    if (!query) return;

    handleTerms(query);
    runSearch(query);
  };

  return {
    // props
    value,
    terms,
    characters,
    loading,
    error,

    // methods
    setValue,
    handleSubmit,
    handleTermClicked,
    hasSearched,
  };
}
