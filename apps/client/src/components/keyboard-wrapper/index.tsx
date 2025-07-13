import { type ReactNode, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { setViMode, setCaretPosition, type ViElement } from '@/store/features/vi';

const moveCaret = (
  viElements: ViElement[][],
  current: { row: number; col: number },
  direction: 'h' | 'j' | 'k' | 'l',
): { row: number; col: number; elementId: string } | null => {
  let row = current.row;
  let col = current.col;

  if (direction === 'h') col--;
  if (direction === 'l') col++;
  if (direction === 'j') row++;
  if (direction === 'k') row--;

  if (
    row >= 0 &&
    row < viElements.length &&
    col >= 0 &&
    col < viElements[row].length
  ) {
    const element = viElements[row][col];
    return { row, col, elementId: element.id };
  }

  return null;
};

export const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mode, caretPosition, viElements } = useAppSelector(state => state.vi);

  const move = useCallback((direction: 'h' | 'j' | 'k' | 'l') => {
    if (mode === 'insert' || mode === 'command') {
      return;
    }

    const newPosition = moveCaret(viElements, caretPosition, direction);

    if (newPosition) {
      dispatch(setCaretPosition(newPosition));
    }
  }, [viElements, caretPosition, mode, dispatch]);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      'i': () => dispatch(setViMode('insert')),
      'Escape': () => dispatch(setViMode('normal')),
      ':': () => mode !== 'insert' && dispatch(setViMode('command')),
      'h': () => move('h'),
      'j': () => move('j'),
      'k': () => move('k'),
      'l': () => move('l'),
    };

    const action = actions[e.key];

    if (action) {
      action();
    }
  }, [dispatch, move, mode]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return children;
};
