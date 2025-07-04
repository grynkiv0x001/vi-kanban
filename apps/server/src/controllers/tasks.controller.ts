import { Request, Response } from 'express';

import { createTaskSchema, updateTaskSchema } from '@/schemas/task.schema';
import * as service from '@/services/tasks.service';

export const getTasks = async (req: Request, res: Response) => {
  const listId = Number(req.params.listId);

  if (isNaN(listId)) {
    res.status(400).json({ message: 'Invalid or missing list ID' });
    return;
  }

  try {
    const tasks = await service.getTasks(listId);
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  const ids = req.query.ids;

  const listIds = Array.isArray(ids)
    ? ids.map(Number).filter((id) => !isNaN(id))
    : [Number(ids)].filter((id) => !isNaN(id));

  if (listIds.length === 0) {
    res.status(400).json({ message: 'Missing or invalid list IDs' });
    return;
  }

  try {
    const tasks = await service.getTasksByListIds(listIds);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = await service.getTaskById(id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const listId = Number(req.params.listId);

  if (isNaN(listId)) {
    res.status(400).json({ message: 'Invalid or missing list ID' });
    return;
  }

  const result = createTaskSchema.safeParse({
    ...req.body,
    listId,
  });

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const task = await service.createTask(result.data);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: 'Failed to create a task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const updated = await service.updateTask(result.data);
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update a task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await service.deleteTask(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete a task' });
  }
};
