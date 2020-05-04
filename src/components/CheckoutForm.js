import React, { useState, useEffect, useContext } from "react"
import { Form, Button, Spinner, Alert } from "react-bootstrap"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import AppContext from "../context/appContext"
import { formatPrice } from "../utils/formatPrice"

const CheckoutForm = () => {
  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("Calculate...")
  const [loading, setLoading] = useState(false)
  const [orderProceededMessage, setOrderProceededMessage] = useState(null)
  const context = useContext(AppContext)
  const stripe = useStripe()
  const elements = useElements()

  const cart =
    context &&
    context.cart.map(item => {
      return {
        id: item.strapiId,
        qty: item.qty,
      }
    })

  useEffect(() => {
    const loadToken = async () => {
      const response = await fetch(
        `https://markoni-strapi.herokuapp.com/orders/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        }
      )

      const data = await response.json()
      setToken(data.client_secret)
      setTotal(data.amount)
    }

    loadToken()
  }, [context.cart])

  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)
    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    setLoading(false)
    try {
      setOrderProceededMessage(result.paymentIntent.status)
    } catch (e) {
      console.log("e", e)
      setOrderProceededMessage(result.error.message)
    } finally {
    }
  }

  const cardStyle = {
    base: {
      color: "#32325D",
      fontWeight: 500,
      fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",

      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#E25950",
    },
  }

  if (token) {
    return (
      <div className="l-checkout-wrapper">
        <div className="l-checkout">
          <div className="m-total l-title d-flex align-items-center py-2 mb-3">
            <h3 className="mr-3 mb-0 text-info text-uppercase">Total: </h3>
            <div style={{ fontSize: "16px" }}>
              <div>
                <strong style={{ fontSize: "18px" }}>
                  {formatPrice(total)}
                </strong>
              </div>
              <div>
                {context.cart.length === 1
                  ? `${context.cart.length} item`
                  : `${context.cart.length} items`}
              </div>
            </div>
          </div>
          <Form onSubmit={handleSubmit} className="mb-3">
            <CardElement options={{ cardStyle }} />
            <div className="l-action mt-3 d-flex justify-content-end">
              <Button variant="dark" type="submit">
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                )}
                Buy it
              </Button>
            </div>
          </Form>
          {!!orderProceededMessage && (
            <Alert
              variant={
                orderProceededMessage === "succeeded" ? "success" : "danger"
              }
            >
              {orderProceededMessage === "succeeded"
                ? "Successfully placed payment"
                : orderProceededMessage}
            </Alert>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="l-loading">
        <Spinner animation="border" />
      </div>
    )
  }
}

export default CheckoutForm
