import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderModel } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order/order.service';
@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
})
export class OrdersListComponent {
  orders: OrderModel[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService
      .getOrdersByUsername(localStorage.getItem('authName') || '')
      .subscribe({
        next: (response: any) => {
          const apiResponse = response as {
            $id: string;
            $values: OrderModel[];
          };
          this.orders = apiResponse.$values;
        },
      });
  }
}
