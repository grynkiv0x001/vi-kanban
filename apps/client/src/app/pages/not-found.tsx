import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <section>
      <h1>404 Not Found</h1>
      <p>Sorry. But there's no such page.</p>
      <Link to="/projects">Back to projects</Link>
    </section>
  );
};
