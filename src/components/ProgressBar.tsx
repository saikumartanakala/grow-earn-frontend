import React from "react";

interface Props {
  percent: number;
  label?: string;
}

export default function ProgressBar({ percent, label }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div>
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full bg-gray-200 rounded h-4 overflow-hidden"
      >
        <div
          className="h-4 bg-purple-600"
          style={{ width: `${pct}%`, transition: "width 300ms ease" }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{pct}%</div>
    </div>
  );
}
