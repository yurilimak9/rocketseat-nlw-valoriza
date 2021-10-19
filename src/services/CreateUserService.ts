import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

interface IUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute({ first_name, last_name, email, admin }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error('E-mail incorrect');
    }

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = userRepository.create({
      first_name,
      last_name,
      email,
      admin
    });

    await userRepository.save(user);

    return user;
  }
}
