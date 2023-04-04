import { Modal } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { API } from "../Global";

const AddCustomer = () => {
  const [addModal, setAddModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerNumber, setNewCustomerNumber] = useState("");
  const addCustomer = (e) => {
    e.preventDefault();
    setAddModal(false);
    const newCustomer = {
      name: newCustomerName,
      email: newCustomerEmail,
      phonenumber: newCustomerNumber,
    };
    fetch(`${API}/api/customers`, {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(toast.success("Added Successfully"));
  };
  return (
    <button onClick={() => setAddModal(true)} className={"btn btn-warning"}>
      Add New Customer
      <Modal
        opened={addModal}
        onClose={() => setAddModal(false)}
        title="New Customer"
      >
        <form onSubmit={addCustomer}>
          <div className="mb-2">
            <label>Customer name</label>
            <input
              onChange={(e) => setNewCustomerName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Customer name"
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              onChange={(e) => setNewCustomerEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-2">
            <label>Phone Number</label>
            <input
              onChange={(e) => setNewCustomerNumber(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter PhoneNumber"
              required
            />
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-warning text-white">Create</button>
          </div>
        </form>
      </Modal>
    </button>
  );
};

export default AddCustomer;
