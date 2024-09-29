import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';


@Controller()
export class AppController {
  constructor(private readonly userService : UserService
  ) {}


  @MessagePattern({ cmd: 'login' })
  @Post()
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ){
    const isAuthenticated = await this.userService.authenticate(username, password);
    if (isAuthenticated) {
      return { success: true, message: 'login successful' };
   }
    else {
      return { success: false, message: 'login failed' };
    }
  }


}
