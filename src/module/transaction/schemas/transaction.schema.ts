import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountDto } from 'src/module/account/dto/account.dto';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  originID: AccountDto;
  @Prop({ required: true })
  destinationID: AccountDto;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true, default: ENTITY_STATUS.ENABLED })
  status: ENTITY_STATUS;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
