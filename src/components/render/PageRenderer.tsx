import type { PageDocument } from '../../types';
import { SectionRenderer } from './SectionRenderer';

interface Props {
  doc: PageDocument;
  editing?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export function PageRenderer({ doc, editing, selectedId, onSelect }: Props) {
  return (
    <div style={{ background: doc.theme.background, color: doc.theme.text }}>
      {doc.sections.map((section) => (
        <div
          key={section.id}
          onClick={editing ? () => onSelect?.(section.id) : undefined}
          className={editing ? 'relative cursor-pointer' : undefined}
        >
          {editing && selectedId === section.id && (
            <div className="pointer-events-none absolute inset-0 z-30 ring-2 ring-inset ring-violet-500" />
          )}
          <SectionRenderer section={section} theme={doc.theme} media={doc.media} editing={editing} />
        </div>
      ))}
    </div>
  );
}
