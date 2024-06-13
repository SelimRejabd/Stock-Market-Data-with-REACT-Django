import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stock/slice/StockSlice';

export const store = configureStore({
    reducer: {
        stocks: stockReducer,
    },
});
