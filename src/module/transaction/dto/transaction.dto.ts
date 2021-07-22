import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { AccountDto } from 'src/module/account/dto/account.dto';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';

export class TransactionDto {
  @ApiProperty()
  readonly _id?: Types.ObjectId;

  @ApiProperty({
    title: 'Origen',
    example: 'ID Origen',
  })
  @IsString()
  @IsNotEmpty()
  originID: AccountDto;

  @ApiProperty({
    title: 'Destino',
    example: 'ID Destino',
  })
  @IsString()
  @IsNotEmpty()
  destinationID: AccountDto;

  @ApiProperty({
    title: 'Monto',
    example: '100',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  amount: number;

  @ApiProperty({
    title: 'Enabled',
    example: 'true',
  })
  @IsNotEmpty()
  status?: ENTITY_STATUS;
}
