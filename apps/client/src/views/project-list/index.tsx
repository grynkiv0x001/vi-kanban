import { Link } from 'react-router';

import { useGetProjectsQuery } from '@/store/features/project/projectSlice.ts';

import { toKebabCase } from '@/helpers/to-kebap.ts';

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
      {projects?.map((project) => {
        const slug = toKebabCase(project.name);

        return (
          <Link key={project.id} to={`/projects/${project.id}/${slug}`}>
            {project.name}
          </Link>
        );
      })}
    </section>
  );
};
