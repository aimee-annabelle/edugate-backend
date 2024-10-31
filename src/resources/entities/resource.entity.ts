import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string; // e.g., 'textbook', 'lesson_plan', 'quiz'

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  gradeLevel: string;

  @Prop()
  fileUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  creator: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  collaborators: string[];

  @Prop({ default: 0 })
  views: number;

  @Prop([{
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }])
  ratings: Array<{
    user: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);