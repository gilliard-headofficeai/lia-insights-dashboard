import { useState } from "react";

const days = ["Day 0", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const cohortRows = [
  { date: "Oct 23 - Oct 29", users: 1240, values: [12.4, 8.2, 6.5, 5.1, 4.8, 3.2, 2.1, 1.5] },
  { date: "Oct 30 - Nov 05", users: 1450, values: [14.1, 9.5, 7.2, 6.0, 4.9, 3.8, 2.5, 1.2] },
  { date: "Nov 06 - Nov 12", users: 1320, values: [13.2, 8.8, 6.9, 5.5, 5.2, 3.5, 2.4, null] },
  { date: "Nov 13 - Nov 19", users: 1580, values: [15.5, 10.1, 7.8, 6.2, 5.1, null, null, null] },
  { date: "Nov 20 - Nov 26", users: 1610, values: [13.8, 8.5, 6.1, null, null, null, null, null] },
];

const MAX_VALUE = 15.5;

const getCellBg = (value: number | null) => {
  if (value === null) return "transparent";
  const intensity = value / MAX_VALUE;
  return `rgba(212, 175, 55, ${intensity})`;
};

const getCellText = (value: number | null) => {
  if (value === null) return "";
  const intensity = value / MAX_VALUE;
  if (intensity > 0.65) return "hsl(24, 52%, 7%)";      // dark text on bright gold
  if (intensity > 0.35) return "hsl(43, 55%, 70%)";      // light gold
  return "hsl(35, 15%, 50%)";                             // muted
};

const CohortHeatmap = () => {
  const [tooltip, setTooltip] = useState<{ value: number; x: number; y: number } | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="mb-1">
        <h3 className="font-display text-lg font-semibold text-foreground">Messages by Client Cohort</h3>
        <p className="text-xs text-muted-foreground">Weekly average message volume per user from start date.</p>
      </div>

      {/* Scale legend */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Low</span>
        <div className="flex h-3 w-28 overflow-hidden rounded-sm">
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1].map((o, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: `rgba(212, 175, 55, ${o})` }} />
          ))}
        </div>
        <span>High</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="pb-2 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Start Date
              </th>
              <th className="pb-2 pr-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Users
              </th>
              {days.map((d) => (
                <th key={d} className="pb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortRows.map((row) => (
              <tr key={row.date} className="group">
                <td className="whitespace-nowrap py-[3px] pr-4 text-sm text-foreground/90">{row.date}</td>
                <td className="py-[3px] pr-2 text-right font-mono text-sm text-muted-foreground">
                  {row.users.toLocaleString()}
                </td>
                {row.values.map((val, i) => (
                  <td key={i} className="p-[2px]">
                    {val !== null ? (
                      <div
                        className="flex h-9 w-full min-w-[52px] cursor-default items-center justify-center rounded-md text-xs font-semibold transition-all hover:scale-105 hover:brightness-110"
                        style={{
                          backgroundColor: getCellBg(val),
                          color: getCellText(val),
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({ value: val, x: rect.left + rect.width / 2, y: rect.top - 8 });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {val}
                      </div>
                    ) : (
                      <div className="flex h-9 w-full min-w-[52px] items-center justify-center rounded-md border border-border/30 text-xs text-muted-foreground/30">
                        —
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-md bg-popover px-2.5 py-1 text-xs font-semibold text-foreground shadow-lg border border-border"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          {tooltip.value} msgs/user
        </div>
      )}
    </div>
  );
};

export default CohortHeatmap;
