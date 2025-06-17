/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: A list of projects.
 *
 * /projects/{projectId}:
 *   get:
 *     summary: Get project by ID
 *     responses:
 *      200:
 *        description: Project
 */

import { Router } from 'express';

import listsRouter from './lists.routes';

import * as controller from '../controllers/projects.controller';

const router = Router();

router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', controller.createProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

router.use('/:projectId/lists', listsRouter);

export default router;