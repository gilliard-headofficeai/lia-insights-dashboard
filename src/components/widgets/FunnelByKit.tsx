import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FUNNEL_BY_KIT_MOCK } from "@/data/salesData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-lg">
      <p className="font-display font-semibold text-card-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === "planned" ? "Plano Montado" : p.dataKey === "scheduled" ? "Visita Agendada" : "Venda Confirmada"}: {p.value}
        </p>
      ))}
    </div>
  );
};

const legendFormatter = (value: string) => {
  const map: Record<string, string> = {
    planned: "Plano Montado",
    scheduled: "Visita Agendada",
    sold: "Venda Confirmada",
  };
  return map[value] || value;
};

const FunnelByKit = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Funil de Conversão por Kit</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FUNNEL_BY_KIT_MOCK} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,82%)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={legendFormatter} wrapperStyle={{ fontSize: 13 }} />
            <Bar dataKey="planned" name="planned" fill="#E0C9A6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="scheduled" name="scheduled" fill="#C5A059" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sold" name="sold" fill="#4A3B2A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FunnelByKit;
