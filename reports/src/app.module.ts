import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ReportsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
