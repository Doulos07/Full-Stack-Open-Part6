// reducers/notificationReducer.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

export const notification = (message, timeSg) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeSg * 1000);
  };
};

export default notificationSlice.reducer;
