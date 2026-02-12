import { useLayoutMode } from "@/contexts/LayoutContext";
import { Settings2, Download, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

interface AppHeaderProps {
  title: string;
  breadcrumb?: string[];
}

const AppHeader = ({ title, breadcrumb = [] }: AppHeaderProps) => {
  const { isEditMode, setIsEditMode } = useLayoutMode();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-sidebar px-5 backdrop-blur-sm dark:bg-card/80">
      <div className="flex flex-col justify-center">
        {breadcrumb.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-sidebar-foreground/70 dark:text-muted-foreground">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {item}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-base font-semibold text-sidebar-foreground leading-tight dark:text-foreground">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 border-border text-sidebar-foreground/70 dark:text-muted-foreground"
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 border-border text-xs text-sidebar-foreground/70 dark:text-muted-foreground"
        >
          Últimos 30 Dias
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button size="sm" className="h-8 gap-1.5 bg-primary text-xs text-primary-foreground hover:bg-primary/90">
          <Download className="h-3 w-3" />
          Exportar Relatório
        </Button>
        <Button
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsEditMode(!isEditMode)}
          className={`h-8 gap-1.5 text-xs ${
            isEditMode ? "bg-primary text-primary-foreground" : "border-border text-sidebar-foreground/70 dark:text-muted-foreground"
          }`}
        >
          <Settings2 className="h-3 w-3" />
          {isEditMode ? "Salvar Layout" : "Editar Layout"}
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
