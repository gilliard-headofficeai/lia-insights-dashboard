import { useLayoutMode } from "@/contexts/LayoutContext";
import { Settings2, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  title: string;
  breadcrumb?: string[];
}

const AppHeader = ({ title, breadcrumb = [] }: AppHeaderProps) => {
  const { isEditMode, setIsEditMode } = useLayoutMode();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 px-6 py-4 backdrop-blur-sm">
      <div>
        {breadcrumb.length > 0 && (
          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {item}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Date filter */}
        <Button variant="outline" size="sm" className="gap-2 border-border text-muted-foreground">
          Last 30 Days
          <ChevronDown className="h-3 w-3" />
        </Button>

        {/* Export */}
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="h-3.5 w-3.5" />
          Export Report
        </Button>

        {/* Edit mode toggle */}
        <Button
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsEditMode(!isEditMode)}
          className={isEditMode ? "gap-2 bg-primary text-primary-foreground" : "gap-2 border-border text-muted-foreground"}
        >
          <Settings2 className="h-3.5 w-3.5" />
          {isEditMode ? "Save Layout" : "Edit Layout"}
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
