import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice"; // Import your calculatorSlice

const store = configureStore({
  reducer: {
    calculator: calculatorReducer, // Add your calculatorSlice reducer here
    // Add other slices' reducers here if you have them
  },
});

export default store;
