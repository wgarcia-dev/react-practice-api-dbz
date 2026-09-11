import { Characters } from "@components/ui/Characters";
import { SearchBar } from "@components/ui/SearchBar";
import { PreviousSearch } from "../ui/PreviousSearch";
import { useCharacter } from "@/hooks/useCharacter";

export function Main() {
  const {
    value,
    terms,
    characters,
    loading,
    error,
    setValue,
    handleSubmit,
    handleTermClicked,
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

        <PreviousSearch terms={terms} handleTermClicked={handleTermClicked} />

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
