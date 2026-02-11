import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, Award, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { SALES_KPIS, SALES_BY_KIT_MOCK, RECENT_TRANSACTIONS } from "@/data/salesData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const statusStyles: Record<string, string> = {
  Confirmado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Cancelado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-lg">
      <p className="font-display font-semibold text-card-foreground">{d.name}</p>
      <p className="text-muted-foreground">Quantidade: {d.quantity}</p>
      <p className="text-muted-foreground">Valor: {formatBRL(d.value)}</p>
    </div>
  );
};

const SalesPage = () => {
  const kpis = [
    { label: "Receita Total", value: formatBRL(SALES_KPIS.totalRevenue), icon: DollarSign },
    { label: "Kit Mais Vendido", value: SALES_KPIS.bestSeller, icon: Award },
    { label: "Ticket Médio", value: formatBRL(SALES_KPIS.avgTicket), icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Performance de Vendas" breadcrumb={["LIA Analytics", "Vendas"]}>
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

        {/* Revenue Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Receita por Tipo de Kit</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_BY_KIT_MOCK} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,82%)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(24,15%,45%)" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {SALES_BY_KIT_MOCK.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Últimas Vendas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Kit Escolhido</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_TRANSACTIONS.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="font-medium">{tx.lead}</TableCell>
                  <TableCell>{tx.kit}</TableCell>
                  <TableCell>{formatBRL(tx.value)}</TableCell>
                  <TableCell>{tx.payment}</TableCell>
                  <TableCell>
                    <Badge className={`${statusStyles[tx.status]} border-0 font-medium`}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesPage;
