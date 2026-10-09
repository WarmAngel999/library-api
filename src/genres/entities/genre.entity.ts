import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Book, (book) => book.genres)
    books: Book[];
}
