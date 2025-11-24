import React, { useState, useEffect, useRef } from "react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  selected: number[];
  onChange: (values: number[]) => void;
}

export const MultiSelectDropdown: React.FC<Props> = ({
  label,
  options,
  selected,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggleValue = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="input-field" ref={dropdownRef}>
      <label>{label}</label>

      {/* Dropdown Header */}
      <div
        className="dropdown-header"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0
          ? `${selected.length} course(s) selected`
          : "Select courses"}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Panel */}
      {open && (
        <div className="dropdown-panel">
          {options.map((opt) => (
            <label key={opt.id} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(opt.id)}
                onChange={() => toggleValue(opt.id)}
              />
              {opt.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
