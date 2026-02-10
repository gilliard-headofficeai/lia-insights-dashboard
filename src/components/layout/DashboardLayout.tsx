import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string[];
}

const DashboardLayout = ({ children, title, breadcrumb }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-60">
        <AppHeader title={title} breadcrumb={breadcrumb} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
