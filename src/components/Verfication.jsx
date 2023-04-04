import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API } from "../Global";
import { toast, Toaster } from "react-hot-toast";

function Verification() {
  let navigate = useNavigate();
  const userContextData = useContext(UserContext);
  let mail = userContextData.mailid;
  let formik = useFormik({
    initialValues: {
      email: `${mail}`,
      vercode: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.vercode) {
        errors.vercode = "Please enter the validation code";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${API}/api/user/verify`, values);
        userContextData.setforgotUser(res.data);
        console.log(res);
        if (res.data) {
          toast.success("Verified ✅");
          navigate("/ChangePassword");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error.response.data.message}`);
      }
    },
  });
  return (
    <div className="container">
      <Toaster />
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-lg-8 col-md-10 col-sm-12 my-5">
          <div className="card shadow">
            <div className="card-header">
              <h3 className="card-title">OTP Verification</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group col">
                  <label htmlFor="vercode">Enter OTP</label>
                  <input
                    type="number"
                    className="form-control form-control-user mb-2"
                    name="vercode"
                    value={formik.values.vercode}
                    onChange={formik.handleChange}
                    placeholder="Enter otp code"
                  />
                  {formik.errors.vercode ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.vercode}
                    </span>
                  ) : null}
                </div>
                <div className="col my-3">
                  <button className="btn btn-success" type="submit">
                    verify
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

export default Verification;
