import * as styles from './footer.styles';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export const Footer = () => {
  const { vi } = useSelector((state: RootState) => state);

  return (
    <footer css={styles.footer}>
      {vi.enabled && (
        <div>
          {vi.mode === 'normal' ? (
            <span>Normal</span>
          ) : (
            <span>Insert</span>
          )}
        </div>
      )}
    </footer>
  );
};
