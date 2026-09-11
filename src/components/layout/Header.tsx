export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 backdrop-blur-sm sticky top-0 z-50">
      <h2 className="text-xl font-bold text-indigo-400">PruebaAPI</h2>

      <nav className="flex gap-6 text-sm font-medium text-slate-300">
        <a href="#" className="hover:text-white transition-colors">
          Inicio
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Contactos
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Servicios
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Sobre
        </a>
      </nav>
    </header>
  );
}
