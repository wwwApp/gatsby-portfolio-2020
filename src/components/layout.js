import React from "react"
import Header from "./globalHeader"

const Layout = ({ location, title, children }) => {
  return (
    <div
      className="app-wrapper"
      style={{
        minHeight: `100vh`,
        position: `relative`,
      }}
    >
      <Header location={location} />
      <main className="l-container main">{children}</main>
      <footer className="l-container footer">
        Wooyoung Song © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout
