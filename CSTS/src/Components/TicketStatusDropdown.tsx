import type React from "react";

interface TicketStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  darkMode: boolean;
}

const TicketStatusDropdown: React.FC<TicketStatusDropdownProps> = ({
  value,
  onChange,
  className,
  darkMode,
}) => {
  const options: string[] = ["Active Ticket", "Delete Ticket"];
  return (
    <select
      name="priority"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="" hidden>
        Select Ticket Status
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

export default TicketStatusDropdown;
