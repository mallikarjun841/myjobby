import './index.css'
import Header from '../Header'

const PageNotFound = () => (
  <>
    <Header />
    <div className="notfoundcontainer">
      <div className="notfound">
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        />
        <h1>Page Not Found</h1>
        <p>we sorry, page that you request is not found</p>
      </div>
    </div>
  </>
)
export default PageNotFound
