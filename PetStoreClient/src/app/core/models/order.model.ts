import { CartItem } from '../store/cart.state';
export class OrderModel {
  constructor(
    public orderId: number = 0,
    public username: string = '',
    public cartItems: CartItem[] = [],
    public totalPrice: number = 0
  ) {}
}
