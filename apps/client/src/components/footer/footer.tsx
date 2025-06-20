import { useAppSelector } from '@/hooks';

import * as styles from './footer.styles';

export const Footer = () => {
  const vi = useAppSelector(state  => state.vi);

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
