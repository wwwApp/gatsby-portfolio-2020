import React, { useEffect } from "react"
import Header from "./globalHeader"

const Layout = ({ location, children }) => {
  const detectKeyPress = e => {
    // detect keyboard user for util class
    if (e.keyCode === 9) {
      document.body.classList.add("u-keyboard-user")
    }
  }

  useEffect(() => {
    // add events for keyboard user and reveal header
    document.addEventListener("keydown", e => {
      detectKeyPress(e)
    })

    // remove events when unmonting the component
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
