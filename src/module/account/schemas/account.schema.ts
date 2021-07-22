import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  rut: string;
  @Prop({ required: true, unique: true })
  mail: string;
  @Prop({ required: true })
  phoneNumber: number;
  @Prop({ required: true })
  bank: string;
  @Prop({ required: true })
  accountNumber: number;
  @Prop({ required: true })
  accountType: string;
  @Prop({ required: true, default: ENTITY_STATUS.ENABLED })
  status: ENTITY_STATUS;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
