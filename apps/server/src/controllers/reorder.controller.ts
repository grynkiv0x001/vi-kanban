import { Request, Response } from 'express';
import { z } from 'zod';

import * as service from '@/services/reorder.service';

const reorderListsSchema = z.object({
  listIds: z.array(z.number()),
});

const reorderTasksSchema = z.object({
  listId: z.number(),
  taskIds: z.array(z.number()),
});

export const reorderLists = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const result = reorderListsSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    await service.reorderLists(projectId, result.data.listIds);
    res.status(200).json({ message: 'Lists reordered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder lists' });
  }
};

export const reorderTasks = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const result = reorderTasksSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    await service.reorderTasksInList(projectId, result.data.listId, result.data.taskIds);
    res.status(200).json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder tasks' });
  }
};
