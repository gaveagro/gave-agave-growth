
export default {
  // Framework configuration
  framework: {
    name: 'react',
    build: {
      command: 'npm run build',
      output: 'dist'
    }
  },

  // Content collections for Visual Editor
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          name: 'hero',
          label: 'Hero Section',
          file: 'public/content/hero.json',
          fields: [
            {
              name: 'es',
              label: 'Spanish Content',
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
            { name: 'backgroundImage', label: 'Background Image', widget: 'image' }
          ]
        },
        {
          name: 'faq',
          label: 'FAQ Section',
          file: 'public/content/faq.json',
          fields: [
            {
              name: 'es',
              label: 'Spanish Content',
              widget: 'object',
              fields: [
                { name: 'title', label: 'Title', widget: 'string' },
                { name: 'subtitle', label: 'Subtitle', widget: 'string' },
                { name: 'stillHaveQuestions', label: 'Still Have Questions', widget: 'string' },
                { name: 'contactTeam', label: 'Contact Team', widget: 'string' },
                {
                  name: 'faqs',
                  label: 'FAQs',
                  widget: 'list',
                  fields: [
                    { name: 'question', label: 'Question', widget: 'string' },
                    { name: 'answer', label: 'Answer', widget: 'text' }
                  ]
                }
              ]
            },
            {
              name: 'en',
              label: 'English Content',
              widget: 'object',
              fields: [
                { name: 'title', label: 'Title', widget: 'string' },
                { name: 'subtitle', label: 'Subtitle', widget: 'string' },
                { name: 'stillHaveQuestions', label: 'Still Have Questions', widget: 'string' },
                { name: 'contactTeam', label: 'Contact Team', widget: 'string' },
                {
                  name: 'faqs',
                  label: 'FAQs',
                  widget: 'list',
                  fields: [
                    { name: 'question', label: 'Question', widget: 'string' },
                    { name: 'answer', label: 'Answer', widget: 'text' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'blog',
      label: 'Blog Posts',
      folder: 'public/content/blog',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      editor: {
        preview: true
      },
      fields: [
        { name: 'title_en', label: 'Title (English)', widget: 'string' },
        { name: 'title_es', label: 'Title (Spanish)', widget: 'string' },
        { name: 'excerpt_en', label: 'Excerpt (English)', widget: 'text' },
        { name: 'excerpt_es', label: 'Excerpt (Spanish)', widget: 'text' },
        { name: 'body_en', label: 'Content (English)', widget: 'markdown' },
        { name: 'body_es', label: 'Content (Spanish)', widget: 'markdown' },
        { name: 'author_en', label: 'Author (English)', widget: 'string' },
        { name: 'author_es', label: 'Author (Spanish)', widget: 'string' },
        { name: 'date', label: 'Date', widget: 'datetime' },
        { name: 'category_en', label: 'Category (English)', widget: 'string' },
        { name: 'category_es', label: 'Category (Spanish)', widget: 'string' },
        { name: 'image', label: 'Featured Image', widget: 'image' },
        { name: 'published', label: 'Published', widget: 'boolean', default: false }
      ]
    }
  ],

  // Media settings
  media: {
    folder: 'public/images',
    public_folder: '/images'
  },

  // Development settings
  local_backend: true,
  
  // Site URL for preview
  site_url: 'https://gaveagtech.netlify.app',
  
  // Display URL for CMS
  display_url: 'https://gaveagtech.netlify.app'
};
