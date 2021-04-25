import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ReviewDto } from './dto/review.dto';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {
	}

	async create(dto: ReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);

	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel.find({ productId: Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec();
	}
}
