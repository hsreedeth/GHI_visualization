import { useEffect, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GhiYear } from '../types';

export type InteractiveYearFilterProps = {
  selectedYears: GhiYear[];
  onToggleYear: (year: GhiYear) => void;
  hasUserInteracted?: boolean;
};

type QuadrantConfig = {
  year: GhiYear;
  label: string;
  x: number;
  y: number;
  textX: number;
  textY: number;
};

const QUADRANTS: QuadrantConfig[] = [
  { year: 2000, label: '2000', x: -39, y: -39, textX: -20, textY: -17 },
  { year: 2006, label: '2006', x: 2, y: -39, textX: 20, textY: -17 },
  { year: 2021, label: '2021', x: -39, y: 2, textX: -20, textY: 18 },
  { year: 2012, label: '2012', x: 2, y: 2, textX: 20, textY: 18 },
];

const TUTORIAL_STEPS = [
  { year: 2000 as GhiYear, position: 'Top left · earliest snapshot' },
  { year: 2006 as GhiYear, position: 'Top right · moving forward' },
  { year: 2012 as GhiYear, position: 'Bottom right · later snapshot' },
  { year: 2021 as GhiYear, position: 'Bottom left · latest snapshot' },
];

const TUTORIAL_STORAGE_KEY = 'ghi-year-filter-tutorial-seen';

export default function InteractiveYearFilter({
  selectedYears,
  onToggleYear,
  hasUserInteracted = false,
}: InteractiveYearFilterProps) {
  const [hoveredYear, setHoveredYear] = useState<GhiYear | null>(null);
  const [tutorialVisible, setTutorialVisible] = useState(
    () => window.localStorage.getItem(TUTORIAL_STORAGE_KEY) !== 'true',
  );
  const [tutorialStep, setTutorialStep] = useState(0);

  const dismissTutorial = () => {
    setTutorialVisible(false);
    window.localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  };

  useEffect(() => {
    if (hasUserInteracted) {
      dismissTutorial();
    }
  }, [hasUserInteracted]);

  useEffect(() => {
    if (!tutorialVisible || hasUserInteracted) return;

    const timer = window.setInterval(() => {
      setTutorialStep((current) => (current + 1) % TUTORIAL_STEPS.length);
    }, 1400);

    return () => window.clearInterval(timer);
  }, [hasUserInteracted, tutorialVisible]);

  const toggleYear = (year: GhiYear) => {
    dismissTutorial();
    onToggleYear(year);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, year: GhiYear) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleYear(year);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative flex w-[116px] flex-col items-center text-center sm:w-[124px]"
    >
      <div className="mb-1.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.11em] text-zinc-200 sm:text-[10px]">
        Interactive Filter
      </div>

      <svg
        viewBox="-47 -47 94 94"
        className="h-[82px] w-[82px] overflow-visible sm:h-[88px] sm:w-[88px]"
        aria-label="Interactive year filter"
      >
        <defs>
          <clipPath id="year-filter-circle-clip">
            <circle cx="0" cy="0" r="39" />
          </clipPath>
          <filter id="year-filter-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <motion.g
          animate={{ opacity: hasUserInteracted ? 0.42 : [0.35, 0.62, 0.35] }}
          transition={
            hasUserInteracted
              ? { duration: 0.2 }
              : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        >
          <line x1="0" y1="-45" x2="0" y2="45" stroke="#52525b" strokeWidth="0.8" strokeDasharray="2 2.5" />
          <line x1="-45" y1="0" x2="45" y2="0" stroke="#52525b" strokeWidth="0.8" strokeDasharray="2 2.5" />
        </motion.g>

        <g clipPath="url(#year-filter-circle-clip)">
          {QUADRANTS.map((quadrant, index) => {
            const isSelected = selectedYears.includes(quadrant.year);
            const isTutorialActive =
              tutorialVisible &&
              !hasUserInteracted &&
              TUTORIAL_STEPS[tutorialStep].year === quadrant.year;
            const isHovered = hoveredYear === quadrant.year;
            const isActive = isSelected || isTutorialActive;
            const fill = isActive ? '#f5f4f7' : isHovered ? '#28282d' : '#18181c';
            const labelFill = isActive ? '#09090b' : isHovered ? '#d4d4d8' : '#71717a';

            return (
              <motion.g
                key={quadrant.year}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Toggle ${quadrant.label}`}
                className="year-filter-quadrant"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: isHovered || isTutorialActive ? 1.025 : 1 }}
                transition={{
                  opacity: { duration: 0.22, delay: 0.06 + index * 0.04 },
                  scale: { type: 'spring', stiffness: 420, damping: 28 },
                }}
                style={{
                  cursor: 'pointer',
                  outline: 'none',
                  transformOrigin: `${quadrant.textX}px ${quadrant.textY}px`,
                }}
                onClick={() => toggleYear(quadrant.year)}
                onKeyDown={(event) => handleKeyDown(event, quadrant.year)}
                onMouseEnter={() => setHoveredYear(quadrant.year)}
                onMouseLeave={() => setHoveredYear(null)}
                onFocus={() => setHoveredYear(quadrant.year)}
                onBlur={() => setHoveredYear(null)}
              >
                {isActive && (
                  <rect
                    x={quadrant.x}
                    y={quadrant.y}
                    width="37"
                    height="37"
                    rx="12"
                    fill="#ffffff"
                    opacity="0.24"
                    filter="url(#year-filter-glow)"
                  />
                )}
                <motion.rect
                  x={quadrant.x}
                  y={quadrant.y}
                  width="37"
                  height="37"
                  rx="12"
                  animate={{ fill }}
                  transition={{ duration: 0.18 }}
                />
                <motion.text
                  x={quadrant.textX}
                  y={quadrant.textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8.6"
                  fontWeight="700"
                  animate={{ fill: labelFill }}
                  transition={{ duration: 0.18 }}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {quadrant.label}
                </motion.text>
              </motion.g>
            );
          })}
        </g>
      </svg>

      <motion.div
        animate={{ opacity: hasUserInteracted ? 0.48 : [0.5, 0.8, 0.5] }}
        transition={
          hasUserInteracted
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
        }
        className="mt-1 min-h-5 max-w-[116px] text-[7px] uppercase leading-[1.3] tracking-[0.08em] text-zinc-500 sm:text-[8px]"
      >
        {hasUserInteracted ? 'Click again to remove' : 'Select years to focus'}
      </motion.div>

      <AnimatePresence>
        {tutorialVisible && !hasUserInteracted && (
          <motion.aside
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[118px] z-30 w-[250px] -translate-x-1/2 border border-white/10 bg-[#111114]/95 px-3.5 py-2 text-left shadow-[0_14px_38px_rgba(0,0,0,0.5)] backdrop-blur-md sm:left-auto sm:right-[calc(100%+16px)] sm:top-0 sm:translate-x-0"
            aria-live="polite"
          >
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Reading the timeline
              </span>
              <button
                type="button"
                onClick={dismissTutorial}
                className="border-0 bg-transparent p-0 text-[8px] uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:text-white focus:outline-none"
              >
                Dismiss
              </button>
            </div>

            <div className="mb-1.5 flex items-center">
              {TUTORIAL_STEPS.map((step, index) => (
                <div key={step.year} className="flex flex-1 items-center last:flex-none">
                  <motion.div
                    animate={{
                      backgroundColor: index === tutorialStep ? '#f5f4f7' : '#3f3f46',
                      color: index === tutorialStep ? '#09090b' : '#a1a1aa',
                      scale: index === tutorialStep ? 1.08 : 1,
                    }}
                    className="flex h-6 w-8 items-center justify-center rounded-full text-[7px] font-bold"
                  >
                    {step.year}
                  </motion.div>
                  {index < TUTORIAL_STEPS.length - 1 && (
                    <div className="mx-1 h-px flex-1 bg-zinc-700" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-[11px] font-medium text-zinc-100">
              {TUTORIAL_STEPS[tutorialStep].year}
            </div>
            <div className="mt-0.5 text-[9px] text-zinc-500">
              {TUTORIAL_STEPS[tutorialStep].position}
            </div>
            <p className="mt-1 text-[8px] leading-[1.4] text-zinc-400">
              Each quadrant is one year. Click one or several to focus the map; click again to remove.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
