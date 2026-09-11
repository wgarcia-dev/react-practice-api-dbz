interface Props {
  terms: string[];
  handleTermClicked: (term: string) => void;
}

export function PreviousSearch({ terms, handleTermClicked }: Props) {
  return (
    <section className="flex justify-center items-center">
      <div className="flex justify-between gap-4">
        {terms.map((term) => (
          <button
            type="button"
            className="bg-black hover:bg-black/50 transition cursor-pointer px-4 py-3 rounded-xl text-white font-semibold tracking-wider"
            key={term}
            onClick={() => handleTermClicked(term)}
          >
            {term}
          </button>
        ))}
      </div>
    </section>
  );
}
