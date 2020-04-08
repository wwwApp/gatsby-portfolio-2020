import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Fade from "react-reveal/Fade"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Fade bottom>
        <section className="l-container" style={{ textAlign: `center` }}>
          <h1 className="f-title--lg">404</h1>
          <p className="f-subtitle">Ooops...</p>
        </section>
      </Fade>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
