import { barrierData } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

const ConversionBarriers = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Conversion Barriers & Funnel</h3>
      <div className="space-y-3">
        {barrierData.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="font-semibold text-foreground">{item.value}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insight box */}
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-foreground/80">
          <span className="font-semibold text-primary">Insight:</span> Underage candidates constitute the largest drop-off at 35%. Consider implementing early age verification in the flow.
        </p>
      </div>
    </div>
  );
};

export default ConversionBarriers;
