import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

export class ListUsersService {
  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    const users = userRepository.find();

    return users;
  }
}
