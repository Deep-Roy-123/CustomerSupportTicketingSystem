import type React from "react";

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isAll?: boolean;
  className?: string;
  darkMode?: boolean;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  onChange,
  isAll = false,
  className,
  darkMode,
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
            <option
              key={stat}
              value={stat}
              className={`${
                darkMode === true
                  ? "text-gray-200 bg-gray-800"
                  : "text-gray-800 bg-gray-200"
              }`}
            >
              {stat}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
