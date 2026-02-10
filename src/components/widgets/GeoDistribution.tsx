import { geoData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, TrendingUp, Users } from "lucide-react";

const statCards = [
  { label: "Total Regions", value: "4", icon: Globe, change: "+2 this month" },
  { label: "Top Region Share", value: "18%", icon: TrendingUp, change: "São Paulo leads" },
  { label: "Total Leads (Geo)", value: "6,355", icon: Users, change: "+8.3% vs last period" },
];

const GeoDistribution = () => {
  const maxLeads = Math.max(...geoData.map((d) => d.leads));

  return (
    <div className="space-y-2.5">
      {/* Stats row */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-3.5 w-3.5 text-primary" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main content: Map placeholder + City ranking */}
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-5">
        {/* Map visualization placeholder */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-foreground">Regional Distribution</h3>
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          {/* Visual bar chart representation */}
          <div className="space-y-2.5">
            {geoData.map((item) => (
              <div key={item.city} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{item.city}, {item.state}</span>
                  <span className="text-muted-foreground">{item.leads.toLocaleString()} leads</span>
                </div>
                <div className="h-6 w-full rounded-md bg-muted/50 overflow-hidden">
                  <div
                    className="h-full rounded-md bg-gradient-to-r from-primary/80 to-primary flex items-center justify-end pr-2"
                    style={{ width: `${(item.leads / maxLeads) * 100}%` }}
                  >
                    <span className="text-[10px] font-semibold text-primary-foreground">{item.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City ranking list */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Top Cities Ranking</h3>
          <div className="space-y-2">
            {geoData.map((item, idx) => (
              <div key={item.city} className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{item.city}</p>
                  <p className="text-[10px] text-muted-foreground">{item.leads.toLocaleString()} leads</p>
                </div>
                <Badge variant="outline" className="border-border text-muted-foreground text-[10px] h-5">
                  {item.state}
                </Badge>
                <span className="text-xs font-semibold text-primary">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoDistribution;
