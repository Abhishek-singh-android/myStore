import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext(); // step 1

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  // step2
  isLoading: false,
  isError: false,
  products: [],     // step11
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  isSingleError: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // step3

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" }); // step4
    // console.log("response: ",res);
    try {
      const res = await axios.get(url); // step6
      const products = await res.data;
      // console.log("Products:", products);
      dispatch({ type: "SET_API_DATA", payload: products }); // step7
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url); // step6
      const singleProduct = await res.data;
      console.log("API Single Data: ", singleProduct);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider> //step10
  );
};

// custom hook

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
