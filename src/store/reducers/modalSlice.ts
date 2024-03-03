import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalContentType } from '../../components/Modal/ModalContent';

type ModalState = { contentType: ModalContentType | null, data?: any };

const initialState: ModalState = {
  contentType: null
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalContent(state, { payload }: PayloadAction<{ contentType: ModalState['contentType'], data?: any }>) {
      state.contentType = payload.contentType;
      state.data = payload.data;
    }
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;