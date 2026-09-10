type Props = {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
};

export function SearchBar({
  placeholder = "Input a text...",
  value,
  setValue,
  handleSubmit,
}: Props) {
  return (
    <form
      className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-sky-500/30 bg-slate-800/80 p-2 shadow-[0_0_30px_rgba(14,165,233,0.18)] backdrop-blur-sm"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full rounded-xl border border-transparent bg-slate-200/5 px-4 py-3 text-base text-slate-50 outline-none transition focus:border-sky-400 focus:bg-slate-200/10"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Buscar personaje"
      />
      <button
        className="rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-sky-500/30 transition hover:brightness-110"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}
