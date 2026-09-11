import { useCharacter } from "@/hooks/useCharacter";
import { Characters } from "@components/ui/Characters";
import { SearchBar } from "@components/ui/SearchBar";

export function Main() {
  const {
    // Props
    characters,
    value,
    loading,
    error,

    // Methods
    setValue,
    handleSubmit,
    hasSearched,
  } = useCharacter();

  return (
    <main className="flex-1 bg-slate-950 text-white">
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
