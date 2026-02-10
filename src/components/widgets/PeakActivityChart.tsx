import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { peakHoursData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const PeakActivityChart = () => {
  const isDark = document.documentElement.classList.contains("dark");
  const mutedColor = isDark ? "hsl(35,15%,55%)" : "hsl(24,15%,45%)";
  const tooltipBg = isDark ? "hsl(20,30%,14%)" : "hsl(30,20%,96%)";
  const tooltipBorder = isDark ? "hsl(43,30%,25%)" : "hsl(30,20%,78%)";
  const tooltipText = isDark ? "hsl(60,20%,95%)" : "hsl(24,40%,15%)";
  const peakFill = isDark ? "hsl(43,65%,52%)" : "hsl(43,65%,42%)";
  const baseFill = isDark ? "hsl(20,25%,28%)" : "hsl(30,18%,78%)";

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Peak Activity Hours</h3>
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          Most Active: 14:00 – 16:00
        </Badge>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={peakHoursData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <XAxis dataKey="hour" tick={{ fill: mutedColor, fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fill: mutedColor, fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, color: tooltipText, fontSize: 12 }} />
          <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
            {peakHoursData.map((entry, idx) => (
              <Cell key={idx} fill={entry.isPeak ? peakFill : baseFill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeakActivityChart;
