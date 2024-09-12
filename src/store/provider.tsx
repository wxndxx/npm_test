"use client"

import { AppStore, makeStore } from './store'
import { Provider } from 'react-redux'
import React, { useRef } from 'react'

export function ReduxProvider({children}: {children: React.ReactNode}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
    }
  
    return (
        <Provider store={makeStore()}>{children}</Provider>
    )
}