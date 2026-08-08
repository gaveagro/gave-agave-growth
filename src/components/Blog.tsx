import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import { useBlogPosts } from '@/hooks/useContent';

const Blog = () => {
  const language = useLanguage();
  const en = language === 'EN';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { posts, loading, error } = useBlogPosts();

  const copy = en
    ? {
        eyebrow: 'Field notes',
        title: 'Notes on agave, drylands and regeneration',
        subtitle:
          'Research, field data and analysis from our plots in San Luis Potosí and the wider dryland restoration space.',
        readMore: 'Read',
        search: 'Search articles…',
        allCategories: 'All categories',
        noResults: 'No articles match your search.',
        loading: 'Loading articles…',
        error: 'We could not load the articles.',
      }
    : {
        eyebrow: 'Notas de campo',
        title: 'Notas sobre agave, tierras secas y regeneración',
        subtitle:
          'Investigación, datos de campo y análisis desde nuestras parcelas en San Luis Potosí y el ecosistema de restauración de tierras áridas.',
        readMore: 'Leer',
        search: 'Buscar artículos…',
        allCategories: 'Todas las categorías',
        noResults: 'No se encontraron artículos que coincidan con tu búsqueda.',
        loading: 'Cargando artículos…',
        error: 'No pudimos cargar los artículos.',
      };

  const categoriesOf = (post: any): string[] =>
    String(en ? post.category_en : post.category_es)
      .split(',')
      .map((c: string) => c.trim())
      .filter(Boolean);

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap(categoriesOf))).sort(),
    [posts, language],
  );

  const filteredPosts = posts.filter((post) => {
    const title = String(en ? post.title_en : post.title_es);
    const excerpt = String(en ? post.excerpt_en : post.excerpt_es);
    const term = searchTerm.trim().toLowerCase();

    const matchesSearch =
      term === '' || title.toLowerCase().includes(term) || excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'all' || categoriesOf(post).includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(en ? 'en-US' : 'es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <section id="blog" className="section-pad bg-background">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="display-lg mt-4 max-w-3xl text-ink">{copy.title}</h2>
          <p className="lead mt-5 max-w-2xl">{copy.subtitle}</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3 border-y border-border py-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={copy.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-none border border-border bg-background px-3 py-2 text-sm text-ink"
            aria-label={copy.allCategories}
          >
            <option value="all">{copy.allCategories}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="py-16 text-center text-muted-foreground">{copy.loading}</p>
        ) : error ? (
          <p className="py-16 text-center text-muted-foreground">{copy.error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{copy.noResults}</p>
        ) : (
          <div className="mt-4 border-t border-border">
            {filteredPosts.map((post) => (
              <Reveal key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group grid gap-6 border-b border-border py-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-paper-deep">
                    <img
                      src={post.image}
                      alt={en ? post.title_en : post.title_es}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <span>{formatDate(post.date)}</span>
                      {categoriesOf(post).map((c) => (
                        <span key={c}>{c}</span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">
                      {en ? post.title_en : post.title_es}
                    </h3>
                    <p className="mt-3 max-w-2xl text-muted-foreground">
                      {en ? post.excerpt_en : post.excerpt_es}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      {copy.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
