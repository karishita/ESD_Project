import React from "react";

interface Props {
  children: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  type = "button",
  disabled,
}) => {
  return (
    <button type={type} disabled={disabled} className="primary-btn">
      {children}
    </button>
  );
};
