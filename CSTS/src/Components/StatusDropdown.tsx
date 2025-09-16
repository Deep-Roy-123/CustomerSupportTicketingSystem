import type React from "react";

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isAll ?: boolean;
  className ?: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  onChange,
  isAll = false,
  className
}) => {
  const status: string[] = isAll
    ? ["All", "Open", "In Progress", "Resolved"]
    : ["Open", "In Progress", "Resolved"];

  return (
    <div>
      <select
        name="status"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        <option value="" hidden>
          Select Status
        </option>
        {status.map((stat) => (
          <>
            <option key={stat} value={stat}>
              {stat}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
