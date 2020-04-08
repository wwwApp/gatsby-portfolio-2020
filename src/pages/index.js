import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import Card from "../components/card"
import PageSection from "../components/pageSection"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulProject.edges
  const about = data.allContentfulAbout.edges[0].node // always going to be one
  let hoverNode = posts[0].node

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      <PageSection classAttr="about-wrapper">
        <h2 className="u-sr-only">About</h2>
        <h3 className="about__title f-title">{about.title}</h3>
        <p className="f-subtitle">{about.body.body}</p>
      </PageSection>

      <PageSection classAttr="project-wrapper">
        <h2 className="u-sr-only">Projects</h2>
        <ul className="project-items">
          {posts.map(({ node }) => {
            return (
              <li
                key={node.slug}
                className="project-item"
                onMouseEnter={() => {
                  hoverNode = node
                }}
              >
                <Link className="project-item__link" to={node.slug}>
                  <h3 className="f-title">{node.title}</h3>
                  {/* <ul className="project-link">
                  {node.tags.map(tag => {
                    return (
                      <li
                        key={`${title}-${tag}`}
                        className="c-card__tags-item f-tag"
                      >
                        {tag}
                      </li>
                    )
                  })}
                </ul> */}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="project-thumb" aria-hidden="true">
          <img alt={hoverNode.title} src={hoverNode.featuredImage.fluid.src} />
        </div>
      </PageSection>
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
