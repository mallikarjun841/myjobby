import { connect, useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string().min(2).max(25).required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(5),
      }),

      onSubmit: async (values, action) => {
        console.log(values);
        const { name, password, email } = values;
        const url = "http://localhost:5001/userregister/";
        const userdatas = { username: name, email, password };
        console.log(userdatas);
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdatas),
        };
        console.log(option);

        const fetchdata = await fetch(url, option);
        console.log(fetchdata);

        console.log("done");
        action.resetForm();
      },
    });

  const getdata = async () => {
    console.log("wow");

    const make = await fetch("http://localhost:5001/userdetails/");
    const makeresponse = await make.json();
    console.log(makeresponse);
  };

  useEffect(() => {
    getdata();
  });

  const { name, email, password } = values;
  return (
    <div className="App">
      <div className="containers">
        <h3>Register Form</h3>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="input"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="name"
            id="name"
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            className="input"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="email"
            id="email"
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            className="input"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="password"
            id="password"
          />
          <p className="error">
            {errors.password && touched.password && errors.password}
          </p>
          <div>
            <Button variant="primary" type="submit">
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
