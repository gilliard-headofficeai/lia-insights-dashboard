import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, CheckCircle, Percent } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { WEEKLY_APPOINTMENTS_MOCK } from "@/data/salesData";

const totalScheduled = WEEKLY_APPOINTMENTS_MOCK.reduce((s, d) => s + d.scheduled, 0);
const totalCompleted = WEEKLY_APPOINTMENTS_MOCK.reduce((s, d) => s + d.completed, 0);
const attendanceRate = ((totalCompleted / totalScheduled) * 100).toFixed(1);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-lg">
      <p className="font-display font-semibold text-card-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === "scheduled" ? "Agendadas" : "Realizadas"}: {p.value}
        </p>
      ))}
    </div>
  );
};

const AppointmentsPage = () => {
  const kpis = [
    { label: "Visitas Agendadas", value: totalScheduled.toString(), icon: Calendar },
    { label: "Visitas Realizadas", value: totalCompleted.toString(), icon: CheckCircle },
    { label: "Taxa de Comparecimento", value: `${attendanceRate}%`, icon: Percent },
  ];

  return (
    <DashboardLayout title="Agendamentos" breadcrumb={["LIA Analytics", "Agendamentos"]}>
      <div className="flex flex-col gap-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <k.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Fluxo de Visitas (Semanal)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_APPOINTMENTS_MOCK} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,82%)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value: string) => (value === "scheduled" ? "Agendadas" : "Realizadas")}
                  wrapperStyle={{ fontSize: 13 }}
                />
                <Bar dataKey="scheduled" name="scheduled" fill="#E0C9A6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completed" name="completed" fill="#4A3B2A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
