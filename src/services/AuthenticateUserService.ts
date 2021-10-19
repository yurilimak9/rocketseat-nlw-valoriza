import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type IAuthenticateRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error('E-mail/Password incorrect');
    }

    if (!(await compare(password, user.password))) {
      throw new Error('E-mail/Password incorrect');
    }

    const token = sign(
      {
        email: user.email
      },
      '96a4a12d6ed869533f9f6c2fc1e61dfe',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return token;
  }
}
