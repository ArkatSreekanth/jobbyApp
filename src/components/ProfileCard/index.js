import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

const apiStatusCodes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusCodes.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusCodes.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const request = await fetch(url, options)
    const response = await request.json()

    const profileDetails = {
      name: response.profile_details.name,
      profileImgUrl: response.profile_details.profile_image_url,
      shortBio: response.profile_details.short_bio,
    }

    if (request.ok) {
      this.setState({
        profileApiStatus: apiStatusCodes.success,
        profileDetails,
      })
    } else {
      this.setState({profileApiStatus: apiStatusCodes.failure})
    }
  }

  renderProfileCard = () => {
    const {profileApiStatus, profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails

    switch (profileApiStatus) {
      case apiStatusCodes.success:
        return (
          <div className="profile-card">
            <img src={profileImgUrl} alt={name} className="profile-img" />
            <p className="name">{name}</p>
            <p className="short-bio">{shortBio}</p>
          </div>
        )
      case apiStatusCodes.failure:
        return (
          <div className="loader-container">
            <button type="button" className="retry-btn">
              Retry
            </button>
          </div>
        )
      case apiStatusCodes.inProgress:
        return this.renderLoader()
      default:
        return <></>
    }
  }

  render() {
    return this.renderProfileCard()
  }
}

export default ProfileCard
