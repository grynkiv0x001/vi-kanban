import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { useCreateListMutation, useGetProjectListsQuery } from '@/store/features/lists';
import { setProjectTasks, useGetListTasksQuery } from '@/store/features/tasks';

import { List } from '@/views/list';

import * as styles from './project.styles';

export const ProjectView = () => {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.project);
  const { data: lists, isLoading: listsLoading } = useGetProjectListsQuery(currentProject?.id ?? 0, {
    skip: !currentProject,
  });
  const { data: tasks, isLoading: tasksLoading } = useGetListTasksQuery({
    projectId: currentProject?.id ?? 0,
    ids: lists?.map((list) => Number(list?.id)) ?? [],
  }, {
    skip: !currentProject || !lists,
  });
  const [createList, { isLoading: listCreating } ] = useCreateListMutation();
  const isLoading = listsLoading || listCreating;

  useEffect(() => {
    if (tasks && tasks.length > 0 && !tasksLoading) {
      dispatch(setProjectTasks(tasks));
    }
  }, [dispatch, tasks, tasksLoading]);

  const handleListCreation = async () => {
    await createList({
      projectId: currentProject?.id ?? 0,
      name: 'Test List',
    });
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
      <button css={styles.addListBtn} disabled={isLoading} onClick={handleListCreation}>
        + Add list
      </button>
    </section>
  );
};
