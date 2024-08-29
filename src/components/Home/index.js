import './index.css'
import {withRouter} from 'react-router-dom'

const Home = props => {
  const {history} = props

  const changeToJobsPage = () => {
    history.push('/jobs')
  }

  return (
    <div className="landing-page-container">
      <div className="app-info-container">
        <h1 className="main-heading">Find The Job That Fits Your Life</h1>
        <p className="app-desc">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          onClick={changeToJobsPage}
          type="button"
          className="find-jobs-btn"
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default withRouter(Home)
