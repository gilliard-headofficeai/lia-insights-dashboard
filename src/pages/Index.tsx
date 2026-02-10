import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/widgets/KPICard";
import { kpiData } from "@/data/mockData";

const Index = () => {
  return (
    <DashboardLayout title="Overview" breadcrumb={["LIA Analytics", "Overview"]}>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>
      <div className="flex items-center justify-center rounded-xl border border-border bg-card p-20">
        <p className="text-muted-foreground">Overview dashboard — mais widgets em breve.</p>
      </div>
    </DashboardLayout>
  );
};

export default Index;
