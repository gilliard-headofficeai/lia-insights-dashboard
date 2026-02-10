import { Users, MessageSquare, TrendingUp, RefreshCw } from "lucide-react";
const iconMap = {
  Users,
  MessageSquare,
  TrendingUp,
  RefreshCw
};
interface KPICardProps {
  title: string;
  value: string;
  change: number;
  positive: boolean;
  icon: keyof typeof iconMap;
}
const KPICard = ({
  title,
  value,
  change,
  positive,
  icon
}: KPICardProps) => {
  const Icon = iconMap[icon];
  return <div className="rounded-xl border border-border bg-card p-5 py-[2px] px-[19px]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-foreground">{value}</p>
      <p className={`mt-1 text-sm font-medium ${positive ? "text-success" : "text-danger"}`}>
        {positive ? "↑" : "↓"} {Math.abs(change)}%
        <span className="ml-1 text-muted-foreground font-normal">vs last period</span>
      </p>
    </div>;
};
export default KPICard;