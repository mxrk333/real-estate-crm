import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import sparcLogo from "../image/sparc.png";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Properties", path: "/properties" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={sparcLogo} alt="Inner SPARC Realty Corporation" className="h-10 w-auto" />
          <h2 className="text-navy-dark dark:text-white text-lg font-extrabold tracking-tight leading-tight">
            Inner SPARC<br />
            <span className="text-primary text-xs font-semibold tracking-wider">Realty Corporation</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors relative ${
                isActive(link.path)
                  ? "text-primary nav-active"
                  : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <Link
          to="/contact"
          className="hidden md:block bg-navy-dark hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all border border-navy-dark"
        >
          Contact Us
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center text-navy-dark dark:text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <button
              className="self-end text-slate-600"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Mobile Logo */}
            <div className="flex items-center gap-3 mb-4">
              <img src={sparcLogo} alt="Inner SPARC Realty Corporation" className="h-10 w-auto" />
              <span className="text-navy-dark text-lg font-extrabold tracking-tight leading-tight">
                Inner SPARC<br />
                <span className="text-primary text-xs font-semibold tracking-wider">Realty Corporation</span>
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-navy-dark text-white px-6 py-3.5 rounded-lg text-sm font-bold text-center transition-all hover:bg-slate-800 mt-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
