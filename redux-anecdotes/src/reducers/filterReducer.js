import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterSetter(state, action) {
      return action.payload;
    },
  },
});

export const { filterSetter } = filterSlice.actions;
export default filterSlice.reducer;
