import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("developer_Cart");
  //   console.log("🚀 ~ file: cart_context.jsx:9 ~ getLocalCartData ~ localCartData:", localCartData);

  if (localCartData === null) {
    return [];
  }

  return JSON.parse(localCartData);
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to increment and decrement product Quantity
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  //   to clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // To store the data in localStorage
  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });

    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("developer_Cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrement }}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
