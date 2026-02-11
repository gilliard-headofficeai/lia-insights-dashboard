import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/widgets/KPICard";
import CohortHeatmap from "@/components/widgets/CohortHeatmap";
import ConversionBarriers from "@/components/widgets/ConversionBarriers";
import PeakActivityChart from "@/components/widgets/PeakActivityChart";
import DraggableGrid from "@/components/widgets/DraggableGrid";
import { kpiData } from "@/data/mockData";

const DeepDive = () => {
  return (
    <DashboardLayout title="Deep Dive Analysis" breadcrumb={["LIA Analytics", "Deep Dive"]}>
      <DraggableGrid storageKey="deep-dive">
        {/* KPI row — each card individually draggable */}
        <DraggableGrid storageKey="deep-dive-kpis" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </DraggableGrid>
        <CohortHeatmap />
        {/* Charts row — swap charts */}
        <DraggableGrid storageKey="deep-dive-charts" className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2">
          <PeakActivityChart />
          <ConversionBarriers />
        </DraggableGrid>
      </DraggableGrid>
    </DashboardLayout>
  );
};

export default DeepDive;
