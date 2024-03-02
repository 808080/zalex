import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Request, addRequest, putRequest } from '../../mockDB/requests';

const initialState: {
  requests: Request[]
} = { requests: [] };

export const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    createRequest(state, action: PayloadAction<Request>) {
      state.requests.push(action.payload);
      addRequest(action.payload);
    },
    updateRequest(state, action: PayloadAction<Request>) {
      const index = state.requests.findIndex(r => r.id === action.payload.id);
      state.requests[index] = action.payload;
      putRequest(action.payload);
    },
    cahceRequests(state, action: PayloadAction<Request[]>) {
      state.requests = action.payload;
    }
  },
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;