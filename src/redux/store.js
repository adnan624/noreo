import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "../redux/productSlice/productListSlice";

const store = configureStore({
  reducer: {
    productList: ProductListReducer,
  },
});

export default store;
