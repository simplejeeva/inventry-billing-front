import React from "react";
import NavBar from "../components/NavBar";
import AddInvoice from "./AddInvoice";

const Invoice = () => {
  return (
    <>
      <NavBar />
      <div className="container my-3">
        <AddInvoice />
      </div>
    </>
  );
};

export default Invoice;
