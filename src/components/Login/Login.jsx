import React, { useContext, useState } from "react";
// import style from './Login.module.scss'
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../TokenContext/TokenContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let {  setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  async function signIn(values) {
    setIsLoding(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoding(false);
      });

    if (data.message === "success") {
      setIsLoding(false);
      localStorage.setItem("usertoken", data.token);
      setUserToken(data.token);
      navigate("/home");
    }
  }

  const validationScheme = yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/[A-Z][a-zA-Z0-9]+$/, "not valid")
      .required(),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationScheme,
    onSubmit: signIn,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="w-75 mx-auto">
        <form  className="form mt-5" onSubmit={formik.handleSubmit}>
          {error != null ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            ""
          )}

          <h1 className="mb-5 text-center">Login Now</h1>

          <div className="mb-3">
            <label htmlFor="email">email:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="password">password:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {isLoding === true ? (
            <button className=" btn text-white float-end ">
              <ThreeDots
                height="20"
                width="60"
                radius="9"
                color="#0aad0a"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </button>
          ) : (

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white float-end"
            >
              Login
            </button>
          )}

          <div className="d-flex flex-column align-items-start">
          <Link className="ps-0 btn text-main fs-6 " to={"/register"}>
            <strong>Don't have an account?</strong> 
          </Link>
          <Link className="ps-0 btn text-main fs-6 " to={"/ForgetPass"}>
            <strong>Forgot your password?</strong>
          </Link>
          </div> 

        </form>
      </div>

    </div>


    </>
  );
}
