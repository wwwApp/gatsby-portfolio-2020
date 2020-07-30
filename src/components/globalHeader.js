import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import Headroom from "react-headroom"

const GlobalHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible)
  }

  const closeOnKeyPress = e => {
    if (e.keyCode === 27 && !isModalVisible) {
      setIsModalVisible(false)
    }
  }

  const focusOnBody = () => {
    const lastFocusInModal = document.querySelector(
      ".c-global-header__contact__item:last-child a"
    )

    // TO-DO: figure out why isModalVisible returns false
    if (lastFocusInModal.isEqualNode(document.activeElement)) {
      setIsModalVisible(false)
    }
  }

  const handleModalFocus = e => {
    if (e.keyCode === 9) {
      focusOnBody()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", e => {
      closeOnKeyPress(e)
      handleModalFocus(e)
    })

    return () => {
      document.removeEventListener("keydown", e => {
        closeOnKeyPress(e)
        handleModalFocus(e)
      })
    }
  }, [])

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          contact {
            email
            github
            linkedIn
          }
        }
      }
    }
  `)

  const contactEls = () => (
    <ul className="c-global-header__contact">
      <li className="c-global-header__contact__item c-global-header__contact__item--email">
        <a href={siteMeta.contact.email} rel="noopener noreferrer">
          <span className="c-global-header__contact__item__text u-sr-only">
            email
          </span>
          <span className="c-global-header__contact__item__icon">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
            </svg>
          </span>
        </a>
      </li>
      <li className="c-global-header__contact__item c-global-header__contact__item--linkedin">
        <a
          href={siteMeta.contact.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="c-global-header__contact__item__text u-sr-only">
            linkedIn
          </span>
          <span className="c-global-header__contact__item__icon">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </span>
        </a>
      </li>
      <li className="c-global-header__contact__item c-global-header__contact__item--github">
        <a
          href={siteMeta.contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="c-global-header__contact__item__text u-sr-only">
            github
          </span>
          <span className="c-global-header__contact__item__icon">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </span>
        </a>
      </li>
      <li className="c-global-header__contact__item c-global-header__contact__item--github">
        <a
          href={withPrefix("/resume.pdf")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="c-global-header__contact__item__text u-sr-only">
            resume
          </span>
          <span className="c-global-header__contact__item__icon">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z" />
            </svg>
          </span>
        </a>
      </li>
    </ul>
  )

  const siteMeta = data.site.siteMetadata
  const headerRef = useRef(null)

  return (
    <Headroom
      onPin={() => {
        headerRef.current.classList.remove("is-not-pinned")
        headerRef.current.classList.add("is-pinned")
      }}
      onUnpin={() => {
        headerRef.current.classList.remove("is-pinned")
        headerRef.current.classList.add("is-not-pinned")
      }}
    >
      <header className={`c-global-header ${isModalVisible ? "is-open" : ""}`}>
        <div className="l-container c-global-header__inner" ref={headerRef}>
          <h1 className="u-sr-only">{siteMeta.title}</h1>
          <Link className="c-global-header__logo" to="/">
            <div className="text-logo">ws.</div>
            {/* <span className="u-sr-only">Wooyoung Song Logo</span> */}
            {/* <img src={withPrefix("/logo.png")} alt="Wooyoung Song Logo" /> */}
          </Link>
          {contactEls()}
          <button
            className={`modal-toggle ${isModalVisible ? "is-open" : ""}`}
            onClick={toggleModalVisible}
          >
            <span className="u-sr-only">
              {isModalVisible ? "Close" : "Open"} Modal
            </span>
            <span className="modal-toggle__line modal-toggle__line--1"></span>
            <span className="modal-toggle__line modal-toggle__line--2"></span>
          </button>
        </div>
      </header>
      <div
        className={`c-global-header__inner--modal ${
          isModalVisible ? "is-open" : ""
        }`}
        aria-hidden={!isModalVisible}
      >
        {contactEls()}
      </div>
    </Headroom>
  )
}

export default GlobalHeader
