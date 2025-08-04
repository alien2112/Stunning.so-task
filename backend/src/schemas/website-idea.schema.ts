import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteIdeaDocument = WebsiteIdea & Document;

@Schema()
export class Section {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['hero', 'about', 'contact', 'features', 'gallery', 'services', 'testimonials'] })
  type: string;
}

@Schema({ timestamps: true })
export class WebsiteIdea {
  @Prop({ required: true })
  prompt: string;

  @Prop({ type: [Section], default: [] })
  sections: Section[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const WebsiteIdeaSchema = SchemaFactory.createForClass(WebsiteIdea);
