import { barrierData } from "@/data/mockData";
import { useState } from "react";

const ConversionBarriers = () => {
  const [tooltip, setTooltip] = useState<{ label: string; value: number; x: number; y: number } | null>(null);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-3.5">
      <h3 className="mb-2 font-display text-base font-semibold text-foreground">Conversion Barriers & Funnel</h3>
      <div className="flex-1 space-y-2.5">
        {barrierData.map((item) => (
          <div key={item.label}>
            <div className="mb-0.5 flex items-center justify-between text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="font-semibold text-foreground">{item.value}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted cursor-default"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  label: item.label,
                  value: item.value,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 8,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip popover */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-md bg-popover px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-lg border border-border"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          {tooltip.label}: {tooltip.value}%
        </div>
      )}
    </div>
  );
};

export default ConversionBarriers;
