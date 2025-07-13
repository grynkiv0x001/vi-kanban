import { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks';

import * as styles from './caret.styles';

interface IPosition {
  top: number;
  left: number;
  height: number;
}

export const Caret = () => {
  const { caretPosition, mode } = useAppSelector(state => state.vi);
  const [position, setPosition] = useState<IPosition | null>(null);

  useEffect(() => {
    if (caretPosition.elementId && mode !== 'insert') {
      const element = document.querySelector(`[data-vi-id="${caretPosition.elementId}"]`);
      if (!element) return;

      const rect = element.getBoundingClientRect();

      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        height: rect.height,
      });
    }
  }, [caretPosition, mode]);

  if (!caretPosition.elementId || mode === 'insert') {
    return null;
  }

  return (
    <div
      css={styles.caret}
      style={{
        position: 'absolute',
        top: position?.top,
        left: position?.left,
        height: position?.height || '16px',
        width: position?.height ? position.height / 2 : '4px',
      }}
    />
  );
};
