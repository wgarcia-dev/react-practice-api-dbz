export function Footer() {
  return (
    <footer className="w-full py-6 px-8 bg-[#1e293b]/50 border-t border-slate-800 text-center text-slate-400 text-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p>
          © {new Date().getFullYear()} PruebaAPI. Todos los derechos reservados.
        </p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}
