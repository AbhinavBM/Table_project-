import React from "react";
import { Badge } from "./../src/components/ui/badge"; // Replace with the actual path to your Badge component


interface CustomBadgeProps {
    statusCode: string;
}
  
const CustomBadge: React.FC<CustomBadgeProps> = ({statusCode}) => {

  const statusInfo: Record<string, { label: string; color: string }> = {
    "0": { label: "pending", color: "#f54842" },
    "1": { label: "cooking", color: "#425af5" },
    "1.5": { label: "ready", color: "#787675" },
    "2": { label: "served", color: "#34b340" },
  };


  const status =statusCode;
  const { label, color } = statusInfo[status] || { label: "pending", color: "#f54842" };

  return <Badge style={{ backgroundColor: color }}>{label}</Badge>;
};

export default CustomBadge;
