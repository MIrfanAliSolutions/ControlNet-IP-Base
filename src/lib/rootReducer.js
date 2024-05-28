/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';

export const rootReducer = combineReducers({
  auth: authReducer,

});
