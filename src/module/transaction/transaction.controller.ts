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
import { TransactionDto } from './dto/transaction.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransactionService } from './transaction.service';

@ApiTags('Transaction CRUD')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @Post()
  async create(
    @Body() TransactionDto: TransactionDto,
  ): Promise<TransactionDto> {
    return await this.TransactionService.create(TransactionDto);
  }

  @Get()
  findAll() {
    return this.TransactionService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: Types.ObjectId): Promise<TransactionDto> {
    return this.TransactionService.findById(id);
  }

  @Put()
  async update(
    @Body() TransactionDto: TransactionDto,
  ): Promise<TransactionDto> {
    try {
      return this.TransactionService.update(TransactionDto);
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
  async remove(@Param('id') id: Types.ObjectId): Promise<TransactionDto> {
    return await this.TransactionService.remove(id);
  }

  async changeStatus(
    @Param('id') id: Types.ObjectId,
    @Param('status') status: ENTITY_STATUS,
  ) {
    const user = await this.TransactionService.findById(id);
    user.status = status;

    return await this.TransactionService.update(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
