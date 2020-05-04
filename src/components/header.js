import { useContext, useEffect } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import AppContext from "../context/appContext"
import { FaCartPlus } from "react-icons/fa"

const Header = ({ siteTitle }) => {
  const context = useContext(AppContext)
  const count = context.cart && context.cart.length
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaCartPlus style={{ fontSize: "24px" }} />
              <span className="l-count m-count">{count}</span>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
