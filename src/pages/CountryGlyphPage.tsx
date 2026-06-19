import { useEffect, useState, useCallback, type MouseEvent } from 'react';
import Header from '../components/Header';
import InteractiveYearFilter from '../components/InteractiveYearFilter';
import GlyphGrid from '../components/GlyphGrid';
import Legend from '../components/Legend';
import Tooltip from '../components/Tooltip';
import { loadGhiData } from '../utils/data';
import { CountryGhiRecord, GhiYear } from '../types';

export default function CountryGlyphPage() {
  const [data, setData] = useState<CountryGhiRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedYears, setSelectedYears] = useState<GhiYear[]>([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const [hoveredRecord, setHoveredRecord] = useState<CountryGhiRecord | null>(null);
  const [pinnedRecord, setPinnedRecord] = useState<CountryGhiRecord | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadGhiData()
      .then((records) => {
        setData(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data. Please ensure '/data/global-hunger-index.csv' is available.");
        setLoading(false);
      });

    // Clear pinned record on outside click
    const handleGlobalClick = () => {
      // Don't unpin if clicking a country glyph (handled by onClick)
      setPinnedRecord(null);
    };

    // We attach click to window. Note: we need to stop node propagation in glyph click.
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleYearToggle = (year: GhiYear) => {
    setHasUserInteracted(true);
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((selectedYear) => selectedYear !== year);
      }

      return [...prev, year].sort((a, b) => a - b) as GhiYear[];
    });
  };

  const handleHoverStart = useCallback((record: CountryGhiRecord) => {
    if (!pinnedRecord) {
      setHoveredRecord(record);
    }
  }, [pinnedRecord]);

  const handleHoverEnd = useCallback(() => {
    setHoveredRecord(null);
  }, []);

  const handleClick = useCallback((record: CountryGhiRecord, e: MouseEvent) => {
    e.stopPropagation();
    if (pinnedRecord === record) {
      setPinnedRecord(null);
    } else {
      setPinnedRecord(record);
      setHoveredRecord(null);
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [pinnedRecord]);

  const handleMouseMove = (e: MouseEvent) => {
    if (hoveredRecord && !pinnedRecord) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-gray-500 font-sans tracking-wide">Loading visualization...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-red-600 bg-red-50 p-6 rounded-lg max-w-lg shadow border border-red-200">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-[100dvh] bg-black text-gray-100 font-sans selection:bg-gray-800 selection:text-white overflow-hidden flex flex-col relative"
      onMouseMove={handleMouseMove}
    >
      <Tooltip record={pinnedRecord || hoveredRecord} x={mousePos.x} y={mousePos.y} />
      
      <header className="z-10 mx-auto grid w-full max-w-[2200px] flex-none grid-cols-1 items-start gap-3 px-4 pb-1.5 pt-3 sm:px-6 md:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1.15fr)] lg:grid-cols-[minmax(320px,0.85fr)_minmax(420px,1.25fr)_auto] lg:gap-6 lg:px-8 xl:gap-8">
        <div className="flex min-w-0 flex-col gap-2">
          <Header />
          <Legend />
        </div>

        <p className="max-w-[720px] text-[11px] leading-[1.45] text-zinc-400 sm:text-[12px] lg:pt-0.5 lg:text-[13px] xl:text-[14px]">
          Each circle is one country, split across four Global Hunger Index snapshots: 2000, 2006,
          2012, and 2021. The pattern is clear:{' '}
          <strong className="font-bold text-white decoration-[#ef4444]/70 decoration-1 underline-offset-[3px]">
            severe hunger is concentrated in a smaller group of countries
          </strong>
          , while many others have moved toward{' '}
          <strong className="font-bold text-[#f4df4f]">
            moderate or low hunger levels
          </strong>
          . Use the year filter to isolate a snapshot or compare progress over time.
        </p>

        <div className="flex w-full shrink-0 justify-center md:col-start-2 md:justify-end lg:col-start-3 lg:row-start-1 lg:w-auto lg:pr-1 xl:pr-3">
          <InteractiveYearFilter
            selectedYears={selectedYears}
            onToggleYear={handleYearToggle}
            hasUserInteracted={hasUserInteracted}
          />
        </div>
      </header>

      {/* Main Grid */}
      <main className="mx-auto w-full max-w-[2200px] flex-1 overflow-y-auto px-3 pb-2 sm:px-5 lg:px-8 custom-scrollbar">
        <GlyphGrid 
          records={data} 
          selectedYears={selectedYears} 
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onClick={handleClick}
        />
      </main>
    </div>
  );
}
