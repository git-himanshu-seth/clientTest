import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "../../services/product.services";

const initialState = {
  value: null,
  products: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getProductList = createAsyncThunk(
  "product",
  async (action, { rejectWithValue }) => {
    try {
      const res = await productServices.getProducts(action);
      if (res) {
        return res.map((product) => {
          return {
            value: product._id,
            label: product.productName,
            rate: product.rate,
            unit: product.unit,
          };
        });
      } else {
        return rejectWithValue(res?.meta?.message);
      }
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
        state.error = "";
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
