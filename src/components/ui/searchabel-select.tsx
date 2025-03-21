"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

export type Option = {
  value: string;
  label: string;
};

interface SearchableSelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Search...",
  className,
  disabled = false,
  onBlur,
  name,
  ...props
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLDivElement>(null);

  // Get the selected option label for display
  const selectedLabel = React.useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  }, [options, value]);

  // Update search query when selected value changes
  React.useEffect(() => {
    if (value && selectedLabel) {
      setSearchQuery(selectedLabel);
    }
  }, [value, selectedLabel]);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Reset highlighted index when filtered options change
  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions.length]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions.length > 0) {
          const selectedOption = filteredOptions[highlightedIndex];
          onValueChange(selectedOption.value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  // Handle custom blur event for form integration
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Small delay to allow click events on options to fire first
    setTimeout(() => {
      setIsOpen(false);

      // If there's a value but no matching search, reset to the selected value
      if (searchQuery && searchQuery !== selectedLabel) {
        if (value) {
          setSearchQuery(selectedLabel);
        } else {
          setSearchQuery("");
        }
      }

      // Call the provided onBlur handler
      if (onBlur) {
        onBlur(e);
      }
    }, 100);
  };

  // Scroll highlighted option into view
  React.useEffect(() => {
    if (isOpen && listboxRef.current) {
      const highlightedElement = listboxRef.current.querySelector(
        `[data-highlighted="true"]`
      );
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            // If search is cleared, also clear the value
            if (!e.target.value) {
              onValueChange("");
            }
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="searchable-select-listbox"
          aria-autocomplete="list"
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={listboxRef}
          id="searchable-select-listbox"
          role="listbox"
          className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              data-highlighted={index === highlightedIndex}
              className={cn(
                "px-3 py-2 cursor-pointer",
                index === highlightedIndex && "bg-gray-100",
                value === option.value && "font-medium"
              )}
              onClick={() => {
                onValueChange(option.value);
                setSearchQuery(option.label);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
