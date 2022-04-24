import React from 'react'
import PagesStore from './pages.store'

export const stores = Object.freeze({
  pagesStore: new PagesStore()
})
export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
