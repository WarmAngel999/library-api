import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Genre } from '../genres/entities/genre.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
      @InjectRepository(Book) private readonly booksRepo: Repository<Book>,
      @InjectRepository(Author) private readonly authorsRepo: Repository<Author>,
      @InjectRepository(Genre) private readonly genresRepo: Repository<Genre>,
  ) {}

  async create(dto: CreateBookDto) {
    const author = await this.authorsRepo.findOneBy({ id: dto.authorId });
    if (!author) throw new NotFoundException(`Автор ${dto.authorId} не найден`);

    const genres = dto.genreIds?.length
        ? await this.genresRepo.findBy({ id: In(dto.genreIds) })
        : [];

    const book = this.booksRepo.create({
      title: dto.title,
      year: dto.year,
      author,
      genres,
    });
    return this.booksRepo.save(book);
  }

  findAll() {
    return this.booksRepo.find({ relations: { author: true, genres: true } });
  }

  async findOne(id: number) {
    const book = await this.booksRepo.findOne({
      where: { id },
      relations: { author: true, genres: true },
    });
    if (!book) throw new NotFoundException(`Книга ${id} не найдена`);
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.findOne(id);

    if (dto.title !== undefined) book.title = dto.title;
    if (dto.year !== undefined) book.year = dto.year;

    if (dto.authorId !== undefined) {
      const author = await this.authorsRepo.findOneBy({ id: dto.authorId });
      if (!author) throw new NotFoundException(`Автор ${dto.authorId} не найден`);
      book.author = author;
    }
    if (dto.genreIds !== undefined) {
      book.genres = dto.genreIds.length
          ? await this.genresRepo.findBy({ id: In(dto.genreIds) })
          : [];
    }
    return this.booksRepo.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    await this.booksRepo.remove(book);
    return { deleted: true };
  }
}
