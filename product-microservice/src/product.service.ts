import {  Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  private products: any[];

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const filePath = path.resolve(__dirname, '../products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    this.products = JSON.parse(data);
  }

  getHello(): string {
    return 'Hello World!';
  }


  getProducts():any[]{
    return this.products;
  }



}
