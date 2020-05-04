import React, { useContext, useState, Fragment } from "react"
import AppContext from "../context/appContext"
import { Table, Button } from "react-bootstrap"
import Img from "gatsby-image"
import Checkout from "../components/Checkout"
import { formatPrice } from "../utils/formatPrice"
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa"

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState(false)
  const context = useContext(AppContext)

  const increaseCart = id => {
    const currentProduct = context.cart.filter(item => item.id === id)[0]

    context.increaseQty(currentProduct)
  }

  const decreaseCart = id => {
    const currentProduct = context.cart.filter(item => item.id === id)[0]

    if (currentProduct.qty > 1) context.decreaseQty(currentProduct)
  }

  const removeFromCart = id => {
    context.removeFromCart(id)
  }

  const isCartEmpty = context.cart.length === 0

  const cartRows = context.cart.map(product => {
    return (
      <tr key={product.id}>
        <td className="l-cart-img">
          <Img fluid={product.thumbnail.childImageSharp.fluid} />
        </td>
        <td>{product.name}</td>
        <td>
          <div className="d-flex align-items-center">
            <span className="mr-2">{product.qty}</span>
            <div className="d-flex flex-column">
              <FaChevronUp onClick={() => increaseCart(product.id)} />
              <FaChevronDown onClick={() => decreaseCart(product.id)} />
            </div>
          </div>
        </td>
        <td>{formatPrice(product.price_in_cent)}</td>
        <td className="text-danger">
          <FaTrashAlt onClick={() => removeFromCart(product.id)} />
        </td>
      </tr>
    )
  })

  const _getTotal = () => {
    let total = 0

    total = context.cart.reduce((acc, current) => {
      return acc + current.price_in_cent * current.qty
    }, 0)

    return total
  }

  const total = _getTotal()

  return !isCartEmpty ? (
    <Fragment>
      <div className="l-cart-table">
        <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>{cartRows}</tbody>
          <tfoot>
            <tr>
              <td colSpan="5" align="right">
                <strong>Total: </strong> {formatPrice(total)}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <div className="l-cart-total">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="info" onClick={() => setShowCheckout(true)}>
            Initiate Checkout
          </Button>
        </div>
        {showCheckout && <Checkout />}
      </div>
    </Fragment>
  ) : (
    <p>Cart is empty</p>
  )
}

export default Cart
