import React, { useState, useCallback, useEffect } from "react";
import { useLayoutMode } from "@/contexts/LayoutContext";
import { GripVertical } from "lucide-react";

interface DraggableGridProps {
  children: React.ReactNode[];
  storageKey?: string;
}

const STORAGE_PREFIX = "lia-layout-";

const DraggableGrid = ({ children, storageKey = "deep-dive" }: DraggableGridProps) => {
  const { isEditMode } = useLayoutMode();
  const fullKey = STORAGE_PREFIX + storageKey;

  const [order, setOrder] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(fullKey);
      if (saved) return JSON.parse(saved);
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

  const handleDragStart = useCallback((idx: number) => {
    setDragIdx(idx);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setOverIdx(idx);
  }, []);

  const handleDrop = useCallback((targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    setOrder((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, removed);
      return next;
    });
    setDragIdx(null);
    setOverIdx(null);
  }, [dragIdx]);

  const handleDragEnd = useCallback(() => {
    setDragIdx(null);
    setOverIdx(null);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-2 pb-0.5">
      {order.map((childIdx, posIdx) => (
        <div
          key={childIdx}
          draggable={isEditMode}
          onDragStart={() => handleDragStart(posIdx)}
          onDragOver={(e) => handleDragOver(e, posIdx)}
          onDrop={() => handleDrop(posIdx)}
          onDragEnd={handleDragEnd}
          className={`relative transition-all ${
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
              Drag to reorder
            </div>
          )}
          {children[childIdx]}
        </div>
      ))}
    </div>
  );
};

export default DraggableGrid;
