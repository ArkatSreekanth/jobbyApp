import './index.css'

const FailurePage = props => {
  const {retryLoading} = props

  return (
    <div className="err-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={() => {
          retryLoading()
        }}
      >
        Retry
      </button>
    </div>
  )
}

export default FailurePage
