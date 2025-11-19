import { useEffect, useState } from 'react';

import { BluePrintIcon } from '@/assets/icons';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { useGetUserQuery, useLogoutMutation } from '@/store/services/base.api';
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
  const [logout] = useLogoutMutation();

  // TODO: Move up in the structure to minimize unauthorized req amount
  const { data: user } = useGetUserQuery();

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

  // TODO: Add unauthorized view (simplified app with local storage)
  const handleLogout = async () => {
    await logout();
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
        {user ? (
          <Button variant="textSecondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="textSecondary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};
