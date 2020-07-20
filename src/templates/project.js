import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FadeIn from "react-fade-in"

import Img from "gatsby-image"

import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

const ProjectPostTemplate = ({ data, location }) => {
  const post = data.contentfulProject
  const siteTitle = data.site.siteMetadata.title

  const focusOnContact = () => {
    document
      .querySelector(".c-global-header__inner")
      .classList.remove("is-not-pinned")
    document.querySelector(".c-global-header a").focus()
  }

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
      [INLINES.HYPERLINK]: (node, next) => {
        return `<a href="${
          node.data.uri
        }" rel="noopener noreferrer" target="_blank"}>${next(node.content)}</a>`
      },
    },
  }

  const postContentHtml = post.body
    ? documentToHtmlString(post.body.json, options)
    : null

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`${post.title} |`} description={post.description} />
      <FadeIn transitionDuration={900}>
        <div className="project-header">
          <h1 className="project-header__title f-title--lg">{post.title}</h1>
          {post.description ? (
            <p className="project-header__desc f-title--sm--400">
              {post.description}
            </p>
          ) : null}
          <Img title={post.title} fluid={post.featuredImage.fluid} />
        </div>
        <div className="project-body">
          <div className="project-body__top">
            {post.organization && (
              <div className="project-detail">
                <p className="project-detail__title">Team</p>
                <p className="project-detail__content">{post.organization}</p>
              </div>
            )}
            {post.role && (
              <div className="project-detail">
                <p className="project-detail__title">Role</p>
                <p className="project-detail__content">{post.role}</p>
              </div>
            )}
            {post.timeline && (
              <div className="project-detail">
                <p className="project-detail__title">Timeline</p>
                <p className="project-detail__content">{post.timeline}</p>
              </div>
            )}
          </div>
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
              {post.referenceLinkText
                ? post.referenceLinkText
                : "view case study"}
            </a>
          ) : null}
          <div className="project-body__closing">
            <div>Thank you for your time!</div>
            <div>
              <Link href="/">View more projects</Link>
              <span> or </span>
              <a
                href="#"
                onClick={() => {
                  focusOnContact()
                }}
              >
                contact me
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
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
      timeline
      role
      organization
      body {
        json
      }
      tags
      referenceLinkText
      referenceLink
      featuredImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
