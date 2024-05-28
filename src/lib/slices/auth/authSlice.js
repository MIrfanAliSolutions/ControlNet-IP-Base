import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  balance: 1950,
  isWatermarked: true,
  isBuzz:false
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
    setBuzzToTrue: (state, { payload }) => {
      state.isBuzz = true;
    },
    setBuzzToFalse: (state, { payload }) => {
      state.isBuzz = false;
    }
  },
});

export const {
  toggleLogin, updateBalance, updateWaterMarked, resetWaterMarked, setBuzzToTrue, setBuzzToFalse
} = authSlice.actions;

export default authSlice.reducer;
