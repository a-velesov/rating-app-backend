import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ReviewDto } from '../src/review/dto/review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: ReviewDto = {
	name: 'Тест1',
	title: 'Заголовок1',
	description: 'Описание',
	rating: 5,
	productId
};

// jest.setTimeout(30000); // timeout connect to database

describe('AppController (e2e)', () => {
	let app: INestApplication;

	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async (done) => {
		return request(app.getHttpServer())
				.post('/review/create')
				.send(testDto)
				.expect(201)
				.then(({ body }: request.Response) => {
					createdId = body._id;
					expect(createdId).toBeDefined();
					done();
				});
	});


	it('/review/byProduct/:productId (GET) - success', async (done) => {
		return request(app.getHttpServer())
				.get('/review/byProduct/' + productId)
				.expect(200)
				.then(({ body }: request.Response) => {
					expect(body.length).toBe(1);
					done();
				});
	});

	it('/review/byProduct/:productId (GET) - fail', async (done) => {
		return request(app.getHttpServer())
				.get('/review/byProduct/' + new Types.ObjectId().toHexString())
				.expect(200)
				.then(({ body }: request.Response) => {
					expect(body.length).toBe(0);
					done();
				});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
				.delete('/review/' + createdId)
				.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
				.delete('/review/' + new Types.ObjectId().toHexString())
				.expect(404, {
					statusCode: 404,
					message: REVIEW_NOT_FOUND
				});
	});

	afterAll(async () => {
		await app.close();
		await disconnect();
	});
});