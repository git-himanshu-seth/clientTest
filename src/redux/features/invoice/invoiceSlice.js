import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoiceServices } from "../../services/invoice.services";
// import { commonFunctions } from "../../../assets/commonFunction";

const initialState = {
  value: null,
  status: "idle",
  error: null,
};

export const gnerateInvoice = createAsyncThunk(
  "department",
  async (action, { rejectWithValue }) => {
    try {
      const res = await invoiceServices.createinvoice(action);
      if (res) {
        console.log(res);
        // commonFunctions.success(res.meta.message);
        return res.data;
      } else {
        return rejectWithValue(res?.meta?.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gnerateInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(gnerateInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(gnerateInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
