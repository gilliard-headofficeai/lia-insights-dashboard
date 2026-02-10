import { geoData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const GeoDistribution = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Top Cities</h3>
        <MapPin className="h-4 w-4 text-primary" />
      </div>
      <div className="space-y-3">
        {geoData.map((item, idx) => (
          <div key={item.city} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.city}</p>
              <p className="text-xs text-muted-foreground">{item.leads.toLocaleString()} leads</p>
            </div>
            <Badge variant="outline" className="border-border text-muted-foreground text-xs">
              {item.state}
            </Badge>
            <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full border-border text-muted-foreground">
        View All Cities
      </Button>
    </div>
  );
};

export default GeoDistribution;
