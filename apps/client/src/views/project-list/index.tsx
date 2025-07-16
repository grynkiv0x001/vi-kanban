import React from 'react';
import { useNavigate } from 'react-router';

import { MinusSmallIcon } from '@/assets/icons';

import { useAppDispatch } from '@/hooks';

import { useDeleteProjectMutation, useGetProjectsQuery } from '@/store/features/projects';
import { openModal } from '@/store/features/modal';

import { Button } from '@/components/button';

import * as styles from './project-list.styles';

export const ProjectList = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (isError) {
    return (
      <div>Failed to load Projects</div>
    );
  }

  const handleProjectCreation = async () => {
    dispatch(openModal({ type: 'create', instance: 'project' }));
  };

  const handleProjectRemoval = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteProject(id);
  };

  return (
    <section css={styles.projects}>
      {projects?.map((project) => (
        <Button
          key={project.id}
          variant="secondary"
          css={styles.project}
          onClick={() => {
            navigate(`/projects/${project.id}`);
          }}
        >
          {project.name}

          <div
            css={styles.removeProjectBtn}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleProjectRemoval(e, project.id)}
          >
            <MinusSmallIcon width={24} height={24} />
          </div>
        </Button>
      ))}
      <Button variant="secondary" css={styles.addProjectBtn} onClick={handleProjectCreation}>
        + Add project
      </Button>
    </section>
  );
};
