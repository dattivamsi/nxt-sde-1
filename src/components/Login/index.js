import {Component} from 'react'

class LoginForm extends Component {
  state = {
    mobile: '',
    password: '',
    showMobileError: false,
    showPasswordError: false,
    errorMsgMobile: '',
    errorMsgPassword: '',
    isCheckedPassword: false,
  }

  onChangeMobile = event => {
    this.setState({mobile: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {mobile, password} = this.state
    if (mobile === '' && password === '') {
      this.setState({
        showMobileError: true,
        errorMsgMobile: 'Required',
        showPasswordError: true,
        errorMsgPassword: 'Required',
      })
    } else if (password === '') {
      this.setState({
        showPasswordError: true,
        errorMsgPassword: 'Required',
        showMobileError: false,
      })
    } else if (mobile === '') {
      this.setState({
        showMobileError: true,
        errorMsgMobile: 'Required',
        showPasswordError: false,
      })
    } else {
      this.setState(
        {showMobileError: false, showPasswordError: false},
        this.onSubmitSuccess(),
      )
    }
  }

  onShowHidePassword = () => {
    this.setState(prev => ({isCheckedPassword: !prev.isCheckedPassword}))
  }

  renderPasswordField = () => {
    const {
      password,
      isCheckedPassword,
      showPasswordError,
      errorMsgPassword,
    } = this.state
    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          type={isCheckedPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
        {showPasswordError && <p>*{errorMsgPassword}</p>}
        <div>
          <input
            type="checkbox"
            id="show-password"
            checked={isCheckedPassword}
            onChange={this.onShowHidePassword}
          />
          <label htmlFor="show-password">Show Password</label>
        </div>
      </>
    )
  }

  renderMobileField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">MOBILE NUMBER</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeMobile}
          placeholder="Mobile Number"
        />
      </>
    )
  }

  render() {
    const {showMobileError, errorMsgMobile} = this.state

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <img
            src="https://media-content.ccbp.in/website/ccbp_website_logos/nxtwave_header_logo.png"
            alt="website logo"
          />
          <div>{this.renderMobileField()}</div>
          {showMobileError && <p>*{errorMsgMobile}</p>}
          <div>{this.renderPasswordField()}</div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
