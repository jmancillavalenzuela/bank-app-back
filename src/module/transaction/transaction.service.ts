import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(TransactionDto: TransactionDto): Promise<Transaction> {
    return await this.transactionModel.create(TransactionDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find({ status: ENTITY_STATUS.ENABLED }).exec();
  }

  async findById(id: Types.ObjectId): Promise<TransactionDto> {
    const Transaction = await this.transactionModel.findOne({
      _id: id,
      status: ENTITY_STATUS.ENABLED,
    });
    if (Transaction === undefined || Transaction === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'no se encuentra el objeto indicado',
        },
        404,
      );
    }
    return Transaction;
  }

  async update(TransactionDto: TransactionDto) {
    try {
      const Transaction = await this.transactionModel.findById(
        TransactionDto._id,
      ); // revisar
      if (Transaction === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'no se encuentra el objeto indicado',
          },
          404,
        );
      } else {
        return await this.transactionModel
          .updateOne({ _id: TransactionDto._id }, TransactionDto) // revisar
          .catch((err) => {
            throw new HttpException(
              {
                message: err.message,
              },
              HttpStatus.BAD_REQUEST,
            );
          });
      }
    } catch (error) {
      return error;
    }
  }

  async remove(_id: Types.ObjectId) {
    try {
      const res = await this.transactionModel.deleteOne({ _id: _id });
      return res;
    } catch (error) {
      return error;
    }
  }
}
