
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
        const response = await fetch(`/content/${contentFile}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
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
        // In a real implementation, this would fetch from your content directory
        // For now, we'll use the existing static data but make it CMS-ready
        const staticPosts = [
          {
            id: 1,
            title_en: "The Future of Sustainable Agriculture: Why Agave is Leading the Way",
            title_es: "El Futuro de la Agricultura Sustentable: Por qué el Agave Lidera el Camino",
            excerpt_en: "Discover how agave cultivation is revolutionizing sustainable agriculture while providing exceptional returns for investors.",
            excerpt_es: "Descubre cómo el cultivo de agave está revolucionando la agricultura sustentable mientras proporciona retornos excepcionales para los inversionistas.",
            author_en: "Gavé Research Team",
            author_es: "Equipo de Investigación Gavé",
            date: "2024-03-15",
            category_en: "Research",
            category_es: "Investigación",
            image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop&crop=center",
            published: true
          },
          {
            id: 2,
            title_en: "Carbon Sequestration in Agave: Measuring Our Environmental Impact",
            title_es: "Captura de Carbono en Agave: Midiendo Nuestro Impacto Ambiental",
            excerpt_en: "Learn about our latest findings on carbon sequestration rates in our agave plantations and their contribution to climate action.",
            excerpt_es: "Conoce nuestros últimos hallazgos sobre las tasas de captura de carbono en nuestras plantaciones de agave y su contribución a la acción climática.",
            author_en: "Dr. María González",
            author_es: "Dra. María González",
            date: "2024-03-10",
            category_en: "Impact Report",
            category_es: "Reporte de Impacto",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&crop=center",
            published: true
          },
          {
            id: 3,
            title_en: "Community Development in San Luis Potosí: 5 Years of Progress",
            title_es: "Desarrollo Comunitario en San Luis Potosí: 5 Años de Progreso",
            excerpt_en: "A comprehensive look at how our operations have transformed local communities through sustainable employment and training programs.",
            excerpt_es: "Una mirada integral a cómo nuestras operaciones han transformado las comunidades locales a través de empleo sustentable y programas de capacitación.",
            author_en: "Carlos Mendoza",
            author_es: "Carlos Mendoza",
            date: "2024-03-05",
            category_en: "Community",
            category_es: "Comunidad",
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop&crop=center",
            published: true
          }
        ];
        setPosts(staticPosts);
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
