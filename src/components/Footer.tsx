import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center w-full px-4 py-12 bg-transparent">
      <div className="w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900 p-10">
        {/* Top content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 mb-10">
          {/* Company Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#portfolio"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@company.com"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  hello@company.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Follow Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom text */}
        <div className="pt-6 border-t border-neutral-800 text-center text-sm text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Ragib Asif. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
