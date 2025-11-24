import React from "react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  value: number | number[];
  onChange: (value: number | number[]) => void;
  multiple?: boolean;
}

export const SelectField: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  multiple = false,
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <select
        value={value as any}
        onChange={(e) => {
          if (multiple) {
            const selected = Array.from(e.target.selectedOptions).map((o) =>
              Number(o.value)
            );
            onChange(selected);
          } else {
            onChange(Number(e.target.value));
          }
        }}
        multiple={multiple}
      >
        {!multiple && <option value="">Select</option>}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};
