import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize if back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-5 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2 rounded-full border backdrop-blur-md px-6 py-3 shadow-lg transition-colors duration-300 ${className}`}
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-alt)",
      }}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-extrabold tracking-tight transition-colors duration-200 hover:underline"
          style={{ color: "var(--color-text)" }}
        >
          Ragib Asif
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium transition-colors duration-200 hover:underline"
              style={{ color: "var(--color-text-alt)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-full transition-colors duration-200"
          style={{
            color: "var(--color-text)",
            backgroundColor: "transparent",
          }}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 flex flex-col gap-4 px-2 py-2 rounded-lg transition-colors duration-300"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:underline"
              style={{ color: "var(--color-text-alt)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Theme Toggle */}
          <div className="flex justify-center px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
