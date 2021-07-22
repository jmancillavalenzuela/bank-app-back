import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';

export class AccountDto {
  @ApiProperty()
  readonly _id?: Types.ObjectId;

  @ApiProperty({
    title: 'Nombre',
    example: 'Nombre del Destinatario',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    title: 'Rut Destinatario',
    example: '11111111-1',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  rut: string;

  @ApiProperty({
    title: 'Email Destinatario',
    example: '1-1',
  })
  @IsNotEmpty()
  mail?: string;

  @ApiProperty({
    title: 'Numero de Teléfono',
    example: '99999999',
  })
  @IsNotEmpty()
  phoneNumber?: number;

  @ApiProperty({
    title: 'Banco Destinatario',
    example: 'Banco Ripley',
  })
  @IsNotEmpty()
  bank?: string;

  @ApiProperty({
    title: 'Numero de Cuenta',
    example: 'Corriente',
  })
  @IsNotEmpty()
  accountNumber?: number;

  @ApiProperty({
    title: 'Tipo de Cuenta',
    example: 'Corriente',
  })
  @IsNotEmpty()
  accountType?: string;

  @ApiProperty({
    title: 'Enabled',
    example: 'true',
  })
  @IsNotEmpty()
  status?: ENTITY_STATUS;
}
