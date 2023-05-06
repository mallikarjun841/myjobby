import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectionPage = (props) => {
  const token = Cookies.get("jwt_token");
  return token === undefined ? <Navigate to="/login" replace /> : <Outlet />;
};
export default ProtectionPage;
