import { Link } from "react-router-dom";

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  variant: "light" | "dark" | "accent";
}

const services: Service[] = [
  {
    icon: "real_estate_agent",
    title: "Property Management",
    description:
      "Full-service management for residential and commercial portfolios. We handle everything so you can enjoy passive income without the hassle.",
    features: [
      "24/7 tenant support & maintenance",
      "Rent collection & financial reporting",
      "Property inspections & upkeep",
      "Lease management & renewals",
    ],
    variant: "light",
  },
  {
    icon: "sell",
    title: "Strategic Sales",
    description:
      "Expert guidance to position your property for maximum market value. Our data-driven approach ensures you get the best price, every time.",
    features: [
      "Comparative market analysis",
      "Professional staging & photography",
      "Targeted marketing campaigns",
      "Expert negotiation & closing",
    ],
    variant: "dark",
  },
  {
    icon: "insights",
    title: "Investment Advisory",
    description:
      "Exclusive access to high-yield real estate opportunities with detailed market analysis and portfolio optimization strategies.",
    features: [
      "Portfolio diversification strategy",
      "ROI projections & risk analysis",
      "Off-market deal access",
      "Tax optimization guidance",
    ],
    variant: "light",
  },
  {
    icon: "home_work",
    title: "Luxury Rentals",
    description:
      "Premium rental properties curated for discerning tenants. Experience luxury living with concierge-level service in every detail.",
    features: [
      "Curated luxury inventory",
      "Virtual & private showings",
      "Move-in concierge service",
      "Flexible lease terms",
    ],
    variant: "accent",
  },
  {
    icon: "architecture",
    title: "Development Consulting",
    description:
      "From land acquisition to project completion, we provide strategic consulting for real estate developers seeking premium positioning.",
    features: [
      "Site selection & feasibility",
      "Market demand analysis",
      "Project timeline management",
      "Pre-sale strategy & marketing",
    ],
    variant: "light",
  },
  {
    icon: "gavel",
    title: "Legal & Compliance",
    description:
      "Navigate complex real estate regulations with confidence. Our legal experts ensure every transaction is airtight and compliant.",
    features: [
      "Contract review & drafting",
      "Due diligence support",
      "Regulatory compliance",
      "Dispute resolution",
    ],
    variant: "dark",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We begin with a deep understanding of your goals, preferences, and investment criteria.",
    icon: "search",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Our team crafts a tailored plan leveraging market data and industry expertise.",
    icon: "lightbulb",
  },
  {
    step: "03",
    title: "Execution",
    description:
      "We handle every detail — from negotiations to paperwork — with precision and care.",
    icon: "rocket_launch",
  },
  {
    step: "04",
    title: "Success",
    description:
      "You achieve your real estate goals with ongoing support and concierge-level service.",
    icon: "celebration",
  },
];

function ServicesPage() {
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="relative w-full px-6 md:px-10 py-8 max-w-7xl mx-auto">
        <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy-dark/80 to-navy-dark/50 z-10" />
            <img
              alt="Services"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiHCwqzkAAlqDDBDnYauk83AeNpHPyjPZAe0JmLv1TLxsPMM56sHToR1zaTKbU6esgc4YbQ0i5zVXouOo_vDkAitilKH7moUY4dIeJpcb1frpFUJwIgdjBFCMKyt4JdPWzSbZsHlzEScaaVx3Q7ulDDXV3zM7tGBvdFaBiI2iBvvgdI7bGxsOzA2gillZ9xvzqx2iSxJUPQxDTf_Lm82bUgpsfvmFlCxzWgWAWJHF_ZYBTN7K0yjEow-ITJblS8ZBOGqBBooC0fp8"
            />
          </div>
          <div className="relative z-20 text-center px-8 max-w-3xl animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              Our Services
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Full-Spectrum <span className="text-primary">Real Estate</span>{" "}
              Solutions
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              From acquisition to management, we deliver premium services
              designed for investors, homeowners, and developers who demand
              excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
            What We Offer
          </h3>
          <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight">
            Comprehensive Real Estate Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group p-10 rounded-3xl transition-all hover:-translate-y-2 animate-fade-in-up ${
                service.variant === "dark"
                  ? "bg-navy-dark text-white shadow-2xl"
                  : service.variant === "accent"
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:shadow-xl"
                  : "bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl"
              }`}
            >
              <div
                className={`size-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${
                  service.variant === "dark"
                    ? "bg-accent text-navy-dark"
                    : service.variant === "accent"
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {service.icon}
                </span>
              </div>

              <h3
                className={`text-2xl font-bold mb-4 ${
                  service.variant === "dark"
                    ? "text-white"
                    : "text-navy-dark dark:text-white"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`leading-relaxed mb-6 ${
                  service.variant === "dark"
                    ? "text-slate-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-3 text-sm ${
                      service.variant === "dark"
                        ? "text-slate-300"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-base ${
                        service.variant === "dark"
                          ? "text-accent"
                          : "text-primary"
                      }`}
                    >
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`font-bold flex items-center gap-2 hover:gap-3 transition-all ${
                  service.variant === "dark" ? "text-accent" : "text-primary"
                }`}
              >
                Get Started{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50 dark:bg-navy-dark/20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
              Our Process
            </h3>
            <h2 className="text-navy-dark dark:text-white text-4xl md:text-5xl font-black leading-tight mb-4">
              How We <span className="text-primary">Work</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              A proven four-step approach that delivers exceptional results
              every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center animate-fade-in-up"
              >
                <div className="text-6xl font-black text-primary/10 absolute top-4 right-6">
                  {step.step}
                </div>
                <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-2xl">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy-dark dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-navy-dark rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center gap-8">
            <h2 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Ready to Get <span className="text-primary">Started</span>?
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Let our team of experts create a customized plan tailored to your
              specific real estate needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-primary text-navy-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform text-center"
              >
                Book a Consultation
              </Link>
              <Link
                to="/properties"
                className="bg-transparent text-white border-2 border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors text-center"
              >
                Browse Properties
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 h-80 lg:h-auto min-h-[400px]">
            <img
              alt="Consultation"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHwFdeb64BxT4BwGeyduW2SnodHLFNv-VgM8TVMb-TP2QNA2id9YGidElbLyhbHTCAA93S07zXsZv2d1jRn_FFxczFuME4fH0pDTcWpq5qx7Fiswz6exjKvREMacjc0m_1wxqzRQzHnG2mH2f0yqgL4yqK3EHWm_GpR2AK_8jYSGbTXKqqBynNhJxa32p7oxlVlKuuG16KSCiNfaNq_6gcIhKwYACNBjXmZk-vQ1SQ2mHsWZGMUNm_SDe2L36MBl1dtXgoeUw-tac"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
