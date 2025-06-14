import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetProjectsQuery } from "@/store/features/project/projectSlice";
import { setViMode } from "@/store/features/vi/viSlice.ts";

import { Footer } from "@/components/footer";

import * as styles from './app.styles';

export const App = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'i') {
      dispatch(setViMode('insert'));
    }

    if (e.key === 'Escape') {
      dispatch(setViMode('normal'));
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  return (
    <main css={styles.main}>
      <h1>vi-kanban client app</h1>
      {isLoading || !projects ? (
        <div>{isError ? 'Failed to load Projects' : 'Loading...'}</div>
      ) : (
        <>
          <h2>Projects: </h2>
          {projects?.map((project) => (
            <div key={project.id}>{project.name}</div>
          ))}
        </>
      )}
      <Footer />
    </main>
  );
};
