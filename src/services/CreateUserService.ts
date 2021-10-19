import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { hash } from 'bcryptjs';

interface IUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export class CreateUserService {
  async execute({
    first_name,
    last_name,
    email,
    admin,
    password
  }: IUserRequest) {
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

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      first_name,
      last_name,
      email,
      admin,
      password: passwordHash
    });

    await userRepository.save(user);

    return user;
  }
}
