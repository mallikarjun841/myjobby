import './index.css'

const Section1 = props => {
  const {items, employeetype} = props
  const {employmentTypeId, label} = items

  const makeemployeeclick = () => {
    employeetype(employmentTypeId)
  }
  return (
    <li key={employmentTypeId}>
      <input
        onClick={makeemployeeclick}
        id={employmentTypeId}
        type="checkbox"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default Section1
