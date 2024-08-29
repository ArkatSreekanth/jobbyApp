import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import ProfileCard from '../ProfileCard'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobItem from '../JobItem'
import FailurePage from '../FailurePage'
import LoadingPage from '../LoadingPage'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    jobsApiStatus: apiStatus.initial,
    employmentTypes: [],
    minPackage: '',
    searchText: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value}, this.getJobsData)
  }

  onSelectEmploymentType = event => {
    const {employmentTypes} = this.state
    let selectedEmploymentTypes = []
    if (event.target.checked) {
      selectedEmploymentTypes = [
        ...employmentTypes,
        {id: event.target.id, value: event.target.value},
      ]
    } else {
      selectedEmploymentTypes = employmentTypes.filter(
        eachItem => eachItem.id !== event.target.id,
      )
    }
    this.setState({employmentTypes: selectedEmploymentTypes}, this.getJobsData)
  }

  onSelectSalaryRange = event => {
    const {value} = event.target
    this.setState({minPackage: value}, this.getJobsData)
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatus.inProgress})
    const {employmentTypes, minPackage, searchText} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const selectedOptions = employmentTypes
      .map(eachItem => eachItem.value)
      .join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedOptions}&minimum_package=${minPackage}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const request = await fetch(url, options)
    const response = await request.json()
    if (request.ok) {
      const {jobs} = response
      const jobsData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsData, jobsApiStatus: apiStatus.success})
    } else {
      this.setState({jobsApiStatus: apiStatus.failure})
    }
  }

  renderSearchContainer = () => (
    <div className="search-box-container">
      <input
        type="search"
        placeholder="Search"
        className="search-bar"
        onChange={this.onChangeSearchText}
      />
      <BsSearch className="search-icon" />
    </div>
  )

  retryLoading = () => {
    this.getJobsData()
  }

  renderJobItems = () => {
    const {jobsApiStatus, jobsData} = this.state

    switch (jobsApiStatus) {
      case apiStatus.inProgress:
        return <LoadingPage />
      case apiStatus.success:
        if (jobsData.length !== 0) {
          return jobsData.map(eachItem => (
            <JobItem key={eachItem.id} eachItem={eachItem} />
          ))
        }
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-img"
            />
            <h1 className="failure-msg">No Jobs Found</h1>
            <p className="failure-desc">
              We could not find any jobs. Try another filters.
            </p>
          </div>
        )
      case apiStatus.failure:
        return <FailurePage retryLoading={this.retryLoading} />
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="jobs-bg-container">
        <div className="sm-search-container">
          {this.renderSearchContainer()}
        </div>
        <div className="profile-filter-options-container">
          <ProfileCard />
          <EmploymentType
            onSelectEmploymentType={this.onSelectEmploymentType}
            employmentTypesList={employmentTypesList}
          />
          <SalaryRange
            onSelectSalaryRange={this.onSelectSalaryRange}
            salaryRangesList={salaryRangesList}
          />
        </div>
        <ul>
          <div className="lg-search-container">
            {this.renderSearchContainer()}
          </div>
          {this.renderJobItems()}
        </ul>
      </div>
    )
  }
}

export default JobsPage
