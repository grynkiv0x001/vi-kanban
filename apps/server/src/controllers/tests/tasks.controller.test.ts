import { describe, expect, test, vi } from 'vitest';
import { Request, Response } from 'express';

import { assertStatusJson } from '@/tests/utils';

import * as service from '@/services/tasks.service';
import * as controller from '../tasks.controller';

describe('Tasks Controller – Get', () => {
  test('should successfully return tasks', async () => {
    const mockTasks = [
      {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        projectId: 1,
        listId: 1,
        position: 0,
      },
      {
        id: 2,
        name: 'Test Task 2',
        description: '',
        projectId: 1,
        listId: 2,
        position: 0,
      },
    ];

    vi.spyOn(service, 'getTasks').mockResolvedValue(mockTasks);

    const req = {
      params: { listId: 1 },
      body: mockTasks,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.getTasks(req as Request, res as Response);

    assertStatusJson(status, json, 200, mockTasks);
  });
});

describe('Tasks Controller – Create', () => {
  test('should successfully create task', async () => {
    const mockList = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      projectId: 1,
      listId: 1,
      position: 0,
    };

    vi.spyOn(service, 'createTask').mockResolvedValue(mockList);

    const req = {
      params: { listId: mockList.listId },
      body: mockList,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createTask(req as Request, res as Response);

    assertStatusJson(status, json, 201, mockList);
  });

  test('should handle errors on create', async () => {
    vi.spyOn(service, 'createTask').mockRejectedValue(new Error('Error'));

    const req = {
      params: { listId: 1 },
      body: { name: 'New Task', projectId: 1 },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createTask(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to create a task' });
  });
});

describe('Tasks Controller – Update', () => {
  test('should successfully update task', async () => {
    const updatedTask = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      projectId: 1,
      listId: 1,
      position: 0,
    };

    vi.spyOn(service, 'updateTask').mockResolvedValue(updatedTask);

    const req = {
      body: updatedTask,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.updateTask(req as Request, res as Response);

    assertStatusJson(status, json, 200, updatedTask);
  });

  test('should handle errors on update', async () => {
    vi.spyOn(service, 'updateTask').mockRejectedValue(new Error('Error'));

    const req = {
      body: {
        id: 1,
        name: 'New Task',
        projectId: 1,
        listId: 1,
      },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.updateTask(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to update a task' });
  });
});

describe('Tasks Controller – Delete', () => {
  test('should successfully delete a task', async () => {
    const deletedTask = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      projectId: 1,
      listId: 1,
      position: 0,
    };

    vi.spyOn(service, 'deleteTask').mockResolvedValue(deletedTask);

    const req = {
      params: { id: deletedTask.id },
    } as unknown as Partial<Request>;

    const send = vi.fn();
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ send, json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.deleteTask(req as Request, res as Response);

    expect(service.deleteTask).toHaveBeenCalledWith(1);
    expect(status).toHaveBeenCalledWith(204);
    expect(send).toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });

  test('should handle errors on delete', async () => {
    vi.spyOn(service, 'deleteTask').mockRejectedValue(new Error('Error'));

    const req = {
      params: { id: '1' },
      body: {
        name: 'Test List',
      },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.deleteTask(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to delete a task' });
  });
});
