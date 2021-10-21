import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ensureAdmin } from './middlewares/ensureAdmin';

import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';

import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const listTagsController = new ListTagsController();

/**
 * Authentication
 */
router.post('/login', authenticateController.handle);

/**
 * User
 */
router.get('/users', ensureAuthenticated, listUsersController.handle);
router.post('/users', createUserController.handle);
router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

/**
 * Tag
 */
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

/**
 * Compliment
 */
router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);

export { router };
