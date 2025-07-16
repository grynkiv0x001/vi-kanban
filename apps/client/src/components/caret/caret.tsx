import { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks';

import * as styles from './caret.styles';

interface IPosition {
  top: number;
  left: number;
  height: number;
  width: number;
}

export const Caret = () => {
  const { caretPosition, mode } = useAppSelector(state => state.vi);
  const [position, setPosition] = useState<IPosition | null>(null);

  useEffect(() => {
    if (!caretPosition.elementId && mode === 'insert') {
      return;
    }

    const element = document.querySelector(`[data-vi-id="${caretPosition.elementId}"]`);

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();

    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height,
      width: rect.width,
    });
  }, [caretPosition, mode]);

  if (!caretPosition.elementId || mode === 'insert') {
    return null;
  }

  return (
    <div
      css={styles.caret}
      style={{
        top: position?.top,
        left: position?.left,
        height: position?.height,
        width: position?.width,
      }}
    />
  );
};
