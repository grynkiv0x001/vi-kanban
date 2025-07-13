import { type ReactNode, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { setViMode, setCaretPosition } from '@/store/features/vi';

export const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mode, caretPosition, viElements } = useAppSelector(state => state.vi);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      'i': () => dispatch(setViMode('insert')),
      'Escape': () => dispatch(setViMode('normal')),
      ':': () => mode !== 'insert' && dispatch(setViMode('command')),
      'h': () => dispatch(setCaretPosition({
        elementIndex: caretPosition.elementIndex - 1,
        elementId: viElements.find((element) => element.index === caretPosition.elementIndex - 1)?.id,
      })),
      'l': () => dispatch(setCaretPosition({
        elementIndex: caretPosition.elementIndex + 1,
        elementId: viElements.find((element) => element.index === caretPosition.elementIndex + 1)?.id,
      })),
    };

    const action = actions[e.key];

    if (action) {
      action();
    }
  }, [caretPosition.elementIndex, dispatch, mode, viElements]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return children;
};
