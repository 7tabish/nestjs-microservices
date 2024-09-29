import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private userClient: ClientProxy;
  private productClient: ClientProxy;
  private readonly logger;

  constructor() {
    this.logger =  new Logger(AppService.name);
    this.userClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });

    this.productClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    });

  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    this.logger.log("sending request to the user microservice.");
    return this.userClient.send({ cmd: 'login' }, { username, password }).toPromise();
  }

  getProducts(){
    this.logger.log("sending request to the product microservice.");
    var products =  this.productClient.send({cmd:'getProducts'},{});
    return products;
  }



}

