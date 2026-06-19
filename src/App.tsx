import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PageNavigation, { type PageId } from './components/PageNavigation';
import CountryGlyphPage from './pages/CountryGlyphPage';
import KeyInsightsPage from './pages/KeyInsightsPage';
import OpeningPage from './pages/OpeningPage';

export default function App() {
  const getPageFromHash = (): PageId => {
    const page = window.location.hash.replace('#', '');
    return page === 'countries' || page === 'insights' ? page : 'opening';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page;
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-black">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          {activePage === 'opening' && <OpeningPage />}
          {activePage === 'countries' && <CountryGlyphPage />}
          {activePage === 'insights' && <KeyInsightsPage />}
        </motion.div>
      </AnimatePresence>

      <PageNavigation activePage={activePage} onChange={changePage} />
    </div>
  );
}
