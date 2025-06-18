import { describe, test, expect, vi, Mock } from 'vitest';

import * as listService from '../lists.service';

vi.mock('../../prisma/client', () => {
  return {
    prisma: {
      list: {
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        deleteMany: vi.fn(),
      },
      task: {
        deleteMany: vi.fn(),
      },
    },
  };
});

import { prisma } from '../../prisma/client';

describe('lists service', () => {
  test('should get all lists', async () => {
    const mockLists = [{ id: 1, name: 'Test List 1', projectId: 1 }, { id: 2, name: 'Test List 2', projectId: 1 }];
    (prisma.list.findMany as Mock).mockResolvedValue(mockLists);

    const result = await listService.getProjectLists(1);

    expect(prisma.list.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockLists);
  });

  test('should get list by ID', async () => {
    const mockList = { id: 1, name: 'Test List', projectId: 1 };
    (prisma.list.findUnique as Mock).mockResolvedValue(mockList);

    const result = await listService.getListById(1);

    expect(prisma.list.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockList);
  });

  test('should create a list with given name', async () => {
    const mockList = { id: 1, name: 'Test List', projectId: 1 };
    (prisma.list.create as Mock).mockResolvedValue(mockList);

    const result = await listService.createList(mockList);

    expect(prisma.list.create).toHaveBeenCalledWith({
      data: mockList,
    });

    expect(result).toEqual(mockList);
  });

  test('should update a list name', async () => {
    const mockUpdatedList = { id: 1, name: 'Updated List' };
    (prisma.list.update as Mock).mockResolvedValue(mockUpdatedList);

    const result = await listService.updateList({ id: 1, name: 'Updated List' });

    expect(prisma.list.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockUpdatedList,
    });

    expect(result).toEqual(mockUpdatedList);
  });

  test('should delete a list by ID', async () => {
    const mockDeletedList = { id: 1, name: 'Deleted List' };
    (prisma.list.delete as Mock).mockResolvedValue(mockDeletedList);

    const result = await listService.deleteList(1);

    expect(prisma.list.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockDeletedList);
  });
});
