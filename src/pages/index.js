import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import FadeIn from "react-fade-in"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const projectPosts = data.allContentfulProject.edges
  const blogPosts = data.allContentfulBlog.edges
  const about = data.allContentfulAbout.edges[0].node // always going to be one

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <FadeIn transitionDuration={900}>
        <section
          id="about"
          className="about-wrapper"
          style={{ marginBottom: `7rem` }}
        >
          <h2 className="u-sr-only">About</h2>
          <div>
            <h3
              className="about__title f-title--sm"
              style={{
                marginBottom: `1.5em`,
              }}
            >
              {about.title}
            </h3>
            <p className="f-tagline" style={{ whiteSpace: `pre-line` }}>
              {about.body.body}
            </p>
          </div>
        </section>

        <section id="projects" className="cards-wrapper">
          <div className="cards-wrapper__title-wrapper">
            <h2 className="cards-wrapper__title">Projects</h2>
            <span className="title-div"></span>
          </div>
          {projectPosts.map(({ node }) => {
            return <Card key={node.slug} node={node} />
          })}
        </section>

        <section id="blog" className="cards-wrapper">
          <div className="cards-wrapper__title-wrapper">
            <h2 className="cards-wrapper__title">Journal</h2>
            <span className="title-div"></span>
          </div>
          {blogPosts.map(({ node }) => {
            return <Card key={node.slug} node={node} />
          })}
        </section>
      </FadeIn>
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
    allContentfulProject(sort: { fields: date, order: DESC }) {
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
          justLink
          referenceLink
          featured
          inProgress
        }
      }
    }
    allContentfulBlog(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          slug
          tags
          date
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
