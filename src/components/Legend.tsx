import { getGhiColor } from '../utils/data';

export default function Legend() {
  const items = [
    { label: 'Low (0-9.9)', value: 5 },
    { label: 'Moderate (10-19.9)', value: 15 },
    { label: 'Serious (20-34.9)', value: 25 },
    { label: 'Alarming (35-49.9)', value: 45 },
    { label: 'Extreme (50+)', value: 55 },
    { label: 'Missing (no value)', value: null },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-7 lg:gap-x-9 gap-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div 
            className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
            style={{ backgroundColor: getGhiColor(item.value) }}
          />
          <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-zinc-400 font-sans tracking-wide whitespace-nowrap">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
