import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './module/account/account.module';
import { TransactionModule } from './module/transaction/transaction.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://develop:Develop2021@cluster0.8sd5e.mongodb.net/ripleyApp',
    ),
    AccountModule,
    TransactionModule,
    ConfigModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
