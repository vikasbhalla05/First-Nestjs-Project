import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  addProduct(title: string, desc: string, price: number) {
    const prodId: string = new Date().toString();

    const newProduct = new Product(new Date().toString(), title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product Not Found with ID : ${id}`);
    }
    return { ...product };
  }

  updateProduct(id: string, Query: any) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product Not Found with ID : ${id}`);
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...Query,
    };

    this.products[productIndex] = updatedProduct;

    return { ...updatedProduct };
  }

  deleteProduct(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product Not Found with ID : ${id}`);
    }

    this.products.splice(productIndex, 1);
    return { message: 'Product Deleted' };
  }
}
