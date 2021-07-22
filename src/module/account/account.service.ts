import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/status/status.enum';
import { AccountDto } from './dto/account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(AccountDto: AccountDto): Promise<Account> {
    return await this.accountModel.create(AccountDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find({ status: ENTITY_STATUS.ENABLED }).exec();
  }

  async findById(id: Types.ObjectId): Promise<AccountDto> {
    const Account = await this.accountModel.findOne({
      _id: id,
      status: ENTITY_STATUS.ENABLED,
    });
    if (Account === undefined || Account === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'no se encuentra el objeto indicado',
        },
        404,
      );
    }
    return Account;
  }

  async findByRut(rut: string): Promise<AccountDto> {
    const Account = await this.accountModel.findOne({
      rut: rut,
      status: ENTITY_STATUS.ENABLED,
    });
    if (Account === undefined || Account === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'no se encuentra el objeto indicado',
        },
        404,
      );
    }
    return Account;
  }

  async update(AccountDto: AccountDto) {
    try {
      const Account = await this.accountModel.findById(AccountDto._id); // revisar
      if (Account === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'no se encuentra el objeto indicado',
          },
          404,
        );
      } else {
        return await this.accountModel
          .updateOne({ _id: AccountDto._id }, AccountDto) // revisar
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
      const res = await this.accountModel.deleteOne({ _id: _id });
      return res;
    } catch (error) {
      return error;
    }
  }
}
