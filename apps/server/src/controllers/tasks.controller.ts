import { Request, Response } from 'express';

import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';
import * as service from '../services/tasks.service';

export const getTasks = async (req: Request, res: Response) => {
  const listId = Number(req.params.listId);

  if (isNaN(listId)) {
    res.status(400).json({ message: 'Invalid or missing list ID' });
    return;
  }

  const tasks = await service.getTasks(listId);
  res.json(tasks);
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

  const task = await service.createTask(result.data);

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  try {
    const updated = await service.updateTask(result.data);
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await service.deleteTask(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Task not found' });
  }
};
