import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

type HeadElement = { type: string; props: Record<string, unknown> };

const toHeadElements = (nodes: any[]): HeadElement[] =>
  nodes
    .filter((n) => n && typeof n.type === 'string')
    .map((n) => {
      const props: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(n.props ?? {})) {
        if (value == null || key === 'key') continue;
        if (key === 'dangerouslySetInnerHTML') {
          props.children = (value as any).__html ?? '';
        } else if (key === 'children') {
          props.children = typeof value === 'string' ? value : String(value);
        } else if (typeof value === 'object') {
          continue;
        } else {
          props[key] = String(value);
        }
      }
      return { type: n.type as string, props };
    });

export async function prerender(data: { url: string }) {
  const helmetContext: any = {};
  const url = data?.url || '/';

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const elements = new Set<HeadElement>();
  let title = '';

  if (helmet) {
    const titleNodes = helmet.title.toComponent();
    const titleNode = Array.isArray(titleNodes) ? titleNodes[0] : titleNodes;
    title = titleNode?.props?.children ?? '';
    for (const el of toHeadElements([
      ...helmet.meta.toComponent(),
      ...helmet.link.toComponent(),
      ...helmet.script.toComponent(),
    ])) {
      elements.add(el);
    }
  }

  return {
    html,
    head: {
      lang: 'es',
      title,
      elements,
    },
  };
}
