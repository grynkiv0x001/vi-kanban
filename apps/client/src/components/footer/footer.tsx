import { useState } from 'react';
import { useAppSelector } from '@/hooks';

import { Input } from '@/components/input';

import * as styles from './footer.styles';

export const Footer = () => {
  const { enabled, mode } = useAppSelector(state  => state.vi);
  const [commandLineState, setCommandLineState] = useState<string>('');

  return (
    <footer css={styles.footer}>
      {enabled && (
        <div css={styles.modeName}>
          {mode === 'command' ? (
            <Input
              style={{ padding: 0 }}
              variant="secondary"
              value={commandLineState}
              onChange={(e) => setCommandLineState(e.target.value)}
            />
          ) : mode}
        </div>
      )}
    </footer>
  );
};
