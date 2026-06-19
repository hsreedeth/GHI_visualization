import { motion, AnimatePresence } from 'motion/react';
import { CountryGhiRecord } from '../types';
import { formatGhiValue, getGhiSeverity, getGhiColor } from '../utils/data';

interface TooltipProps {
  record: CountryGhiRecord | null;
  x: number;
  y: number;
}

export default function Tooltip({ record, x, y }: TooltipProps) {
  return (
    <AnimatePresence>
      {record && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 pointer-events-none p-3 rounded-lg bg-zinc-900 text-white shadow-2xl border border-zinc-800 min-w-[180px]"
          style={{ 
            left: x, 
            top: y, 
            transform: 'translate(-50%, -110%)' // Center horizontally, position above cursor
          }}
        >
          <div className="font-bold text-white mb-2 border-b border-zinc-800 pb-1 text-sm">{record.entity}</div>
          <div className="flex flex-col gap-1 text-xs">
            {[2000, 2006, 2012, 2021].map((year) => {
              const val = record.values[year as keyof typeof record.values];
              const color = getGhiColor(val);
              const severity = getGhiSeverity(val);
              
              return (
                <div key={year} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-medium text-zinc-300">{year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-zinc-500 text-[10px] w-12">{severity !== 'Missing' ? severity : ''}</span>
                    <span className="font-mono text-white font-bold w-8">{formatGhiValue(val)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
