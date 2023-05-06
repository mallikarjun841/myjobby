import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./component/Loginpage";
import Job from "./component//Jobpage";
import Home from "./component/Home";
import NotFound from "./component//NotFound";
import ProtectionPage from "./component//Protectionpage";
import PageNotFound from "./component//Pagenotfound";
import Newjob from "./component//Newjob";

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route element={<ProtectionPage />}>
        <Route exact element={<Home />} path="/" />
        <Route element={<Job />} path="/jobs" />
        <Route  element={<Newjob />} path="/jobs/:id" />
        <Route element={<PageNotFound />} path="/not" />
      </Route>
      <Route element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
