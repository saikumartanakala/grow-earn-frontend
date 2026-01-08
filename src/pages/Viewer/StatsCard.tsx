import React from "react";

type Props = {
  label: string;
  value: number | string;
};

export default function StatsCard({ label, value }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-bold text-gray-800">{value}</span>
    </div>
  );
}
