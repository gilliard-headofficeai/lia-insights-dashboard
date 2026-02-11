import { useState } from "react";
import { Users, Target, Clock, TrendingUp, ChevronRight, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DraggableGrid from "@/components/widgets/DraggableGrid";
import GeoMapPanel from "@/components/widgets/geo/GeoMapPanel";
import { REGION_DATA } from "@/components/widgets/geo/geoData";

const GeoPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("National");
  const data = REGION_DATA[selectedRegion] || REGION_DATA.National;

  return (
    <DashboardLayout title="Geo Distribution" breadcrumb={["LIA Analytics", "Geo Distribution"]}>
      <div className="flex-1 min-h-0">
        <div className="grid h-full grid-cols-1 gap-2.5 lg:grid-cols-[7fr_3fr]">
          <GeoMapPanel selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />

          <DraggableGrid storageKey="geo-sidebar">
            {/* Mini KPIs */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "Total Leads", value: data.leads, Icon: Users },
                { label: "Conversion", value: data.conversion, Icon: Target },
                { label: "Response", value: data.time, Icon: Clock },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-border bg-card p-2.5 flex flex-col items-center gap-1">
                  <kpi.Icon className="h-3 w-3 text-primary" />
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                  <span className="font-display text-base font-bold text-foreground">{kpi.value}</span>
                </div>
              ))}
            </div>

            {/* Top Performing Cities */}
            <div className="rounded-xl border border-border bg-card p-3 flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  Top Performing Cities
                </h2>
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
                        <span className="text-xs font-bold text-primary/60 w-4">0{idx + 1}</span>
                        <span className="text-sm font-medium text-foreground">{city.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{city.value.toLocaleString()} leads</span>
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
                  <h2 className="text-sm font-semibold text-primary mb-0.5">Regional Insight</h2>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {selectedRegion === "National"
                      ? "Southeast concentrates 72% of total leads with 2.4% above-average conversion during peak hours (14h-16h)."
                      : `${selectedRegion} region shows distinct engagement patterns. Click other regions to compare performance.`}
                  </p>
                </div>
              </div>
            </div>
          </DraggableGrid>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeoPage;
