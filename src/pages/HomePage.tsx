import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative w-full px-6 md:px-10 py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/40 to-transparent z-10" />
            <img
              alt="Luxury Home"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn6i4PUEu0Yre_8ymJsgPTg8PW8J-AWaNRy4r_rQtOFAOy3qzezg2i9pCHPYI4-eedTD0NmqTlOhsXunBWaFxZdDviRbVGqy3R8mr8hlXISepRRF_gu4sbZnPz8DoUNIBXieoVU08zue4AV3qieWVd_Uec-SZRc7O1mG2VI7NsXnD8Zpm1O5-4GMIhPQ_zHbS3CEv-u4Zrn2fwERtTljyp1Xl8Uu_KvLRY41ZPIb8vUpNWoCsL3TmjBsS9rZaTDN6sFdO-IQoDiHI"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 w-full max-w-3xl px-8 lg:px-16 flex flex-col gap-8 text-left self-start">
            <div className="space-y-4 animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
                Premium Property Management
              </span>
              <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight">
                Find Your <span className="text-primary">Dream</span> Home
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-xl font-medium">
                Discover curated luxury properties and expert management
                services tailored to your sophisticated lifestyle.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex flex-1 items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                <span className="material-symbols-outlined text-slate-400">
                  location_on
                </span>
                <input
                  className="w-full border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium bg-transparent"
                  placeholder="City, neighborhood, or ZIP"
                  type="text"
                />
              </div>
              <div className="flex flex-1 items-center px-4 gap-3 py-3 md:py-0">
                <span className="material-symbols-outlined text-slate-400">
                  home_work
                </span>
                <select className="w-full border-0 focus:ring-0 text-slate-900 font-medium bg-transparent">
                  <option>Property Type</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Apartment</option>
                </select>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-navy-dark px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">search</span>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              Our Expertise
            </h3>
            <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight">
              Professional Real Estate Excellence
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg">
            Comprehensive solutions for buyers, sellers, and elite investors
            looking for high-yield opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {/* Service 1 */}
          <div className="group p-10 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in-up">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                real_estate_agent
              </span>
            </div>
            <h3 className="text-navy-dark dark:text-white text-2xl font-bold mb-4">
              Property Management
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Full-service management for residential and commercial portfolios
              with 24/7 support.
            </p>
            <Link
              to="/services"
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Service 2 - Featured */}
          <div className="group p-10 rounded-3xl bg-navy-dark text-white shadow-2xl hover:-translate-y-2 transition-all animate-fade-in-up">
            <div className="size-16 rounded-2xl bg-accent text-navy-dark flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-3xl">sell</span>
            </div>
            <h3 className="text-white text-2xl font-bold mb-4">
              Strategic Sales
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Expert guidance to position your property and secure the highest
              market value possible.
            </p>
            <Link
              to="/services"
              className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Service 3 */}
          <div className="group p-10 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-2 animate-fade-in-up">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                insights
              </span>
            </div>
            <h3 className="text-navy-dark dark:text-white text-2xl font-bold mb-4">
              Investment Advisory
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Exclusive access to high-yield real estate opportunities and
              detailed market analysis.
            </p>
            <Link
              to="/services"
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-slate-50 dark:bg-navy-dark/20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-navy-dark dark:text-white text-4xl font-black">
                Featured Properties
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Our hand-picked selection of luxury listings.
              </p>
            </div>
            <Link
              to="/properties"
              className="flex items-center gap-2 font-bold text-navy-dark dark:text-white border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              View All Listings{" "}
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 animate-fade-in-up">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Skyline Modern Estate"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGiFrFiJR3I2Km8iKAU0tauXG3buOXu6OhxUMzCUz2JC12dqJewtFOSoyKbFwXUj1ixTs_I62qby51RkfHWqqIvjGOjdzRrI6N7KoWJWO_EkqCalOahaZ9DPWjKJ_S6GlPpu75hvxvlRWkiworE74TtFersYtLW5xm6qDF9bnKBra_onD86Yt1HCUPq6qhw4mJ5sL5DRt2lZ5F5WdEPTxthGr-Hxvcl0dFHpLUARv3ZdjlXtNZS50FoazF6nxvVfkCHdO9iCYB7gY"
                />
                <div className="absolute top-4 left-4 bg-navy-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  For Sale
                </div>
                <div className="absolute bottom-4 right-4 bg-primary text-navy-dark px-4 py-2 rounded-xl font-black text-lg">
                  $3,250,000
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Beverly Hills, CA
                </div>
                <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-6">
                  Skyline Modern Estate
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">bed</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">shower</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">
                      square_foot
                    </span>
                    <span className="font-bold">4,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 animate-fade-in-up">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Ocean Breeze Penthouse"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiHCwqzkAAlqDDBDnYauk83AeNpHPyjPZAe0JmLv1TLxsPMM56sHToR1zaTKbU6esgc4YbQ0i5zVXouOo_vDkAitilKH7moUY4dIeJpcb1frpFUJwIgdjBFCMKyt4JdPWzSbZsHlzEScaaVx3Q7ulDDXV3zM7tGBvdFaBiI2iBvvgdI7bGxsOzA2gillZ9xvzqx2iSxJUPQxDTf_Lm82bUgpsfvmFlCxzWgWAWJHF_ZYBTN7K0yjEow-ITJblS8ZBOGqBBooC0fp8"
                />
                <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-navy-dark px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  New Listing
                </div>
                <div className="absolute bottom-4 right-4 bg-primary text-navy-dark px-4 py-2 rounded-xl font-black text-lg">
                  $1,890,000
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Malibu, CA
                </div>
                <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-6">
                  Ocean Breeze Penthouse
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">bed</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">shower</span>
                    <span className="font-bold">3.5</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">
                      square_foot
                    </span>
                    <span className="font-bold">2,800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 animate-fade-in-up">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="The Quartz Residence"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHwFdeb64BxT4BwGeyduW2SnodHLFNv-VgM8TVMb-TP2QNA2id9YGidElbLyhbHTCAA93S07zXsZv2d1jRn_FFxczFuME4fH0pDTcWpq5qx7Fiswz6exjKvREMacjc0m_1wxqzRQzHnG2mH2f0yqgL4yqK3EHWm_GpR2AK_8jYSGbTXKqqBynNhJxa32p7oxlVlKuuG16KSCiNfaNq_6gcIhKwYACNBjXmZk-vQ1SQ2mHsWZGMUNm_SDe2L36MBl1dtXgoeUw-tac"
                />
                <div className="absolute top-4 left-4 bg-navy-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  For Sale
                </div>
                <div className="absolute bottom-4 right-4 bg-primary text-navy-dark px-4 py-2 rounded-xl font-black text-lg">
                  $4,100,000
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Aspen, CO
                </div>
                <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-6">
                  The Quartz Residence
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">bed</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">shower</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">
                      square_foot
                    </span>
                    <span className="font-bold">6,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-navy-dark rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center gap-8">
            <h2 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Ready to Find Your Place?
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Our team of experts is ready to help you navigate the luxury real
              estate market. Book a private consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-primary text-navy-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform text-center"
              >
                Schedule a Viewing
              </Link>
              <Link
                to="/properties"
                className="bg-transparent text-white border-2 border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors text-center"
              >
                View Locations
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 h-80 lg:h-auto min-h-[400px]">
            <img
              alt="Location Map"
              className="w-full h-full object-cover grayscale brightness-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIx2paer5R7yPM5uK0DHKHp3NDazn1iK584mV-5Z8lw9zwkwO7N4UO-r8oqFku982U7hCL_Z0xYrFVtKRJq3apvxgtgI8XvnKRwv23Tt8OH8f7lCWAcZGOE3eU1JDLjW7qqUG7u4LiN8_x6MLqufQ2pUbTljtQR1Wh4NVs4FVA8NpiXgHNk-bvBA_rEKlbkW8RLl7s6-i9ailhhJARm8jZnKe6kgKsgWZjbZPpI5wlKmtXqDH2PB2NrH7FYPPdwAJAQt12PgYMtGc"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
