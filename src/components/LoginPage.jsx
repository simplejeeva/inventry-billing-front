import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { API } from "../Global";
import Spinner from "./Spinner";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userContextData = useContext(UserContext);
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const login = await axios.post(`${API}/api/user/login`, values);

        if (login.data.token) {
          localStorage.setItem("react_token", login.data.token);
          localStorage.setItem("userName", login.data.username.username);
          localStorage.setItem("userEmail", login.data.username.email);
          localStorage.setItem("userNumber", login.data.username.phonenumber);
          localStorage.setItem("userCity", login.data.username.city);
          userContextData.setLoginPerson(login.data.username.username);
          navigate("/home");
          setLoading(false);
          toast.success(login.data.message);
        } else {
          toast.error(login.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid Credential");
        setLoading(false);
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
                    <h1 className="my-3">Login</h1>
                    <h5>Explore More By Connecting with us..!</h5>
                  </div>
                  <div className="m-2 col-8">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={values.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="m-2 col-8 col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      className="form-control"
                      required
                    />
                  </div>
                  <Button className="col-8 my-3" type="submit">
                    Let's Go
                  </Button>
                  <div className="link py-2">
                    <Link to="/ForgetPassword">
                      <b>Forgot Password ?</b>
                    </Link>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-secondary">
                      Not a Member
                      <Link className="text-danger mx-2" to="/signup">
                        Register Now
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

export default LoginPage;
