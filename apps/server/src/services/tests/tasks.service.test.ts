import { describe, test, expect, vi, Mock } from 'vitest';

import * as taskService from '../tasks.service';

vi.mock('../../prisma/client', () => {
  return {
    prisma: {
      task: {
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        deleteMany: vi.fn(),
      },
    },
  };
});

import { prisma } from '../../prisma/client';

describe('tasks service', () => {
  test('should get all tasks', async () => {
    const mockLists = [{ id: 1, name: 'Test Task 1', projectId: 1 }, { id: 2, name: 'Test Task 2', projectId: 1 }];
    (prisma.task.findMany as Mock).mockResolvedValue(mockLists);

    const result = await taskService.getTasks(1);

    expect(prisma.task.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockLists);
  });

  test('should get task by ID', async () => {
    const mockTask = { id: 1, name: 'Test Task', listId: 1 };
    (prisma.task.findUnique as Mock).mockResolvedValue(mockTask);

    const result = await taskService.getTaskById(1);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockTask);
  });

  test('should create a task with given name', async () => {
    const mockTask = { id: 1, name: 'Test Task', projectId: 1, listId: 1 };
    (prisma.task.create as Mock).mockResolvedValue(mockTask);

    const result = await taskService.createTask(mockTask);

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: mockTask,
    });

    expect(result).toEqual(mockTask);
  });

  test('should update a task name', async () => {
    const mockUpdatedTask = { id: 1, name: 'Updated Task' };
    (prisma.task.update as Mock).mockResolvedValue(mockUpdatedTask);

    const result = await taskService.updateTask({ id: 1, name: 'Updated Task' });

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockUpdatedTask,
    });

    expect(result).toEqual(mockUpdatedTask);
  });

  test('should delete a task by ID', async () => {
    const mockDeletedTask = { id: 1, name: 'Deleted Task' };
    (prisma.task.delete as Mock).mockResolvedValue(mockDeletedTask);

    const result = await taskService.deleteTask(1);

    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(mockDeletedTask);
  });
});
