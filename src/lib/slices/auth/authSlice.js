import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  balance: 1950,
  isWatermarked: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogin: (state, { payload }) => {
      state.isLogin = payload?.isLogin;
      state.userInfo = payload?.userInfo;
    },
    updateBalance: (state, { payload }) => {
      state.balance = payload;
    },
    updateWaterMarked: (state, { payload }) => {
      state.isWatermarked = false;
    },
    resetWaterMarked: (state, { payload }) => {
      state.isWatermarked = true;
    },
  },
});

export const {
  toggleLogin, updateBalance, updateWaterMarked, resetWaterMarked
} = authSlice.actions;

export default authSlice.reducer;
