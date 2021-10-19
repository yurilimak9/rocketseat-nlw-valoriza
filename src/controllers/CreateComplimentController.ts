import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

export class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const { user_sender, user_receiver, tag_id, message } = req.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_id,
      message
    });

    return res.status(201).json(compliment);
  }
}
