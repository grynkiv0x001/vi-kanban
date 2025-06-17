import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

import * as styles from './footer.styles';

export const Footer = () => {
  const vi = useSelector((state: RootState) => state.vi);

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
