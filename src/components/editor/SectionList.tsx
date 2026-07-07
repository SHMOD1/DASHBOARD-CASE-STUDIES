import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { sectionSummary, SECTION_LABELS, SECTION_TYPES } from '../../data/sectionMeta';
import { useDocStore } from '../../store/useDocStore';
import type { Section } from '../../types';
import { ChevronDownIcon, CopyIcon, EyeIcon, EyeOffIcon, GripIcon, PlusIcon, TrashIcon } from '../icons';

function SectionRow({ section }: { section: Section }) {
  const selectedId = useDocStore((s) => s.selectedId);
  const selectSection = useDocStore((s) => s.selectSection);
  const toggleVisible = useDocStore((s) => s.toggleVisible);
  const duplicateSection = useDocStore((s) => s.duplicateSection);
  const removeSection = useDocStore((s) => s.removeSection);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selected = selectedId === section.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 rounded-lg border px-2 py-2 text-sm transition-colors ${
        selected
          ? 'border-violet-500 bg-violet-500/10'
          : 'border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]'
      } ${isDragging ? 'z-10 opacity-70' : ''}`}
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        className="cursor-grab touch-none text-white/30 hover:text-white/70 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripIcon />
      </button>

      <button type="button" className="flex-1 truncate text-left" onClick={() => selectSection(section.id)}>
        <div className="truncate font-medium text-white/90">{SECTION_LABELS[section.type]}</div>
        <div className="truncate text-xs text-white/40">{sectionSummary(section)}</div>
      </button>

      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          title={section.visible ? 'Hide section' : 'Show section'}
          className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          onClick={() => toggleVisible(section.id)}
        >
          {section.visible ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeOffIcon className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          title="Duplicate"
          className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          onClick={() => duplicateSection(section.id)}
        >
          <CopyIcon className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Delete"
          className="rounded p-1 text-white/50 hover:bg-red-500/20 hover:text-red-400"
          onClick={() => removeSection(section.id)}
        >
          <TrashIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AddSectionMenu({ afterId }: { afterId?: string }) {
  const [open, setOpen] = useState(false);
  const addSection = useDocStore((s) => s.addSection);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 py-2 text-sm text-white/60 hover:border-violet-400/60 hover:text-violet-300"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add section
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-lg border border-white/10 bg-[#17161d] shadow-xl">
            {SECTION_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-violet-500/20 hover:text-white"
                onClick={() => {
                  addSection(type, afterId);
                  setOpen(false);
                }}
              >
                {SECTION_LABELS[type]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SectionList() {
  const sections = useDocStore((s) => s.doc.sections);
  const reorderSections = useDocStore((s) => s.reorderSections);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSections(String(active.id), String(over.id));
    }
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-1.5">
            {sections.map((section) => (
              <SectionRow key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <AddSectionMenu afterId={sections[sections.length - 1]?.id} />
    </div>
  );
}
