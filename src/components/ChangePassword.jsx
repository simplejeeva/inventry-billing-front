import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../Global";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import UserContext from "../context/UserContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  let input = userContextData.forgotUser;

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      username: `${input.username}`,
      email: `${input.email}`,
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(
          `${API}/api/user/changepassword/${input.email}`,
          values
        );
        toast.success(register.data.message);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });
  return (
    <div className="container">
      <Toaster />
      <div className="row my-5 shadow">
        <div className="col img-div">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
            alt="Login"
            className="img-width"
          />
        </div>
        <div className="col login_container my-5 mx-3">
          <form onSubmit={handleSubmit} className="login_form">
            <h1 className="text-center p-2 fw-bold">Connect with us..!</h1>
            <div className="my-3">
              <input
                label="Username"
                onChange={handleChange}
                value={values.username}
                name="username"
                placeholder="Username"
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-3">
              <input
                label="Email"
                type="email"
                onChange={handleChange}
                value={values.email}
                name="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="my-3">
              <input
                label="Password"
                type="text"
                onChange={handleChange}
                value={values.password}
                name="password"
                placeholder="Password"
                className="form-control"
              />
            </div>

            <div className="Login_btn text-center mt-3">
              <button type="submit" className="btn btn-primary col-12">
                SignUp
              </button>
              <div className="link my-4">
                <Link to="/">
                  Already have an account? <b>Click Here</b>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
