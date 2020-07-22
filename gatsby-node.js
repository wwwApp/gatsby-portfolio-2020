const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectPost = path.resolve(`./src/templates/project.js`)
  const blogPost = path.resolve(`./src/templates/blog.js`)
  const resultProject = await graphql(
    `
      {
        allContentfulProject {
          edges {
            node {
              title
              slug
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
                  src
                }
              }
              justLink
            }
          }
        }
      }
    `
  )

  const resultBlog = await graphql(
    `
      {
        allContentfulBlog {
          edges {
            node {
              title
              slug
              description
              date
              body {
                json
              }
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
  )

  if (resultProject.errors) {
    throw resultProject.errors
  }

  if (resultBlog.errors) {
    throw resultBlog.errors
  }

  // Create project projectPosts pages.
  const projectPosts = resultProject.data.allContentfulProject.edges

  projectPosts.forEach((post, index) => {
    const previous =
      index === projectPosts.length - 1 ? null : projectPosts[index + 1].node
    const next = index === 0 ? null : projectPosts[index - 1].node

    if (!post.node.justLink) {
      createPage({
        path: post.node.slug,
        component: projectPost,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    }
  })

  // create blog pages
  const blogPosts = resultBlog.data.allContentfulBlog.edges

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })
}
