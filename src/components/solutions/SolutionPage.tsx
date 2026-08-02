import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FinalCTA from '@/components/home/FinalCTA';
import { Reveal } from '@/components/motion/Reveal';
import { motion, useReducedMotion } from 'motion/react';

export interface SolutionBlock {
  title: string;
  body: string;
  bullets?: string[];
}

interface SolutionPageProps {
  seo: { title: string; description: string; canonical: string; jsonLd?: object };
  image: string;
  eyebrow: string;
  title: string;
  lead: string;
  stats?: { value: string; label: string }[];
  blocks: SolutionBlock[];
  children?: ReactNode;
}

const SolutionPage = ({ seo, image, eyebrow, title, lead, stats, blocks, children }: SolutionPageProps) => {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      <SEO {...seo} />
      <Header />

      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink-deep pt-24">
        <div className="absolute inset-0">
          <img src={image} alt={title} className="h-full w-full object-cover" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/75 to-ink-deep/25" />
        </div>
        <div className="container relative z-10 mx-auto pb-16 pt-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow text-paper/70">
              <span className="inline-block h-1.5 w-1.5 bg-accent" />
              {eyebrow}
            </p>
            <h1 className="display-xl mt-6 text-paper">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-paper/75">{lead}</p>
          </motion.div>
        </div>
      </section>

      {stats && stats.length > 0 && (
        <section className="border-b border-border bg-paper-deep">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-border px-2 py-8 md:border-b-0 md:px-8">
                  <p className="stat-num text-ink">{s.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="container mx-auto">
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.08}>
                <article className="border-t border-ink/20 pt-6">
                  <p className="font-display text-sm text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">{b.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{b.body}</p>
                  {b.bullets && (
                    <ul className="mt-5 space-y-2">
                      {b.bullets.map((x) => (
                        <li key={x} className="flex gap-3 text-sm text-ink/80">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-accent" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {children}

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default SolutionPage;
