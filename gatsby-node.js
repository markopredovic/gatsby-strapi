/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query allProducts {
      allStrapiProduct {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  result.data.allStrapiProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.slug}`,
      component: path.resolve("src/templates/productTemplate.js"),
      context: {
        id: node.id,
      },
    })
  })
}
