import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { useGetProjectListsQuery } from '@/store/features/lists';
import { setProjectTasks, useGetListTasksQuery } from '@/store/features/tasks';
import { openModal } from '@/store/features/modal';

import { List } from '@/views/list';

import * as styles from './project.styles';

export const ProjectView = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector(state => state.project);

  const { data: lists, isLoading: listsLoading } = useGetProjectListsQuery(currentProject?.id ?? 0, {
    skip: !currentProject,
  });

  const { data: tasks, isLoading: tasksLoading } = useGetListTasksQuery({
    projectId: currentProject?.id ?? 0,
    ids: lists?.map((list) => Number(list?.id)) ?? [],
  }, {
    skip: !currentProject || !lists || !lists.length,
  });

  useEffect(() => {
    if (tasks && !tasksLoading) {
      dispatch(setProjectTasks(tasks));
    }
  }, [dispatch, tasks, tasksLoading]);

  const handleListCreation = async () => {
    dispatch(openModal({
      type: 'create',
      instance: 'list',
    }));
  };

  if (listsLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <section css={styles.project}>
      {lists?.map((list) => (
        <List key={list.id} {...list} />
      ))}
      <button css={styles.addListBtn} disabled={listsLoading} onClick={handleListCreation}>
        + Add list
      </button>
    </section>
  );
};
