import { prop } from '@typegoose/typegoose';
import { TopLevelCategory } from '../top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdventageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}


export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsString()
	alias: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdventageDto)
	adventages: TopPageAdventageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}