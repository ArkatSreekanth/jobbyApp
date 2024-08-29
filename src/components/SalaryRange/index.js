const SalaryRange = props => {
  const {onSelectSalaryRange, salaryRangesList} = props

  return (
    <div className="filter-options-container">
      <p className="filter-heading">Salary Range</p>
      {salaryRangesList.map(eachItem => (
        <div className="each-input-container" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            id={eachItem.salaryRangeId}
            value={eachItem.salaryRangeId}
            className="filter-input"
            name="salary"
            onChange={event => {
              onSelectSalaryRange(event)
            }}
          />
          <label htmlFor={eachItem.salaryRangeId} className="filter-label">
            {eachItem.label}
          </label>
        </div>
      ))}
      <hr className="hr-line" />
    </div>
  )
}

export default SalaryRange
