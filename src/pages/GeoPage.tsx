import DashboardLayout from "@/components/layout/DashboardLayout";
import GeoDistribution from "@/components/widgets/GeoDistribution";

const GeoPage = () => {
  return (
    <DashboardLayout title="Geo Distribution" breadcrumb={["LIA Analytics", "Geo Distribution"]}>
      <GeoDistribution />
    </DashboardLayout>
  );
};

export default GeoPage;
