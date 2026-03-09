import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Victoria Sterling",
    role: "CEO & Founder",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn6i4PUEu0Yre_8ymJsgPTg8PW8J-AWaNRy4r_rQtOFAOy3qzezg2i9pCHPYI4-eedTD0NmqTlOhsXunBWaFxZdDviRbVGqy3R8mr8hlXISepRRF_gu4sbZnPz8DoUNIBXieoVU08zue4AV3qieWVd_Uec-SZRc7O1mG2VI7NsXnD8Zpm1O5-4GMIhPQ_zHbS3CEv-u4Zrn2fwERtTljyp1Xl8Uu_KvLRY41ZPIb8vUpNWoCsL3TmjBsS9rZaTDN6sFdO-IQoDiHI",
    bio: "20+ years in luxury real estate, specializing in high-value transactions across Beverly Hills and Malibu.",
  },
  {
    name: "Marcus Chen",
    role: "Head of Sales",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGiFrFiJR3I2Km8iKAU0tauXG3buOXu6OhxUMzCUz2JC12dqJewtFOSoyKbFwXUj1ixTs_I62qby51RkfHWqqIvjGOjdzRrI6N7KoWJWO_EkqCalOahaZ9DPWjKJ_S6GlPpu75hvxvlRWkiworE74TtFersYtLW5xm6qDF9bnKBra_onD86Yt1HCUPq6qhw4mJ5sL5DRt2lZ5F5WdEPTxthGr-Hxvcl0dFHpLUARv3ZdjlXtNZS50FoazF6nxvVfkCHdO9iCYB7gY",
    bio: "Expert negotiator with a track record of closing $500M+ in premium property deals worldwide.",
  },
  {
    name: "Sophia Reynolds",
    role: "Investment Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHCwqzkAAlqDDBDnYauk83AeNpHPyjPZAe0JmLv1TLxsPMM56sHToR1zaTKbU6esgc4YbQ0i5zVXouOo_vDkAitilKH7moUY4dIeJpcb1frpFUJwIgdjBFCMKyt4JdPWzSbZsHlzEScaaVx3Q7ulDDXV3zM7tGBvdFaBiI2iBvvgdI7bGxsOzA2gillZ9xvzqx2iSxJUPQxDTf_Lm82bUgpsfvmFlCxzWgWAWJHF_ZYBTN7K0yjEow-ITJblS8ZBOGqBBooC0fp8",
    bio: "Former Goldman Sachs analyst now focused on identifying premium real estate investment opportunities.",
  },
  {
    name: "James Whitfield",
    role: "Property Manager",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwFdeb64BxT4BwGeyduW2SnodHLFNv-VgM8TVMb-TP2QNA2id9YGidElbLyhbHTCAA93S07zXsZv2d1jRn_FFxczFuME4fH0pDTcWpq5qx7Fiswz6exjKvREMacjc0m_1wxqzRQzHnG2mH2f0yqgL4yqK3EHWm_GpR2AK_8jYSGbTXKqqBynNhJxa32p7oxlVlKuuG16KSCiNfaNq_6gcIhKwYACNBjXmZk-vQ1SQ2mHsWZGMUNm_SDe2L36MBl1dtXgoeUw-tac",
    bio: "Oversees our entire property management portfolio, ensuring every client receives white-glove service.",
  },
];

const stats = [
  { value: "2,500+", label: "Properties Sold", icon: "home" },
  { value: "98%", label: "Client Satisfaction", icon: "thumb_up" },
  { value: "150+", label: "Expert Agents", icon: "groups" },
  { value: "30", label: "Years Experience", icon: "workspace_premium" },
];

function AboutPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="relative w-full px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/70 to-navy-dark/40 z-10" />
            <img
              alt="Elite Estate Office"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIx2paer5R7yPM5uK0DHKHp3NDazn1iK584mV-5Z8lw9zwkwO7N4UO-r8oqFku982U7hCL_Z0xYrFVtKRJq3apvxgtgI8XvnKRwv23Tt8OH8f7lCWAcZGOE3eU1JDLjW7qqUG7u4LiN8_x6MLqufQ2pUbTljtQR1Wh4NVs4FVA8NpiXgHNk-bvBA_rEKlbkW8RLl7s6-i9ailhhJARm8jZnKe6kgKsgWZjbZPpI5wlKmtXqDH2PB2NrH7FYPPdwAJAQt12PgYMtGc"
            />
          </div>
          <div className="relative z-20 text-center px-8 max-w-3xl animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              About Us
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Redefining <span className="text-primary">Luxury</span> Real
              Estate
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Since 1994, we've been the gold standard in luxury real estate,
              serving discerning clients who demand nothing but the best.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              Our Story
            </h3>
            <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight mb-8">
              Built on Trust, Driven by{" "}
              <span className="text-primary">Excellence</span>
            </h2>
            <div className="space-y-6 text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Elite Estate was founded with a singular vision: to transform the
                luxury real estate experience into something truly extraordinary.
                We don't just buy and sell properties — we curate lifestyles.
              </p>
              <p>
                Our team of seasoned professionals brings decades of combined
                experience in high-end residential and commercial real estate.
                From Beverly Hills mansions to Manhattan penthouses, we've helped
                thousands of clients find their dream homes.
              </p>
              <p>
                What sets us apart is our commitment to personalized service.
                Every client receives a dedicated team of experts who understand
                their unique preferences, investment goals, and lifestyle
                aspirations.
              </p>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                alt="Luxury property showcase"
                className="w-full h-[500px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGiFrFiJR3I2Km8iKAU0tauXG3buOXu6OhxUMzCUz2JC12dqJewtFOSoyKbFwXUj1ixTs_I62qby51RkfHWqqIvjGOjdzRrI6N7KoWJWO_EkqCalOahaZ9DPWjKJ_S6GlPpu75hvxvlRWkiworE74TtFersYtLW5xm6qDF9bnKBra_onD86Yt1HCUPq6qhw4mJ5sL5DRt2lZ5F5WdEPTxthGr-Hxvcl0dFHpLUARv3ZdjlXtNZS50FoazF6nxvVfkCHdO9iCYB7gY"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 animate-float">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">
                    verified
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-navy-dark dark:text-white">
                    30+
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center stat-counter animate-fade-in-up"
              >
                <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    {stat.icon}
                  </span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
            Our Values
          </h3>
          <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {[
            {
              icon: "diamond",
              title: "Integrity",
              description:
                "We operate with unwavering honesty and transparency in every transaction. Your trust is our most valued asset.",
            },
            {
              icon: "emoji_events",
              title: "Excellence",
              description:
                "We set the standard in luxury real estate, constantly pushing boundaries to deliver outstanding results.",
            },
            {
              icon: "handshake",
              title: "Partnership",
              description:
                "We build lasting relationships with our clients, treating every partnership as a long-term commitment to their success.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="group p-10 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all hover:-translate-y-2 text-center animate-fade-in-up"
            >
              <div className="size-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-8 mx-auto group-hover:bg-accent group-hover:text-navy-dark transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  {value.icon}
                </span>
              </div>
              <h3 className="text-navy-dark dark:text-white text-2xl font-bold mb-4">
                {value.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50 dark:bg-navy-dark/20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              Our Team
            </h3>
            <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight mb-4">
              Meet the <span className="text-primary">Experts</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Our team of industry veterans brings unparalleled expertise and
              passion to every client engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="team-card bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 animate-fade-in-up"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover team-card-image"
                    src={member.image}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-dark dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-navy-dark rounded-[2.5rem] p-12 lg:p-20 text-center shadow-2xl">
          <h2 className="text-white text-4xl md:text-5xl font-black leading-tight mb-6">
            Want to Join Our <span className="text-primary">Team</span>?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We're always looking for talented individuals who share our passion
            for excellence in luxury real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary text-navy-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Get in Touch
            </Link>
            <Link
              to="/services"
              className="bg-transparent text-white border-2 border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
