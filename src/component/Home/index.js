import { Link } from "react-router-dom";
import "./index.css";
import Header from "../Header";

const Home = (props) => {
  return (
    <>
      <Header />
      <div className="homecontainer">
        <div className="subcontainerhome">
          <h1 className="headinghome">Find the job that fits your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information and
            review. this is one of best applicatin try by press below button
          </p>
          <Link to="/jobs">
            <button className="findjobbutton" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
