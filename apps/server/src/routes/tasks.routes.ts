/**
 * @swagger
 * /projects/{projectId}/lists/{listId}/tasks:
 *   get:
 *     summary: Get tasks
 *     tags: ["Tasks"]
 *     responses:
 *      200:
 *        description: Get all tasks in list.
 *   post:
 *     summary: Create task
 *     tags: ["Tasks"]
 *     responses:
 *      200:
 *        description: Create a task in list.
 *
 * /projects/{projectId}/lists/{listId}/tasks/{taskId}:
 *   get:
 *     summary: Get task
 *     tags: ["Tasks"]
 *     responses:
 *      200:
 *        description: Get task in list by specific ID.
 *   put:
 *     summary: Update task
 *     tags: ["Tasks"]
 *     responses:
 *      200:
 *        description: Update task.
 *   delete:
 *     summary: Delete task
 *     tags: ["Tasks"]
 *     responses:
 *      200:
 *        description: Delete task.
 */

import { Router } from 'express';

import * as controller from '../controllers/tasks.controller';

const router = Router({ mergeParams: true });

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;
