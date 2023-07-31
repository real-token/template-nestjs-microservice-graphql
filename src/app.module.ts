import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {YogaDriver, YogaDriverConfig} from "@graphql-yoga/nestjs";
import {GraphQLModule} from "@nestjs/graphql";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
