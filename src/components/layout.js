import React, { useEffect } from "react"
import Header from "./globalHeader"

const Layout = ({ location, title, children }) => {
  const detectKeyPress = e => {
    if (e.keyCode === 9) {
      document.body.classList.add("u-keyboard-user")
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", e => {
      detectKeyPress(e)
    })

    return () => {
      document.removeEventListener("keydown", e => {
        detectKeyPress(e)
      })
    }
  }, [])

  return (
    <div
      className="app-wrapper"
      style={{
        minHeight: `100vh`,
        position: `relative`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-between`,
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
