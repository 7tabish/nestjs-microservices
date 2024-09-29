import { Controller, Get, Query,UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }

  @MessagePattern({ cmd: 'getProducts' })
  @Get("products")
  getProducts() {
    return  this.productService.getProducts();
  }
}
