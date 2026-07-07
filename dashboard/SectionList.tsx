"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Page, SectionType } from "@/types/content";
import { SECTION_LABELS } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const SECTION_TYPES = Object.keys(SECTION_LABELS) as SectionType[];

function SortableRow({
  id,
  name,
  typeLabel,
  visible,
  active,
  onSelect,
  onToggleVisible,
  onDuplicate,
  onDelete,
}: {
  id: string;
  name: string;
  typeLabel: string;
  visible: boolean;
  active: boolean;
  onSelect: () => void;
  onToggleVisible: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group flex items-center gap-2 rounded-md border border-transparent px-2 py-2 text-sm",
        active ? "border-neutral-700 bg-neutral-800" : "hover:bg-neutral-900",
        isDragging && "opacity-50"
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 text-neutral-600 hover:text-neutral-300 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        ⠿
      </button>
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left">
        <span className={cn("block truncate", !visible && "text-neutral-500 line-through")}>{name}</span>
        <span className="block text-[0.65rem] uppercase tracking-wide text-neutral-500">{typeLabel}</span>
      </button>
      <button
        type="button"
        onClick={onToggleVisible}
        title={visible ? "Hide section" : "Show section"}
        className="px-1 text-neutral-500 hover:text-white"
      >
        {visible ? "👁" : "🚫"}
      </button>
      <button type="button" onClick={onDuplicate} title="Duplicate" className="px-1 text-neutral-500 hover:text-white">
        ⧉
      </button>
      <button type="button" onClick={onDelete} title="Delete" className="px-1 text-neutral-500 hover:text-red-400">
        ✕
      </button>
    </div>
  );
}

export function SectionList({ page, selectedSectionId }: { page: Page; selectedSectionId: string | null }) {
  const { reorderSections, addSection, removeSection, duplicateSection, toggleSectionVisibility, selectSection } =
    useDashboardStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = page.sections.map((s) => s.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    reorderSections(page.id, arrayMove(ids, oldIndex, newIndex));
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Sections</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium hover:bg-neutral-700"
          >
            + Add
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-30 mt-1 w-48 rounded-md border border-neutral-700 bg-neutral-900 py-1 shadow-xl">
              {SECTION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    addSection(page.id, type);
                    setMenuOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white"
                >
                  {SECTION_LABELS[type]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={page.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {page.sections.map((section) => (
              <SortableRow
                key={section.id}
                id={section.id}
                name={section.name}
                typeLabel={SECTION_LABELS[section.type]}
                visible={section.visible}
                active={section.id === selectedSectionId}
                onSelect={() => selectSection(section.id)}
                onToggleVisible={() => toggleSectionVisibility(page.id, section.id)}
                onDuplicate={() => duplicateSection(page.id, section.id)}
                onDelete={() => {
                  if (confirm(`Delete "${section.name}"?`)) removeSection(page.id, section.id);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
        {page.sections.length === 0 && (
          <p className="px-2 py-6 text-center text-xs text-neutral-500">No sections yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}
