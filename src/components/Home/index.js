import {Component} from 'react'
import TabItem from '../TabItem'
import BlogItem from '../BlogItem'
import Loader from 'react-loader-spinner'

import './index.css'

const SEARCH_ICON_URL =
  'https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png'

const tabsList = [
  {tabId: 'resource', displayText: 'Resources'},
  {tabId: 'request', displayText: 'Requests'},
  {tabId: 'user', displayText: 'Users'},
]
const apiStatusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    searchInput: '',
    activeTabId: tabsList[0].tabId,
    blogsData: [],
    apiStatus: apiStatusConstant.initial,
    currentPage: 1,
  }

  componentDidMount = () => {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch(
      'https://media-content.ccbp.in/website/react-assignment/resources.json',
    )
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        iconUrl: eachItem.icon_url,
        link: eachItem.link,
        description: eachItem.description,
        category: eachItem.category,
        tag: eachItem.tag,
      }))
      this.setState({
        blogsData: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  setActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getActiveTabApps = searchedApps => {
    const {activeTabId} = this.state
    if (activeTabId === 'resource') {
      return searchedApps
    }
    const filteredApps = searchedApps.filter(
      eachSearchedApp => eachSearchedApp.tag === activeTabId,
    )

    return filteredApps
  }

  getSearchResults = () => {
    const {searchInput, blogsData} = this.state
    const searchResults = blogsData.filter(eachApp =>
      eachApp.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.loading:
        return this.renderLoading()
      case apiStatusConstant.failure:
        return this.renderFailuer()
      default:
        return null
    }
  }

  renderFailuer = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
    </div>
  )

  renderLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {currentPage} = this.state
    const searchResults = this.getSearchResults()
    const filteredApps = this.getActiveTabApps(searchResults)
    const startindex = currentPage * 6
    const endIndex = currentPage - 6

    return (
      <ul className="apps-list">
        {filteredApps.map(eachApp => (
          <BlogItem key={eachApp.id} appDetails={eachApp} />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput, activeTabId} = this.state
    const searchResults = this.getSearchResults()
    const filteredApps = this.getActiveTabApps(searchResults)
    console.log(filteredApps)
    console.log(activeTabId)

    return (
      <div className="home-container">
        <div className="app-store">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <img
              src={SEARCH_ICON_URL}
              alt="search icon"
              className="search-icon"
            />
          </div>
          <ul className="tabs-list">
            {tabsList.map(eachTab => (
              <TabItem
                key={eachTab.tabId}
                tabDetails={eachTab}
                setActiveTabId={this.setActiveTabId}
                isActive={activeTabId === eachTab.tabId}
              />
            ))}
          </ul>
          <div>{this.renderData()}</div>
        </div>
      </div>
    )
  }
}

export default Home
