import { useState } from "react";
import { MapPin, Users, Target, Clock, TrendingUp, ChevronRight } from "lucide-react";

// Region data keyed by selection
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

// Realistic Brazil region SVG paths
const regions = [
  {
    id: "North",
    label: { x: 200, y: 100 },
    // Amazonas/Pará/Amapá/Roraima/Rondônia/Acre/Tocantins outline
    path: "M100,40 L130,30 L170,25 L200,30 L230,35 L260,50 L280,70 L290,90 L280,110 L270,130 L260,145 L240,150 L220,155 L200,150 L180,155 L160,150 L140,145 L120,140 L105,130 L95,110 L90,90 L85,70 L90,55 Z",
  },
  {
    id: "Northeast",
    label: { x: 320, y: 120 },
    path: "M260,50 L280,45 L310,50 L340,65 L355,85 L360,110 L355,135 L340,155 L320,165 L300,170 L280,165 L265,155 L260,145 L270,130 L280,110 L290,90 L280,70 Z",
  },
  {
    id: "Center-West",
    label: { x: 210, y: 200 },
    path: "M140,145 L160,150 L180,155 L200,150 L220,155 L240,150 L260,145 L265,155 L270,170 L265,190 L255,210 L240,225 L220,230 L200,228 L180,225 L165,215 L150,200 L140,180 L135,165 Z",
  },
  {
    id: "Southeast",
    label: { x: 290, y: 230 },
    path: "M265,155 L280,165 L300,170 L310,180 L315,200 L310,215 L300,230 L285,240 L270,242 L255,238 L240,225 L255,210 L265,190 L270,170 Z",
  },
  {
    id: "South",
    label: { x: 240, y: 290 },
    path: "M220,230 L240,225 L255,238 L270,242 L275,255 L270,275 L260,290 L245,305 L225,310 L210,305 L200,290 L195,270 L200,250 L210,238 Z",
  },
];

const BrazilMap = ({
  selectedRegion,
  onSelect,
}: {
  selectedRegion: string;
  onSelect: (r: string) => void;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg viewBox="70 15 310 310" className="h-full w-full" style={{ maxHeight: "100%" }}>
      <defs>
        <radialGradient id="ocean-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="70" y="15" width="310" height="310" fill="url(#ocean-glow)" />

      {regions.map((region) => {
        const isSelected = selectedRegion === region.id;
        const isHovered = hovered === region.id;

        return (
          <g key={region.id}>
            <path
              d={region.path}
              fill={
                isSelected
                  ? "hsl(var(--primary))"
                  : "hsl(20 30% 14%)"
              }
              fillOpacity={isSelected ? 0.6 : isHovered ? 0.25 : 1}
              stroke="hsl(var(--primary))"
              strokeWidth={isSelected ? "2" : "1"}
              strokeOpacity={isSelected ? 0.9 : 0.3}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHovered(region.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() =>
                onSelect(selectedRegion === region.id ? "National" : region.id)
              }
            />
            <text
              x={region.label.x}
              y={region.label.y}
              fill="hsl(var(--primary))"
              fillOpacity={isSelected ? 1 : 0.5}
              fontSize="10"
              fontWeight={isSelected ? "700" : "500"}
              textAnchor="middle"
              className="pointer-events-none select-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {region.id}
            </text>
          </g>
        );
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
        {/* Map Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Brazil — Geographic Performance
            </h3>
            <p className="text-xs text-muted-foreground">
              {selectedRegion === "National"
                ? "Click a region to filter"
                : `Viewing: ${selectedRegion}`}
            </p>
          </div>

          {/* Floating region badge */}
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

        {/* Map SVG */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <BrazilMap
            selectedRegion={selectedRegion}
            onSelect={setSelectedRegion}
          />
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
            <div
              key={kpi.label}
              className="rounded-xl border border-border bg-card p-2.5 flex flex-col items-center gap-1"
            >
              <kpi.icon className="h-3 w-3 text-primary" />
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
                {kpi.label}
              </span>
              <span className="text-sm font-bold text-foreground font-display">
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* Top Performing Cities */}
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col flex-1 min-h-0">
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
                    <span className="text-[10px] font-bold text-primary/60 w-4">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {city.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {city.value.toLocaleString()} leads
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-muted/50 overflow-hidden ml-6">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${city.percent}%` }}
                  />
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
              <p className="text-[10px] font-semibold text-primary mb-0.5">
                Regional Insight
              </p>
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
