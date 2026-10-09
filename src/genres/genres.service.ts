import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
      @InjectRepository(Genre)
      private readonly genreRepository: Repository<Genre>,
  ) {}

  create(dto: CreateGenreDto) {
  const genre = this.genreRepository.create(dto);
  return this.genreRepository.save(genre);
  }

  findAll() {
    return this.genreRepository.find({relations: {books: true}});
  }

  async findOne(id: number) {
    const genres = await this.genreRepository.findOne({
      where: { id },
      relations: {books: true },
    });
    if (!genres) throw new NotFoundException(`Жанр ${id} не найден`);
    return genres;
  }

  async update(id: number, dto: UpdateGenreDto) {
    const genre = await this.findOne(id);
    Object.assign(genre, dto);
    return this.genreRepository.save(genre);
  }

  async remove(id: number) {
    const genre = await this.findOne(id);
    await this.genreRepository.remove(genre);
    return { deleted: true };
  }
}
