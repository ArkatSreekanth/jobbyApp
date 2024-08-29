import './index.css'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationPin} from 'react-icons/md'

const SimilarJobs = props => {
  const {similarJobs} = props
  console.log(similarJobs)
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    jobDescription,
    id,
  } = similarJobs[0]
  return (
    <div className='job-item-container'>
      <div className='company-and-rating'>
        <img src={companyLogoUrl} alt='title' className='company-logo' />
        <div>
          <p className='job-role'>{title}</p>
          <div className='rating-container'>
            <BsStarFill className='star-icon' />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <p className='job-role'>Description</p>
      <p className='description'>{jobDescription}</p>
      <div className='similar-job-loc-and-emp-type'>
        <div className='location-container'>
          <MdLocationPin className='icon' />
          <p className='location-name'>{location}</p>
        </div>
        <div className='location-container'>
          <BsBriefcaseFill className='icon' />
          <p className='location-name'>{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
