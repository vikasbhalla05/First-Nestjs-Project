import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly ProductsServices: ProductsService) {}

  @Post('add-product')
  addProducts(
    @Body() Body: { title: string; description: string; price: number },
  ) {
    const { title, description, price } = Body;

    const getId = this.ProductsServices.addProduct(title, description, price);
    return { id: getId };
  }

  @Get('get-product')
  getAllProducts() {
    return this.ProductsServices.getAllProducts();
  }

  @Get('get-product/:id')
  getProduct(@Param('id') id: string) {
    return this.ProductsServices.getProduct(id);
  }

  @Patch('update-product/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() Body: { title: string; description: string; price: number },
  ) {
    return this.ProductsServices.updateProduct(id, Body);
  }

  @Delete('delete-product/:id')
  removeProduct(@Param('id') id: string) {
    return this.ProductsServices.deleteProduct(id);
  }
}
