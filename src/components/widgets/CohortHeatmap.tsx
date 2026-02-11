import { useState, useEffect } from "react";

const days = ["Dia 0", "Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5", "Dia 6", "Dia 7"];

const cohortRows = [
  { date: "23 Out - 29 Out", users: 1240, values: [12.4, 8.2, 6.5, 5.1, 4.8, 3.2, 2.1, 1.5] },
  { date: "30 Out - 05 Nov", users: 1450, values: [14.1, 9.5, 7.2, 6.0, 4.9, 3.8, 2.5, 1.2] },
  { date: "06 Nov - 12 Nov", users: 1320, values: [13.2, 8.8, 6.9, 5.5, 5.2, 3.5, 2.4, null] },
  { date: "13 Nov - 19 Nov", users: 1580, values: [15.5, 10.1, 7.8, 6.2, 5.1, null, null, null] },
  { date: "20 Nov - 26 Nov", users: 1610, values: [13.8, 8.5, 6.1, null, null, null, null, null] },
];

const MAX_VALUE = 15.5;

const getCellBg = (value: number | null) => {
  if (value === null) return "transparent";
  const intensity = value / MAX_VALUE;
  return `rgba(212, 175, 55, ${intensity})`;
};

const getCellText = (value: number | null, isDark: boolean) => {
  if (value === null) return "";
  const intensity = value / MAX_VALUE;
  if (isDark) {
    if (intensity > 0.65) return "hsl(24, 52%, 7%)";
    if (intensity > 0.35) return "hsl(43, 55%, 70%)";
    return "hsl(35, 15%, 50%)";
  }
  if (intensity > 0.65) return "hsl(24, 40%, 10%)";
  if (intensity > 0.35) return "hsl(24, 35%, 20%)";
  return "hsl(24, 20%, 35%)";
};

const CohortHeatmap = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
  const [tooltip, setTooltip] = useState<{ value: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {/* Header */}
      <div className="mb-1">
        <h3 className="font-display text-sm font-semibold text-foreground">Mensagens por Coorte de Clientes</h3>
        <p className="text-[10px] text-muted-foreground">Volume médio semanal de mensagens por usuário desde a data de início.</p>
      </div>

      {/* Scale legend */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Baixo</span>
        <div className="flex h-3 w-28 overflow-hidden rounded-sm">
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1].map((o, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: `rgba(212, 175, 55, ${o})` }} />
          ))}
        </div>
        <span>Alto</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="pb-2 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Data Início
              </th>
              <th className="pb-2 pr-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Usuários
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
                        className="flex h-9 w-full min-w-[52px] cursor-default items-center justify-center rounded-md text-xs font-semibold transition-colors hover:brightness-110"
                        style={{
                          backgroundColor: getCellBg(val),
                          color: getCellText(val, isDark),
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
          {tooltip.value} msgs/usuário
        </div>
      )}
    </div>
  );
};

export default CohortHeatmap;
