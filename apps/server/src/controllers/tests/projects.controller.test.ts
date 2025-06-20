import { describe, test, expect, vi } from 'vitest';
import { Request, Response } from 'express';

import { assertStatusJson } from '@/tests/utils';

import * as service from '@/services/projects.service';
import * as controller from '../projects.controller';

describe('createProject controller', () => {
  test('should return 201 and created project', async () => {
    const mockProject = { id: 1, name: 'My Project', userId: 'test' };
    vi.spyOn(service, 'createProject').mockResolvedValue(mockProject);

    const req = {
      body: { name: 'My Project' },
      userId: 'test',
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createProject(req as Request, res as Response);

    expect(service.createProject).toHaveBeenCalledWith({ name: 'My Project', userId: 'test' });

    assertStatusJson(status, json, 201, mockProject);
  });

  test('should handle errors and return 500', async () => {
    vi.spyOn(service, 'createProject').mockRejectedValue(new Error('Fail'));

    const req = {
      body: { name: 'My Project' },
      userId: 'test',
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createProject(req as Request, res as Response);

    assertStatusJson(status, json, 500, { message: 'Internal Server Error' });
  });
});

describe('getProjects controller', () => {
  test('should return 200', async () => {
    const mockProjects = [
      { id: 1, name: 'My Project', userId: 'test' },
      { id: 2, name: 'My Project 2', userId: 'test' },
    ];

    vi.spyOn(service, 'getAllProjects').mockResolvedValue(mockProjects);

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.getProjects({} as Request, res as Response);

    assertStatusJson(status, json, 200, mockProjects);
  });
});

describe('updateProject controller', () => {
  test('should return 200 and updated project', async () => {
    const mockUpdatedProject = { id: 1, name: 'Updated Project', userId: 'test' };

    vi.spyOn(service, 'updateProject').mockResolvedValue(mockUpdatedProject);

    const req = {
      params: { id: '1' },
      body: { name: 'Updated Project' },
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = { status } as Partial<Response>;

    await controller.updateProject(req as Request, res as Response);

    expect(service.updateProject).toHaveBeenCalledWith(1, 'Updated Project');

    assertStatusJson(status, json, 200, mockUpdatedProject);
  });

  test('should handle errors and return 500', async () => {
    vi.spyOn(service, 'updateProject').mockRejectedValue(new Error('Fail'));

    const req = {
      params: { id: '1' },
      body: { name: 'Updated Project' },
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = { status } as Partial<Response>;

    await controller.updateProject(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to update project' });
  });
});

describe('deleteProject controller', () => {
  test('should successfully delete', async () => {
    vi.spyOn(service, 'deleteProject')
      .mockResolvedValue({ id: 1, name: 'My Project', userId: 'test' });

    const req = {
      params: { id: '1' },
    } as Partial<Request>;

    const send = vi.fn();
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ send, json });

    const res = { status } as Partial<Response>;

    await controller.deleteProject(req as Request, res as Response);

    expect(service.deleteProject).toHaveBeenCalledWith(1);
    expect(status).toHaveBeenCalledWith(204);
    expect(send).toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });

  test('should handle errors and return 500', async () => {
    vi.spyOn(service, 'deleteProject').mockRejectedValue(new Error('Fail'));

    const req = {
      params: { id: '1' },
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = { status } as Partial<Response>;

    await controller.deleteProject(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to delete project' });
  });
});
