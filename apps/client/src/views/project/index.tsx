import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { useCreateListMutation, useGetProjectListsQuery } from '@/store/features/lists';

import { List } from '@/views/list';

import * as styles from './project.styles';

export const ProjectView = () => {
  const { currentProject } = useSelector((state: RootState) => state.project);
  const { data: lists, isLoading: listsLoading } = useGetProjectListsQuery(currentProject?.id ?? 0, {
    skip: !currentProject,
  });
  const [createList, { isLoading: listCreating } ] = useCreateListMutation();
  const isLoading = listsLoading || listCreating;

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
