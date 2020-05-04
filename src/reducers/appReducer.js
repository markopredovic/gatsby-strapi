import { UPDATE_CART } from "../types"

const initialState = {
  cart: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return updateCart(state, action.payload)
    default:
      return state
  }
}

const updateCart = (state, cart) => {
  return {
    ...state,
    cart,
  }
}
