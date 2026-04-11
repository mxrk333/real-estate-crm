"use client";

import { useState, useEffect, useRef } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface PSGCData {
  name: string;
  code: string;
}

export function ProvincePicker({
  defaultValue = "",
  name = "city",
  onProvinceChange,
}: {
  defaultValue?: string;
  name?: string;
  onProvinceChange?: (code: string | null) => void;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<PSGCData[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<PSGCData[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProvinces() {
      setIsLoading(true);
      try {
        const res = await fetch("https://psgc.cloud/api/provinces");
        if (res.ok) {
          const data: PSGCData[] = await res.json();
          data.sort((a, b) => a.name.localeCompare(b.name));
          setOptions(data);

          // Auto-match default value
          if (defaultValue) {
            const match = data.find(d => d.name.toLowerCase() === defaultValue.toLowerCase());
            if (match) onProvinceChange?.(match.code);
          }
        }
      } catch (error) {
        console.error("Failed to load provinces", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredOptions(options);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = options.filter(opt => opt.name.toLowerCase().includes(q));
    matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? -1 : 1;
      const bStarts = b.name.toLowerCase().startsWith(q) ? -1 : 1;
      return aStarts - bStarts;
    });
    setFilteredOptions(matches);
    setFocusedIndex(-1);
  }, [query, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectProvince = (opt: PSGCData) => {
    setQuery(opt.name);
    setIsOpen(false);
    onProvinceChange?.(opt.code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      selectProvince(filteredOptions[focusedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Province</label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            // Clear province code if they start typing manually
            const q = e.target.value.toLowerCase().trim();
            const match = options.find(opt => opt.name.toLowerCase() === q);
            onProvinceChange?.(match ? match.code : null);
          }}
          onFocus={() => {
            if (!query) setFilteredOptions(options);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Cavite"
          autoComplete="off"
          className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none text-on-surface"
        />
        {isLoading ? (
          <div className="absolute right-3 top-2.5 text-outline-variant">
            <MaterialIcon name="sync" className="animate-spin text-sm" />
          </div>
        ) : (
          <div className="absolute right-3 top-2.5 text-outline-variant cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <MaterialIcon name="expand_more" className="text-sm" />
          </div>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl max-h-60 overflow-y-auto overflow-x-hidden">
          {filteredOptions.map((opt, i) => (
            <button
              key={opt.code}
              type="button"
              onMouseEnter={() => setFocusedIndex(i)}
              onClick={() => selectProvince(opt)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors text-on-surface truncate ${
                focusedIndex === i ? "bg-primary/20 text-primary font-medium" : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
