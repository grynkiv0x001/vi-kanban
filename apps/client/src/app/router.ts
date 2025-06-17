import { createBrowserRouter } from 'react-router';

import { App } from '@/app/app';

/* Pages */

// Home
import { Home } from '@/app/pages/home';

// Projects
import { Projects } from '@/app/pages/projects';
import { Project } from '@/app/pages/project';
import { NotFound } from '@/app/pages/not-found.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'projects',
        Component: Projects,
      },
      {
        path: 'projects/:id',
        Component: Project,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
