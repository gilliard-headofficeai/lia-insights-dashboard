import { NavLink } from "@/components/NavLink";
import { Bot, BarChart3, Layers, Map, Settings, LogOut } from "lucide-react";

const navItems = [
  { to: "/", label: "Overview", icon: BarChart3 },
  { to: "/deep-dive", label: "Deep Dive", icon: Layers },
  { to: "/geo", label: "Geo Distribution", icon: Map },
  { to: "/settings", label: "Settings", icon: Settings },
];

const AppSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <span className="font-display text-lg font-semibold text-primary">LIA Analytics</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            activeClassName="bg-sidebar-accent text-primary font-medium"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            AU
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@lia.com</p>
          </div>
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
