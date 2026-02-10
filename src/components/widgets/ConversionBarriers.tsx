import { barrierData } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const ConversionBarriers = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl border border-border bg-card p-3.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="mb-2.5 font-display text-sm font-semibold text-foreground">Conversion Barriers & Funnel</h3>
      <div className="space-y-2.5">
        {barrierData.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-foreground">{item.label}</span>
              <span className="font-semibold text-foreground">{item.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insight box - only on hover */}
      <div
        className={`mt-2.5 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5 transition-all duration-200 ${
          hovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden mt-0 p-0 border-0"
        }`}
      >
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        <p className="text-[10px] text-foreground/80 leading-tight">
          <span className="font-semibold text-primary">Insight:</span> Underage candidates constitute the largest drop-off at 35%.
        </p>
      </div>
    </div>
  );
};

export default ConversionBarriers;
