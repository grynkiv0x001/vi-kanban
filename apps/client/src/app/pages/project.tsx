import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '@/hooks';

import { setCurrentProject, useGetProjectQuery } from '@/store/features/projects';

import { ProjectView } from '@/views/project';

export const Project = () => {
  const { id: projectId = '' } = useParams<{ id: string }>();
  const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useGetProjectQuery(projectId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (project && !isProjectLoading && !isProjectError) {
      dispatch(setCurrentProject(project));
    }

    return () => {
      dispatch(setCurrentProject(undefined));
    };
  }, [dispatch, project, isProjectLoading, isProjectError]);

  if (isProjectError || !project) {
    return null;
  }

  return (
    <ProjectView />
  );
};
