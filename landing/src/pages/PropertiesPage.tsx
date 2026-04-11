import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer & Carousel states
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lock body scroll when modal is open, and reset carousel state
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Derived state for the active project's images
  const allImages = selectedProject 
    ? [selectedProject.imageUrl, ...(selectedProject.images || [])].filter(Boolean)
    : [];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((json) => {
        if (json && json.data) {
          setProperties(json.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Format Helper
  const formatPeso = (value: number | string | null | undefined) => {
    if (!value) return "N/A";
    const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatHouseType = (type: string) => {
    if (!type) return "N/A";
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Derive locations for filtering
  const locations = Array.from(new Set(properties.map(p => {
    if (!p.location) return "";
    const parts = p.location.split(',');
    return parts[parts.length - 1].trim(); // Get the province
  }))).filter(Boolean).sort();

  const searchLower = searchQuery.toLowerCase().trim();

  const filteredProperties = properties.filter((p) => {
    // Determine category based on "location" province string matches for landing
    const matchesFilter = activeCategory === "all" || (p.location && p.location.includes(activeCategory));
    
    const matchesSearch =
      searchLower === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      (p.location && p.location.toLowerCase().includes(searchLower)) ||
      (p.developer && p.developer.toLowerCase().includes(searchLower)) ||
      (p.houseModel && p.houseModel.toLowerCase().includes(searchLower));
      
    return matchesFilter && matchesSearch;
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
          {/* Dynamic Category Tabs */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full md:w-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCategory === "all"
                  ? "bg-navy-dark text-white shadow-md"
                  : "text-slate-500 hover:text-navy-dark"
              }`}
            >
              All
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === "all" ? "bg-white/20" : "bg-slate-200 dark:bg-slate-700"}`}>
                {properties.length}
              </span>
            </button>
            {locations.slice(0, 5).map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveCategory(loc)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === loc
                    ? "bg-navy-dark text-white shadow-md"
                    : "text-slate-500 hover:text-navy-dark"
                }`}
              >
                {loc}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === loc ? "bg-white/20" : "bg-slate-200 dark:bg-slate-700"}`}>
                  {properties.filter(p => p.location?.includes(loc)).length}
                </span>
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
        {loading ? (
            <div className="text-center py-20 text-slate-500 font-medium">
              <span className="material-symbols-outlined animate-spin text-4xl block mb-4 mx-auto">
                sync
              </span>
              Loading properties...
            </div>
        ) : filteredProperties.length === 0 ? (
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
                onClick={() => setSelectedProject(property)}
                className="group cursor-pointer flex flex-col pt-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-gray-100">
                  <img
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    src={property.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    loading="lazy"
                  />
                  {/* Subtle Top Badge */}
                  <div className="absolute top-4 left-0 bg-black text-white text-[10px] sm:text-xs font-semibold px-4 py-1.5 uppercase tracking-widest shadow-md">
                    {formatHouseType(property.type)}
                  </div>
                  {property.constructionStatus && (
                    <div className="absolute top-4 right-0 bg-white text-black text-[10px] font-semibold px-4 py-1.5 uppercase tracking-widest shadow-md">
                      {property.constructionStatus.replace(/_/g, " ")}
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow px-1">
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium text-xs mb-1 sm:mb-2 uppercase tracking-[0.15em] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">map</span>
                      {property.location}
                    </p>
                    <h3 className="font-normal text-2xl sm:text-3xl text-gray-900 leading-tight">
                      {property.name}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-5 text-gray-600">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total Price</span>
                      <span className="font-medium text-gray-900">{formatPeso(property.tcp) || "POQ"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Reservation</span>
                      <span className="font-medium text-gray-900">{formatPeso(property.reservationFee)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center group-hover:border-black transition-colors">
                    <div className="flex items-center gap-3 md:gap-4 text-gray-500">
                      {(!property.isLotOnly && ["HOUSE_AND_LOT", "TOWNHOUSE", "CONDOMINIUM"].includes(property.type)) && (
                        <div className="flex items-center gap-1.5" title="Bedrooms">
                          <span className="material-symbols-outlined text-[18px] font-light">bed</span>
                          <span className="text-sm">{property.beds > 0 ? property.beds : "-"}</span>
                        </div>
                      )}
                      {(!property.isLotOnly && ["HOUSE_AND_LOT", "TOWNHOUSE", "CONDOMINIUM"].includes(property.type)) && (
                        <div className="flex items-center gap-1.5" title="Bathrooms">
                          <span className="material-symbols-outlined text-[18px] font-light">shower</span>
                          <span className="text-sm">{property.baths !== "0" ? property.baths : "-"}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm uppercase tracking-widest font-semibold flex items-center gap-2 group-hover:text-black text-gray-400 transition-colors">
                      View
                      <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
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

      {/* Detailed Property Modal (Luxury Professional Style via React Portal) */}
      {selectedProject && createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-0 md:p-12 animate-fade-in pointer-events-auto overflow-hidden">
          {/* Heavy Backdrop */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black/90 backdrop-blur-sm cursor-pointer" 
            onClick={() => setSelectedProject(null)} 
          />
          
          {/* Modal Content */}
          <div className="relative w-full h-full md:h-[90vh] md:max-w-7xl bg-white shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden animate-zoom-in border border-black/10 z-10">
            
            {/* Close Button Mobile (Floating) */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="md:hidden absolute top-4 right-4 z-[99] w-12 h-12 flex items-center justify-center bg-white text-black rounded-sm shadow-md transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {/* Left: Sticky Image Showcase Carousel */}
            <div className="relative w-full md:w-1/2 h-[45vh] md:h-full shrink-0 bg-gray-100 group">
              <img
                src={allImages[currentImageIndex] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={`${selectedProject.name} layout view`}
                key={currentImageIndex} /* Force re-render for fading if needed */
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Carousel Controls (Appear if more than 1 image) */}
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/70 backdrop-blur text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/70 backdrop-blur text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-widest shadow-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
              
              {/* Text Layout atop image */}
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-sm pr-6 pointer-events-none">
                <span className="inline-block px-4 py-2 bg-black text-white text-[10px] uppercase tracking-[0.2em] mb-4">
                  {formatHouseType(selectedProject.type)}
                </span>
                <h2 className="text-3xl md:text-5xl font-light text-white leading-tight drop-shadow-lg">{selectedProject.name}</h2>
                <div className="flex items-center gap-2 mt-4 text-white/90 drop-shadow-md">
                  <span className="material-symbols-outlined text-[16px] font-light">location_on</span>
                  <p className="text-sm font-light uppercase tracking-widest">{selectedProject.location}</p>
                </div>
              </div>
            </div>

            {/* Right: Scrollable Details */}
            <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col overflow-y-auto bg-white">
              
              {/* Desktop Close Button */}
              <div className="hidden md:flex justify-end mb-8 relative z-10">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Price & Summary */}
              <div className="mb-10 text-center md:text-left">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2">Total Investment</p>
                <div className="text-4xl md:text-5xl font-normal text-black tracking-tight mb-6">
                  {formatPeso(selectedProject.tcp)}
                </div>
                
                {/* Horizontal stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-8 py-6 border-y border-gray-200">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Model</span>
                    <span className="text-lg font-medium text-black">{selectedProject.houseModel || "N/A"}</span>
                  </div>
                  
                  {(!selectedProject.isLotOnly && ["HOUSE_AND_LOT", "TOWNHOUSE", "CONDOMINIUM"].includes(selectedProject.type)) && (
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Bedrooms</span>
                      <span className="text-lg font-medium text-black flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">bed</span> {selectedProject.beds || "-"}
                      </span>
                    </div>
                  )}
                  
                  {(!selectedProject.isLotOnly && ["HOUSE_AND_LOT", "TOWNHOUSE", "CONDOMINIUM"].includes(selectedProject.type)) && (
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Bathrooms</span>
                      <span className="text-lg font-medium text-black flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">shower</span> {selectedProject.baths || "-"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Details Matrix */}
              <div className="mb-12">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] mb-6">Terms & Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="py-4 border-b border-gray-100 flex justify-between items-center pr-4">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Reservation</span>
                    <span className="text-base font-medium text-black">{formatPeso(selectedProject.reservationFee)}</span>
                  </div>
                  <div className="py-4 border-b border-gray-100 flex justify-between items-center pr-4 md:border-l md:pl-4">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Financing</span>
                    <span className="text-sm font-medium text-black">{selectedProject.dpOption || "To be discussed"}</span>
                  </div>
                  <div className="py-4 border-b border-gray-100 flex justify-between items-center pr-4">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Est. Salary</span>
                    <span className="text-sm font-medium text-black">{selectedProject.requiredSalary ? formatPeso(selectedProject.requiredSalary) : "TBD"}</span>
                  </div>
                  <div className="py-4 border-b border-gray-100 flex justify-between items-center pr-4 md:border-l md:pl-4">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Developer</span>
                    <span className="text-sm font-medium text-black line-clamp-1 text-right">{selectedProject.developer || "Unspecified"}</span>
                  </div>
                </div>
              </div>

              {/* Developer Actions */}
              <div className="mt-auto space-y-4">
                {selectedProject.driveLink && (
                  <a 
                    href={selectedProject.driveLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 text-black text-sm uppercase tracking-widest transition-colors font-medium border border-gray-200"
                  >
                    <span className="material-symbols-outlined text-[18px] font-light">inventory_2</span>
                    Access Media Kit
                  </a>
                )}
                
                <a 
                  href="/contact" 
                  className="w-full bg-black text-white px-6 py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-xl"
                >
                  Inquire Now
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </a>
              </div>
              
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  );
}

export default PropertiesPage;
