import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

import * as styles from './header.styles';

export const Header = () => {
  const { currentProject } = useSelector((state: RootState) => state.project);

  return (
    <header css={styles.header}>
      <nav>
        <a href="/">Logo</a>
      </nav>
      {currentProject && (
        <input type="text" value={currentProject.name} />
      )}
      <input type="text" name="search" />
      <nav>
        <a href="#">Create</a>
        <a href="#">Settings</a>
        <a href="#">Account</a>
      </nav>
    </header>
  );
};
