import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"
import { formatPrice } from "../utils/formatPrice"

const Product = ({ name, price_in_cent, thumbnail }) => {
  return (
    <div className="m-product mb-4">
      <Card>
        <Card.Img variant="top" src={thumbnail.childImageSharp.fluid.src} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <span>Price: {formatPrice(price_in_cent)}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product
