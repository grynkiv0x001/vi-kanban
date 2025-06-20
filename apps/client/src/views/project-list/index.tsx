import React from 'react';
import { Link } from 'react-router';

import { MinusSmallIcon } from '@/assets/icons';

import { useAppDispatch } from '@/hooks';

import { useDeleteProjectMutation, useGetProjectsQuery } from '@/store/features/projects';
import { openModal } from '@/store/features/modal';

import * as styles from './project-list.styles';

export const ProjectList = () => {
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
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          css={styles.project}
        >
          {project.name}

          <button
            css={styles.removeProjectBtn}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleProjectRemoval(e, project.id)}
          >
            <MinusSmallIcon width={24} height={24} />
          </button>
        </Link>
      ))}
      <button css={styles.addProjectBtn} onClick={handleProjectCreation}>
        + Add project
      </button>
    </section>
  );
};
