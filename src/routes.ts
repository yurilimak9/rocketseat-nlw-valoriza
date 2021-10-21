import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ensureAdmin } from './middlewares/ensureAdmin';

import { ListUsersController } from './controllers/ListUsersController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';

import { CreateTagController } from './controllers/CreateTagController';
import { ListTagsController } from './controllers/ListTagsController';

import { CreateComplimentController } from './controllers/CreateComplimentController';

const router = Router();

const authenticateController = new AuthenticateUserController();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const createComplimentController = new CreateComplimentController();

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
