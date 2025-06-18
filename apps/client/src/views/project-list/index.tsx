import { Link } from 'react-router';

import { useGetProjectsQuery } from '@/store/features/projects';

import * as styles from './project-list.styles';

export const ProjectList = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

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

  return (
    <section css={styles.projects}>
      {projects?.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          css={styles.project}
        >
          {project.name}
        </Link>
      ))}
    </section>
  );
};
