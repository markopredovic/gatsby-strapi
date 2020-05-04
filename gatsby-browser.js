/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { AppContextProvider } from "./src/provider"

const wrapRootElement = ({ element }) => {
  return <AppContextProvider>{element}</AppContextProvider>
}

export { wrapRootElement }
