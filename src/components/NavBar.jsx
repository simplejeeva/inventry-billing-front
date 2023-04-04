import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import LogoutIcon from "@mui/icons-material/Logout";
// import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "./NavBar.css";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"home"}>
          Invento
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active mx-3" to={"/home"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active mx-3" to={"/invoice"}>
                Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active mx-3" to={"/stocks"}>
                Stocks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active mx-3" to={"/customers"}>
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active mx-3" to={"/profile"}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Button variant="outlined" onClick={HandleSumbit}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
