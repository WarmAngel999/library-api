import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    country: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
