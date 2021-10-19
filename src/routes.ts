import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

/**
 * User
 */
router.post('/users', createUserController.handle);

/**
 * Tag
 */
router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
