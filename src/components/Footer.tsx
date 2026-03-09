import { Link } from "react-router-dom";
import sparcLogo from "../image/sparc.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-navy-dark border-t border-slate-100 dark:border-slate-800 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Address */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={sparcLogo}
                alt="Inner SPARC Realty Corporation"
                className="h-12 w-auto"
              />
              <h2 className="text-navy-dark dark:text-white text-lg font-extrabold tracking-tight leading-tight">
                Inner SPARC
                <br />
                <span className="text-primary text-xs font-semibold tracking-wider">
                  Realty Corporation
                </span>
              </h2>
            </Link>
            <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">
                location_on
              </span>
              <p>
                Blk 26 Lot 4 Phase 3, Avida Residences Sta. Catalina, Brgy.
                Salawag
                <br />
                Dasmarinas, Cavite, Philippines
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                schedule
              </span>
              Business Hours
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  calendar_today
                </span>
                Monday – Sunday
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  alarm
                </span>
                6:00 AM – 12:00 AM
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                call
              </span>
              Contacts
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a
                  href="tel:+63464580706"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    phone
                  </span>
                  (046) 458-0706
                </a>
              </li>
              <li>
                <a
                  href="tel:+639178534875"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    smartphone
                  </span>
                  0917-853-4875
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    (Globe/TM)
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+639999943304"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    smartphone
                  </span>
                  0999-994-3304
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    (Smart/T&T)
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Email */}
          <div>
            <h4 className="font-bold text-navy-dark dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                mail
              </span>
              Email
            </h4>
            <a
              href="mailto:innersparcrealtyservices@gmail.com"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-2 break-all"
            >
              <span className="material-symbols-outlined text-primary text-base shrink-0">
                forward_to_inbox
              </span>
              innersparcrealtyservices@gmail.com
            </a>

            {/* Quick Links */}
            <h4 className="font-bold text-navy-dark dark:text-white mt-8 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                link
              </span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
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
                  to="/properties"
                  className="hover:text-primary transition-colors"
                >
                  Properties
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
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>
            © {currentYear} Inner SPARC Realty Corporation. All rights reserved.
          </p>
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
