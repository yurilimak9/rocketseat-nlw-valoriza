import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

/**
 * Authentication
 */
router.post('/login', authenticateController.handle);

/**
 * User
 */
router.post('/users', createUserController.handle);

/**
 * Tag
 */
router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
