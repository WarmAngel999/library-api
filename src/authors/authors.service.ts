import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
      @InjectRepository(Author)
      private readonly authorsRepo: Repository<Author>,
  ) {}

  create(dto: CreateAuthorDto) {
    const author = this.authorsRepo.create(dto);
    return this.authorsRepo.save(author);
  }

  findAll() {
    return this.authorsRepo.find({ relations: { books: true} });
  }

  async findOne(id: number) {
    const author = await this.authorsRepo.findOne({
      where: { id },
      relations: { books: true },
    });
    if (!author) throw new NotFoundException(`Автор ${id} не найден`);
    return author;
  }

  async update(id: number, dto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    Object.assign(author, dto);
    return this.authorsRepo.save(author);
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    await this.authorsRepo.remove(author);
    return { deleted: true };
  }
}
