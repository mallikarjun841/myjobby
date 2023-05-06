import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const navigate = useNavigate();
  console.log("me");
  const logoutcontent = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav>
      <ul className="headingcontainer">
        <li>
          <Link to="/">
            <img
              className="logoimg"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
        </li>

        <li className="contentcontainer">
          <p>
            <Link className="detail" to="/">
              Home
            </Link>
          </p>
          <p>
            <Link className="details" to="/jobs">
              Jobs
            </Link>
          </p>
        </li>
        <li>
          <button
            onClick={logoutcontent}
            className="logoutbutton"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
