// components/Footer.tsx (Server Component)

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 py-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          ReelForge
        </div>
        <nav className="flex gap-6 text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}