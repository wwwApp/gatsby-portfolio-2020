const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectPost = path.resolve(`./src/templates/project.js`)
  const result = await graphql(
    `
      {
        allContentfulProject {
          edges {
            node {
              title
              slug
              description
              body {
                json
              }
              tags
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

  if (result.errors) {
    throw result.errors
  }

  // Create project posts pages.
  const posts = result.data.allContentfulProject.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

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
}
