import { Request, Response } from 'express';

import { createListSchema, updateListSchema } from '@/schemas/list.schema';
import * as service from '@/services/lists.service';

export const getLists = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const lists = await service.getProjectLists(projectId);
  res.status(200).json(lists);
};

export const getList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const list = await service.getListById(id);

  if (!list) {
    res.status(404).json({ message: 'List not found' });
    return;
  }

  res.status(200).json(list);
};

export const createList = async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId)) {
    res.status(400).json({ message: 'Invalid or missing project ID' });
    return;
  }

  const result = createListSchema.safeParse({
    ...req.body,
    projectId,
  });

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const list = await service.createList(result.data);
    res.status(201).json(list);
  } catch {
    res.status(500).json({ error: 'Failed to create a list' });
  }
};

export const updateList = async (req: Request, res: Response) => {
  const result = updateListSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const updated = await service.updateList(result.data);
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update a list' });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await service.deleteList(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete a list' });
  }
};
