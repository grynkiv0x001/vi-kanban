import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/store.ts';
import { setViElements } from '@/store/features/vi';

export const useViAutoIndexing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const assignIndexes = () => {
      const items = Array.from(document.querySelectorAll('[data-vi="on"]'));

      const viElements = items.map((el, index) => {
        let id = el.getAttribute('data-vi-id');

        if (!id) {
          id = `vi-${crypto.randomUUID()}`;
          el.setAttribute('data-vi-id', id);
        }

        el.setAttribute('data-vi-index', String(index));

        const rect = el.getBoundingClientRect();

        return {
          id,
          index,
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        };
      });

      dispatch(setViElements(viElements));
    };

    assignIndexes();

    const observer = new MutationObserver(() => {
      assignIndexes();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [dispatch]);
};
