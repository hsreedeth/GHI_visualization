import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { CountryGhiRecord, GhiYear } from '../types';
import { getGhiColor } from '../utils/data';

interface CountryGlyphProps {
  record: CountryGhiRecord;
  selectedYears: GhiYear[];
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: (e: MouseEvent) => void;
}

export default function CountryGlyph({ record, selectedYears, index, onHoverStart, onHoverEnd, onClick }: CountryGlyphProps) {
  const isYearVisible = (year: GhiYear) => {
    if (selectedYears.length === 0) return true;
    return selectedYears.includes(year);
  };

  const getFill = (year: GhiYear) => {
    const val = record.values[year];
    if (val === null) return getGhiColor(val);
    if (!isYearVisible(year)) return '#18181b';
    return getGhiColor(val);
  };

  const radiusStyle = {
    tl: { borderTopLeftRadius: '100%', borderTopRightRadius: '2px', borderBottomRightRadius: '2px', borderBottomLeftRadius: '2px' },
    tr: { borderTopRightRadius: '100%', borderTopLeftRadius: '2px', borderBottomRightRadius: '2px', borderBottomLeftRadius: '2px' },
    bl: { borderBottomLeftRadius: '100%', borderTopLeftRadius: '2px', borderTopRightRadius: '2px', borderBottomRightRadius: '2px' },
    br: { borderBottomRightRadius: '100%', borderTopLeftRadius: '2px', borderTopRightRadius: '2px', borderBottomLeftRadius: '2px' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.005 // faster stagger
      }}
      className="flex flex-col items-center group cursor-pointer w-full"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      aria-label={`Hunger index for ${record.entity}`}
    >
      <motion.div 
        whileHover={{ scale: 1.15 }} 
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-[50px] xl:h-[50px] grid grid-cols-2 grid-rows-2 gap-[1.5px]"
      >
        <div className="w-full h-full transition-colors duration-300" style={{ backgroundColor: getFill(2000), ...radiusStyle.tl }} />
        <div className="w-full h-full transition-colors duration-300" style={{ backgroundColor: getFill(2006), ...radiusStyle.tr }} />
        <div className="w-full h-full transition-colors duration-300" style={{ backgroundColor: getFill(2021), ...radiusStyle.bl }} />
        <div className="w-full h-full transition-colors duration-300" style={{ backgroundColor: getFill(2012), ...radiusStyle.br }} />
      </motion.div>
      <div className="mt-1.5 text-[7px] sm:text-[8px] xl:text-[9px] text-center font-sans font-medium text-zinc-400 max-w-full leading-[1.05] text-balance w-full px-0.5">
        {record.entity}
      </div>
    </motion.div>
  );
}
