import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from "./entities/book.entity";
import { Author} from "../authors/entities/author.entity";
import {Genre} from "../genres/entities/genre.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book, Genre])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
