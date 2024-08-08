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
    })
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearError", (state) => {
    state.error = null;
  });

  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});