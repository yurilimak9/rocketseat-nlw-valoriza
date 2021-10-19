import { getCustomRepository } from 'typeorm';
import { ComplimentRepository } from '../repositories/ComplimentRepository';
import { TagRepository } from '../repositories/TagRepository';
import { UserRepository } from '../repositories/UserRepository';

type IComplimentRequest = {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
};

export class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message
  }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect user receiver');
    }

    const userRepository = getCustomRepository(UserRepository);
    if (!(await userRepository.findOne(user_receiver, { select: ['id'] }))) {
      throw new Error('User receiver does not exists');
    }

    const tagRepository = getCustomRepository(TagRepository);
    if (!(await tagRepository.findOne(tag_id, { select: ['id'] }))) {
      throw new Error('Tag does not exists');
    }

    const compliment = complimentRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}
