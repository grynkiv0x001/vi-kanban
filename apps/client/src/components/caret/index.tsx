import { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks';

import * as styles from './caret.styles';

interface IPosition {
  top: number;
  left: number;
}

export const Caret = () => {
  const { caretPosition, mode } = useAppSelector(state => state.vi);
  const [position, setPosition] = useState<IPosition | null>(null);

  useEffect(() => {
    if (caretPosition.elementId) {
      const element = document.querySelector(`[data-vi-id="${caretPosition.elementId}"]`);
      if (!element) return;

      const rect = element.getBoundingClientRect();

      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [caretPosition]);

  return (
    <div
      css={[styles.caret, mode === 'insert' && styles.insert]}
      style={{
        position: 'absolute',
        top: position?.top,
        left: position?.left,
      }}
    />
  );
};
