import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    BackofficeModule,
  ],
})
export class AppModule { }
