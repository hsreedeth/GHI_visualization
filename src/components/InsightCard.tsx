import { useState } from 'react';
import { motion } from 'motion/react';

export type InsightCardProps = {
  index: string;
  title: string;
  imageSrc: string;
  description: string;
  alt: string;
};

export default function InsightCard({
  index,
  title,
  imageSrc,
  description,
  alt,
}: InsightCardProps) {
  const [imageError, setImageError] = useState(false);
  const isDevelopmentHost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group flex w-[calc(100vw-40px)] min-w-0 max-w-full flex-col overflow-hidden border-t border-red-900/60 pt-3 sm:w-auto"
      aria-labelledby={`insight-title-${index}`}
    >
      <div className="mb-2 flex items-start gap-3">
        <span className="mt-1 shrink-0 font-mono text-[8px] uppercase tracking-[0.18em] text-red-500">
          Insight {index}
        </span>
        <h2
          id={`insight-title-${index}`}
          className="text-[15px] font-semibold leading-tight tracking-[-0.02em] text-white lg:text-[17px] xl:text-[19px]"
        >
          {title}
        </h2>
      </div>

      <div className="relative flex aspect-[2297/1540] w-full min-w-0 items-center justify-center overflow-hidden border border-white/[0.08] bg-[#0a0a0a] p-2 transition-colors duration-300 group-hover:border-red-800/45 sm:p-3">
        {imageError ? (
          <div className="flex aspect-[1.49/1] w-full flex-col items-center justify-center px-4 text-center">
            <p className="text-xs text-zinc-400">Static visualisation image missing</p>
            {isDevelopmentHost && (
              <code className="mt-2 break-all font-mono text-[8px] text-zinc-600">{imageSrc}</code>
            )}
          </div>
        ) : (
          <motion.img
            src={imageSrc}
            alt={alt}
            onError={() => setImageError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="block h-full w-full max-w-full object-contain transition-[filter] duration-300 group-hover:brightness-[1.03]"
          />
        )}
      </div>

      <p className="mt-2.5 min-h-[3.2em] text-[10px] leading-[1.5] text-zinc-500 sm:text-[11px] lg:text-[12px]">
        {description}
      </p>
    </motion.article>
  );
}
