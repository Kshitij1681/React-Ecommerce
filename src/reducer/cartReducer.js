const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;
      // console.log("🚀 ~ file: cartReducer.js:5 ~ cartReducer ~ product:", product);

      // handle the existing product
      let existingProduct = state.cart.find((curr) => curr.id === id + color);

      if (existingProduct) {
        let updatedCart = state.cart.map((curr) => {
          if (curr.id === id + color) {
            return {
              ...curr,
              amount: curr.amount + amount >= curr.max ? curr.max : curr.amount + amount,
            };
          } else {
            return curr;
          }
        });

        return { ...state, cart: updatedCart };
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return { ...state, cart: [...state.cart, cartProduct] };
      }

    case "SET_DECREMENT":
      let updatedProduct = state.cart.map((curr) => {
        if (curr.id === action.payload) {
          let decrementAmount = curr.amount - 1 >= 1 ? curr.amount - 1 : 1;

          return { ...curr, amount: decrementAmount };
        } else {
          return curr;
        }
      });

      return { ...state, cart: updatedProduct };

    case "SET_INCREMENT":
      let updatedItems = state.cart.map((curr) => {
        if (curr.id === action.payload) {
          let IncrementAmount = curr.amount + 1 <= curr.max ? curr.amount + 1 : curr.max;

          return { ...curr, amount: IncrementAmount };
        } else {
          return curr;
        }
      });

      return { ...state, cart: updatedItems };

    case "REMOVE_ITEM":
      let updatedCart = state.cart.filter((curr) => curr.id !== action.payload);

      return { ...state, cart: updatedCart };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    /*  
    case "CART_TOTAL_ITEM":
      let updatedItemValue = state.cart.reduce((init, currElem) => {
        let { amount } = currElem;
        init += amount;

        return init;
      }, 0);

      return { ...state, total_item: updatedItemValue };
    case "CART_TOTAL_PRICE":
      let updatedItemVal = state.cart.reduce((init, curr) => {
        let { price, amount } = curr;
        init += price * amount;
        return init;
      }, 0);

      return { ...state, total_price: updatedItemVal };

    */

    case "CART_ITEM_PRICE_TOTAL":
      let { total_price, total_item } = state.cart.reduce(
        (accum, currElem) => {
          let { amount, price } = currElem;

          accum.total_item += amount;
          accum.total_price += price * amount;

          return accum;
        },
        { total_price: 0, total_item: 0 }
      );

      return { ...state, total_item, total_price };

    default:
      return state;
  }
};

export default cartReducer;
