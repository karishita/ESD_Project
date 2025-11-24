import React from "react";

interface Props
{
    label:string;
    value:string;
    onChange:(v:string)=>void;
    type?:string;
    placeholder?:string;
}
export const InputField: React.FC<Props> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};