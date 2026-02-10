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
      <DraggableGrid>
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>
        <CohortHeatmap />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ConversionBarriers />
          <PeakActivityChart />
        </div>
      </DraggableGrid>
    </DashboardLayout>
  );
};

export default DeepDive;
