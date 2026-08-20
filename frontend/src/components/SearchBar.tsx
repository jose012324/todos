import React from "react";

// Props: what this component receives from the parent
interface SearchBarProps {
  searchTerm: string; // Current search text
  onSearchChange: (term: string) => void; // Function to call when user types
}

// Simple search input - just a text box that tells the parent what the user typed
function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
