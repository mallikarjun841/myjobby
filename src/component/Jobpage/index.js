import { Component } from "react";
import Cookies from "js-cookie";
import { CirclesWithBar } from "react-loader-spinner";
import { BiSearchAlt2 } from "react-icons/bi";
import "./index.css";
import Header from "../Header";
import Joboptions from "../Joboptions";
import Section1 from "../Section1";

const statuscode = {
  success: "Success",
  loading: "Loading",
  failure: "Failure",
};

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

class Job extends Component {
  state = {
    arraylist: [],
    searchvalue: "",
    profile: {},
    status: "",
    salary: "",
  };

  componentDidMount() {
    this.getdetails();
    this.getprofiledetails();
  }

  employeetype = () => {};

  getprofiledetails = async () => {
    const token = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const responsedata = await response.json();
    const dataupdate = {
      profileImageUrl: responsedata.profile_details.profile_image_url,
      shortBio: responsedata.profile_details.short_bio,
      name: responsedata.profile_details.name,
    };
    if (response.ok === true) {
      this.setState({ profile: dataupdate });
    }
  };

  makeclickinput = () => {};

  searchinputvalue = (event) => {
    if (event.key === "Enter") {
      this.setState({ searchvalue: event.target.value }, this.getdetails);
    }
  };

  getdetails = async () => {
    const { searchvalue, salary } = this.state;
    this.setState({
      status: statuscode.loading,
    });

    const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=${salary}&search=${searchvalue}`;

    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const responsedata = await response.json();

    const updatedata = responsedata.jobs.map((object) => ({
      title: object.title,
      id: object.id,
      companyLogoUrl: object.company_logo_url,
      employmentType: object.employment_type,
      location: object.location,
      PackagePerAnnum: object.package_per_annum,
      rating: object.rating,
      jobDescription: object.job_description,
    }));

    if (response.ok === true) {
      this.setState({ arraylist: updatedata, status: statuscode.success });
    } else if (response.status === 401) {
      this.setState({ status: statuscode.failure });
    }
  };

  getsuccess = (arraylist) => {
    if (arraylist.length > 0) {
      return (
        <ul className="unorder">
          {arraylist.map((object) => (
            <Joboptions
              key={object.id}
              onclickjob={this.onclickjob}
              items={object}
            />
          ))}
        </ul>
      );
    }
    return (
      <div className="notfoundcontainer">
        <div className="notfound">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters </p>
        </div>
      </div>
    );
  };

  getloading = () => (
    <div testid="loader">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );

  getfailure = () => (
    <div className="notfoundcontainer">
      <div className="notfound">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button">Retry</button>
      </div>
    </div>
  );

  onchangesalary = (event) => {
    this.setState({ salary: event.target.value }, this.getdetails);
  };

  render() {
    const { arraylist, status, searchvalue } = this.state;
    const { profile } = this.state;
    const { name, profileImageUrl, shortBio } = profile;
    console.log(arraylist);
    console.log("super");
    let make = "";
    switch (status) {
      case statuscode.success:
        make = this.getsuccess(arraylist);
        break;
      case statuscode.loading:
        make = this.getloading();
        break;
      case statuscode.failure:
        make = this.getfailure();
        break;

      default:
        return null;
    }
    return (
      <>
        <Header />
        <div className="jobcontainer">
          <div className="jobsection">
            <div className="section1">
              <div className="profilemaincontainer">
                <div className="profilecontainer">
                  <img alt="profile" src={profileImageUrl} />
                  <h1 className="name">{name}</h1>
                  <p className="short">{shortBio}</p>
                </div>
                <div className="typecontainer">
                  <h1 className="head">Type of Employment</h1>
                  <ul className="unordered">
                    {employmentTypesList.map((object) => (
                      <Section1
                        key={object.employmentTypeId}
                        employeetype={this.employeetype}
                        items={object}
                      />
                    ))}
                  </ul>
                </div>
                <div>
                  <h1 className="head">Salary Range</h1>
                  <ul className="salaryunorder">
                    {salaryRangesList.map((object) => (
                      <li key={object.salaryRangeId}>
                        <input
                          onChange={this.onchangesalary}
                          id={object.salaryRangeId}
                          type="radio"
                          value={object.salaryRangeId}
                          name="salary"
                        />
                        <label htmlFor={object.salaryRangeId}>
                          {object.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="section2">
              <input
                onKeyPress={this.searchinputvalue}
                className="inputtext"
                type="search"
                placeholder="search"
              />
              <button testid="searchButton" type="button">
                <BiSearchAlt2 />
              </button>
              {make}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Job;

// switch (status) {
//       case statusofcall.success:

//       case statusofcall.loading:
//         return this.loadingspinner()
//       case statusofcall.failure:
//         return this.failuredata()
//       default:
//         return null
