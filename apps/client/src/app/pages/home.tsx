import { Link } from 'react-router';

export const Home = () => {
  return (
    <section>
      <h1>Welcome to Kanban!</h1>
      <p>Here’s a preview of your recent projects and activity.</p>
      <Link to="projects">Projects</Link>
    </section>
  );
};
