import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { API } from "../Global";
import { toast, Toaster } from "react-hot-toast";

function ForgetPassword() {
  let navigate = useNavigate();
  const userContextData = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      userContextData.setmailid(values.email);
      try {
        let mail = await axios.post(`${API}/api/user/sendmail`, values);
        if (mail.data) {
          toast.success(`${mail.data.message}`);
          navigate("/Verification");
        } else {
          toast.error(mail.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error.response.data.message}`);
      }
    },
  });

  return (
    <div className="container-fluid">
      <Toaster />
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-lg-8 col-md-10 col-sm-12 my-5">
          <div className="card mt-3 shadow">
            <div className="card-header">
              <h3 className="card-title">Forgot Password...!</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit} className="my-5">
                <div className="form-group">
                  <input
                    type={"text"}
                    className="form-control form-control-user mb-2"
                    name={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter your Email Address..."
                  />
                  {formik.errors.email ? (
                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                  ) : null}
                </div>

                <div className="col my-3">
                  <button className="btn btn-primary" type={"submit"}>
                    Send verification
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
