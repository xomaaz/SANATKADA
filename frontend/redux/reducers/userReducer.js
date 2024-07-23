import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({
  loading: false, // first set of brackets: initial state
}, (builder) => { // second set of brackers: function for builder 
  builder.addCase("loginRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.message = action.payload;
  });
  builder.addCase("loginFail", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
})
