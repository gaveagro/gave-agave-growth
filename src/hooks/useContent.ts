import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

interface ContentData {
  [key: string]: any;
}

export const useContent = (contentFile: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Try to fetch from public/content first, then fallback to src/content
        let response;
        try {
          response = await fetch(`/content/${contentFile}.json`);
        } catch {
          response = await fetch(`/src/content/${contentFile}.json`);
        }
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Set fallback content to prevent crashes
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentFile]);

  return { content, loading, error };
};

const slugify = (filename: string) =>
  filename
    .replace(/\.md$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 90);

const normalizePost = (filename: string, raw: string) => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return null;

  const [, frontmatter, body] = match;
  let data: any = {};
  try {
    data = (yaml.load(frontmatter) as any) || {};
  } catch (err) {
    console.warn(`Invalid frontmatter in ${filename}:`, err);
    return null;
  }

  const published = data.published !== false && data.published !== 'false';
  if (!published) return null;

  return {
    id: slugify(filename),
    file: filename,
    title_en: data.title_en || data.title || 'Untitled',
    title_es: data.title_es || data.title || 'Sin título',
    excerpt_en: data.excerpt_en || data.excerpt || '',
    excerpt_es: data.excerpt_es || data.excerpt || '',
    body_en: data.body_en || body || '',
    body_es: data.body_es || body || '',
    author_en: data.author_en || data.author || 'Gavé Team',
    author_es: data.author_es || data.author || 'Equipo Gavé',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category_en: data.category_en || data.category || 'Regenerative agriculture',
    category_es: data.category_es || data.category || 'Agricultura regenerativa',
    image: data.image || data.featured_image || '/images/farm1-min.jpg',
    published: true,
  };
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadBlogPosts = async () => {
      try {
        setLoading(true);

        let mdFiles: string[] = [];
        const idxRes = await fetch('/content/blog/index.json', { cache: 'no-cache' });
        if (idxRes.ok) {
          const list = await idxRes.json();
          const arr = Array.isArray(list) ? list : Array.isArray(list?.files) ? list.files : [];
          mdFiles = arr.filter((name: string) => typeof name === 'string' && name.endsWith('.md'));
        }

        const results = await Promise.all(
          mdFiles.map(async (filename) => {
            try {
              const res = await fetch(`/content/blog/${encodeURIComponent(filename)}`);
              if (!res.ok) return null;
              const text = await res.text();
              return normalizePost(filename, text);
            } catch (err) {
              console.warn(`Failed to load ${filename}:`, err);
              return null;
            }
          })
        );

        const loadedPosts = results.filter(Boolean) as any[];
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (!cancelled) {
          setPosts(loadedPosts);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadBlogPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
};
