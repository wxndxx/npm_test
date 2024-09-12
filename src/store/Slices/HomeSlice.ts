import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface IHomeState {
    modal: boolean,
}

const initialState: IHomeState = {
  modal: false,
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onChangeModal: (state: IHomeState, action: PayloadAction<string | any>) => {
            state.modal = action.payload
        },
    }
})

export const { 
    onChangeModal,
} = homeSlice.actions

export default homeSlice.reducer