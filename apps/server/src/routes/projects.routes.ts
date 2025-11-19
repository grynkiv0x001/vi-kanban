/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: ["Projects"]
 *     responses:
 *       200:
 *         description: A list of projects.
 *   post:
 *     summary: Get project by ID
 *     tags: ["Projects"]
 *     responses:
 *      200:
 *        description: Project
 *
 * /projects/{projectId}:
 *   get:
 *     summary: Get project by ID
 *     tags: ["Projects"]
 *     responses:
 *      200:
 *        description: Project.
 *   put:
 *     summary: Update project
 *     tags: ["Projects"]
 *     responses:
 *      200:
 *        description: Update project.
 *   delete:
 *     summary: Delete project
 *     tags: ["Projects"]
 *     responses:
 *      200:
 *        description: Delete project.
 * /projects/{projectId}/tasks?ids:
 *   get:
 *     summary: Batch tasks in project by listIds
 *     tags: ["Projects"]
 *     responses:
 *      200:
 *        description: Batched tasks in project by array of lists ids.
 */

import { Router } from 'express';

import * as controller from '@/controllers/projects.controller';
import { getAllTasks } from '@/controllers/tasks.controller';

import { authenticateToken } from '@/controllers/middlewares/auth.middleware';

import listsRouter from './lists.routes';
import reorderRouter from './reorder.routes';

const router = Router();

router.use(authenticateToken);

router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', controller.createProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

router.get('/:id/tasks', getAllTasks);

router.use('/:projectId/lists', listsRouter);
router.use('/:projectId/reorder', reorderRouter);

export default router;
