import DashboardLayout from "@/components/layout/DashboardLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout title="Configurações" breadcrumb={["LIA Analytics", "Configurações"]}>
      <div className="flex items-center justify-center rounded-xl border border-border bg-card p-20">
        <div className="text-center">
          <Settings className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Configurações — em breve.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
