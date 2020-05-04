import React, { useState, useContext, useEffect } from "react"
import Layout from "../components/layout"
import { Form, Button, Row, Col, Modal } from "react-bootstrap"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { formatPrice } from "../utils/formatPrice"
import AppContext from "../context/appContext"

const ProductTemplate = ({ data }) => {
  const context = useContext(AppContext)
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const {
    id,
    strapiId,
    name,
    description,
    price_in_cent,
    thumbnail,
  } = data.strapiProduct

  const handleSubmit = async e => {
    e.preventDefault()

    const productWithQty = {
      id,
      strapiId,
      name,
      price_in_cent,
      thumbnail,
      qty,
    }
    context.addToCart(productWithQty)
    setAddedToCart(true)
  }

  const handleClose = () => setAddedToCart(false)

  return (
    <Layout>
      <div className="l-product-details m-product-details">
        <h3 className="d-lg-none">{name}</h3>
        <div className="l-img mb-4">
          <Img fluid={thumbnail.childImageSharp.fluid} />
        </div>
        <div className="l-content">
          <h3 className="d-none d-lg-block">{name}</h3>
          <p>{description}</p>
          <p>Price: {formatPrice(price_in_cent)}</p>
          <div className="l-add-to-cart">
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="addToCart">
                <Col xs={3}>
                  <Form.Control
                    type="number"
                    placeholder="qty"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                  />
                </Col>
                <Col xs={4}>
                  <Button variant="dark" type="submit">
                    <span>Add To Cart</span>
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
        <Modal show={addedToCart} onHide={handleClose} animation={true}>
          <Modal.Header closeButton className="bg-success text-light">
            <Modal.Title>Successfully added</Modal.Title>
          </Modal.Header>
          <Modal.Body>Product {name} added to cart</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  )
}

export default ProductTemplate

export const productData = graphql`
  query getProduct($id: String!) {
    strapiProduct(id: { eq: $id }) {
      id
      strapiId
      name
      description
      price_in_cent
      slug
      thumbnail {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
