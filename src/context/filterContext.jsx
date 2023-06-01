import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  // console.log("🚀 ~ file: filterContext.jsx:16 ~ FilterContextProvider ~ products:", products);

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set grid View
  const setGridView = () => {
    dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set list View
  const setListView = () => {
    dispatch({ type: "SET_LIST_VIEW" });
  };

  // function for getting the sorting order of product List
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update Filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // sorting the products list
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  // to clear the filters
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
