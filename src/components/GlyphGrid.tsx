import type { MouseEvent } from 'react';
import { CountryGhiRecord, GhiYear } from '../types';
import CountryGlyph from './CountryGlyph';

interface GlyphGridProps {
  records: CountryGhiRecord[];
  selectedYears: GhiYear[];
  onHoverStart: (record: CountryGhiRecord) => void;
  onHoverEnd: () => void;
  onClick: (record: CountryGhiRecord, e: MouseEvent) => void;
}

export default function GlyphGrid({ records, selectedYears, onHoverStart, onHoverEnd, onClick }: GlyphGridProps) {
  return (
    <div className="grid min-h-full grid-cols-6 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-[repeat(18,minmax(0,1fr))] xl:grid-cols-[repeat(20,minmax(0,1fr))] gap-x-1.5 gap-y-2 w-full justify-items-center content-evenly">
      {records.map((record, idx) => (
        <div key={record.entity} className="contents">
          <CountryGlyph
            record={record}
            selectedYears={selectedYears}
            index={idx}
            onHoverStart={() => onHoverStart(record)}
            onHoverEnd={onHoverEnd}
            onClick={(e) => onClick(record, e)}
          />
        </div>
      ))}
    </div>
  );
}
