// calculatorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billAmount: 0,
  tipAmount: 0,
  numOfPeople: 1,
  useCustomTip: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    updateBillAmount: (state, action) => {
      state.billAmount = action.payload;
    },
    updateTipAmount: (state, action) => {
      state.tipAmount = action.payload;
    },
    updateNumOfPeople: (state, action) => {
      state.numOfPeople = action.payload;
    },
    updateUseCustomTip: (state, action) => {
      state.useCustomTip = action.payload;
    },
  },
});

export const {
  updateBillAmount,
  updateTipAmount,
  updateNumOfPeople,
  updateUseCustomTip,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;
