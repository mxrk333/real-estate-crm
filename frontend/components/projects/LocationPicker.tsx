"use client";

import { useState, useEffect, useRef } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface PSGCData {
  name: string;
  code: string;
  provinceCode?: string;
}

export function LocationPicker({
  defaultValue = "",
  name = "location",
}: {
  defaultValue?: string;
  name?: string;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLocations() {
      setIsLoading(true);
      try {
        // Fetch concurrently
        const [provRes, cityRes, munRes] = await Promise.all([
          fetch("https://psgc.cloud/api/provinces"),
          fetch("https://psgc.cloud/api/cities"),
          fetch("https://psgc.cloud/api/municipalities"),
        ]);

        const provinces: PSGCData[] = await provRes.json();
        const cities: PSGCData[] = await cityRes.json();
        const municipalities: PSGCData[] = await munRes.json();

        // Map provinces for quick lookup (if city provides provinceCode)
        // psgc.cloud cities/municipalities don't always have a strict nested property in standard output 
        // without passing relationships, so we can just list them smartly.
        // Actually, psgc returns "name" and "code".
        // Let's create a flat list of highly searchable Philippines places.
        
        const combined = new Set<string>();

        // Add pure Provinces
        provinces.forEach(p => combined.add(p.name));

        // Add Cities and Municipalities
        cities.forEach(c => combined.add(`${c.name} City`));
        municipalities.forEach(m => combined.add(m.name));

        setOptions(Array.from(combined).sort());
      } catch (error) {
        console.error("Failed to load locations", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLocations();
  }, []);

  // Filter based on input
  useEffect(() => {
    if (!query) {
      setFilteredOptions([]);
      return;
    }
    const q = query.toLowerCase().trim();
    // Match exact starts first, then includes
    const matches = options.filter(opt => opt.toLowerCase().includes(q));
    // Sort so startsWith is higher up
    matches.sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(q) ? -1 : 1;
      const bStarts = b.toLowerCase().startsWith(q) ? -1 : 1;
      return aStarts - bStarts;
    });
    setFilteredOptions(matches.slice(0, 50)); // cap at 50 to prevent DOM lag
    setFocusedIndex(-1);
  }, [query, options]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault(); // Prevent form submission
      setQuery(filteredOptions[focusedIndex]);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Municipality</label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Dasmariñas, Cavite"
          autoComplete="off"
          className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none text-on-surface"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5 text-outline-variant">
            <MaterialIcon name="sync" className="animate-spin text-sm" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && query && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl max-h-60 overflow-y-auto overflow-x-hidden">
          {filteredOptions.map((opt, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setFocusedIndex(i)}
              onClick={() => {
                setQuery(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors text-on-surface truncate ${
                focusedIndex === i ? "bg-primary/20 text-primary font-medium" : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
