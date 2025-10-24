import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { useGetProjectListsQuery } from '@/store/features/lists';
import { setProjectTasks, useGetListTasksQuery } from '@/store/features/tasks';
import { setProjectLists } from '@/store/features/lists';
import { openModal } from '@/store/features/modal';

import { List } from '@/views/list';

import { Button } from '@/components/button';

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

  useEffect(() => {
    if (lists && !listsLoading) {
      dispatch(setProjectLists(lists));
    }
  }, [dispatch, lists, listsLoading]);

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
      <Button onClick={handleListCreation} disabled={listsLoading} styles={styles.addListBtn}>
        + Add list
      </Button>
    </section>
  );
};
