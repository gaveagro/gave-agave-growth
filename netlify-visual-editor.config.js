
export default {
  // Configuración simplificada para compatibilidad
  framework: 'react',
  
  // Configuraciones de contenido
  collections: [
    {
      name: 'hero',
      label: 'Hero Section',
      file: 'public/content/hero.json',
      fields: [
        {
          name: 'es',
          label: 'Contenido en Español',
          widget: 'object',
          fields: [
            { name: 'mainTitle', label: 'Título Principal', widget: 'string' },
            { name: 'subtitle', label: 'Subtítulo', widget: 'string' },
            { name: 'description', label: 'Descripción', widget: 'text' },
            { name: 'mission', label: 'Misión', widget: 'string' },
            { name: 'formTitle', label: 'Título del Formulario', widget: 'string' },
            { name: 'emailPlaceholder', label: 'Placeholder del Email', widget: 'string' },
            { name: 'getStarted', label: 'Botón Comenzar', widget: 'string' },
            { name: 'joinText', label: 'Texto de Unirse', widget: 'text' },
            { name: 'thankYou', label: 'Gracias', widget: 'string' },
            { name: 'thankYouText', label: 'Texto de Gracias', widget: 'text' }
          ]
        },
        {
          name: 'en',
          label: 'English Content',
          widget: 'object',
          fields: [
            { name: 'mainTitle', label: 'Main Title', widget: 'string' },
            { name: 'subtitle', label: 'Subtitle', widget: 'string' },
            { name: 'description', label: 'Description', widget: 'text' },
            { name: 'mission', label: 'Mission', widget: 'string' },
            { name: 'formTitle', label: 'Form Title', widget: 'string' },
            { name: 'emailPlaceholder', label: 'Email Placeholder', widget: 'string' },
            { name: 'getStarted', label: 'Get Started Button', widget: 'string' },
            { name: 'joinText', label: 'Join Text', widget: 'text' },
            { name: 'thankYou', label: 'Thank You', widget: 'string' },
            { name: 'thankYouText', label: 'Thank You Text', widget: 'text' }
          ]
        },
        { name: 'backgroundImage', label: 'Imagen de Fondo', widget: 'image' }
      ]
    }
  ],

  // Configuración de medios
  media_folder: 'public/images',
  public_folder: '/images',

  // Backend
  backend: {
    name: 'git-gateway',
    branch: 'main'
  }
};
