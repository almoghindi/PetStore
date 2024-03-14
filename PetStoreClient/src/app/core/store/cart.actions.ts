import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../models/product.model';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: ProductModel; quantity?: number }>()
);

export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: number; quantity: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ itemId: number }>()
);

export const resetCartState = createAction('[Cart] Reset State');
