import React from "react"
import CheckoutForm from "./CheckoutForm"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripe = loadStripe("pk_test_1dlBgp4cbsv7ZDUaUe9Gm7hB00NjXPUzfk")

const Checkout = () => {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
