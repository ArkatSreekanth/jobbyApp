import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginPage extends Component {
  state = {
    userName: '',
    password: '',
    errMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  clickSubmit = async event => {
    const {userName, password} = this.state
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: userName,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const request = await fetch(apiUrl, options)
    const response = await request.json()
    this.setState({userName: '', password: ''})

    if (response.status_code === 400) {
      this.setState({errMsg: response.error_msg})
    } else {
      this.onSubmitSuccess(response.jwt_token)
    }
  }

  renderUserName = () => {
    const {userName} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username : rahul"
          id="username"
          className="input-field"
          value={userName}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password: rahul@2021"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUserInfoForm = () => {
    const {errMsg} = this.state
    return (
      <form className="login-card" onSubmit={this.clickSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="logo-img"
          alt="website logo"
        />
        {this.renderUserName()}
        {this.renderPassword()}
        <button className="login-btn" type="submit">
          Login
        </button>
        <p className="err-msg">{errMsg !== '' && `* ${errMsg}`}</p>
      </form>
    )
  }

  render() {
    return <div className="login-bg-container">{this.renderUserInfoForm()}</div>
  }
}

export default LoginPage
