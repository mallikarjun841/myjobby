import { Component } from "react";
import Cookies from "js-cookie";
import { CirclesWithBar } from "react-loader-spinner";

import "./index.css";
import Header from "../Header";

const statuscode = {
  success: "Success",
  loading: "Loading",
  failure: "Failure",
};

class Newjob extends Component {
  state = { skill: [], life: {}, company: {}, similar: [], status: "" };

  componentDidMount() {
    this.getitemdetails();
  }

  getitemdetails = async () => {
    const { match } = this.props;
    this.setState({ status: statuscode.loading });

    const { params } = match;
    const { id } = params;

    console.log(id);

    const token = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);

    if (response.ok === true) {
      const responsedata = await response.json();

      const updatedata = {
        title: responsedata.job_details.title,
        id: responsedata.job_details.id,
        companyWebsiteUrl: responsedata.job_details.company_website_url,

        companyLogoUrl: responsedata.job_details.company_logo_url,
        employmentType: responsedata.job_details.employment_type,
        location: responsedata.job_details.location,
        PackagePerAnnum: responsedata.job_details.package_per_annum,
        rating: responsedata.job_details.rating,
        jobDescription: responsedata.job_details.job_description,
      };
      const skills = responsedata.job_details.skills.map((object) => ({
        name: object.name,
        imageUrl: object.image_url,
      }));

      const life = {
        description: responsedata.job_details.life_at_company.description,
        imageUrls: responsedata.job_details.life_at_company.image_url,
      };

      const similarcompany = responsedata.similar_jobs.map((object) => ({
        title: object.title,
        id: object.id,
        lifeAtCompany: object.life_at_company,
        companyLogoUrl: object.company_logo_url,
        employmentType: object.employment_type,
        rating: object.rating,
        location: object.location,
        jobDescription: object.job_description,
      }));
      this.setState({
        status: statuscode.success,
        skill: skills,
        company: updatedata,
        similar: similarcompany,
        life,
      });
    } else if (response.status === 401) {
      this.setState({ status: statuscode.failure });
    }
  };

  getloadings = () => (
    <div testid="loader" className="loadercontainer">
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

  getsucessdata = () => {
    const { company, similar, skill, life } = this.state;

    const {
      title,
      PackagePerAnnum,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      rating,
      jobDescription,
    } = company;
    console.log(skill);
    console.log(similar);
    const { description, imageUrls } = life;
    return (
      <div className="cardmaincontainer">
        <div className="cardcontainer">
          <div className="headsection">
            <div className="imglogocontainer">
              <img
                className="comlogo"
                alt="job details company logo"
                src={companyLogoUrl}
              />
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
          <hr />
          <div>
            <div className="descriptioncontainer">
              <h1>Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>

            <p>{jobDescription}</p>
          </div>

          <div>
            <h1>Skills</h1>
            <ul className="unorder">
              {skill.map((object) => (
                <li key={object.name} className="list">
                  <img
                    alt={object.name}
                    className={object.name}
                    src={object.imageUrl}
                  />
                  <p>{object.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1>Life at Company</h1>
            <div className="contentcontainers">
              <p>{description}</p>
              <img alt="life at company" src={imageUrls} />
            </div>
          </div>
        </div>

        <div className="cardcontainer">
          <h1>Similar jobs</h1>
          <ul className="unordersimilar">
            {similar.map((object) => (
              <li key={object.id} className="similarlist">
                <div className="headsection">
                  <div className="imglogocontainer">
                    <img
                      className="comlogo"
                      alt="similar job company logo"
                      src={object.companyLogoUrl}
                    />
                  </div>
                  <div>
                    <h1 className="title">{object.title}</h1>
                    <p className="rating">{object.rating}</p>
                  </div>
                </div>

                <div>
                  <h1>Description</h1>
                  <p>{object.jobDescription}</p>
                </div>

                <div className="locationcontainer">
                  <p>{object.location}</p>
                  <p>{object.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  getfailureview = () => (
    <div className="notfoundcontainer">
      <div className="notfound">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button className="retrybutton" type="button">
          Retry
        </button>
      </div>
    </div>
  );

  render() {
    const { status } = this.state;
    let make = "";
    switch (status) {
      case statuscode.success:
        make = this.getsucessdata();
        break;
      case statuscode.loading:
        make = this.getloadings();
        break;
      case statuscode.failure:
        make = this.getfailureview();
        break;

      default:
        return null;
    }
    return (
      <>
        <Header />
        {make}
      </>
    );
  }
}
export default Newjob;
