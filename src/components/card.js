import React from "react"
import { Link } from "gatsby"

const Card = ({ node }) => {
  const title = node.title || node.slug

  if (node.justLink) {
    return (
      <a
        className="c-card"
        target="_blank"
        rel="noopener noreferrer"
        href={node.referenceLink}
      >
        <div className="c-card__context">
          <h3 className="c-card__title f-title--sm">{title}</h3>
          <ul className="c-card__tags l-row">
            {node.tags
              ? node.tags.map(tag => {
                  return (
                    <li
                      key={`${title}-${tag}`}
                      className="c-card__tags-item f-tag"
                    >
                      {tag}
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
        <div className="c-card__image">
          <img alt={title} src={node.featuredImage.fluid.src} />
        </div>
      </a>
    )
  } else {
    return (
      <Link className="c-card" to={node.slug}>
        <div className="c-card__context">
          <h3 className="c-card__title f-title--sm">{title}</h3>

          <ul className="c-card__tags l-row">
            {node.tags
              ? node.tags.map(tag => {
                  return (
                    <li
                      key={`${title}-${tag}`}
                      className="c-card__tags-item f-tag"
                    >
                      {tag}
                    </li>
                  )
                })
              : null}
          </ul>
          {node.date ? (
            <div className="c-card__date">{node.date.substring(0, 10)}</div>
          ) : null}
        </div>
        <div className="c-card__image">
          <img alt={title} src={node.featuredImage.fluid.src} />
        </div>
      </Link>
    )
  }
}

export default Card
