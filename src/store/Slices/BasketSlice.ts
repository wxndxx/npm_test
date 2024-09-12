import { IBasket } from '@/shared/types/Basket'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface IBasketState {
    basket: IBasket | null,
    status: boolean,
    sum: number
}

const initialState: IBasketState = {
    basket: null,
    status: false,
    sum: 0,
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        onChangeBasket: (state: IBasketState, action: PayloadAction<any>) => {
            //
            state.basket = action.payload
        },
        onChangeStatus: (state: IBasketState, action: PayloadAction<boolean>) => {
            state.status = action.payload
        },
        onChangeSum: (state: IBasketState, action: PayloadAction<number>) => {
            state.sum = action.payload
        },
        onChangeProduct: (state: IBasketState, action: PayloadAction<any>) => {
            if(state.basket) {
                state.basket.products = [...state.basket?.products, action.payload]
            }
        },
        onChangeProductVal: (state: IBasketState, action: PayloadAction<{id: number, quantity: number}>) => {
            if(state.basket) {
                //
                let index = state.basket.products.findIndex((obj:any) => obj.sklad.id === action.payload.id);
                if(index != -1){
                     state.basket.products[index].quantity = action.payload.quantity
                }
            }
        },
        onChangeService: (state: IBasketState, action: PayloadAction<any>) => {
            if(state.basket) {
                state.basket = {...state.basket, appointments:[...state.basket?.appointments, action.payload]}
            }
        },
        onChangeServiceVal: (state: IBasketState, action: PayloadAction<{id: number, quantity: number}>) => {
            if(state.basket) {
                //
                let index = state.basket.appointments.findIndex((obj:any) => obj.service.id === action.payload.id);
                state.basket.appointments[index].quantity = action.payload.quantity
            }
        },
    }
})

export const { 
    onChangeBasket,
    onChangeSum,
    onChangeStatus,
    onChangeProduct,
    onChangeServiceVal,
    onChangeService,
    onChangeProductVal,
} = basketSlice.actions

export default basketSlice.reducer