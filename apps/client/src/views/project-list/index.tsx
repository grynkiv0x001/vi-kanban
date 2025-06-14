import { useGetProjectsQuery } from "@/store/features/project/projectSlice.ts";

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
      <h2>Projects: </h2>
      {projects?.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </section>
  );
};
