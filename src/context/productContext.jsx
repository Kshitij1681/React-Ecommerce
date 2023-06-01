import React, { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = res.data;
      // console.log("🚀 ~ file: productContext.jsx:25 ~ getProducts ~ products:", products);

      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (err) {
      console.log("🚀 ~ file: productContext.jsx:29 ~ getProducts ~ err:", err);

      dispatch({ type: "API_ERROR" });
    }
  };

  // API call for single product
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      console.log("🚀 ~ file: productContext.jsx:41 ~ getSingleProduct ~ error:", error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>;
};

// custom CustomHook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
