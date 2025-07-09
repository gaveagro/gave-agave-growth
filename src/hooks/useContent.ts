
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
        // In a real implementation, this would fetch from your CMS
        // For now, we'll return an empty array to remove test posts
        setPosts([]);
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
