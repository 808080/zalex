import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalContentType } from '../../components/Modal/ModalContent';

type ModalState = { contentType: ModalContentType | null };

const initialState: ModalState = {
  contentType: null
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalContent(state, { payload }: PayloadAction<ModalState['contentType']>) {
      state.contentType = payload;
    }
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;