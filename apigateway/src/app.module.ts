import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {JwtModule} from "@nestjs/jwt";
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      max:100, //max no of keys
      ttl:5000, //milliseconds
      isGlobal:true
    }),
    JwtModule.register({
    secret: 'your-secret-key', // Configure your secret here
    signOptions: { expiresIn: '1h' }, // Configure token expiration
  }),],
  controllers: [AppController],
  providers: [AppService
    ,{
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
