import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../mockDB/requests';

const initialState: Request[] = [];

export const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest(state, action: PayloadAction<Request>) {
      state.push(action.payload);
    },
    updateRequest(state, action: PayloadAction<any>) {

    },
  },
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;