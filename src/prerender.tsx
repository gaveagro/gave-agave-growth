import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

type HeadElement = { type: string; props: Record<string, unknown> };

const toHeadElements = (nodes: any[]): HeadElement[] =>
  nodes
    .filter(Boolean)
    .map((n) => ({ type: n.type as string, props: { ...(n.props ?? {}) } }))
    .filter((n) => typeof n.type === 'string');

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
