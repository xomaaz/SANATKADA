import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({}, builder => {
  builder
    .addCase("updatePasswordRequest", (state) => {
    state.loading = true;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
    })
    .addCase("updatePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});