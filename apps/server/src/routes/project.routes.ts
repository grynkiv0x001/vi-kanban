import { Router } from 'express';

import * as controller from '../controllers/project.controller';

const router = Router();

router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', controller.postProject);
router.put('/:id', controller.putProject);
router.delete('/:id', controller.deleteProject);

export default router;