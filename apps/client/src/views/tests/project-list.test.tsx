import { describe, test, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';

import { renderWithProviders } from '@/tests';

import { openModal } from '@/store/features/modal';

import { ProjectList } from '@/views/project-list';

const mockProjects = [
  { id: 1, name: 'Test Project' },
  { id: 2, name: 'Second Project' },
];

const handlers = [
  http.get('http://localhost:3001/projects', async () => {
    await delay(150);
    return HttpResponse.json(mockProjects);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

let dispatchSpy: ReturnType<typeof vi.fn>;

vi.mock('@/hooks', async () => {
  const actual = await vi.importActual('@/hooks');
  return {
    ...actual,
    useAppDispatch: () => dispatchSpy,
  };
});

let deleteProjectSpy: ReturnType<typeof vi.fn>;

vi.mock('@/store/features/projects', async () => {
  const actual = await vi.importActual('@/store/features/projects');
  return {
    ...actual,
    useDeleteProjectMutation: () => [deleteProjectSpy],
  };
});

describe('<ProjectList />', () => {
  test('fetches projects', async () => {
    renderWithProviders({
      Component: <ProjectList />,
      initialEntries: ['/', '/projects'],
    });

    const loadingText = await screen.findByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    const firstProject = await screen.findByText('Test Project');
    expect(firstProject).toBeInTheDocument();

    const secondProject = await screen.findByText('Second Project');
    expect(secondProject).toBeInTheDocument();
  });

  test('renders error state', async () => {
    server.use(
      http.get('http://localhost:3001/projects', () => {
        return HttpResponse.error();
      }),
    );

    renderWithProviders({ Component: <ProjectList /> });

    const errorText = await screen.findByText('Failed to load Projects');
    expect(errorText).toBeInTheDocument();
  });

  test('create modal is open when "+ Add project" button is clicked', async () => {
    dispatchSpy = vi.fn();

    renderWithProviders({ Component: <ProjectList /> });

    const button = await screen.findByText('+ Add project');
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(
      openModal({ type: 'create', instance: 'project' }),
    );
  });

  test('calls deleteProject when remove button is clicked', async () => {
    deleteProjectSpy = vi.fn();

    renderWithProviders({ Component: <ProjectList /> });

    const project = await screen.findByText('Test Project');
    const deleteBtn = project.closest('a')?.querySelector('button');

    expect(deleteBtn).toBeDefined();
    fireEvent.click(deleteBtn!);

    expect(deleteProjectSpy).toHaveBeenCalledWith(1);
  });

  test('renders without projects', async () => {
    renderWithProviders({ Component: <ProjectList /> });

    const addButton = await screen.findByText('+ Add project');
    expect(addButton).toBeInTheDocument();
  });
});
