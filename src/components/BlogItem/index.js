// Write your JS code here
import './index.css'

const BlogItem = props => {
  const {appDetails} = props
  const {iconUrl, link, title, description, category} = appDetails

  return (
    <li className="app-item">
      <div className="blog-item">
        <div className="list-items">
          <div className="blog-item-container">
            <img className="blog-item-image" src={iconUrl} alt={title} />
          </div>
          <div className="blog-item-info">
            <h1 className="blog-item-title">{title}</h1>
            <p className="blog-item-category">{category}</p>
          </div>
        </div>
        <div className="author-info">
          <p className="link">{link}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default BlogItem
