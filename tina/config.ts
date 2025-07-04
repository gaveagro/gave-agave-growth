
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "cab0220c-8e88-48d6-b22f-6e0bd364734b",
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "hero",
        label: "Página Principal",
        path: "public/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "hero",
        },
        fields: [
          {
            type: "object",
            name: "es",
            label: "Contenido en Español",
            fields: [
              {
                type: "string",
                name: "mainTitle",
                label: "Título Principal",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtítulo",
              },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "mission",
                label: "Misión",
              },
              {
                type: "string",
                name: "formTitle",
                label: "Título del Formulario",
              },
              {
                type: "string",
                name: "emailPlaceholder",
                label: "Placeholder del Email",
              },
              {
                type: "string",
                name: "getStarted",
                label: "Botón Comenzar",
              },
              {
                type: "string",
                name: "joinText",
                label: "Texto de Unirse",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "thankYou",
                label: "Mensaje de Gracias",
              },
              {
                type: "string",
                name: "thankYouText",
                label: "Texto de Gracias",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "en",
            label: "Contenido en Inglés",
            fields: [
              {
                type: "string",
                name: "mainTitle",
                label: "Título Principal",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtítulo",
              },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "mission",
                label: "Misión",
              },
              {
                type: "string",
                name: "formTitle",
                label: "Título del Formulario",
              },
              {
                type: "string",
                name: "emailPlaceholder",
                label: "Placeholder del Email",
              },
              {
                type: "string",
                name: "getStarted",
                label: "Botón Comenzar",
              },
              {
                type: "string",
                name: "joinText",
                label: "Texto de Unirse",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "thankYou",
                label: "Mensaje de Gracias",
              },
              {
                type: "string",
                name: "thankYouText",
                label: "Texto de Gracias",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "image",
            name: "backgroundImage",
            label: "Imagen de Fondo",
          },
        ],
      },
      {
        name: "site_settings",
        label: "Configuración del Sitio",
        path: "public/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "site-settings",
        },
        fields: [
          {
            type: "string",
            name: "title_es",
            label: "Título en Español",
          },
          {
            type: "string",
            name: "title_en",
            label: "Título en Inglés",
          },
          {
            type: "string",
            name: "description_es",
            label: "Descripción en Español",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "description_en",
            label: "Descripción en Inglés",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "contact_email",
            label: "Email de Contacto",
          },
          {
            type: "string",
            name: "phone",
            label: "Teléfono",
          },
        ],
      },
      {
        name: "blog",
        label: "Artículos de Blog",
        path: "public/content/blog",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title_en",
            label: "Título (Inglés)",
            required: true,
          },
          {
            type: "string",
            name: "title_es",
            label: "Título (Español)",
            required: true,
          },
          {
            type: "string",
            name: "excerpt_en",
            label: "Extracto (Inglés)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "excerpt_es",
            label: "Extracto (Español)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body_en",
            label: "Contenido (Inglés)",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "body_es",
            label: "Contenido (Español)",
            isBody: true,
          },
          {
            type: "string",
            name: "author_en",
            label: "Autor (Inglés)",
          },
          {
            type: "string",
            name: "author_es",
            label: "Autor (Español)",
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha",
            required: true,
          },
          {
            type: "string",
            name: "category_en",
            label: "Categoría (Inglés)",
          },
          {
            type: "string",
            name: "category_es",
            label: "Categoría (Español)",
          },
          {
            type: "image",
            name: "image",
            label: "Imagen Destacada",
          },
          {
            type: "boolean",
            name: "published",
            label: "Publicado",
          },
        ],
      },
    ],
  },
});
