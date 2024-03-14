import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CartState } from '../../../core/store/cart.state';
import { resetCartState } from '../../../core/store/cart.actions';
import { OrderService } from '../../../core/services/order/order.service';
import { OrderModel } from '../../../core/models/order.model';
@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {
  order: OrderModel;

  deliveryOption: string = '';
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private router: Router,
    private store: Store<{ cart: CartState }>,
    private orderService: OrderService
  ) {
    this.order = new OrderModel();
  }
  ngOnInit(): void {
    this.order.username = localStorage.getItem('authName') || '';

    this.store
      .select((state) => state.cart)
      .pipe(take(1))
      .subscribe((cart) => {
        this.order.cartItems = cart.items;
        this.order.totalPrice = cart.total;
      });
  }
  onSubmit(formValues: any) {
    this.orderService.addOrder(this.order).subscribe({
      next: () => {
        alert('Thank you for your order!');
        this.store.dispatch(resetCartState());
        this.router.navigate(['/orders']);
      },
    });
  }
}
