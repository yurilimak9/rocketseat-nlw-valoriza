import { getCustomRepository } from 'typeorm';
import { TagRepository } from '../repositories/TagRepository';

export class ListTagsService {
  async execute() {
    const tagReporitory = getCustomRepository(TagRepository);

    const tags = await tagReporitory.find();

    return tags;
  }
}
