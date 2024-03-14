import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  updateItemQuantity,
  removeFromCart,
  resetCartState,
} from './cart.actions';
import { initialCartState, CartState } from './cart.state';

export const cartReducer = createReducer<CartState>(
  initialCartState,
  on(addToCart, (state, { item, quantity = 1 }) => {
    const existingItemIndex = state.items.findIndex(
      (i) => i.product.productId === item.productId
    );
    let updatedItems = [...state.items];
    if (existingItemIndex >= 0) {
      let updatedItem = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, { productId: item.productId, product:item, quantity }];
    }
    return {
      ...state,
      items: updatedItems,
      total: updatedItems.reduce(
        (total, currentItem) =>
          total + currentItem.product.price * currentItem.quantity,
        0
      ),
    };
  }),
  on(updateItemQuantity, (state, { itemId, quantity }) => {
    const itemIndex = state.items.findIndex(
      (i) => i.product.productId === itemId
    );
    if (itemIndex >= 0) {
      const item = state.items[itemIndex];
      const updatedQuantity = item.quantity + quantity;

      let updatedItems = [...state.items];
      if (updatedQuantity <= 0) {
        updatedItems.splice(itemIndex, 1);
      } else {
        updatedItems[itemIndex] = { ...item, quantity: updatedQuantity };
      }

      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce(
          (total, currentItem) =>
            total + currentItem.product.price * currentItem.quantity,
          0
        ),
      };
    } else {
      return state;
    }
  }),
  on(removeFromCart, (state, { itemId }) => {
    return {
      ...state,
      items: state.items.filter((item) => item.product.productId !== itemId),
      total: state.items.reduce(
        (total, item) =>
          item.product.productId !== itemId
            ? total + item.product.price * item.quantity
            : total,
        0
      ),
    };
  }),
  on(resetCartState, () => ({ ...initialCartState }))
);
