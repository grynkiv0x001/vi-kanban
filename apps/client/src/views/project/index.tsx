import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { useGetProjectListsQuery } from '@/store/features/lists';

import { List } from '@/views/list';

import * as styles from './project.styles';

export const ProjectView = () => {
  const { currentProject } = useSelector((state: RootState) => state.project);
  const { data: lists, isLoading } = useGetProjectListsQuery(currentProject?.id ?? 0, {
    skip: !currentProject,
  });

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <section css={styles.project}>
      {lists?.map((list) => (
        <List key={list.id} {...list} />
      ))}
    </section>
  );
};
