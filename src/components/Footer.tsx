import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`flex justify-center w-full px-4 py-12 bg-transparent ${className}`}
    >
      <div
        className="w-full max-w-5xl rounded-2xl border p-10 transition-colors duration-300"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg-alt)",
        }}
      >
        {/* Top content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 mb-10">
          {/* Company Section */}
          <div className="space-y-3">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-3">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:ragibasif@tuta.io"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  ragibasif@tuta.io
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ragibasif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ragibasif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "var(--color-text-alt)" }}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom text */}
        <div
          className="pt-6 border-t text-center text-sm transition-colors duration-300"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-alt)",
          }}
        >
          <p>&copy; {currentYear} Ragib Asif. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
