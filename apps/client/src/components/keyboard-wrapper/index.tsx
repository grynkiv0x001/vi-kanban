import { type ReactNode, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { setViMode, setCaretPosition, type ViElement } from '@/store/features/vi';

export const Directions = {
  H: 'h',
  J: 'j',
  K: 'k',
  L: 'l',
} as const;

export type Direction = typeof Directions[keyof typeof Directions];

const moveCaret = (
  viElements: ViElement[][],
  current: { row: number; col: number },
  direction: Direction,
): { row: number; col: number; elementId: string } | null => {
  let row = current.row;
  let col = current.col;

  switch (direction) {
  case Directions.H:
    col--;
    break;
  case Directions.J:
    row++;
    break;
  case Directions.K:
    row--;
    break;
  case Directions.L:
    col++;
    break;
  }

  if (row < 0 || row >= viElements.length) {
    return null;
  }

  const targetRow = viElements[row];
  const clampedCol = Math.min(col, targetRow.length - 1);

  if (clampedCol < 0) return null;

  const element = targetRow[clampedCol];

  return {
    row,
    col: clampedCol,
    elementId: element.id,
  };
};

export const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mode, caretPosition, viElements, enabled } = useAppSelector(state => state.vi);

  const move = useCallback((direction: Direction) => {
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
      'i': () => {
        if (mode === 'insert') {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        dispatch(setViMode('insert'));
      },
      'Escape': () => dispatch(setViMode('normal')),
      'Enter': () => dispatch(setViMode('insert')),
      ':': () => mode !== 'insert' && dispatch(setViMode('command')),
      'h': () => move(Directions.H),
      'j': () => move(Directions.J),
      'k': () => move(Directions.K),
      'l': () => move(Directions.L),
    };

    const action = actions[e.key];

    if (action) {
      action();
    }
  }, [dispatch, move, mode]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard, enabled]);

  return children;
};
