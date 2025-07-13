import { useEffect, useState } from 'react';

import { BluePrintIcon } from '@/assets/icons';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { useUpdateProjectMutation } from '@/store/features/projects';
import { setCurrentProject } from '@/store/features/projects';
import { openModal } from '@/store/features/modal';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import * as styles from './header.styles';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector(state => state.project);
  const [projectName, setProjectName] = useState(currentProject?.name ?? '');
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  useEffect(() => {
    setProjectName(currentProject?.name ?? '');
  }, [currentProject]);

  const handleBlur = async () => {
    if (!currentProject || projectName === currentProject.name) return;

    const updatedProject = { ...currentProject, name: projectName };

    try {
      const result = await updateProject(updatedProject).unwrap();
      dispatch(setCurrentProject(result));
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleLogin = async () => {
    dispatch(openModal({
      type: 'auth',
      instance: 'login',
    }));
  };

  const openSettings = () => {
    dispatch(openModal({
      type: 'settings',
      instance: 'app',
    }));
  };

  return (
    <header css={styles.header}>
      <nav css={styles.nav}>
        <a href="/" css={styles.logo}>
          <BluePrintIcon width={18} height={18} />
        </a>
        <div>
          {currentProject && (
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={handleBlur}
              disabled={isLoading}
              variant="secondary"
            />
          )}
        </div>
      </nav>
      <Input type="text" name="search" placeholder="Search..." />
      <nav css={styles.actions}>
        <Button variant="secondary">Create</Button>
        <Button variant="textSecondary" onClick={openSettings}>
          Settings
        </Button>
        <Button variant="textSecondary" onClick={handleLogin}>
          Account
        </Button>
      </nav>
    </header>
  );
};
