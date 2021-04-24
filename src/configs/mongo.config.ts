import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) => 'mongodb+srv://' +
		configService.get('MONGODB_USER')
		+ ':'
		+ configService.get('MONGODB_PASSWORD')
		+ '@'
		+ configService.get('MONGODB_HOST')
		+ '/'
		+ configService.get('MONGODB_BASE_NAME')
		+ '?retryWrites=true&w=majority';

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});