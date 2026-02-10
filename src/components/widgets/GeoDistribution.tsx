import { geoData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, TrendingUp, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const regionData = [
  { name: "Southeast", share: 45, change: 12.4, positive: true },
  { name: "South", share: 22, change: 5.1, positive: true },
  { name: "Northeast", share: 18, change: -2.3, positive: false },
  { name: "Center-West", share: 10, change: 8.7, positive: true },
  { name: "North", share: 5, change: 0.0, positive: false },
];

const extendedCities = [
  { city: "São Paulo", state: "SP", percentage: 18, leads: 2450, volume: "42.1M", change: 12, positive: true },
  { city: "Rio de Janeiro", state: "RJ", percentage: 14, leads: 1820, volume: "18.5M", change: 4, positive: true },
  { city: "Belo Horizonte", state: "MG", percentage: 9, leads: 1105, volume: "12.3M", change: -1, positive: false },
  { city: "Brasília", state: "DF", percentage: 8, leads: 1020, volume: "10.1M", change: 5, positive: true },
  { city: "Curitiba", state: "PR", percentage: 7, leads: 980, volume: "8.4M", change: 3, positive: true },
  { city: "Salvador", state: "BA", percentage: 6, leads: 850, volume: "7.2M", change: -3, positive: false },
  { city: "Fortaleza", state: "CE", percentage: 5, leads: 720, volume: "6.8M", change: 2, positive: true },
  { city: "Manaus", state: "AM", percentage: 4, leads: 580, volume: "5.1M", change: 1, positive: true },
];

// Simple Brazil map as SVG with region dots
const BrazilMapSVG = () => {
  const dots = [
    { cx: 145, cy: 75, r: 6, label: "North", opacity: 0.4 },
    { cx: 195, cy: 110, r: 5, label: "Northeast", opacity: 0.55 },
    { cx: 150, cy: 145, r: 7, label: "Center-West", opacity: 0.5 },
    { cx: 185, cy: 175, r: 10, label: "Southeast", opacity: 1 },
    { cx: 155, cy: 210, r: 8, label: "South", opacity: 0.7 },
  ];

  return (
    <svg viewBox="0 0 280 280" className="h-full w-full" style={{ maxHeight: "100%" }}>
      {/* Simplified Brazil outline */}
      <path
        d="M120,30 Q180,20 210,50 Q230,70 220,90 Q235,100 230,120 Q225,135 210,140 Q215,160 210,175 Q200,195 190,210 Q175,230 160,240 Q140,245 125,235 Q110,220 105,200 Q100,180 105,160 Q95,140 100,120 Q95,100 100,80 Q105,60 110,45 Z"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <path
        d="M120,30 Q180,20 210,50 Q230,70 220,90 Q235,100 230,120 Q225,135 210,140 Q215,160 210,175 Q200,195 190,210 Q175,230 160,240 Q140,245 125,235 Q110,220 105,200 Q100,180 105,160 Q95,140 100,120 Q95,100 100,80 Q105,60 110,45 Z"
        fill="hsl(var(--primary))"
        fillOpacity="0.06"
      />
      {dots.map((dot) => (
        <g key={dot.label}>
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r * 2}
            fill="hsl(var(--primary))"
            fillOpacity={dot.opacity * 0.15}
          />
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="hsl(var(--primary))"
            fillOpacity={dot.opacity * 0.8}
          />
        </g>
      ))}
      {/* Legend */}
      <g transform="translate(10, 230)">
        <text fill="hsl(var(--muted-foreground))" fontSize="8" fontWeight="600">Volume Intensity</text>
        <circle cx={8} cy={14} r={4} fill="hsl(var(--primary))" fillOpacity="0.8" />
        <text x={16} y={17} fill="hsl(var(--muted-foreground))" fontSize="7">High (&gt; R$ 50M)</text>
        <circle cx={8} cy={26} r={3.5} fill="hsl(var(--primary))" fillOpacity="0.5" />
        <text x={16} y={29} fill="hsl(var(--muted-foreground))" fontSize="7">Med (R$ 20M-50M)</text>
        <circle cx={8} cy={38} r={3} fill="hsl(var(--primary))" fillOpacity="0.3" />
        <text x={16} y={41} fill="hsl(var(--muted-foreground))" fontSize="7">Low (&lt; R$ 20M)</text>
      </g>
    </svg>
  );
};

const GeoDistribution = () => {
  const maxShare = Math.max(...regionData.map((r) => r.share));

  return (
    <div className="grid h-full grid-cols-1 gap-2.5 lg:grid-cols-3">
      {/* National Distribution (Map) */}
      <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-primary" />
              National Distribution
            </h3>
            <p className="text-[10px] text-muted-foreground">Sales volume by geographic density</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          <BrazilMapSVG />
        </div>
      </div>

      {/* Regional Performance */}
      <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col">
        <div className="mb-2">
          <h3 className="font-display text-xs font-semibold text-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Regional Performance
          </h3>
          <p className="text-[10px] text-muted-foreground">Revenue distribution by region</p>
        </div>
        <div className="flex-1 space-y-3">
          {regionData.map((region) => (
            <div key={region.name}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{region.name}</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className={region.positive ? "text-success" : "text-danger"}>
                    {region.positive ? "↑" : "↓"} {Math.abs(region.change)}%
                  </span>
                  <span className="font-semibold text-foreground">{region.share}%</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(region.share / maxShare) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-primary/20 bg-primary/5 p-2">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
          <p className="text-[10px] text-foreground/80 leading-tight">
            <span className="font-semibold text-primary">Insight:</span> The Southeast region continues to dominate, outperforming the target by 3%.
          </p>
        </div>
      </div>

      {/* Top Cities */}
      <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              Top Cities
            </h3>
            <p className="text-[10px] text-muted-foreground">Ranked by volume</p>
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary px-2">
            View All
          </Button>
        </div>

        {/* Table header */}
        <div className="mb-1 grid grid-cols-[24px_1fr_60px] gap-1 px-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>#</span>
          <span>City</span>
          <span className="text-right">Vol.</span>
        </div>

        <div className="flex-1 space-y-1">
          {extendedCities.map((city, idx) => (
            <div key={city.city} className="grid grid-cols-[24px_1fr_60px] items-center gap-1 rounded-md px-1 py-1.5 hover:bg-muted/30">
              <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-primary bg-primary/10">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-foreground truncate">{city.city}</p>
                <div className="mt-0.5 h-1 w-full rounded-full bg-muted/50 overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${city.percentage * 5}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold text-foreground">{city.volume}</p>
                <p className={`text-[9px] ${city.positive ? "text-success" : "text-danger"}`}>
                  {city.positive ? "+" : ""}{city.change}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="mt-1 h-6 w-full text-[10px] text-muted-foreground gap-1">
          Show more cities
          <ChevronDown className="h-2.5 w-2.5" />
        </Button>
      </div>
    </div>
  );
};

export default GeoDistribution;
