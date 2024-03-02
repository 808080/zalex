import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

export const { dispatch } = store;
setupListeners(dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof dispatch;
export default store;