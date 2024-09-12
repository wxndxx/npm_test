import { ICatalog } from '@/shared/types/Cataloge'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface ICatalogeState {
    width: 'desktop' | 'tablet' | 'mobile',
    model: string | any,
    brand: string | any,
    generation: string | any,
    catalog: null | ICatalog[]
}

const initialState: ICatalogeState = {
  width: 'desktop',
  model: '',
  brand: '',
  generation: '',
  catalog: null
}

export const catalogeSlice = createSlice({
    name: 'cataloge',
    initialState,
    reducers: {
        onChangeModel: (state: ICatalogeState, action: PayloadAction<string | any>) => {
            state.model = action.payload
        },
        onChangeBrand: (state: ICatalogeState, action: PayloadAction<string | any>) => {
            state.brand = action.payload
        },
        onChangeGeneration: (state: ICatalogeState, action: PayloadAction<string | any>) => {
            state.generation = action.payload
        },
        pushCatalog: (state: ICatalogeState, action:PayloadAction<ICatalog[]>) => {
            state.catalog?.push(...action.payload)
        },
        spliceCatalog: (state: ICatalogeState, action:PayloadAction<{index: number, range: number}>) => {
            state.catalog?.splice(action.payload.index, action.payload.range)
        },
        onChangeCatalog: (state: ICatalogeState, action:PayloadAction<ICatalog[]>) => {
            state.catalog = action.payload
        }
    }
})

export const { 
    onChangeModel,
    onChangeBrand,
    pushCatalog,
    spliceCatalog,
    onChangeGeneration,
    onChangeCatalog,
} = catalogeSlice.actions

export default catalogeSlice.reducer