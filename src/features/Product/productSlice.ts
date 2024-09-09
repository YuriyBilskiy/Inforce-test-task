import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export interface ProductType {
  id: string,
  name: string,
  count: number,
  imageUrl: string,
  size: {width: number; height: number}
  weight: string,
}
export interface ProductState {
  products: ProductType[],
  productDetails: ProductType | null,
  status: 'idle' | 'loading' | 'failed',
}

const initialState: ProductState = {
  products: [],
  productDetails: null,
  status: 'idle'
}
const API_URL = 'http://localhost:3001/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data
})

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: ProductType) => {
  const response = await axios.post(API_URL, newProduct);
  return response.data;
});

export const removeProduct = createAsyncThunk('products/removeProducts', async (productId: string) => {
  await axios.delete(`${API_URL}/${productId}`)
  return productId;
})

export const updateProduct = createAsyncThunk('product/updateProducts', async (updateProduct: ProductType) => {
  const response = await axios.put(`${API_URL}/${updateProduct.id}`, updateProduct)
  return response.data;
})



const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
      setProductDetails(state, action: PayloadAction<string>) {
          const product = state.products.find(product => product.id === action.payload);
          if (product) {
              state.productDetails = product;
          }
      },
      updateProductDetails(state, action: PayloadAction<ProductType>) {
          state.productDetails = action.payload;
      },
      
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchProducts.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
              state.status = 'idle';
              state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state) => {
              state.status = 'failed';
          })
          .addCase(addProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
              state.products.push(action.payload);
          })
          .addCase(removeProduct.fulfilled, (state, action: PayloadAction<string>) => {
              state.products = state.products.filter(product => product.id !== action.payload);
          })
          .addCase(updateProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
              const index = state.products.findIndex(product => product.id === action.payload.id);
              if (index !== -1) {
                  state.products[index] = action.payload;
              }
          });
  },
});


export const {setProductDetails , updateProductDetails} = productSlice.actions

export default productSlice.reducer