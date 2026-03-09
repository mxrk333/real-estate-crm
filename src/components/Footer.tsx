import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-navy-dark border-t border-slate-100 dark:border-slate-800 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-navy-dark dark:bg-primary text-primary dark:text-navy-dark rounded-lg flex items-center justify-center font-black">
                E
              </div>
              <h2 className="text-navy-dark dark:text-white text-xl font-extrabold tracking-tight">
                ELITE ESTATE
              </h2>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Redefining luxury real estate with integrity, professional
              expertise, and a commitment to excellence.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/properties"
                  className="hover:text-primary transition-colors"
                >
                  Luxury Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-primary transition-colors"
                >
                  Commercial Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-primary transition-colors"
                >
                  New Developments
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-primary transition-colors"
                >
                  Sold Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Stay updated with our latest luxury listings.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 focus:ring-primary focus:border-primary"
                placeholder="Email address"
                type="email"
              />
              <button
                type="submit"
                className="bg-primary text-navy-dark px-4 py-2 rounded-lg font-bold whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {currentYear} Elite Real Estate Agency. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
