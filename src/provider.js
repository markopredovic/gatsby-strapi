import React from "react"
import AppContent from "./context/appContext"
import { useApp } from "./hooks/useApp"

const AppContextProvider = ({ children }) => {
  const { cart, addToCart, increaseQty, decreaseQty, removeFromCart } = useApp()

  return (
    <AppContent.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </AppContent.Provider>
  )
}

export { AppContextProvider }
