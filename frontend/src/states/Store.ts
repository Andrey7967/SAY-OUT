import { configureStore } from '@reduxjs/toolkit';
import componentsSlice from './Slice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
export const Store = configureStore({
  reducer: {
    app: componentsSlice,
  },
});

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof Store.getState>
> = useSelector;
export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
