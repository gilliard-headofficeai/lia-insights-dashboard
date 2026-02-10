import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { peakHoursData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const PeakActivityChart = () => {
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
          <XAxis
            dataKey="hour"
            tick={{ fill: "hsl(35,15%,55%)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis tick={{ fill: "hsl(35,15%,55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(20,30%,14%)",
              border: "1px solid hsl(43,30%,25%)",
              borderRadius: 8,
              color: "hsl(60,20%,95%)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
            {peakHoursData.map((entry, idx) => (
              <Cell key={idx} fill={entry.isPeak ? "hsl(43,65%,52%)" : "hsl(20,25%,28%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeakActivityChart;
