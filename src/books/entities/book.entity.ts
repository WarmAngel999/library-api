import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    year: number;

    @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
    author: Author;

    @ManyToMany(() => Genre, (genre) => genre.books)
    @JoinTable()
    genres: Genre[];
}
