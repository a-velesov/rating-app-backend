import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class Adventage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base {
}

export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ unique: true })
	alias: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [Adventage] })
	adventages: Adventage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
