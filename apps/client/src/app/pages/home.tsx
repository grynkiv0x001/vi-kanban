import { Link } from 'react-router';

export const Home = () => {
  // TODO: Add shortcuts overview and quick tutorial
  return (
    <section>
      <h1>Welcome to vi-kanban!</h1>
      <p>Here’s a preview of your recent projects and activity.</p>
      <Link to="projects">Projects</Link>
    </section>
  );
};
