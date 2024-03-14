import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<ProductModel[]>([]);

  getCartItems(): Observable<ProductModel[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: ProductModel) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next([...currentItems, product]);
  }
}
