import { Body, Controller, Get, Post,UseGuards, Logger,InternalServerErrorException} from '@nestjs/common';
import { AppService } from './app.service';
import {JwtService} from '@nestjs/jwt';
import {JwtAuthGuard} from './guards/jwt-auth.guard';


@Controller("client")
//@UseInterceptors(CacheInterceptor) //add chaching for all GET methods
export class AppController {
  private readonly logger;
  constructor(private readonly appService: AppService,
  private readonly jwtService:JwtService
) {
  this.logger = new Logger(AppController.name);
}


  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {

    try{
      const userServiceResponse = await this.appService.login(username, password);
      if(userServiceResponse.success){
        this.logger.log("login successfull, generating JWT");
        //sign the jwt token11
        const token = await this.jwtService.sign({username:username});
        this.logger.log("JWT generated successfully.");
        return token;
      }
      return userServiceResponse;
    }
    catch(error){
      this.logger.error("Error while login: "+error.stack);
      throw new InternalServerErrorException('Error while login');
    }
  }


@UseGuards(JwtAuthGuard)
@Get("products")
products(){
    this.logger.log("calling product service");
    var products =  this.appService.getProducts();
    return products;
  }
}
