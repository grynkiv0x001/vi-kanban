/**
 * @swagger
 * /projects/{projectId}/lists:
 *   get:
 *     summary: Get lists
 *     tags: ["Lists"]
 *     responses:
 *      200:
 *        description: Get all lists in project.
 *   post:
 *     summary: Create list
 *     tags: ["Lists"]
 *     responses:
 *      200:
 *        description: Create a list in project.
 *
 * /projects/{projectId}/lists/{listId}:
 *   get:
 *     summary: Get list
 *     tags: ["Lists"]
 *     responses:
 *      200:
 *        description: Get list in project by specific ID.
 *   put:
 *     summary: Update list
 *     tags: ["Lists"]
 *     responses:
 *      200:
 *        description: Update list.
 *   delete:
 *     summary: Delete list
 *     tags: ["Lists"]
 *     responses:
 *      200:
 *        description: Delete list.
 */

import { Router } from 'express';

import tasksRouter from './tasks.routes';

import * as controller from '../controllers/lists.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getLists);
router.get('/:id', controller.getList);
router.post('/', controller.createList);
router.put('/:id', controller.updateList);
router.delete('/:id', controller.deleteList);

router.use('/:listId/tasks', tasksRouter);

export default router;