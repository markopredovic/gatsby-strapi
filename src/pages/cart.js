import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTitle from "../components/PageTitle"
import Cart from "../components/Cart"

const CartPage = () => (
  <Layout>
    <SEO title="Shopping Cart" />
    <PageTitle title="Cart" />
    <Cart />
  </Layout>
)

export default CartPage
