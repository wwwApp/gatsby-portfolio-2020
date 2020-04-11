import React, { useEffect } from "react"
import Header from "./globalHeader"

const Layout = ({ location, children }) => {
  const scrollUpClass = "scroll-up"
  const scrollDownClass = "scroll-down"
  let lastScroll = 0

  const detectKeyPress = e => {
    // detect keyboard user for util class
    if (e.keyCode === 9) {
      document.body.classList.add("u-keyboard-user")
    }
  }

  const toggleHeaderOnScroll = () => {
    const body = document.body

    // calculate scroll
    const currentScroll = window.pageYOffset
    if (currentScroll === 0) {
      body.classList.remove(scrollUpClass)
      return
    }

    if (
      currentScroll > lastScroll &&
      !body.classList.contains(scrollDownClass)
    ) {
      // down
      body.classList.remove(scrollUpClass)
      body.classList.add(scrollDownClass)
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDownClass)
    ) {
      // up
      body.classList.remove(scrollDownClass)
      body.classList.add(scrollUpClass)
    }
    lastScroll = currentScroll
  }

  useEffect(() => {
    // prevent possible scroll that will hide header on load
    document.body.classList.remove(scrollDownClass)

    // add events for keyboard user and reveal header
    document.addEventListener("keydown", e => {
      detectKeyPress(e)
    })

    window.addEventListener("scroll", () => {
      toggleHeaderOnScroll()
    })

    // remove events when unmonting the component
    return () => {
      document.removeEventListener("keydown", e => {
        detectKeyPress(e)
      })

      window.removeEventListener("scroll", () => {
        toggleHeaderOnScroll()
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
