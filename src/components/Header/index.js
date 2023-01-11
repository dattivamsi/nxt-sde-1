import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-container">
      <div>
        <img
          src="https://media-content.ccbp.in/website/ccbp_website_logos/nxtwave_header_logo.png"
          alt="logo"
          className="image"
        />
      </div>
      <div>
        <button type="button" className="createButton">
          <Link to="/add">Add</Link>
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile"
        />
      </div>
    </div>
  </nav>
)

export default Header
