import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";

import { useGetProjectsQuery } from "@/store/features/project/projectSlice";
import { setViMode } from "@/store/features/vi/viSlice.ts";

export const App = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const { vi } = useSelector((state: RootState) => state);
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
    <div>
      <h1>vi-kanban client app</h1>
      {isLoading || !projects ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Projects: </h2>
          {projects?.map((project) => (
            <div key={project.id}>{project.name}</div>
          ))}
        </>
      )}
      <footer>
        {vi.enabled && (
          <div>
            {vi.mode === 'normal' ? (
              <span>Normal</span>
            ) : (
              <span>Insert</span>
            )}
          </div>
        )}
      </footer>
    </div>
  );
};
