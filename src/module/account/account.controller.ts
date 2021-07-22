import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';
import { AccountDto } from './dto/account.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AccountService } from './account.service';

@ApiTags('Account CRUD')
@Controller('account')
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @Post()
  async create(@Body() AccountDto: AccountDto): Promise<AccountDto> {
    return await this.AccountService.create(AccountDto);
  }

  @Get()
  findAll() {
    return this.AccountService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: Types.ObjectId): Promise<AccountDto> {
    return this.AccountService.findById(id);
  }

  @Get('/rut/:rut')
  findByRut(@Param('rut') rut: string): Promise<AccountDto> {
    return this.AccountService.findByRut(rut);
  }

  @Put()
  async update(@Body() AccountDto: AccountDto): Promise<AccountDto> {
    try {
      return this.AccountService.update(AccountDto);
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<AccountDto> {
    return await this.AccountService.remove(id);
  }

  async changeStatus(
    @Param('id') id: Types.ObjectId,
    @Param('status') status: ENTITY_STATUS,
  ) {
    const user = await this.AccountService.findById(id);
    user.status = status;

    return await this.AccountService.update(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
