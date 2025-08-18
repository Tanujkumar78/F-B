import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  Fullname: string;

  @Prop({ required: true, unique: true })
  Email: string;

  @Prop({ required: true })
  passwordd: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
