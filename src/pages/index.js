import React from "react"
import { graphql, Link } from "gatsby"
import { Card } from "react-bootstrap"
import Img from "gatsby-image"
import { formatPrice } from "../utils/formatPrice"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageTitle from "../components/PageTitle"

const IndexPage = ({ data }) => {
  const products = data.allStrapiProduct.nodes.map(product => (
    <div className="l-product m-product mb-4" key={product.id}>
      <Link to={`/products/${product.slug}`}>
        <Card style={{ height: "100%" }}>
          <Img fluid={product.thumbnail.childImageSharp.fluid} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <strong>{formatPrice(product.price_in_cent)}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      <PageTitle title="Shop" />
      <div className="d-sm-flex flex-wrap justify-content-between">
        {products}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query getProducts {
    allStrapiProduct {
      nodes {
        id
        name
        price_in_cent
        slug
        strapiId
        created_at
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
