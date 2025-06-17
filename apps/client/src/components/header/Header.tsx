import { useSelector } from 'react-redux';

import { BluePrintIcon } from '@/assets/icons';

import type { RootState } from '@/store';

import * as styles from './header.styles';

export const Header = () => {
  const { currentProject } = useSelector((state: RootState) => state.project);

  return (
    <header css={styles.header}>
      <nav css={styles.nav}>
        <a href="/" css={styles.logo}>
          <BluePrintIcon width={18} height={18} />
        </a>
        <div css={styles.projectName}>
          {currentProject && (
            <input type="text" value={currentProject.name} />
          )}
        </div>
      </nav>
      <input css={styles.searchBar} type="text" name="search" placeholder="Search..." />
      <nav css={styles.actions}>
        <a href="#">Create</a>
        <a href="#">Settings</a>
        <a href="#">Account</a>
      </nav>
    </header>
  );
};
