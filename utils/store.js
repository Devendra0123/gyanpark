import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
  buyItem: Cookies.get('buyItem') ? JSON.parse(Cookies.get('buyItem')) : null,
  shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'BUY_ITEM': {
        const item = action.payload;
        Cookies.get('buyItem') ? Cookies.remove('buyItem') :  Cookies.set('buyItem', JSON.stringify(item));
        return {...state, buyItem : item}
    }
    case 'SAVE_SHIPPING_ADDRESS':  
         return {...state, shippingAddress : action.payload}
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
      case 'STORE_PAGE_NUMBER':
        return {
          ...state, storePageNumber: action.payload
        };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}