import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, {message: 'Рейтинг не может быть больше 5'})
	@Min(1, {message: 'Рейтинг не может быть меньше 1'})
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}