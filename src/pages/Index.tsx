import DashboardLayout from "@/components/layout/DashboardLayout";
import DraggableGrid from "@/components/widgets/DraggableGrid";
import KPICard from "@/components/widgets/KPICard";
import { kpiData } from "@/data/mockData";
import { SALES_KPIS, SALES_BY_KIT_MOCK, WEEKLY_APPOINTMENTS_MOCK, RECENT_TRANSACTIONS } from "@/data/salesData";
import { DollarSign, Award, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const totalScheduled = WEEKLY_APPOINTMENTS_MOCK.reduce((s, d) => s + d.scheduled, 0);
const totalCompleted = WEEKLY_APPOINTMENTS_MOCK.reduce((s, d) => s + d.completed, 0);
const attendanceRate = ((totalCompleted / totalScheduled) * 100).toFixed(1);

const statusStyles: Record<string, string> = {
  Confirmado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Cancelado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const SalesTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-lg">
      <p className="font-display font-semibold text-card-foreground">{d.name}</p>
      <p className="text-muted-foreground">Qtd: {d.quantity}</p>
      <p className="text-muted-foreground">Valor: {formatBRL(d.value)}</p>
    </div>
  );
};

const AppointmentsTooltip = ({ active, payload, label }: any) => {
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

const Index = () => {
  const salesKpis = [
    { title: "Receita Total", value: formatBRL(SALES_KPIS.totalRevenue), icon: DollarSign },
    { title: "Kit Mais Vendido", value: SALES_KPIS.bestSeller, icon: Award },
    { title: "Ticket Médio", value: formatBRL(SALES_KPIS.avgTicket), icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Visão Geral" breadcrumb={["LIA Analytics", "Visão Geral"]}>
      <DraggableGrid storageKey="overview">
        {/* Lead KPIs */}
        <DraggableGrid storageKey="overview-lead-kpis" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </DraggableGrid>

        {/* Sales KPIs row */}
        <DraggableGrid storageKey="overview-sales-kpis" className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {salesKpis.map((k) => (
            <div key={k.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{k.title}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <k.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
            </div>
          ))}
        </DraggableGrid>

        {/* Charts row */}
        <DraggableGrid storageKey="overview-charts" className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
          {/* Revenue by Kit */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 font-display text-sm font-semibold text-foreground">Receita por Kit</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_BY_KIT_MOCK} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,82%)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(24,15%,45%)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(24,15%,45%)" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<SalesTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {SALES_BY_KIT_MOCK.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Appointments */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-foreground">Visitas Semanais</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {totalScheduled} agendadas</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {attendanceRate}% comparecimento</span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_APPOINTMENTS_MOCK} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,82%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(24,15%,45%)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(24,15%,45%)" />
                  <Tooltip content={<AppointmentsTooltip />} />
                  <Legend formatter={(v: string) => (v === "scheduled" ? "Agendadas" : "Realizadas")} wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="scheduled" fill="#E0C9A6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#4A3B2A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </DraggableGrid>

        {/* Recent Transactions */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 font-display text-sm font-semibold text-foreground">Últimas Vendas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Data</TableHead>
                <TableHead className="text-xs">Cliente</TableHead>
                <TableHead className="text-xs">Kit</TableHead>
                <TableHead className="text-xs">Valor</TableHead>
                <TableHead className="text-xs">Pagamento</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_TRANSACTIONS.slice(0, 4).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-xs">{tx.date}</TableCell>
                  <TableCell className="text-xs font-medium">{tx.lead}</TableCell>
                  <TableCell className="text-xs">{tx.kit}</TableCell>
                  <TableCell className="text-xs">{formatBRL(tx.value)}</TableCell>
                  <TableCell className="text-xs">{tx.payment}</TableCell>
                  <TableCell>
                    <Badge className={`${statusStyles[tx.status]} border-0 text-[10px] font-medium`}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DraggableGrid>
    </DashboardLayout>
  );
};

export default Index;
