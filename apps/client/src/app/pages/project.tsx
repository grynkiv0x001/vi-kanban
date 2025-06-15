import { useGetProjectQuery } from '@/store/features/project/projectSlice.ts';
import { useLocation } from 'react-router';

export const Project = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const { data, isLoading, isError } = useGetProjectQuery(id);

  return (
    <div>
      <h2>Project: </h2>
    </div>
  );
};