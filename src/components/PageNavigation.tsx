import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PageId = 'opening' | 'countries' | 'insights';

type PageNavigationProps = {
  activePage: PageId;
  onChange: (page: PageId) => void;
};

const PAGES: Array<{ id: PageId; label: string }> = [
  { id: 'opening', label: 'Global view' },
  { id: 'countries', label: 'Country glyphs' },
  { id: 'insights', label: 'Key insights' },
];

export default function PageNavigation({ activePage, onChange }: PageNavigationProps) {
  const activeIndex = PAGES.findIndex((page) => page.id === activePage);
  const previousPage = PAGES[activeIndex - 1];
  const nextPage = PAGES[activeIndex + 1];

  return (
    <nav
      className="fixed bottom-3 right-3 z-[100] flex max-w-[calc(100vw-24px)] items-center gap-1 overflow-hidden rounded-full border border-white/10 bg-black/80 px-1.5 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:bottom-4 sm:right-4 sm:max-w-none"
      aria-label="Story pages"
    >
      <button
        type="button"
        onClick={() => previousPage && onChange(previousPage.id)}
        disabled={!previousPage}
        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-20 focus:outline-none"
        aria-label={previousPage ? `Previous: ${previousPage.label}` : 'No previous page'}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-1 px-1">
        {PAGES.map((page, index) => {
          const isActive = page.id === activePage;

          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onChange(page.id)}
              className={`group flex h-7 items-center gap-2 rounded-full px-2.5 text-[8px] uppercase tracking-[0.12em] transition focus:outline-none ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="font-mono text-[7px] opacity-60">0{index + 1}</span>
              <span className={isActive ? 'inline' : 'hidden sm:inline'}>{page.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => nextPage && onChange(nextPage.id)}
        disabled={!nextPage}
        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-20 focus:outline-none"
        aria-label={nextPage ? `Next: ${nextPage.label}` : 'No next page'}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
