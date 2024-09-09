import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export interface CommentType {
  id: string,
  productId: string,
  description: string,
  date: string,
}
export interface CommentState {
  comments: CommentType[],
  status: 'idle' | 'loading' | 'failed'

}
const initialState: CommentState = {
  comments: [],
  status: 'idle',

}

const API_URL_COMMENTS = 'http://localhost:3001/comments';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await axios.get(API_URL_COMMENTS)
  return response.data;
})

export const addingComment = createAsyncThunk('comments/addComment',  async (newComment: CommentType) => {
  const response = await axios.post(API_URL_COMMENTS, newComment)
  return response.data;
})

export const removingComment = createAsyncThunk('comments/removeComments', async (commentId: string) => {
  await axios.delete(`${API_URL_COMMENTS}/${commentId}`)
  return commentId
})
export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {}, 
extraReducers: (builder) => {
  builder
  .addCase(fetchComments.pending, (state) => {
    state.status = 'loading';
  })
  .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
    state.status = 'idle';
    state.comments = action.payload;
  })

  .addCase(fetchComments.rejected, (state) => {
    state.status = 'failed';
  })

  .addCase(addingComment.fulfilled, (state, action: PayloadAction<CommentType>) => {
    state.comments.push(action.payload)
  })
  .addCase(removingComment.fulfilled, (state, action: PayloadAction<string>) => {
    state.comments = state.comments.filter(comment => comment.id !== action.payload);
})
}
})

export default commentSlice.reducer