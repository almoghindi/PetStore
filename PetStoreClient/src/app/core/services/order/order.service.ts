import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SERVER_URL } from '../../../app.config';
import { CartItem } from '../../store/cart.state';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    @Inject(SERVER_URL) private baseUrl: string
  ) {}
  addOrder(order: OrderModel): Observable<OrderModel> {
    return this.http
      .post<OrderModel>(this.baseUrl + 'Order/AddOrder', order)
      .pipe(map((response) => response));
  }
  getOrdersByUsername(username: string): Observable<OrderModel[]> {
    return this.http
      .get<OrderModel[]>(this.baseUrl + 'Order/' + username)
      .pipe(map((response) => response));
  }
  getCartItemsByOrderId(orderId: string): Observable<CartItem[]> {
    return this.http
      .get<CartItem[]>(this.baseUrl + 'Order/GetCartItemsByOrderId/' + orderId)
      .pipe(map((response) => response));
  }
  getOrderById(orderId: string): Observable<OrderModel> {
    return this.http
      .get<OrderModel>(this.baseUrl + 'Order/GetOrderById/' + orderId)
      .pipe(map((response) => response));
  }
}
