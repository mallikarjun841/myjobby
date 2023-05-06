import {Link} from 'react-router-dom'
import './index.css'

const Joboptions = props => {
  const {items} = props

  const {
    title,
    id,
    PackagePerAnnum,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    jobDescription,
  } = items

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li id={id} className="listitems">
        <div className="headsection">
          <div className="imglogo">
            <img className="comlogo" alt="company logo" src={companyLogoUrl} />
          </div>
          <div>
            <h1 className="title">{title}</h1>
            <p className="rating">{rating}</p>
          </div>
        </div>

        <div className="headsection2">
          <div className="locationcontainer">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <div>
            <p>{PackagePerAnnum}</p>
          </div>
        </div>
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default Joboptions
