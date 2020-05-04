import React from "react"

const Footer = () => {
  return (
    <div className="py-2 bg-dark text-light text-center">
      Copyright &copy; {new Date().getFullYear()}, by{" "}
      <a href="https://markoni.codes" className="text-warning">
        markoni.codes
      </a>
    </div>
  )
}

export default Footer
