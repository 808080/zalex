import { requestActions } from './reducers/requestSlice';

export const {
  addRequest,
  updateRequest
} = { ...requestActions };