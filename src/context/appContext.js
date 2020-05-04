import React, { createContext } from "react"

const AppContext = createContext({
  cart: [],
  addToCart: () => {
    console.log("default value")
  },
  updateCart: () => {},
})

export default AppContext
