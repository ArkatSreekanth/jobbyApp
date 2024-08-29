import './index.css'
import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'

import {MdLocationPin} from 'react-icons/md'

const JobItem = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem

  return (
    <Link to={`jobs/${id}`} className="card-link">
      <div className="job-item-container">
        <div className="company-and-rating">
          <img src={companyLogoUrl} alt="title" className="company-logo" />
          <div>
            <p className="job-role">{title}</p>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p>{rating}</p>
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
        <p className="job-role">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
