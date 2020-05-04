import { useReducer, useEffect } from "react"
import appReducer from "../reducers/appReducer"
import {
  getLocalStorageItem,
  setLocalStorageItem,
  itemInList,
} from "../utils/common"
import { UPDATE_CART } from "../types"

const initialState = {
  cart: [],
}
const GATSBY_ECOMMERCE_CART = "gatsby_ecommerce_cart"

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    _initCart()
  }, [])

  const _initCart = () => {
    try {
      let cart = getLocalStorageItem(GATSBY_ECOMMERCE_CART) || []
      dispatch({ type: UPDATE_CART, payload: cart })
    } catch (err) {
      console.log("err", err)
    }
  }

  const addToCart = product => {
    const currentCart = getLocalStorageItem(GATSBY_ECOMMERCE_CART)

    let updatedCart = [...currentCart]
    const productExists = itemInList(product, currentCart)
    if (productExists) {
      updatedCart = updatedCart.map(current => {
        if (current.id === product.id) {
          return {
            ...current,
            qty: parseInt(current.qty) + parseInt(product.qty),
          }
        } else {
          return product
        }
      })
    } else {
      updatedCart = [...updatedCart, product]
    }

    setLocalStorageItem(GATSBY_ECOMMERCE_CART, JSON.stringify(updatedCart))

    // dispatch event
    dispatch({ type: UPDATE_CART, payload: updatedCart })
  }

  const increaseQty = product => {
    const currentCart = getLocalStorageItem(GATSBY_ECOMMERCE_CART)
    const updatedCart = currentCart.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          qty: item.qty + 1,
        }
      } else {
        return item
      }
    })
    setLocalStorageItem(GATSBY_ECOMMERCE_CART, JSON.stringify(updatedCart))
    dispatch({ type: UPDATE_CART, payload: updatedCart })
  }

  const decreaseQty = product => {
    const currentCart = getLocalStorageItem(GATSBY_ECOMMERCE_CART)
    const updatedCart = currentCart.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          qty: item.qty - 1,
        }
      } else {
        return item
      }
    })
    setLocalStorageItem(GATSBY_ECOMMERCE_CART, JSON.stringify(updatedCart))
    dispatch({ type: UPDATE_CART, payload: updatedCart })
  }

  const removeFromCart = id => {
    const currentCart = getLocalStorageItem(GATSBY_ECOMMERCE_CART)
    const updatedCart = currentCart.filter(item => {
      if (item.id !== id) {
        return item
      } else return null
    })
    setLocalStorageItem(GATSBY_ECOMMERCE_CART, JSON.stringify(updatedCart))
    dispatch({ type: UPDATE_CART, payload: updatedCart })
  }

  return {
    cart: state.cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  }
}

export { useApp }
