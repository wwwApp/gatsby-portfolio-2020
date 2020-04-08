import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

import Fade from "react-reveal/Fade"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulProject.edges
  const about = data.allContentfulAbout.edges[0].node // always going to be one

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Fade bottom>
        <section
          id="about"
          className="about-wrapper"
          style={{ marginBottom: `5rem` }}
        >
          <h2 className="u-sr-only">About</h2>
          <div>
            <h3
              className="about__title f-title--lg"
              style={{
                marginBottom: `2rem`,
              }}
            >
              {about.title}
            </h3>
            <p className="f-subtitle" style={{ whiteSpace: `pre-line` }}>
              {about.body.body}
            </p>
          </div>
        </section>

        <section id="projects" className="cards-wrapper">
          <h2 className="u-sr-only">Projects</h2>
          {posts.map(({ node }) => {
            return <Card key={node.slug} node={node} />
          })}
        </section>
      </Fade>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulAbout {
      edges {
        node {
          title
          body {
            body
          }
        }
      }
    }
    allContentfulProject {
      edges {
        node {
          title
          slug
          tags
          featuredImage {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
