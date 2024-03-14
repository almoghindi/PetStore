import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { addToCart, updateItemQuantity } from '../../core/store/cart.actions';

import { CartItem, CartState } from '../../core/store/cart.state';
import { ProductModel } from '../../core/models/product.model';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.total$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      )
    );
  }

  incrementQuantity(product: ProductModel): void {
    this.store.dispatch(addToCart({ item: product }));
  }

  decrementQuantity(itemId: number): void {
    this.store.dispatch(updateItemQuantity({ itemId, quantity: -1 }));
  }

  handleCheckout(): void {
    if (!localStorage.getItem('authName')) {
      alert('You must be logged in to checkout.');
      this.router.navigate(['/login']);
      return;
    }

    this.cartItems$
      .pipe(
        first(),
        tap((cartItems) => {
          if (cartItems.length === 0) {
            alert('Your cart is empty.');
          } else {
            this.router.navigate(['/pay']);
          }
        })
      )
      .subscribe();
  }
}
