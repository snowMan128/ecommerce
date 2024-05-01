/*
 *
 * Cart reducer
 *
 */

import cookie from 'react-cookies';

import {
  FETCH_CART,
  FETCH_IN_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL
} from './constants';

const initialState = {
  cartItems: [],
  itemsInCart: [],
  cartTotal: 0
};

const cartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case FETCH_CART:
      newState = {
        ...state,
        cartItems: action.payload
      };
      return newState;
    case FETCH_IN_CART:
      newState = {
        ...state,
        itemsInCart: action.payload
      };
      return newState;
    case HANDLE_CART_TOTAL:
      newState = {
        ...state,
        cartTotal: action.payload
      };
      cookie.save('cartTotal', newState.cartTotal, { path: '/' });
      return newState;
    case ADD_TO_CART:
      newState = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        itemsInCart: [...state.itemsInCart, action.payload._id]
      };
      cookie.save('cart', newState.cartItems, { path: '/' });
      cookie.save('InCart', newState.itemsInCart, { path: '/' });
      return newState;
    case REMOVE_FROM_CART:
      let itemIndex = state.cartItems.findIndex(
        x => x._id == action.payload._id
      );
      newState = {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, itemIndex),
          ...state.cartItems.slice(itemIndex + 1)
        ],
        itemsInCart: [
          ...state.itemsInCart.slice(0, itemIndex),
          ...state.itemsInCart.slice(itemIndex + 1)
        ]
      };
      cookie.save('cart', newState.cartItems, { path: '/' });
      cookie.save('InCart', newState.itemsInCart, { path: '/' });
      return newState;
    default:
      return state;
  }
};

export default cartReducer;
