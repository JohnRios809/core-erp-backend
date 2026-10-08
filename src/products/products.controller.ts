import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: { sku: string; name: string; brand: string; costPrice: number; salePrice: number }) {
    return this.productsService.createProduct(body);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}