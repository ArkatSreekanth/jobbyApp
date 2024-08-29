import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationPin} from 'react-icons/md'
import {PiArrowSquareOutBold} from 'react-icons/pi'

import FailurePage from '../FailurePage'
import LoadingPage from '../LoadingPage'
import SimilarJobs from '../SimilarJobs'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobInfo extends Component {
  state = {
    jobInfoapiStatus: apiStatus.initial,
    jobInfo: {},
    similarJobs: {},
  }

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    this.setState({jobInfoapiStatus: apiStatus.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const request = await fetch(url, options)

    if (request.ok) {
      const response = await request.json()
      const jobDetails = response.job_details
      const similarJobs = response.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: jobDetails.title,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        lifeAtCompany: {
          imageUrl: jobDetails.life_at_company.image_url,
          description: jobDetails.life_at_company.description,
        },
      }
      const updatedSimilarJobDetails = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.title,
        title: eachItem.title,
      }))
      this.setState({
        jobInfo: updatedJobDetails,
        similarJobs: updatedSimilarJobDetails,
        jobInfoapiStatus: apiStatus.success,
      })
    } else {
      this.setState({jobInfoapiStatus: apiStatus.failure})
    }
  }

  retryLoading = () => {
    this.getJobInfo()
  }

  renderJobItemDetails = () => {
    const {jobInfo, similarJobs} = this.state
    const {
      companyLogoUrl,
      rating,
      title,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobInfo
    const {imageUrl, description} = lifeAtCompany
    return (
      <>
        <div className="job-item-container">
          <div className="company-and-rating">
            <img src={companyLogoUrl} alt="title" className="company-logo" />
            <div>
              <p className="job-role">{title}</p>
              <div className="rating-container">
                <BsStarFill className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-info-container">
            <div className="loc-and-emp-type-container">
              <div className="location-container">
                <MdLocationPin className="icon" />
                <p className="location-name">{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="icon" />
                <p className="location-name">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="desc-container">
            <p className="job-role">Description</p>
            <a className="visit-link" href={companyWebsiteUrl}>
              Visit <PiArrowSquareOutBold className="square-arrow" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          {this.renderSkillsSection()}
          <div className="life-and-company-ing-container">
            <div>
              <p className="job-role">Life At Company</p>
              <p>{description}</p>
            </div>
            <img src={imageUrl} alt={title} className="company-img" />
          </div>
        </div>
        <h1 className="similar-headings">Similar Jobs</h1>
        <SimilarJobs similarJobs={similarJobs} />
      </>
    )
  }

  renderSkillsSection = () => {
    const {jobInfo} = this.state
    const {skills} = jobInfo
    return (
      <div>
        <p className="job-role">skills</p>
        <ul className="skills-container">
          {skills !== undefined &&
            skills.map(eachItem => (
              <li className="skill-item" key={eachItem.name}>
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skill-img"
                />
                <p>{eachItem.name}</p>
              </li>
            ))}
        </ul>
      </div>
    )
  }

  renderJobInfoPage = () => {
    const {jobInfoapiStatus} = this.state

    switch (jobInfoapiStatus) {
      case apiStatus.success:
        return this.renderJobItemDetails()
      case apiStatus.failure:
        return <FailurePage retryLoading={this.retryLoading} />
      case apiStatus.inProgress:
        return <LoadingPage />
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="job-info-bg-container">{this.renderJobInfoPage()}</div>
    )
  }
}

export default JobInfo
