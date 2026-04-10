interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  color: "blue" | "green" | "orange";
}

const services: ServiceItem[] = [
  {
    icon: "real_estate_agent",
    title: "Property Buying",
    description:
      "Expert guidance to find your dream home within your budget, handling negotiations and paperwork seamlessly.",
    color: "blue",
  },
  {
    icon: "sell",
    title: "Property Selling",
    description:
      "Maximize your property value with our strategic marketing, staging advice, and broad network of buyers.",
    color: "green",
  },
  {
    icon: "manage_accounts",
    title: "Rental Management",
    description:
      "Hassle-free management services for property owners including tenant screening, maintenance, and rent collection.",
    color: "orange",
  },
];

function Services() {
  return (
    <section id="services" className="services-section">
      {/* Section Header */}
      <div className="section-header-flex">
        <div>
          <div className="section-eyebrow">Our Expertise</div>
          <h2 className="section-title">
            Comprehensive Real Estate Solutions
          </h2>
          <p className="section-desc">
            We provide end-to-end services to help you buy, sell, or rent your
            ideal property with ease and confidence.
          </p>
        </div>
        <a href="#" className="section-link">
          See all services
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>

      {/* Service Cards */}
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.title} className="service-card">
            <div className={`service-icon ${service.color}`}>
              <span className="material-symbols-outlined">{service.icon}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
