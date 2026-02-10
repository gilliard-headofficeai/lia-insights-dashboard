import { useLayoutMode } from "@/contexts/LayoutContext";
import { Settings2, Download, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
interface AppHeaderProps {
  title: string;
  breadcrumb?: string[];
}
const AppHeader = ({
  title,
  breadcrumb = []
}: AppHeaderProps) => {
  const {
    isEditMode,
    setIsEditMode
  } = useLayoutMode();
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <header className="flex items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm py-[6px]">
      <div>
        {breadcrumb.length > 0 && <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((item, i) => <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {item}
              </span>)}
          </div>}
        <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button variant="outline" size="icon" onClick={toggleTheme} className="border-border text-muted-foreground">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

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
        <Button variant={isEditMode ? "default" : "outline"} size="sm" onClick={() => setIsEditMode(!isEditMode)} className={isEditMode ? "gap-2 bg-primary text-primary-foreground" : "gap-2 border-border text-muted-foreground"}>
          <Settings2 className="h-3.5 w-3.5" />
          {isEditMode ? "Save Layout" : "Edit Layout"}
        </Button>
      </div>
    </header>;
};
export default AppHeader;