import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { useGetProjectListsQuery } from '@/store/features/list/listSlice';
import { setCurrentProject, useGetProjectQuery } from '@/store/features/project/projectSlice';

export const Project = () => {
  const { id: projectId = '' } = useParams<{ id: string }>();
  const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useGetProjectQuery(projectId);
  const { data: lists } = useGetProjectListsQuery(projectId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (project && !isProjectLoading && !isProjectError) {
      dispatch(setCurrentProject(project));
    }

    return () => {
      dispatch(setCurrentProject(undefined));
    };
  }, [dispatch, project, isProjectLoading, isProjectError]);

  return (
    <div>
      {lists?.map((list) => (
        <dl key={list.id}>
          <dt>{list.name}</dt>
        </dl>
      ))}
    </div>
  );
};