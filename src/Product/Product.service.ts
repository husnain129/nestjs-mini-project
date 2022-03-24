import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './Product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = String(Math.random());
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    return { ...this.findProduct(id)[0] };
  }

  updateProduct(id: string, title: string, desc: string, price: number) {
    const [product, idx] = this.findProduct(id);
    const updateProduct = { ...product };
    if (title) updateProduct.title = title;
    if (desc) updateProduct.desc = desc;
    if (price) updateProduct.price = price;
    this.products[idx] = updateProduct;
    return updateProduct;
  }

  deleteProduct(id: string) {
    //   This will return index of product from Product Array
    const productIdx = this.findProduct(id)[1];
    this.products.splice(productIdx, 1);
    return 'Deleted Successfully';
  }

  private findProduct(id: string): [Product, number] {
    const productIDX = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIDX];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIDX];
  }
}
