import {Component} from 'react'
import {ToastContainer, toast} from 'react-tostify'
import './index.css'

class Add extends Component {
  state = {
    titleText: '',
    linkText: '',
    iconUrlText: '',
    categoryText: '',
    descriptionText: '',
  }

  onChangetitle = event => {
    this.setState({titleText: event.target.value})
  }

  onChangeLink = event => {
    this.setState({linkText: event.target.value})
  }

  onChangeIcon = event => {
    this.setState({iconUrlText: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({categoryText: event.target.value})
  }

  onChangedesc = event => {
    this.setState({descriptionText: event.target.value})
  }

  onClickCreate = event => {
    event.preventDefault()
    const {
      titleText,
      linkText,
      iconUrlText,
      categoryText,
      descriptionText,
    } = this.state

    if (
      titleText === '' ||
      linkText === '' ||
      iconUrlText === '' ||
      categoryText === '' ||
      descriptionText === ''
    ) {
      toast.error('emptyfield')
    } else if (descriptionText < 20) {
      toast.error('descripiton less than 20')
    } else {
      this.makeApiCall()
    }
  }

  makeApiCall = async () => {
    const response = await fetch(
      'https://media-content.ccbp.in/website/react-assignment/add_resource.json',
    )

    if (response.ok === true) {
      toast.success('Resource Added Successfully')
      this.setState({
        titleText: '',
        linkText: '',
        iconUrlText: '',
        categoryText: '',
        descriptionText: '',
      })
    } else {
      toast.error('Something Went Wrong')
    }
  }

  render() {
    const {
      titleText,
      linkText,
      iconUrlText,
      categoryText,
      descriptionText,
    } = this.state

    return (
      <div>
        <div>
            <Link to="/"><p>User</p></Link>
        </div>
        <p>Item Details</p>
        <form id="myForm">
          <div className="mb-3">
            <label htmlFor="title">ITEM TITLE</label>
            <br />
            <input
              id="title"
              type="text"
              onChange={this.onChangetitle}
              value={titleText}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="link">LINK</label>
            <br />
            <input
              id="link"
              className="form-control"
              type="text"
              onChange={this.onChangeLink}
              value={linkText}
            />
          </div>
          <div>
            <label htmlFor="icon">ICON URL</label>
            <br />
            <input
              type="text"
              id="icon"
              onChange={this.onChangeIcon}
              value={iconUrlText}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="tag">TAG NAME</label>
            <br />
            <select id="tag" className="form-control">
              <option>User</option>
              <option>Requests</option>
            </select>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <br />
            <input
              type="text"
              id="category"
              onChange={this.onChangeCategory}
              value={categoryText}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="desc">DESCRIPTION</label>
            <br />
            <textarea
              type="text"
              id="desc"
              onChange={this.onChangedesc}
              value={descriptionText}
            />
          </div>
          <button type="submit" onClick={this.onClickCreate}>
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default Add
