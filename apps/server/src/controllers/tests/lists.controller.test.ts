import { describe, expect, test, vi } from 'vitest';
import { Request, Response } from 'express';

import { assertStatusJson } from '@/tests/utils';

import * as service from '@/services/lists.service';
import * as controller from '../lists.controller';

describe('Lists Controller – Get', () => {
  test('should successfully return lists', async () => {
    const mockLists = [
      {
        id: 1,
        name: 'Test List',
        projectId: 1,
        position: 0,
      },
      {
        id: 2,
        name: 'Test List 2',
        projectId: 1,
        position: 0,
      },
    ];

    vi.spyOn(service, 'getProjectLists').mockResolvedValue(mockLists);

    const req = {
      params: { projectId: 1 },
      body: mockLists,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.getLists(req as Request, res as Response);

    assertStatusJson(status, json, 200, mockLists);
  });
});

describe('Lists Controller – Create', () => {
  test('should successfully create list', async () => {
    const mockList = {
      id: 1,
      name: 'Test List',
      projectId: 1,
      position: 0,
    };

    vi.spyOn(service, 'createList').mockResolvedValue(mockList);

    const req = {
      params: { projectId: mockList.projectId },
      body: mockList,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createList(req as Request, res as Response);

    assertStatusJson(status, json, 201, mockList);
  });

  test('should handle errors on create', async () => {
    vi.spyOn(service, 'createList').mockRejectedValue(new Error('Error'));

    const req = {
      params: { projectId: 1 },
      body: { name: 'New List' },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createList(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to create a list' });
  });
});

describe('Lists Controller – Update', () => {
  test('should successfully update list', async () => {
    const updatedList = {
      id: 1,
      name: 'Test List',
      projectId: 1,
      position: 0,
    };

    vi.spyOn(service, 'updateList').mockResolvedValue(updatedList);

    const req = {
      params: { projectId: updatedList.projectId },
      body: updatedList,
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.updateList(req as Request, res as Response);

    assertStatusJson(status, json, 200, updatedList);
  });

  test('should handle errors on update', async () => {
    vi.spyOn(service, 'updateList').mockRejectedValue(new Error('Error'));

    const req = {
      params: { projectId: 1 },
      body: { name: 'New List' },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.updateList(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to update a list' });
  });
});

describe('Lists Controller – Delete', () => {
  test('should successfully delete a list', async () => {
    const deletedList = {
      id: 1,
      name: 'Test List',
      projectId: 1,
      position: 0,
    };

    vi.spyOn(service, 'deleteList').mockResolvedValue(deletedList);

    const req = {
      params: { id: deletedList.id },
    } as unknown as Partial<Request>;

    const send = vi.fn();
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ send, json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.deleteList(req as Request, res as Response);

    expect(service.deleteList).toHaveBeenCalledWith(1);
    expect(status).toHaveBeenCalledWith(204);
    expect(send).toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });

  test('should handle errors on delete', async () => {
    vi.spyOn(service, 'deleteList').mockRejectedValue(new Error('Error'));

    const req = {
      params: { projectId: 1 },
      body: { name: 'Test List' },
    } as unknown as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.deleteList(req as Request, res as Response);

    assertStatusJson(status, json, 500, { error: 'Failed to delete a list' });
  });
});
