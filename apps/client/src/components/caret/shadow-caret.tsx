import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { ThemeProvider } from '@/components/theme-provider';

import { Caret } from './caret';

export const ShadowCaret = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    if (!shadowContainerRef.current) {
      shadowContainerRef.current = document.createElement('div');
      shadowRoot.appendChild(shadowContainerRef.current);

      const emotionCache = createCache({
        key: 'shadow-caret',
        container: shadowContainerRef.current,
      });

      const root = createRoot(shadowContainerRef.current);

      root.render(
        <Provider store={store}>
          <ThemeProvider>
            <CacheProvider value={emotionCache}>
              <Caret />
            </CacheProvider>,
          </ThemeProvider>
        </Provider>,
      );
    }

    return () => {
      if (shadowContainerRef.current) {
        shadowContainerRef.current.innerHTML = '';
      }

      shadowContainerRef.current = null;
    };
  }, []);

  return <div ref={hostRef} id="shadow-vi-caret" style={{ height: 0 }} />;
};
