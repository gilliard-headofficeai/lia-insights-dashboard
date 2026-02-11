import React, { useState, useCallback, useEffect } from "react";
import { useLayoutMode } from "@/contexts/LayoutContext";
import { GripVertical } from "lucide-react";

interface DraggableGridProps {
  children: React.ReactNode[];
  storageKey?: string;
  /** Render children in a custom layout wrapper instead of default flex-col */
  className?: string;
}

const STORAGE_PREFIX = "lia-layout-";

// Global drag context to scope drag events
let activeDragGroup: string | null = null;

const DraggableGrid = ({ children, storageKey = "deep-dive", className }: DraggableGridProps) => {
  const { isEditMode } = useLayoutMode();
  const fullKey = STORAGE_PREFIX + storageKey;

  const [order, setOrder] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(fullKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === children.length) return parsed;
      }
    } catch {}
    return children.map((_, i) => i);
  });

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  // Sync order length with children count
  useEffect(() => {
    if (order.length !== children.length) {
      setOrder(children.map((_, i) => i));
    }
  }, [children.length]);

  // Save when exiting edit mode
  useEffect(() => {
    if (!isEditMode) {
      localStorage.setItem(fullKey, JSON.stringify(order));
    }
  }, [isEditMode]);

  const handleDragStart = useCallback((e: React.DragEvent, idx: number) => {
    e.stopPropagation();
    activeDragGroup = fullKey;
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox
    e.dataTransfer.setData("text/plain", `${fullKey}:${idx}`);
  }, [fullKey]);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    if (activeDragGroup !== fullKey) return;
    e.preventDefault();
    e.stopPropagation();
    setOverIdx(idx);
  }, [fullKey]);

  const handleDrop = useCallback((e: React.DragEvent, targetIdx: number) => {
    if (activeDragGroup !== fullKey) return;
    e.preventDefault();
    e.stopPropagation();
    if (dragIdx === null || dragIdx === targetIdx) return;
    setOrder((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, removed);
      return next;
    });
    setDragIdx(null);
    setOverIdx(null);
    activeDragGroup = null;
  }, [dragIdx, fullKey]);

  const handleDragEnd = useCallback(() => {
    setDragIdx(null);
    setOverIdx(null);
    activeDragGroup = null;
  }, []);

  const defaultClass = "flex flex-1 flex-col gap-2 pb-0.5";

  return (
    <div className={className || defaultClass}>
      {order.map((childIdx, posIdx) => (
        <div
          key={`${storageKey}-${childIdx}`}
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, posIdx)}
          onDragOver={(e) => handleDragOver(e, posIdx)}
          onDrop={(e) => handleDrop(e, posIdx)}
          onDragEnd={handleDragEnd}
          className={`relative transition-all ${
            posIdx === order.length - 1 && !className ? "flex-1 flex flex-col" : ""
          } ${
            isEditMode
              ? "cursor-grab rounded-xl border-2 border-dashed border-primary/40 p-1 hover:border-primary/70"
              : ""
          } ${dragIdx === posIdx ? "opacity-50" : ""} ${
            overIdx === posIdx && dragIdx !== posIdx ? "ring-2 ring-primary/50" : ""
          }`}
        >
          {isEditMode && (
            <div className="absolute -top-3 left-4 z-10 flex items-center gap-1 rounded-md bg-primary/20 px-2 py-0.5 text-xs text-primary">
              <GripVertical className="h-3 w-3" />
              Drag
            </div>
          )}
          {children[childIdx]}
        </div>
      ))}
    </div>
  );
};

export default DraggableGrid;
