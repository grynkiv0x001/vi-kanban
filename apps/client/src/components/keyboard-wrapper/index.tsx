import { type ReactNode, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setViMode } from '@/store/features/vi';

export const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      'i': () => dispatch(setViMode('insert')),
      'Escape': () => dispatch(setViMode('normal')),
    };

    const action = actions[e.key];

    if (action) {
      action();
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return children;
};
