import type React from "react";

interface PriorityDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isAll?: boolean;
  className?: string;
  darkMode: boolean;
}
const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  value,
  onChange,
  className,
  isAll = false,
  darkMode,
}) => {
  const options: string[] = isAll
    ? ["All", "Low", "Medium", "High"]
    : ["Low", "Medium", "High"];
  return (
    <select
      name="priority"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="" hidden>
        Select Priority
      </option>
      {options.map((opt) => (
        <option
          key={opt}
          value={opt}
          className={`${
            darkMode === true
              ? "text-gray-200 bg-gray-800"
              : "text-gray-800 bg-gray-200"
          }`}
        >
          {opt}
        </option>
      ))}
    </select>
  );
};

export default PriorityDropdown;
