import { ProductModel } from '../models/product.model';

export interface CartItem {
  productId: number;
  product: ProductModel;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
};
