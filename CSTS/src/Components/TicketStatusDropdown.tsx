import type React from "react";

interface TicketStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TicketStatusDropdown: React.FC<TicketStatusDropdownProps> = ({
  value,
  onChange,
  className,
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
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default TicketStatusDropdown;
