import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FadeIn from "react-fade-in"

import Img from "gatsby-image"

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

const ProjectPostTemplate = ({ data, location }) => {
  const post = data.contentfulProject
  const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        if (node.data.target.fields.file["en-US"].contentType === "video/mp4") {
          return `<video autoplay>
          <source src="${node.data.target.fields.file["en-US"].url}" type='video/mp4'/>
          <p>Your browser doesnt support HTML5 video.</p>
        </video>`
        } else {
          return `<img alt=${post.title} src="${node.data.target.fields.file["en-US"].url}" />`
        }
      },
    },
  }

  const postContentHtml = documentToHtmlString(post.body.json, options)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.title} description={post.description} />
      <FadeIn transitionDuration={900}>
        <div className="project-header">
          <h1 className="project-header__title f-title--lg">{post.title}</h1>
          {post.description ? (
            <p className="project-header__desc f-title--sm--400">
              {post.description}
            </p>
          ) : null}
          {/* <img alt={post.title} src={post.featuredImage.fluid.src} /> */}
          <Img title={post.title} fluid={post.featuredImage.fluid} />
        </div>
        <div className="project-body">
          <div
            className="project-body__wysiwyg"
            dangerouslySetInnerHTML={{ __html: postContentHtml }}
          />
          {post.referenceLink ? (
            <a
              href={post.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              view case study
            </a>
          ) : null}
          <div className="project-body__closing">
            <div>Thank you for your time!</div>
            <div>
              <Link href="/">View more projects</Link>
              <span> or </span>
              <a href="#">contact me</a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default ProjectPostTemplate

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulProject(slug: { eq: $slug }) {
      title
      description
      body {
        json
      }
      tags
      referenceLink
      featuredImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
