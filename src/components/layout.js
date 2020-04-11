import React, { useEffect } from "react"
import Header from "./globalHeader"

const Layout = ({ location, title, children }) => {
  const body = document.body
  const scrollUp = "scroll-up"
  const scrollDown = "scroll-down"
  let lastScroll = 0

  const detectKeyPress = e => {
    if (e.keyCode === 9) {
      document.body.classList.add("u-keyboard-user")
    }
  }

  const toggleHeaderOnScroll = () => {
    const currentScroll = window.pageYOffset
    if (currentScroll == 0) {
      body.classList.remove(scrollUp)
      return
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp)
      body.classList.add(scrollDown)
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown)
      body.classList.add(scrollUp)
    }
    lastScroll = currentScroll
  }

  useEffect(() => {
    document.addEventListener("keydown", e => {
      detectKeyPress(e)
    })

    window.addEventListener("scroll", () => {
      toggleHeaderOnScroll()
    })

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
