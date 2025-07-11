
import { useState, useEffect } from 'react';

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

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const blogDir = '/content/blog/';
        
        // Try to load posts from Netlify CMS created files
        const postFiles = [
          '2025-07-09-map-author_es-prueba-body_en-prueba-excerpt_en-prueba-category_en-prueba-body_es-prueba-excerpt_es-prueba-published-true-date-wed-jul-09-2025-06-45-00-gmt-0600-hora-estándar-central-category_es-pruebta-1.md',
          '2025-07-09-map-author_es-prueba-body_en-prueba-excerpt_en-prueba-category_en-prueba-body_es-prueba-excerpt_es-prueba-published-true-date-wed-jul-09-2025-06-45-00-gmt-0600-hora-estándar-central-category_es-pruebta.md'
        ];
        
        const loadedPosts = [];
        
        for (const filename of postFiles) {
          try {
            const response = await fetch(`${blogDir}${filename}`);
            if (response.ok) {
              let post;
              
              if (filename.endsWith('.md')) {
                // Parse markdown frontmatter for Netlify CMS posts
                const text = await response.text();
                const frontmatterMatch = text.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
                
                if (frontmatterMatch) {
                  const [, frontmatter, content] = frontmatterMatch;
                  
                  // Parse YAML-like frontmatter
                  const frontmatterObj: any = {};
                  frontmatter.split('\n').forEach(line => {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length) {
                      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                      frontmatterObj[key.trim()] = value;
                    }
                  });
                  
                  post = {
                    id: filename.replace('.md', ''),
                    title_en: frontmatterObj.title_en || 'Untitled',
                    title_es: frontmatterObj.title_es || 'Sin título',
                    excerpt_en: frontmatterObj.excerpt_en || '',
                    excerpt_es: frontmatterObj.excerpt_es || '',
                    body_en: frontmatterObj.body_en || content,
                    body_es: frontmatterObj.body_es || content,
                    author_en: frontmatterObj.author_en || 'Unknown',
                    author_es: frontmatterObj.author_es || 'Desconocido',
                    date: frontmatterObj.date || new Date().toISOString(),
                    category_en: frontmatterObj.category_en || 'General',
                    category_es: frontmatterObj.category_es || 'General',
                    image: frontmatterObj.image || '/images/farm1-min.jpg',
                    published: frontmatterObj.published === 'true' || frontmatterObj.published === true
                  };
                }
              }
              
              if (post && post.published !== false) {
                loadedPosts.push(post);
              }
            }
          } catch (err) {
            console.warn(`Failed to load ${filename}:`, err);
          }
        }
        
        // Sort by date (newest first)
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { posts, loading, error };
};
