import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNumber, setUserNumber] = useState();
  const [userCity, setUserCity] = useState();
  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("userName"));
    const userMail = JSON.stringify(localStorage.getItem("userEmail"));
    const userNumber = JSON.stringify(localStorage.getItem("userNumber"));
    const userCity = JSON.stringify(localStorage.getItem("userCity"));

    if (user && userMail) {
      setUserName(user);
      setUserEmail(userMail);
      setUserNumber(userNumber);
      setUserCity(userCity);
    }
  }, []);
  const HandleSumbit = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userNumber");
    localStorage.removeItem("userCity");
    localStorage.removeItem("react_token");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Successfully Logged Out");
  };
  return (
    <>
      <Toaster />
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center mt-5">
          <div className="card shadow col-10 my-5">
            <div className="card-header">
              <h2 className="card-title text-center">Profile Card</h2>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center  p-3">
                UserName : <b>{userName}</b>
              </h5>
              <h5 className="card-title text-center  p-3">
                Email : <b>{userEmail}</b>
              </h5>
              <h5 className="card-title text-center  p-3">
                Contact : <b>{userNumber}</b>
              </h5>
              <h5 className="card-title text-center  p-3">
                City : <b>{userCity}</b>
              </h5>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-info col-10 fw-bold"
                onClick={HandleSumbit}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
