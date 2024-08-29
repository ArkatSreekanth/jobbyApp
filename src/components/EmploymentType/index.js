import './index.css'

const EmploymentType = props => {
  const {onSelectEmploymentType, employmentTypesList} = props

  return (
    <div className="filter-options-container">
      <p className="filter-heading">Type of Employment</p>
      {employmentTypesList.map(eachItem => (
        <div className="each-input-container" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
            className="filter-input"
            onChange={event => {
              onSelectEmploymentType(event)
            }}
          />
          <label className="filter-label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </div>
      ))}
      <hr className="hr-line" />
    </div>
  )
}

export default EmploymentType
