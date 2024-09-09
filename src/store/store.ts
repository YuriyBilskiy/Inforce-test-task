import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/Product/productSlice';
import commentReducer from '../features/Comment/commentSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch