"use client";

import { useState, useEffect, useRef } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface PSGCData {
  name: string;
  code: string;
  provinceCode?: string;
  type?: string; 
}

export function LocationSelectorGroup({
  defaultLocation = "",
  defaultExactLocation = "",
  provinceCode,
}: {
  defaultLocation?: string;
  defaultExactLocation?: string;
  provinceCode?: string | null;
}) {
  // Municipality State
  const [locationQuery, setLocationQuery] = useState(defaultLocation);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationOptions, setLocationOptions] = useState<PSGCData[]>([]);
  const [filteredLocationOptions, setFilteredLocationOptions] = useState<PSGCData[]>([]);
  const [focusedLocationIndex, setFocusedLocationIndex] = useState(-1);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  
  // Selected Municipality code needed for Barangays
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<string | null>(null);

  // Exact Location / Barangay State
  const [exactQuery, setExactQuery] = useState(defaultExactLocation);
  const [isExactOpen, setIsExactOpen] = useState(false);
  const [barangayOptions, setBarangayOptions] = useState<PSGCData[]>([]);
  const [filteredBarangayOptions, setFilteredBarangayOptions] = useState<PSGCData[]>([]);
  const [focusedExactIndex, setFocusedExactIndex] = useState(-1);
  const [isExactLoading, setIsExactLoading] = useState(false);

  const locWrapperRef = useRef<HTMLDivElement>(null);
  const exactWrapperRef = useRef<HTMLDivElement>(null);

  // 1. Fetch municipalities scoped to selected province
  useEffect(() => {
    async function fetchLocations() {
      setIsLocationLoading(true);
      try {
        if (provinceCode) {
          // Fetch only cities/municipalities under this province
          const res = await fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`);
          if (res.ok) {
            const data: PSGCData[] = await res.json();
            const arr = data
              .map(d => ({ ...d, name: d.name.trim(), type: d.type === "City" ? "City" : "Municipality" }))
              .sort((a, b) => a.name.localeCompare(b.name));
            setLocationOptions(arr);

            // Auto-match default
            if (defaultLocation) {
              const match = arr.find(opt => opt.name.toLowerCase() === defaultLocation.toLowerCase());
              if (match) setSelectedMunicipalityCode(match.code);
            }
          }
        } else {
          // Fallback: fetch all
          const [cityRes, munRes] = await Promise.all([
            fetch("https://psgc.cloud/api/cities"),
            fetch("https://psgc.cloud/api/municipalities"),
          ]);

          const cities: PSGCData[] = await cityRes.json();
          const municipalities: PSGCData[] = await munRes.json();

          const combinedMap = new Map<string, PSGCData>();

          cities.forEach(c => {
            const formattedName = c.name.includes("City") ? c.name : `${c.name} City`;
            if (!combinedMap.has(formattedName)) combinedMap.set(formattedName, { ...c, name: formattedName, type: 'City' });
          });

          municipalities.forEach(m => {
            if (!combinedMap.has(m.name)) combinedMap.set(m.name, { ...m, type: 'Municipality' });
          });

          const arr = Array.from(combinedMap.values()).sort((a, b) => a.name.localeCompare(b.name));
          setLocationOptions(arr);

          if (defaultLocation) {
            const match = arr.find(opt => opt.name.toLowerCase() === defaultLocation.toLowerCase());
            if (match) setSelectedMunicipalityCode(match.code);
          }
        }
      } catch (error) {
        console.error("Failed to load locations", error);
      } finally {
        setIsLocationLoading(false);
      }
    }
    fetchLocations();
  }, [provinceCode, defaultLocation]);

  // 2. Fetch Barangays when a Municipality is selected
  useEffect(() => {
    if (!selectedMunicipalityCode) {
      setBarangayOptions([]);
      return;
    }
    async function fetchBarangays() {
      setIsExactLoading(true);
      try {
        const res = await fetch(`https://psgc.cloud/api/cities-municipalities/${selectedMunicipalityCode}/barangays`);
        if (res.ok) {
          const data = await res.json();
          setBarangayOptions(data);
        } else {
          setBarangayOptions([]);
        }
      } catch (error) {
        console.error("Failed to fetch barangays", error);
      } finally {
        setIsExactLoading(false);
      }
    }
    fetchBarangays();
  }, [selectedMunicipalityCode]);

  // Filter Location
  useEffect(() => {
    if (!locationQuery) {
      // Show all when empty and province is selected
      setFilteredLocationOptions(provinceCode ? locationOptions : []);
      return;
    }
    const q = locationQuery.toLowerCase().trim();
    const matches = locationOptions.filter(opt => opt.name.toLowerCase().includes(q));
    matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? -1 : 1;
      const bStarts = b.name.toLowerCase().startsWith(q) ? -1 : 1;
      return aStarts - bStarts;
    });
    setFilteredLocationOptions(matches.slice(0, 50));
    setFocusedLocationIndex(-1);
  }, [locationQuery, locationOptions, provinceCode]);

  // Filter Barangays
  useEffect(() => {
    if (!exactQuery) {
      setFilteredBarangayOptions(barangayOptions);
      return;
    }
    const q = exactQuery.toLowerCase().trim();
    const matches = barangayOptions.filter(opt => {
      return opt.name.toLowerCase().includes(q) || q.includes(opt.name.toLowerCase());
    });
    matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? -1 : 1;
      const bStarts = b.name.toLowerCase().startsWith(q) ? -1 : 1;
      return aStarts - bStarts;
    });
    setFilteredBarangayOptions(matches.slice(0, 50));
    setFocusedExactIndex(-1);
  }, [exactQuery, barangayOptions]);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locWrapperRef.current && !locWrapperRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (exactWrapperRef.current && !exactWrapperRef.current.contains(event.target as Node)) {
        setIsExactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLocationOpen || filteredLocationOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedLocationIndex(p => (p < filteredLocationOptions.length - 1 ? p + 1 : p));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedLocationIndex(p => (p > 0 ? p - 1 : p));
    } else if (e.key === "Enter" && focusedLocationIndex >= 0) {
      e.preventDefault();
      const sel = filteredLocationOptions[focusedLocationIndex];
      setLocationQuery(sel.name);
      setSelectedMunicipalityCode(sel.code);
      setIsLocationOpen(false);
    } else if (e.key === "Escape") {
      setIsLocationOpen(false);
    }
  };

  const handleExactKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isExactOpen || filteredBarangayOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedExactIndex(p => (p < filteredBarangayOptions.length - 1 ? p + 1 : p));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedExactIndex(p => (p > 0 ? p - 1 : p));
    } else if (e.key === "Enter" && focusedExactIndex >= 0) {
      e.preventDefault();
      const sel = filteredBarangayOptions[focusedExactIndex];
      setExactQuery(sel.name);
      setIsExactOpen(false);
    } else if (e.key === "Escape") {
      setIsExactOpen(false);
    }
  };

  return (
    <>
      <div className="relative w-full" ref={locWrapperRef}>
        <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">
          Municipality / City {provinceCode && <span className="text-primary/60 text-[10px]">(filtered by province)</span>}
        </label>
        <div className="relative">
          <input
            type="text"
            name="location"
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              setIsLocationOpen(true);
              
              const q = e.target.value.toLowerCase().trim();
              const match = locationOptions.find(opt => opt.name.toLowerCase() === q);
              if (match) {
                setSelectedMunicipalityCode(match.code);
              } else {
                setSelectedMunicipalityCode(null);
              }
            }}
            onFocus={() => {
              if (provinceCode && !locationQuery) setFilteredLocationOptions(locationOptions);
              setIsLocationOpen(true);
            }}
            onKeyDown={handleLocationKeyDown}
            placeholder={provinceCode ? "Select municipality..." : "e.g. Dasmariñas"}
            autoComplete="off"
            className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none text-on-surface"
          />
          {isLocationLoading && (
            <div className="absolute right-3 top-2.5 text-outline-variant">
              <MaterialIcon name="sync" className="animate-spin text-sm" />
            </div>
          )}
        </div>

        {isLocationOpen && filteredLocationOptions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl max-h-60 overflow-y-auto overflow-x-hidden">
            {filteredLocationOptions.map((opt, i) => (
              <button
                key={opt.code}
                type="button"
                onMouseEnter={() => setFocusedLocationIndex(i)}
                onClick={() => {
                  setLocationQuery(opt.name);
                  setSelectedMunicipalityCode(opt.code);
                  setIsLocationOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors text-on-surface truncate ${
                  focusedLocationIndex === i ? "bg-primary/20 text-primary font-medium" : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span>{opt.name}</span>
                <span className="ml-2 text-[10px] text-outline-variant">{opt.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full" ref={exactWrapperRef}>
        <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Barangay</label>
        <div className="relative">
          <input
            type="text"
            name="exactLocation"
            value={exactQuery}
            onChange={(e) => {
              setExactQuery(e.target.value);
              setIsExactOpen(true);
            }}
            onFocus={() => {
              setIsExactOpen(true);
            }}
            onKeyDown={handleExactKeyDown}
            placeholder={selectedMunicipalityCode && !isExactLoading ? "Type to search barangay..." : "Select municipality first..."}
            autoComplete="off"
            className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none text-on-surface"
          />
          {isExactLoading && (
            <div className="absolute right-3 top-2.5 text-outline-variant">
              <MaterialIcon name="sync" className="animate-spin text-sm" />
            </div>
          )}
        </div>

        {isExactOpen && barangayOptions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl max-h-60 overflow-y-auto overflow-x-hidden">
            {filteredBarangayOptions.length > 0 ? filteredBarangayOptions.map((opt, i) => (
              <button
                key={opt.code}
                type="button"
                onMouseEnter={() => setFocusedExactIndex(i)}
                onClick={() => {
                  setExactQuery(opt.name);
                  setIsExactOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors text-on-surface truncate ${
                  focusedExactIndex === i ? "bg-primary/20 text-primary font-medium" : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {opt.name}
              </button>
            )) : (
              <div className="px-4 py-3 text-sm text-outline-variant italic">
                No matching barangay found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
