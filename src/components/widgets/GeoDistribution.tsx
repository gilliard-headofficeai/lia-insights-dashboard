import { useState } from "react";
import { MapPin, Globe, TrendingUp, Users, Clock, Target, BarChart3 } from "lucide-react";

// Region mock data keyed by selection
const regionKPIs: Record<string, { activeRegions: string; topCityLeads: string; avgConversion: string; convNational: string; responseTime: string }> = {
  National: { activeRegions: "24", topCityLeads: "4,270", avgConversion: "14.2%", convNational: "12.1%", responseTime: "2m 30s" },
  Southeast: { activeRegions: "4", topCityLeads: "4,520", avgConversion: "16.8%", convNational: "14.2%", responseTime: "1m 45s" },
  South: { activeRegions: "3", topCityLeads: "1,920", avgConversion: "13.5%", convNational: "14.2%", responseTime: "2m 10s" },
  Northeast: { activeRegions: "9", topCityLeads: "1,340", avgConversion: "11.2%", convNational: "14.2%", responseTime: "3m 05s" },
  "Center-West": { activeRegions: "4", topCityLeads: "980", avgConversion: "12.9%", convNational: "14.2%", responseTime: "2m 50s" },
  North: { activeRegions: "7", topCityLeads: "580", avgConversion: "9.4%", convNational: "14.2%", responseTime: "4m 20s" },
};

const cohortData = [
  { city: "São Paulo", w1: 92, w2: 85, w3: 70, w4: 62 },
  { city: "Rio de Janeiro", w1: 88, w2: 79, w3: 65, w4: 55 },
  { city: "Minas Gerais", w1: 85, w2: 74, w3: 60, w4: 50 },
  { city: "Paraná", w1: 80, w2: 70, w3: 58, w4: 48 },
  { city: "Bahia", w1: 75, w2: 65, w3: 52, w4: 42 },
];

const topCities = [
  { name: "São Paulo", leads: 4520 },
  { name: "Rio de Janeiro", leads: 2840 },
  { name: "Belo Horizonte", leads: 1920 },
  { name: "Curitiba", leads: 1450 },
  { name: "Salvador", leads: 1120 },
  { name: "Brasília", leads: 980 },
];

const maxLeads = 4520;

// Regions with simplified SVG paths for Brazil
const regions = [
  {
    id: "North",
    path: "M80,30 L170,25 L195,45 L200,75 L185,95 L155,100 L120,95 L90,80 L75,55 Z",
  },
  {
    id: "Northeast",
    path: "M185,95 L155,100 L160,115 L175,135 L200,145 L220,130 L225,105 L215,85 L200,75 L195,45 L210,55 L230,75 L235,100 L230,120 L220,135 Z",
  },
  {
    id: "Center-West",
    path: "M120,95 L155,100 L160,115 L175,135 L170,160 L155,175 L130,170 L110,150 L105,125 Z",
  },
  {
    id: "Southeast",
    path: "M175,135 L200,145 L210,165 L200,180 L185,185 L170,175 L155,175 L170,160 Z",
  },
  {
    id: "South",
    path: "M155,175 L170,175 L185,185 L180,205 L165,220 L145,225 L130,215 L125,195 L130,170 Z",
  },
];

const BrazilMap = ({ selectedRegion, onSelect }: { selectedRegion: string; onSelect: (r: string) => void }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg viewBox="60 15 195 220" className="h-full w-full" style={{ maxHeight: "100%" }}>
      {regions.map((region) => {
        const isSelected = selectedRegion === region.id;
        const isHovered = hovered === region.id;
        let fillOpacity = 0.35;
        if (isSelected) fillOpacity = 0.7;
        else if (isHovered) fillOpacity = 0.2;

        return (
          <g key={region.id}>
            <path
              d={region.path}
              fill="hsl(var(--primary))"
              fillOpacity={fillOpacity}
              stroke="hsl(var(--primary))"
              strokeWidth={isSelected ? "1.5" : "0.8"}
              strokeOpacity={isSelected ? 0.8 : 0.3}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHovered(region.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(selectedRegion === region.id ? "National" : region.id)}
            />
            {/* Region label */}
            <text
              x={region.id === "North" ? 140 : region.id === "Northeast" ? 210 : region.id === "Center-West" ? 140 : region.id === "Southeast" ? 185 : 155}
              y={region.id === "North" ? 60 : region.id === "Northeast" ? 110 : region.id === "Center-West" ? 135 : region.id === "Southeast" ? 165 : 200}
              fill="hsl(var(--primary))"
              fillOpacity={isSelected ? 1 : 0.6}
              fontSize="7"
              fontWeight={isSelected ? "700" : "500"}
              textAnchor="middle"
              className="pointer-events-none select-none"
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
  const kpis = regionKPIs[selectedRegion] || regionKPIs.National;

  const kpiCards = [
    { label: "Active Regions", value: kpis.activeRegions, icon: Globe, sub: null },
    { label: "Top City Leads", value: kpis.topCityLeads, icon: Users, sub: null },
    { label: "Avg Conversion", value: kpis.avgConversion, icon: Target, sub: `vs National: ${kpis.convNational}` },
    { label: "Response Time", value: kpis.responseTime, icon: Clock, sub: null },
  ];

  return (
    <div className="grid h-full grid-cols-1 gap-2.5 lg:grid-cols-4">
      {/* LEFT COLUMN - KPIs */}
      <div className="flex flex-col gap-2">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border bg-card p-3 flex flex-col gap-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                <kpi.icon className="h-3 w-3 text-primary" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{kpi.value}</p>
            {kpi.sub && (
              <p className="text-[10px] text-muted-foreground">{kpi.sub}</p>
            )}
          </div>
        ))}

        {/* Region Filter */}
        <div className="rounded-xl border border-border bg-card p-3 flex-1">
          <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-primary" />
            Region Filter
          </h4>
          <div className="flex flex-col gap-1">
            {["National", ...regions.map(r => r.id)].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`text-left text-xs px-2 py-1.5 rounded-md transition-all duration-300 ${
                  selectedRegion === r
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER COLUMN - Map (spans 2 cols) */}
      <div className="lg:col-span-2 rounded-xl border border-border bg-card p-3.5 flex flex-col">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-primary" />
              Interactive Brazil Map
            </h3>
            <p className="text-xs text-muted-foreground">
              {selectedRegion === "National" ? "Click a region to filter" : `Viewing: ${selectedRegion}`}
            </p>
          </div>
          {selectedRegion !== "National" && (
            <button
              onClick={() => setSelectedRegion("National")}
              className="text-[10px] text-primary hover:underline"
            >
              Reset to National
            </button>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          <BrazilMap selectedRegion={selectedRegion} onSelect={setSelectedRegion} />
        </div>
      </div>

      {/* RIGHT COLUMN - Top Cities + Regional Cohort */}
      <div className="flex flex-col gap-2">
        {/* Top Performing Cities */}
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col flex-1">
          <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <BarChart3 className="h-3 w-3 text-primary" />
            Top Performing Cities
          </h4>
          <div className="flex-1 flex flex-col gap-1.5">
            {topCities.map((city, idx) => (
              <div key={city.name} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-primary bg-primary/10 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-foreground truncate">{city.name}</span>
                    <span className="text-[10px] font-semibold text-foreground ml-2">{city.leads.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${(city.leads / maxLeads) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Cohort */}
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col flex-1">
          <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-primary" />
            Regional Cohort
          </h4>

          {/* Header */}
          <div className="grid grid-cols-[1fr_repeat(4,36px)] gap-1 mb-1 px-1">
            <span className="text-[9px] font-semibold text-muted-foreground uppercase">Region</span>
            {["W1", "W2", "W3", "W4"].map((w) => (
              <span key={w} className="text-[9px] font-semibold text-muted-foreground text-center">{w}</span>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            {cohortData.map((row) => (
              <div key={row.city} className="grid grid-cols-[1fr_repeat(4,36px)] gap-1 items-center px-1">
                <span className="text-[10px] font-medium text-foreground truncate">{row.city}</span>
                {[row.w1, row.w2, row.w3, row.w4].map((val, i) => {
                  const intensity = val / 100;
                  return (
                    <span
                      key={i}
                      className="text-center text-[9px] font-semibold rounded py-0.5 transition-all duration-300"
                      style={{
                        backgroundColor: `hsl(var(--primary) / ${intensity * 0.5})`,
                        color: intensity > 0.6 ? "hsl(var(--primary-foreground))" : "hsl(var(--primary))",
                      }}
                    >
                      {val}%
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoDistribution;
