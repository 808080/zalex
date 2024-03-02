import { combineReducers } from '@reduxjs/toolkit';
import requestReducer from './requestSlice';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
  request: requestReducer,
  modal: modalReducer
});

export default rootReducer;