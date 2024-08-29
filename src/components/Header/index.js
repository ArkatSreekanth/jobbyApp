import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {MdOutlineLogout} from 'react-icons/md'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderlgOptions = () => (
    <>
      <ul className="options">
        <Link to="/" className="option-name">
          Home
        </Link>
        <Link to="/jobs" className="option-name">
          Jobs
        </Link>
      </ul>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        logout
      </button>
    </>
  )

  const renderSmIcons = () => (
    <div className="icons-container">
      <Link to="/" className="icon-link">
        <AiFillHome className="header-icons" />
      </Link>
      <Link to="/jobs" className="icon-link">
        <BsBriefcase className="header-icons" />
      </Link>
      <MdOutlineLogout className="header-icons" onClick={onClickLogout} />
    </div>
  )

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        className="logo-img"
        alt="website logo"
      />
      {renderSmIcons()}
      {renderlgOptions()}
    </div>
  )
}

export default withRouter(Header)
