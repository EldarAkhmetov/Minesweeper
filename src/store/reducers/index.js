import { configureStore } from '@reduxjs/toolkit';
import minesReducer from './minesReducer';
import timeReducer from './timeReducer';
import gameReducer from './gameReducer';

export const store = configureStore({
  reducer: { minesReducer, timeReducer, gameReducer },
  devTools: process.env.NODE_ENV !== 'production'
});