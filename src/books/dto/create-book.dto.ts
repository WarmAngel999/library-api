import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsInt()
    year?: number;

    @IsInt()
    authorId: number;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    genreIds?: number[];
}
