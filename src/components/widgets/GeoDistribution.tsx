import { useState, useMemo } from "react";
import { MapPin, Users, Target, Clock, TrendingUp, ChevronRight } from "lucide-react";
import brazilMap from "@svg-maps/brazil";

// Group states into regions
const REGION_STATES: Record<string, string[]> = {
  North: ["ac", "am", "ap", "pa", "ro", "rr", "to"],
  Northeast: ["al", "ba", "ce", "ma", "pb", "pe", "pi", "rn", "se"],
  "Center-West": ["df", "go", "ms", "mt"],
  Southeast: ["es", "mg", "rj", "sp"],
  South: ["pr", "rs", "sc"],
};

// Reverse lookup: state id -> region
const STATE_TO_REGION: Record<string, string> = {};
Object.entries(REGION_STATES).forEach(([region, states]) => {
  states.forEach((s) => (STATE_TO_REGION[s] = region));
});

// Mock data per region
const REGION_DATA: Record<string, {
  leads: string;
  conversion: string;
  time: string;
  topCities: { name: string; value: number; percent: number }[];
}> = {
  National: {
    leads: "12,450", conversion: "14.2%", time: "2m 30s",
    topCities: [
      { name: "São Paulo, SP", value: 4520, percent: 100 },
      { name: "Rio de Janeiro, RJ", value: 2840, percent: 62 },
      { name: "Belo Horizonte, MG", value: 1920, percent: 42 },
      { name: "Curitiba, PR", value: 1210, percent: 26 },
      { name: "Salvador, BA", value: 980, percent: 21 },
    ],
  },
  Southeast: {
    leads: "8,950", conversion: "16.8%", time: "1m 45s",
    topCities: [
      { name: "São Paulo, SP", value: 4520, percent: 100 },
      { name: "Rio de Janeiro, RJ", value: 2840, percent: 62 },
      { name: "Belo Horizonte, MG", value: 1920, percent: 42 },
    ],
  },
  South: {
    leads: "2,100", conversion: "13.5%", time: "2m 10s",
    topCities: [
      { name: "Curitiba, PR", value: 1210, percent: 100 },
      { name: "Porto Alegre, RS", value: 890, percent: 73 },
      { name: "Florianópolis, SC", value: 620, percent: 51 },
    ],
  },
  Northeast: {
    leads: "3,200", conversion: "11.2%", time: "3m 05s",
    topCities: [
      { name: "Salvador, BA", value: 980, percent: 100 },
      { name: "Recife, PE", value: 740, percent: 75 },
      { name: "Fortaleza, CE", value: 680, percent: 69 },
    ],
  },
  "Center-West": {
    leads: "1,850", conversion: "12.9%", time: "2m 50s",
    topCities: [
      { name: "Brasília, DF", value: 780, percent: 100 },
      { name: "Goiânia, GO", value: 540, percent: 69 },
      { name: "Campo Grande, MS", value: 320, percent: 41 },
    ],
  },
  North: {
    leads: "1,350", conversion: "9.4%", time: "4m 20s",
    topCities: [
      { name: "Manaus, AM", value: 480, percent: 100 },
      { name: "Belém, PA", value: 390, percent: 81 },
      { name: "Porto Velho, RO", value: 180, percent: 37 },
    ],
  },
};

const BrazilMap = ({
  selectedRegion,
  onSelect,
}: {
  selectedRegion: string;
  onSelect: (r: string) => void;
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Group locations by region
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
            fill={
              isSelected
                ? "hsl(var(--primary))"
                : "hsl(20 30% 14%)"
            }
            fillOpacity={isSelected ? 0.6 : isHovered ? 0.35 : 1}
            stroke={isHovered && !isSelected ? "hsl(var(--foreground))" : "hsl(var(--primary))"}
            strokeWidth={isSelected ? "1.5" : isHovered ? "1" : "0.6"}
            strokeOpacity={isSelected ? 0.9 : isHovered ? 0.6 : 0.25}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredRegion(region)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() =>
              onSelect(selectedRegion === region ? "National" : region)
            }
          />
        ));
      })}
    </svg>
  );
};

const GeoDistribution = () => {
  const [selectedRegion, setSelectedRegion] = useState("National");
  const data = REGION_DATA[selectedRegion] || REGION_DATA.National;

  return (
    <div className="grid h-full grid-cols-1 gap-2.5 lg:grid-cols-[7fr_3fr]">
      {/* LEFT: Map */}
      <div className="rounded-xl border border-border bg-card p-4 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Brazil — Geographic Performance
            </h3>
            <p className="text-xs text-muted-foreground">
              {selectedRegion === "National"
                ? "Click a region to filter"
                : `Viewing: ${selectedRegion}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedRegion !== "National" && (
              <button
                onClick={() => setSelectedRegion("National")}
                className="text-[10px] px-2.5 py-1 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                Reset View
              </button>
            )}
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              {selectedRegion === "National" ? "National View" : selectedRegion}
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          <BrazilMap selectedRegion={selectedRegion} onSelect={setSelectedRegion} />
        </div>
      </div>

      {/* RIGHT: Data sidebar */}
      <div className="flex flex-col gap-2 min-h-0">
        {/* Mini KPIs */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Total Leads", value: data.leads, icon: Users },
            { label: "Conversion", value: data.conversion, icon: Target },
            { label: "Response", value: data.time, icon: Clock },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-card p-2.5 flex flex-col items-center gap-1">
              <kpi.icon className="h-3 w-3 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <span className="font-display text-base font-bold text-foreground">{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Top Performing Cities */}
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-primary" />
              Top Performing Cities
            </h4>
            <button className="text-[10px] text-primary flex items-center gap-0.5 hover:underline">
              View Report
              <ChevronRight className="h-2.5 w-2.5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {data.topCities.map((city, idx) => (
              <div key={city.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary/60 w-4">0{idx + 1}</span>
                    <span className="text-xs font-medium text-foreground">{city.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{city.value.toLocaleString()} leads</span>
                </div>
                <div className="h-1 rounded-full bg-muted/50 overflow-hidden ml-6 mr-0">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${city.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Card */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-primary mb-0.5">Regional Insight</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {selectedRegion === "National"
                  ? "Southeast concentrates 72% of total leads with 2.4% above-average conversion during peak hours (14h-16h)."
                  : `${selectedRegion} region shows distinct engagement patterns. Click other regions to compare performance.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoDistribution;
