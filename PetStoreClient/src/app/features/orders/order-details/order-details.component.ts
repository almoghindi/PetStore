import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItem } from './../../../core/store/cart.state';
import { ProductModel } from '../../../core/models/product.model';
import { OrderModel } from '../../../core/models/order.model';
import { ProductService } from '../../../core/services/product/product.service';
import { OrderService } from '../../../core/services/order/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  orderId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        this.total = response.totalPrice;
      },
    });

    this.orderService.getCartItemsByOrderId(this.orderId).subscribe({
      next: (response: any) => {
        const apiResponse = response as {
          $id: string;
          $values: CartItem[];
        };
        const productIds = apiResponse.$values.map(
          (cartItem) => cartItem.productId
        );
        this.cartItems = apiResponse.$values;

        this.productService.getProductsByIds(productIds).subscribe({
          next: (response: any) => {
            const apiResponse = response as {
              $id: string;
              $values: ProductModel[];
            };
            this.cartItems.forEach((cartItem) => {
              const foundProduct = apiResponse.$values.find(
                (product) => product.productId === cartItem.productId
              );
              if (foundProduct) {
                cartItem.product = foundProduct;
              }
            });
          },
        });
      },
    });
  }
}
