import {
	Body, Controller, Delete, Get, HttpCode,
	NotFoundException, Param, Post, Put, UseGuards,
	UsePipes, ValidationPipe
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { NOT_FOUND_TOP_PAGE } from './top-page.constans';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {
	}

	@UseGuards(JwtGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	async get(@Param('id') id: string) {
		const page = await this.topPageService.findById(id);
		if (!page) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}
		return page;
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	async put(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
