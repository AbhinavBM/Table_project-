import React from "react";
import { Badge } from "./../src/components/ui/badge";

interface TypeBadgeProps {
  statusCode: string;
  onClick: (type: string) => void;
  selected: boolean;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({
  statusCode,
  onClick,
  selected,
}) => {
  const statusInfo: Record<string, { label: string; color: string }> = {
    "0": { label: "Veg", color: "#42c244" },
    "1": { label: "Non-veg", color: "#f52a1b" },
    "2": { label: "Egg", color: "#a3572e" },
  };

  const status = statusCode;
  const { label, color } = statusInfo[status] || {
    label: "rejected",
    color: "#000000",
  };
  const def = "#c2c0c0";

  return (
    <Badge
      style={{
        backgroundColor: selected ? "rgb(245, 42, 27, 0.07)" : "white",
        border: selected ? `1px solid #f52a1b` : `1px solid rgb(203 213 225)`,
        boxShadow: selected ? `none` : `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
      }}
      className="rounded-md mx-1 py-1 text-gray-800"
      onClick={() => {
        onClick(statusCode);
      }}
    >
      <span
        className="p-1 border-[1px] mr-1 rounded-sm flex justify-center items-center"
        style={{
          height: "1.2rem",
          width: "1.2rem",
          borderColor: color,
          color: selected ? color : def,
          backgroundColor: selected ? "#ffffff" : "#fefefe",
        }}
      >
        <span
          className="p-[0.3rem] rounded-full"
          style={{ backgroundColor: color }}
        ></span>
      </span>
      {label}
      {selected && (
        <span className="ml-1 text-red-600 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
    </Badge>
  );
};

export default TypeBadge;
