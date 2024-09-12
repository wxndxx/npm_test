import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {combineReducers} from "@reduxjs/toolkit";
import ProfileSlice from './Slices/ProfileSlice'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import CatalogeSlice from './Slices/Catalogeslice';
import basket from './Slices/BasketSlice'
import home from './Slices/HomeSlice'

const combinedReducer = combineReducers({
  profile: ProfileSlice,
  cataloge: CatalogeSlice,
  basket,
  home
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export type RootState = ReturnType<typeof combinedReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper(makeStore, { debug: true });
export const useAppStore = useStore.withTypes<AppStore>()