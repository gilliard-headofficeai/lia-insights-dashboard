import DashboardLayout from "@/components/layout/DashboardLayout";
import GeoDistribution from "@/components/widgets/GeoDistribution";

const GeoPage = () => {
  return (
    <DashboardLayout title="Geo Distribution" breadcrumb={["LIA Analytics", "Geo Distribution"]}>
      <div className="flex-1 min-h-0">
        <GeoDistribution />
      </div>
    </DashboardLayout>
  );
};

export default GeoPage;
