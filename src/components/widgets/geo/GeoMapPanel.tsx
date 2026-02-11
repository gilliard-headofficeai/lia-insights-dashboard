import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import brazilMap from "@svg-maps/brazil";
import { STATE_TO_REGION } from "./geoData";

interface GeoMapPanelProps {
  selectedRegion: string;
  onSelectRegion: (r: string) => void;
}

const GeoMapPanel = ({ selectedRegion, onSelectRegion }: GeoMapPanelProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const locationsByRegion = useMemo(() => {
    const grouped: Record<string, typeof brazilMap.locations> = {};
    brazilMap.locations.forEach((loc) => {
      const region = STATE_TO_REGION[loc.id];
      if (region) {
        if (!grouped[region]) grouped[region] = [];
        grouped[region].push(loc);
      }
    });
    return grouped;
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Brasil — Desempenho Geográfico
          </h3>
          <p className="text-xs text-muted-foreground">
            {selectedRegion === "Nacional"
              ? "Clique em uma região para filtrar"
              : `Visualizando: ${selectedRegion}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedRegion !== "Nacional" && (
            <button
              onClick={() => onSelectRegion("Nacional")}
              className="text-[10px] px-2.5 py-1 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Resetar Visão
            </button>
          )}
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
            {selectedRegion === "National" ? "Visão Nacional" : selectedRegion}
          </span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <svg viewBox={brazilMap.viewBox} className="h-full w-full" style={{ maxHeight: "100%" }}>
          <defs>
            <radialGradient id="ocean-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="613" height="639" fill="url(#ocean-glow)" />
          {Object.entries(locationsByRegion).map(([region, states]) => {
            const isSelected = selectedRegion === region;
            const isHovered = hoveredRegion === region;
            return states.map((state) => (
              <path
                key={state.id}
                d={state.path}
                fill={isSelected ? "hsl(var(--primary))" : "hsl(20 30% 14%)"}
                fillOpacity={isSelected ? 0.6 : isHovered ? 0.35 : 1}
                stroke={isHovered && !isSelected ? "hsl(var(--foreground))" : "hsl(var(--primary))"}
                strokeWidth={isSelected ? "1.5" : isHovered ? "1" : "0.6"}
                strokeOpacity={isSelected ? 0.9 : isHovered ? 0.6 : 0.25}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onSelectRegion(selectedRegion === region ? "Nacional" : region)}
              />
            ));
          })}
        </svg>
      </div>
    </div>
  );
};

export default GeoMapPanel;
