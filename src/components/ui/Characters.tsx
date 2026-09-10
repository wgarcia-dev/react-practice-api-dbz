import type { DbzProps } from "@api/type.api";

type Props = {
  characters: DbzProps[];
  loading: boolean;
  hasSearched: boolean;
  error: string;
};

export function Characters({ characters, loading, hasSearched, error }: Props) {
  if (error.length !== 0) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
        Busca un personaje...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-sky-500/20 bg-slate-900/70 p-8 text-lg text-sky-300 shadow-inner shadow-slate-900/80">
        Cargando...
      </div>
    );
  }

  if (!characters.length) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
        No se encontraron personajes.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <article
          key={character.id}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/90 shadow-lg shadow-slate-950/40 transition duration-200 hover:-translate-y-1 hover:border-sky-500/40"
        >
          <div className="overflow-hidden bg-slate-800">
            <img
              src={character.image}
              alt={character.name}
              className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="mb-2 text-xl font-bold text-yellow-400">
              {character.name}
            </h3>

            <p className="mb-3 text-sm text-slate-300">{character.race}</p>

            <p className="mb-4 line-clamp-3 text-sm text-slate-400">
              {character.description}
            </p>

            <div className="mt-auto rounded-xl bg-slate-800 p-3 text-xs text-slate-200">
              <p>
                <span className="font-semibold text-slate-300">Ki:</span>{" "}
                {character.ki}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
