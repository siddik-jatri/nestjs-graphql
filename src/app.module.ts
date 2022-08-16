import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { config } from "./config";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/npg'),
    TaskModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ config ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
