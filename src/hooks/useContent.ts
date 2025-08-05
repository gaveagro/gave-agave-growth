
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
        const loadedPosts = [];
        
        // Load the sample post from JSON
        try {
          const response = await fetch('/content/blog/sample-post.json');
          if (response.ok) {
            const post = await response.json();
            if (post.published !== false) {
              loadedPosts.push({
                id: 'sample-post',
                ...post
              });
            }
          }
        } catch (err) {
          console.warn('Failed to load sample post:', err);
        }

        // Try to load any .md files created by Netlify CMS
        const possibleMdFiles = [
          '2025-07-11-map-author_es-gavé-agrotecnología-body_en-🇲🇽-méxico-n-nfew-plants-are-as-deeply-intertwined-with-a-countrys-history-as-agave-is-with-mexico-as-the-center-of-origin-of-the-agavaceae-family-mexico-is-home-to-223-of-the-world.md'
        ];
        
        for (const filename of possibleMdFiles) {
          try {
            const response = await fetch(`/content/blog/${filename}`);
            if (response.ok) {
              const text = await response.text();
              const frontmatterMatch = text.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
              
              if (frontmatterMatch) {
                const [, frontmatter, content] = frontmatterMatch;
                
                // Parse YAML-like frontmatter (handle multi-line values)
                const frontmatterObj: any = {};
                const lines = frontmatter.split('\n');
                let currentKey = '';
                let currentValue = '';
                let inMultiLine = false;
                
                lines.forEach(line => {
                  if (line.includes(':') && !inMultiLine) {
                    // Finish previous multi-line value if any
                    if (currentKey && currentValue) {
                      frontmatterObj[currentKey] = currentValue.trim();
                    }
                    
                    const [key, ...valueParts] = line.split(':');
                    currentKey = key.trim();
                    let value = valueParts.join(':').trim();
                    
                    // Check if this is start of multi-line value
                    if (value === '>-' || value === '|-' || value === '>') {
                      inMultiLine = true;
                      currentValue = '';
                    } else {
                      // Single line value
                      if ((value.startsWith('"') && value.endsWith('"')) || 
                          (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                      }
                      frontmatterObj[currentKey] = value;
                      currentKey = '';
                      currentValue = '';
                    }
                  } else if (inMultiLine && line.trim()) {
                    // Continue multi-line value
                    if (currentValue) currentValue += '\n\n';
                    currentValue += line.trim();
                  } else if (inMultiLine && !line.trim() && currentKey) {
                    // End of multi-line value
                    frontmatterObj[currentKey] = currentValue.trim();
                    inMultiLine = false;
                    currentKey = '';
                    currentValue = '';
                  }
                });
                
                // Handle last multi-line value
                if (currentKey && currentValue) {
                  frontmatterObj[currentKey] = currentValue.trim();
                }
                
                const post = {
                  id: filename.replace('.md', ''),
                  title_en: frontmatterObj.title_en || frontmatterObj.title || 'Untitled',
                  title_es: frontmatterObj.title_es || frontmatterObj.title || 'Sin título',
                  excerpt_en: frontmatterObj.excerpt_en || frontmatterObj.excerpt || '',
                  excerpt_es: frontmatterObj.excerpt_es || frontmatterObj.excerpt || '',
                  body_en: frontmatterObj.body_en || content || 'Content not available',
                  body_es: frontmatterObj.body_es || content || 'Contenido no disponible',
                  author_en: frontmatterObj.author_en || frontmatterObj.author || 'Gavé Team',
                  author_es: frontmatterObj.author_es || frontmatterObj.author || 'Equipo Gavé',
                  date: frontmatterObj.date || new Date().toISOString(),
                  category_en: frontmatterObj.category_en || frontmatterObj.category || 'Agriculture',
                  category_es: frontmatterObj.category_es || frontmatterObj.category || 'Agricultura',
                  image: frontmatterObj.image || frontmatterObj.featured_image || '/images/farm1-min.jpg',
                  published: frontmatterObj.published !== false && frontmatterObj.published !== 'false'
                };
                
                if (post.published) {
                  loadedPosts.push(post);
                }
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
