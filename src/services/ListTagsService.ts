import { getCustomRepository } from 'typeorm';
import { TagRepository } from '../repositories/TagRepository';
import { classToPlain } from 'class-transformer';

export class ListTagsService {
  async execute() {
    const tagReporitory = getCustomRepository(TagRepository);

    const tags = await tagReporitory.find();

    return classToPlain(tags);
  }
}
