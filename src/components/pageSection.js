import React from "react"

const PageSection = ({ children, classAttr }) => {
  return <section className={`c-section ${classAttr}`}>{children}</section>
}

export default PageSection
