import { combineReducers } from "redux";
import productSlice from "./features/product/productSlice";
import invoiceSlice from "./features/invoice/invoiceSlice";
const appReducers = combineReducers({
  products: productSlice,
  invoice: invoiceSlice,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
