import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string[];
}

const DashboardLayout = ({ children, title, breadcrumb }: DashboardLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="ml-56 flex h-screen flex-col">
        <AppHeader title={title} breadcrumb={breadcrumb} />
        <main className="flex flex-1 flex-col overflow-auto p-2.5">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
