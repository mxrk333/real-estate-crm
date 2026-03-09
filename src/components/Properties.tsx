interface Property {
  image: string;
  alt: string;
  badge: string;
  badgeColor: "blue" | "green" | "orange";
  name: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  sqft: string;
}

const properties: Property[] = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9bL-qzNd3Vkk1mimsXoRfuz85bvWdAPXU-HR-qDjTWFBxdu16oPw1NgHMZctanklk2TquiiDAToaM5eLyE8f2yGg0cPE6He944CT4tBUcne8kNAj1fPe5l47x7Zp3dkpowXBLvSqPZhQXxy-HZZ-O_IESRSlNyNJZem5GDYrqszyH1qorM0j66x4Jiewv6kDKcKfCI0LI-Sj97tVp0iFGzJ1b2BAptt4JSDIVSXwv2POkIZ9JUlhtpqSrdDhAAZnr722MmpwklAc",
    alt: "Modern suburban home with green lawn",
    badge: "For Sale",
    badgeColor: "blue",
    name: "Sunnyvale Retreat",
    price: "$850,000",
    location: "123 Maple Drive, Springfield",
    beds: "4",
    baths: "3",
    sqft: "2,400",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLe4Gym4Ds3D9Xu4BH8pkDJbu8uQ73601Y0a06SgVOXYQ-8nYlLBSOtAFYXJ1MmnBBb2fbGYllaAsSuHIsAgIN5jprRbkoH03ySLfXvQrLVGSDnbkW4R3T6DCdRB-4yTyocbAGzuQ7xGHwHKROwTyM4XqSBx0Ew_tzNFT0MOY-4ZUrnl3fZsaUfSJd2bCOSVhIpuFDS2zx22__2jzTaN_-3AloUQRUJk5P7DygiBRVMJ6sprLuwJn4x08jp63tbY6uaXeAeePq2qY",
    alt: "Contemporary living room with large windows",
    badge: "New Listing",
    badgeColor: "green",
    name: "The Glass House",
    price: "$1,200,000",
    location: "88 Oceanview Blvd, Coastal City",
    beds: "5",
    baths: "4.5",
    sqft: "3,200",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEzgz7qKWmGWkutqxLIl5RVOrs7a9H1aCYsoh5i1O7kz5TOG2ARiksNEorHXggHLd-_jJf-ur4TCb6eCh-39kL5hDKA57EQ_nGN9BoB-lGJgmskxTE25-GQIvEGBgfG5EQstFhex03WFr9mYPjuTEuo9-gZYVaeIBsyh-9IQRYw5l-ROadE0oXlG-CEuxkE5eM9pvul8E6XJ1087EvwwJqBXeXxLdp_qdggw0b2lvVWrgNlcRKQ7Zp0o6e72g4TnQLF-OIFymDZSw",
    alt: "Luxury white villa with blue pool",
    badge: "For Rent",
    badgeColor: "orange",
    name: "Urban Loft",
    price: "$3,500/mo",
    location: "404 Downtown Ave, Metropolis",
    beds: "2",
    baths: "2",
    sqft: "1,100",
  },
];

function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.alt} loading="lazy" />
        <span className={`property-badge badge-${property.badgeColor}`}>
          {property.badge}
        </span>
        <button className="property-fav" aria-label="Add to favorites">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className="property-body">
        <div className="property-row">
          <h3 className="property-name">{property.name}</h3>
          <span className="property-price">{property.price}</span>
        </div>
        <div className="property-location">
          <span className="material-symbols-outlined">location_on</span>
          <span>{property.location}</span>
        </div>
        <div className="property-meta">
          <div className="meta-item">
            <span className="material-symbols-outlined">bed</span>
            {property.beds} Beds
          </div>
          <div className="meta-item">
            <span className="material-symbols-outlined">bathtub</span>
            {property.baths} Baths
          </div>
          <div className="meta-item">
            <span className="material-symbols-outlined">square_foot</span>
            {property.sqft} sqft
          </div>
        </div>
      </div>
    </article>
  );
}

function Properties() {
  return (
    <section id="properties" className="properties-section">
      <div className="properties-header">
        <h2 className="section-title">Featured Properties</h2>
        <div className="properties-nav">
          <button className="nav-arrow nav-arrow-outline" aria-label="Previous">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="nav-arrow nav-arrow-filled" aria-label="Next">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property.name} property={property} />
        ))}
      </div>
    </section>
  );
}

export default Properties;
