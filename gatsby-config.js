module.exports = {
  siteMetadata: {
    title: `Gatsby / Strapi / Stripe`,
    description: `Fullstack javascript application, with Gatsby js client and Strapi backend, with stripe payment.`,
    author: `markoni`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_URL,
        queryLimit: 1000,
        contentTypes: [`product`],
        singleTypes: [],
      },
    },
  ],
}
