import React from "react";
import { FilterStatus } from "../types";

// Props: what this component receives from the parent
interface FilterBarProps {
  currentFilter: FilterStatus; // Which filter is currently active
  onFilterChange: (filter: FilterStatus) => void; // Function to call when user picks a filter
}

// Three buttons: All, Incomplete, Completed
function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={currentFilter === "incomplete" ? "active" : ""}
        onClick={() => onFilterChange("incomplete")}
      >
        Incomplete
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;
