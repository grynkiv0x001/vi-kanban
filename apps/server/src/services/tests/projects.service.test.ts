import { describe, test, expect, vi, Mock } from 'vitest';

import * as projectService from '../projects.service';

vi.mock('../../prisma/client', () => {
  return {
    prisma: {
      project: {
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      list: {
        deleteMany: vi.fn(),
      },
      task: {
        deleteMany: vi.fn(),
      },
    },
  };
});

import { prisma } from '../../prisma/client';

describe('projects service', () => {
  test('should get all projects', async () => {
    const mockProjects = [{ id: 1, name: 'Test Project 1' }, { id: 2, name: 'Test Project 2' }];
    (prisma.project.findMany as Mock).mockResolvedValue(mockProjects);

    const result = await projectService.getAllProjects();

    expect(prisma.project.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProjects);
  });

  test('should get project by ID', async () => {
    const mockProject = { id: 1, name: 'Test Project' };
    (prisma.project.findUnique as Mock).mockResolvedValue(mockProject);

    const result = await projectService.getProjectById(1);

    expect(prisma.project.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockProject);
  });

  test('should create a project with given name', async () => {
    const mockProject = { id: 1, name: 'Test Project' };
    (prisma.project.create as Mock).mockResolvedValue(mockProject);

    const result = await projectService.createProject('Test Project');

    expect(prisma.project.create).toHaveBeenCalledWith({
      data: { name: 'Test Project' },
    });

    expect(result).toEqual(mockProject);
  });

  test('should update a project name', async () => {
    const mockUpdatedProject = { id: 1, name: 'Updated Project' };
    (prisma.project.update as Mock).mockResolvedValue(mockUpdatedProject);

    const result = await projectService.updateProject(1, 'Updated Project');

    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Updated Project' },
    });

    expect(result).toEqual(mockUpdatedProject);
  });

  test('should delete a project by ID', async () => {
    const mockDeletedProject = { id: 1, name: 'Deleted Project' };
    (prisma.project.delete as Mock).mockResolvedValue(mockDeletedProject);

    const result = await projectService.deleteProject(1);

    expect(prisma.project.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockDeletedProject);
  });
});
