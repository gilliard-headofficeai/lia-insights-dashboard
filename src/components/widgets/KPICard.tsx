import { Users, MessageSquare, TrendingUp, RefreshCw } from "lucide-react";

const iconMap = { Users, MessageSquare, TrendingUp, RefreshCw };

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  positive: boolean;
  icon: keyof typeof iconMap;
}

const KPICard = ({ title, value, change, positive, icon }: KPICardProps) => {
  const Icon = iconMap[icon];

  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{title}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      <p className={`mt-0.5 text-xs font-medium ${positive ? "text-success" : "text-danger"}`}>
        {positive ? "↑" : "↓"} {Math.abs(change)}%
        <span className="ml-1 text-muted-foreground font-normal">vs last period</span>
      </p>
    </div>
  );
};

export default KPICard;
