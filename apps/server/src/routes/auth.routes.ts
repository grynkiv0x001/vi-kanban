import { Router } from 'express';

import * as controller from '@/controllers/auth.controller';

const router = Router();

router.get('/me', controller.getUser);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refresh);

export default router;
