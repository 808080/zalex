import { bindActionCreators } from '@reduxjs/toolkit';
import { dispatch } from '.';
import { requestActions } from './reducers/requestSlice';
import { modalActions } from './reducers/modalSlice';

const actions = bindActionCreators({ ...requestActions, ...modalActions }, dispatch);

export const {
  createRequest,
  updateRequest,
  cahceRequests,
  setModalContent,
} = actions;