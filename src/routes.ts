import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ensureAdmin } from './middlewares/ensureAdmin';

import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';

import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';

const router = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

/**
 * Authentication
 */
router.post('/login', authenticateController.handle);

/**
 * User
 */
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
