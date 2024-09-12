import { IUser } from '@/shared/types/Profile'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface IProfileState {
  width: 'desktop' | 'tablet' | 'mobile',
  isAuth: boolean,
  user: IUser | null
  modal: boolean,
  orders: null | any,
  notifications: null | any,
  modalLink: string | null,
}

const initialState: IProfileState = {
  width: 'desktop',
  isAuth: false,
  modal: false,
  modalLink: null,
  user: null,
  orders: null,
  notifications: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state: IProfileState, action: PayloadAction<IUser | null>) => {
          state.user = action.payload
        },
        setModal: (state: IProfileState, action: PayloadAction<boolean>) => {
          state.modal = action.payload
        },
        setAuth: (state: IProfileState, action: PayloadAction<boolean>) => {
          state.isAuth = action.payload
        },
        setNotifications: (state: IProfileState, action: PayloadAction<null | any>) => {
          state.notifications = action.payload
        },
        setOrders: (state: IProfileState, action: PayloadAction<null | any>) => {
          state.orders = action.payload
        },
        setModalLink: (state: IProfileState, action: PayloadAction<null | string>) => {
          state.modalLink = action.payload
        },
    }
})

export const { 
  setUser,
  setModal,
  setAuth,
  setModalLink,
  setOrders,
  setNotifications
} = profileSlice.actions

export default profileSlice.reducer