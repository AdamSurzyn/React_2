import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const bankSlice = createSlice({
  name: "bank",
  initialState: {
    amount: 0,
  },
  reducers: {
    increase: (state, action: PayloadAction<number>) => {
      state.amount = state.amount + action.payload;
    },
    decrease: (state, action: PayloadAction<number>) => {
      state.amount = state.amount - action.payload;
    },
  },
});

export const { increase, decrease } = bankSlice.actions;
export const { login, logout } = loginSlice.actions;
export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    bank: bankSlice.reducer,
  },
});
