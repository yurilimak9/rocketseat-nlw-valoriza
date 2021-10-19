import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { first_name, last_name, email, password, admin } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      first_name,
      last_name,
      email,
      password,
      admin
    });

    return res.status(201).json(user);
  }
}
