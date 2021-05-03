import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	login: 'test@test.ru',
	password: '12'
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async (done) => {
		return request(app.getHttpServer())
				.post('/auth/login')
				.send(loginDto)
				.expect(200)
				.then(({ body }: request.Response) => {
					expect(body.access_token).toBeDefined();
					done();
				});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
				.post('/auth/login')
				.send({ ...loginDto, password: '2' })
				.expect(401, {
					statusCode: 401,
					message: 'Неправильный пароль',
					error: 'Unauthorized'
				});
	});
	it('/auth/login (POST) - fail login', () => {
		return request(app.getHttpServer())
				.post('/auth/login')
				.send({ ...loginDto, login: 'bad@mail.ru' })
				.expect(401, {
					statusCode: 401,
					message: 'Пользователь с таким e-mail не найден',
					error: 'Unauthorized'
				});
	});

	afterAll(async () => {
		await app.close();
		await disconnect();
	});
});