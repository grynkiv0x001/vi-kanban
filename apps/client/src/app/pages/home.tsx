import { useNavigate } from 'react-router';

import { Button } from '@/components/button';

export const Home = () => {
  const navigate = useNavigate();

  // TODO: Add shortcuts overview and quick tutorial
  return (
    <section>
      <h1>Welcome to vi-kanban!</h1>
      <p>Here’s a preview of your recent projects and activity.</p>

      <Button data-vi="on" variant="text" onClick={() => navigate('projects')}>
        Projects
      </Button>
    </section>
  );
};
