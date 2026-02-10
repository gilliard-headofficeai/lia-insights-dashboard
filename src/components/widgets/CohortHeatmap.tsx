import { cohortData } from "@/data/mockData";

const days = ["Day 0", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const getHeatColor = (val: number, isDark: boolean) => {
  const maxVal = 15;
  const intensity = Math.min(val / maxVal, 1);
  if (isDark) {
    const l = 25 + intensity * 27;
    const s = 20 + intensity * 45;
    const h = 20 + intensity * 23;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  // Light: from light beige to medium brown/gold
  const l = 85 - intensity * 40;
  const s = 20 + intensity * 45;
  const h = 30 + intensity * 13;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const CohortHeatmap = () => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Messages by Client Cohort</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Cohort</th>
              {days.map((d) => (
                <th key={d} className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row) => (
              <tr key={row.cohort}>
                <td className="px-3 py-2 text-xs font-medium text-foreground">{row.cohort}</td>
                {row.values.map((val, i) => (
                  <td key={i} className="px-1 py-1">
                    <div
                      className="mx-auto flex h-9 w-14 items-center justify-center rounded-md text-xs font-semibold text-foreground"
                      style={{ backgroundColor: getHeatColor(val, isDark) }}
                    >
                      {val}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CohortHeatmap;
