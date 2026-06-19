import { motion } from 'motion/react';
import InsightCard, { type InsightCardProps } from '../components/InsightCard';

const insightCards: InsightCardProps[] = [
  {
    index: '01',
    title: 'Highest GHI burden in 2021',
    imageSrc: '/images/key-insights/visualisation_1_highest_hunger_2021.png',
    description:
      'The highest-burden countries remain clustered in serious, alarming, or extremely alarming ranges.',
    alt: 'Bar chart showing countries with highest Global Hunger Index in 2021',
  },
  {
    index: '02',
    title: 'GHI decreases as GDP rises',
    imageSrc: '/images/key-insights/visualisation_2_gdp_vs_ghi_2021.png',
    description:
      'The scatterplot shows a strong negative association between GDP per capita and GHI, while still leaving room for country-specific context.',
    alt: 'Scatterplot showing Global Hunger Index decreasing as GDP per capita rises',
  },
  {
    index: '03',
    title: 'Largest reductions since 2000',
    imageSrc: '/images/key-insights/visualisation_3_largest_ghi_reductions.png',
    description:
      'Progress is possible: several countries reduced GHI substantially between 2000 and 2021.',
    alt: 'Bar chart showing largest Global Hunger Index reductions from 2000 to 2021',
  },
];

export default function KeyInsightsPage() {
  return (
    <section className="h-[100dvh] w-full max-w-full overflow-x-hidden overflow-y-auto bg-[#030303] text-white custom-scrollbar">
      <div className="mx-auto flex min-h-full w-full min-w-0 max-w-[1800px] flex-col overflow-x-hidden pb-20 pt-5 lg:pb-16 lg:pt-6">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mx-5 grid min-w-0 shrink-0 gap-3 border-b border-red-900/45 pb-4 sm:mx-8 md:grid-cols-[minmax(280px,0.75fr)_minmax(420px,1.25fr)] md:items-end lg:mx-10 lg:gap-10"
        >
          <div>
            <p className="mb-2 font-mono text-[8px] font-semibold uppercase tracking-[0.24em] text-red-500 sm:text-[9px]">
              Supporting Evidence
            </p>
            <h1 className="text-[40px] font-semibold leading-none tracking-[-0.055em] sm:text-[52px] lg:text-[60px]">
              Key Insights
            </h1>
          </div>

          <p className="max-w-3xl text-[11px] leading-[1.55] text-zinc-500 sm:text-[12px] lg:text-[13px]">
            These simpler static charts support the interactive app by showing the main analytical
            patterns directly: highest 2021 hunger burden, the relationship between income and hunger,
            and the countries with the largest reductions over time.
          </p>
        </motion.header>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
          initial="hidden"
          animate="visible"
          className="mx-5 grid min-w-0 flex-1 grid-cols-1 gap-8 pt-5 sm:mx-8 md:grid-cols-2 lg:mx-10 lg:min-h-0 lg:grid-cols-3 lg:gap-5 xl:gap-7"
        >
          {insightCards.map((card) => (
            <div key={card.index} className="contents">
              <InsightCard
                index={card.index}
                title={card.title}
                imageSrc={card.imageSrc}
                description={card.description}
                alt={card.alt}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
