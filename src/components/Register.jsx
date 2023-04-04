import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../Global";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import Spinner from "./Spinner";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      phonenumber: "",
      city: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const register = await axios.post(`${API}/api/user/signup`, values);
        console.log(register);
        toast.success("SignUp Successfully");
        navigate("/");
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });
  return (
    <>
      {loading && <Spinner />}
      <Toaster />
      <div className="login__container">
        <div className="container my-4">
          <div className="row p-4 justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-12 col-xlg-6 p-3">
              <div className="glass">
                <form className="form_container py-4" onSubmit={handleSubmit}>
                  <div className="title text-center m-4">
                    <h1 className="my-3 fw-bold">Register</h1>
                    <h5>Explore More By Connecting with us..!</h5>
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={values.username}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="phonenumber">PhoneNumber</label>
                    <input
                      type={"number"}
                      onChange={handleChange}
                      value={values.phonenumber}
                      name="phonenumber"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="city">City</label>
                    <input
                      type={"text"}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button className="col-8 my-3" type="submit">
                    Register
                  </Button>
                  <div className="text-center py-4">
                    <span className="text-secondary">
                      Already have an account?
                      <Link className="text-primary mx-2" to="/">
                        <b>Login</b>
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
