import { useState } from "react";

interface Property {
  id: number;
  image: string;
  name: string;
  price: string;
  location: string;
  beds: number;
  baths: string;
  sqft: string;
  badge: string;
  badgeStyle: string;
  category: string;
}

const allProperties: Property[] = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGiFrFiJR3I2Km8iKAU0tauXG3buOXu6OhxUMzCUz2JC12dqJewtFOSoyKbFwXUj1ixTs_I62qby51RkfHWqqIvjGOjdzRrI6N7KoWJWO_EkqCalOahaZ9DPWjKJ_S6GlPpu75hvxvlRWkiworE74TtFersYtLW5xm6qDF9bnKBra_onD86Yt1HCUPq6qhw4mJ5sL5DRt2lZ5F5WdEPTxthGr-Hxvcl0dFHpLUARv3ZdjlXtNZS50FoazF6nxvVfkCHdO9iCYB7gY",
    name: "Skyline Modern Estate",
    price: "$3,250,000",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: "6",
    sqft: "4,500",
    badge: "For Sale",
    badgeStyle: "bg-navy-dark/80 text-white",
    category: "sale",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHCwqzkAAlqDDBDnYauk83AeNpHPyjPZAe0JmLv1TLxsPMM56sHToR1zaTKbU6esgc4YbQ0i5zVXouOo_vDkAitilKH7moUY4dIeJpcb1frpFUJwIgdjBFCMKyt4JdPWzSbZsHlzEScaaVx3Q7ulDDXV3zM7tGBvdFaBiI2iBvvgdI7bGxsOzA2gillZ9xvzqx2iSxJUPQxDTf_Lm82bUgpsfvmFlCxzWgWAWJHF_ZYBTN7K0yjEow-ITJblS8ZBOGqBBooC0fp8",
    name: "Ocean Breeze Penthouse",
    price: "$1,890,000",
    location: "Malibu, CA",
    beds: 3,
    baths: "3.5",
    sqft: "2,800",
    badge: "New Listing",
    badgeStyle: "bg-accent/90 text-navy-dark",
    category: "sale",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwFdeb64BxT4BwGeyduW2SnodHLFNv-VgM8TVMb-TP2QNA2id9YGidElbLyhbHTCAA93S07zXsZv2d1jRn_FFxczFuME4fH0pDTcWpq5qx7Fiswz6exjKvREMacjc0m_1wxqzRQzHnG2mH2f0yqgL4yqK3EHWm_GpR2AK_8jYSGbTXKqqBynNhJxa32p7oxlVlKuuG16KSCiNfaNq_6gcIhKwYACNBjXmZk-vQ1SQ2mHsWZGMUNm_SDe2L36MBl1dtXgoeUw-tac",
    name: "The Quartz Residence",
    price: "$4,100,000",
    location: "Aspen, CO",
    beds: 6,
    baths: "7",
    sqft: "6,200",
    badge: "For Sale",
    badgeStyle: "bg-navy-dark/80 text-white",
    category: "sale",
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn6i4PUEu0Yre_8ymJsgPTg8PW8J-AWaNRy4r_rQtOFAOy3qzezg2i9pCHPYI4-eedTD0NmqTlOhsXunBWaFxZdDviRbVGqy3R8mr8hlXISepRRF_gu4sbZnPz8DoUNIBXieoVU08zue4AV3qieWVd_Uec-SZRc7O1mG2VI7NsXnD8Zpm1O5-4GMIhPQ_zHbS3CEv-u4Zrn2fwERtTljyp1Xl8Uu_KvLRY41ZPIb8vUpNWoCsL3TmjBsS9rZaTDN6sFdO-IQoDiHI",
    name: "Palm Vista Villa",
    price: "$8,500/mo",
    location: "Miami Beach, FL",
    beds: 4,
    baths: "4.5",
    sqft: "3,800",
    badge: "For Rent",
    badgeStyle: "bg-primary text-navy-dark",
    category: "rent",
  },
  {
    id: 5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIx2paer5R7yPM5uK0DHKHp3NDazn1iK584mV-5Z8lw9zwkwO7N4UO-r8oqFku982U7hCL_Z0xYrFVtKRJq3apvxgtgI8XvnKRwv23Tt8OH8f7lCWAcZGOE3eU1JDLjW7qqUG7u4LiN8_x6MLqufQ2pUbTljtQR1Wh4NVs4FVA8NpiXgHNk-bvBA_rEKlbkW8RLl7s6-i9ailhhJARm8jZnKe6kgKsgWZjbZPpI5wlKmtXqDH2PB2NrH7FYPPdwAJAQt12PgYMtGc",
    name: "The Sterling Penthouse",
    price: "$5,750,000",
    location: "Manhattan, NY",
    beds: 4,
    baths: "5",
    sqft: "4,100",
    badge: "Featured",
    badgeStyle: "bg-accent text-navy-dark",
    category: "sale",
  },
  {
    id: 6,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGiFrFiJR3I2Km8iKAU0tauXG3buOXu6OhxUMzCUz2JC12dqJewtFOSoyKbFwXUj1ixTs_I62qby51RkfHWqqIvjGOjdzRrI6N7KoWJWO_EkqCalOahaZ9DPWjKJ_S6GlPpu75hvxvlRWkiworE74TtFersYtLW5xm6qDF9bnKBra_onD86Yt1HCUPq6qhw4mJ5sL5DRt2lZ5F5WdEPTxthGr-Hxvcl0dFHpLUARv3ZdjlXtNZS50FoazF6nxvVfkCHdO9iCYB7gY",
    name: "Harbor View Condo",
    price: "$6,200/mo",
    location: "San Francisco, CA",
    beds: 2,
    baths: "2",
    sqft: "1,600",
    badge: "For Rent",
    badgeStyle: "bg-primary text-navy-dark",
    category: "rent",
  },
  {
    id: 7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHCwqzkAAlqDDBDnYauk83AeNpHPyjPZAe0JmLv1TLxsPMM56sHToR1zaTKbU6esgc4YbQ0i5zVXouOo_vDkAitilKH7moUY4dIeJpcb1frpFUJwIgdjBFCMKyt4JdPWzSbZsHlzEScaaVx3Q7ulDDXV3zM7tGBvdFaBiI2iBvvgdI7bGxsOzA2gillZ9xvzqx2iSxJUPQxDTf_Lm82bUgpsfvmFlCxzWgWAWJHF_ZYBTN7K0yjEow-ITJblS8ZBOGqBBooC0fp8",
    name: "Coastal Retreat Estate",
    price: "$2,350,000",
    location: "Santa Barbara, CA",
    beds: 5,
    baths: "5.5",
    sqft: "4,800",
    badge: "New Listing",
    badgeStyle: "bg-accent/90 text-navy-dark",
    category: "sale",
  },
  {
    id: 8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwFdeb64BxT4BwGeyduW2SnodHLFNv-VgM8TVMb-TP2QNA2id9YGidElbLyhbHTCAA93S07zXsZv2d1jRn_FFxczFuME4fH0pDTcWpq5qx7Fiswz6exjKvREMacjc0m_1wxqzRQzHnG2mH2f0yqgL4yqK3EHWm_GpR2AK_8jYSGbTXKqqBynNhJxa32p7oxlVlKuuG16KSCiNfaNq_6gcIhKwYACNBjXmZk-vQ1SQ2mHsWZGMUNm_SDe2L36MBl1dtXgoeUw-tac",
    name: "Mountain Peak Lodge",
    price: "$7,200,000",
    location: "Vail, CO",
    beds: 7,
    baths: "8",
    sqft: "8,500",
    badge: "Exclusive",
    badgeStyle: "bg-navy-dark/80 text-white",
    category: "sale",
  },
  {
    id: 9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn6i4PUEu0Yre_8ymJsgPTg8PW8J-AWaNRy4r_rQtOFAOy3qzezg2i9pCHPYI4-eedTD0NmqTlOhsXunBWaFxZdDviRbVGqy3R8mr8hlXISepRRF_gu4sbZnPz8DoUNIBXieoVU08zue4AV3qieWVd_Uec-SZRc7O1mG2VI7NsXnD8Zpm1O5-4GMIhPQ_zHbS3CEv-u4Zrn2fwERtTljyp1Xl8Uu_KvLRY41ZPIb8vUpNWoCsL3TmjBsS9rZaTDN6sFdO-IQoDiHI",
    name: "The Grand Regency",
    price: "$12,000/mo",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: "6",
    sqft: "5,200",
    badge: "Premium",
    badgeStyle: "bg-accent text-navy-dark",
    category: "rent",
  },
];

const categories = [
  { label: "All Properties", value: "all" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = allProperties.filter((property) => {
    const matchesCategory =
      activeCategory === "all" || property.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="relative w-full px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/70 to-navy-dark/40 z-10" />
            <img
              alt="Properties"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn6i4PUEu0Yre_8ymJsgPTg8PW8J-AWaNRy4r_rQtOFAOy3qzezg2i9pCHPYI4-eedTD0NmqTlOhsXunBWaFxZdDviRbVGqy3R8mr8hlXISepRRF_gu4sbZnPz8DoUNIBXieoVU08zue4AV3qieWVd_Uec-SZRc7O1mG2VI7NsXnD8Zpm1O5-4GMIhPQ_zHbS3CEv-u4Zrn2fwERtTljyp1Xl8Uu_KvLRY41ZPIb8vUpNWoCsL3TmjBsS9rZaTDN6sFdO-IQoDiHI"
            />
          </div>
          <div className="relative z-20 text-center px-8 max-w-3xl animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              Our Portfolio
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Luxury <span className="text-primary">Properties</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Explore our curated collection of premier real estate listings
              across America's most coveted locations.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === cat.value
                    ? "bg-navy-dark text-white shadow-md"
                    : "text-slate-500 hover:text-navy-dark"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 gap-3 w-full md:w-96">
            <span className="material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full border-0 focus:ring-0 py-3 text-sm font-medium bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mt-6 text-sm text-slate-500">
          Showing{" "}
          <span className="font-bold text-navy-dark dark:text-white">
            {filteredProperties.length}
          </span>{" "}
          {filteredProperties.length === 1 ? "property" : "properties"}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">
              search_off
            </span>
            <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-2">
              No properties found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 animate-fade-in-up"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={property.image}
                    loading="lazy"
                  />
                  <div
                    className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase ${property.badgeStyle}`}
                  >
                    {property.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-navy-dark px-4 py-2 rounded-xl font-black text-lg">
                    {property.price}
                  </div>
                  {/* Favorite Button */}
                  <button
                    className="absolute top-4 right-4 size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                    aria-label="Add to favorites"
                  >
                    <span className="material-symbols-outlined text-xl">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    {property.location}
                  </div>
                  <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-6">
                    {property.name}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">bed</span>
                      <span className="font-bold">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">shower</span>
                      <span className="font-bold">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">
                        square_foot
                      </span>
                      <span className="font-bold">{property.sqft}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto mb-12">
        <div className="bg-navy-dark rounded-[2.5rem] p-12 lg:p-16 text-center shadow-2xl">
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Our team has access to exclusive off-market listings. Tell us what
            you need and we'll find it.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-navy-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Contact Our Agents
          </a>
        </div>
      </section>
    </div>
  );
}

export default PropertiesPage;
