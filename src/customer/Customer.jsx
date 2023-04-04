import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AddCustomer from "./AddCustomer";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mantine/core";
import { toast } from "react-hot-toast";
import { API } from "../Global";

const Customer = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customers, setCustomers] = useState([]);

  const updateCustomer = (e) => {
    e.preventDefault();
    setUpdateModal(false);
    const updatedCustomer = {
      name: customerName,
      email: customerEmail,
      phonenumber: customerNumber,
    };
    fetch(`${API}/api/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(updatedCustomer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(toast.success("Updated Successfully"));
  };

  const removeCustomer = (id) => {
    fetch(`${API}/api/customers/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(toast.success("Deleted successfully!"))
      .catch((e) => console.log(e));
  };

  const getCustomer = (id) => {
    fetch(`${API}/api/customers/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        setCustomerName(res.name);
        setCustomerEmail(res.email);
        setCustomerNumber(res.phonenumber);
        setCustomerId(res._id);
      })
      .catch((e) => console.log(e));
  };

  const getCustomers = () => {
    fetch(`${API}/api/customers`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setCustomers(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => getCustomers(), [customers]);
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between my-3">
          <h3 className="fw-bold">Customers List</h3>
          <div className="Add_btn">
            <AddCustomer />
          </div>
        </div>
        <div className="row g-4 my-2">
          <div className="container table-responsive">
            <table className="table table-striped  table-bordered table-hover bg-light">
              <thead>
                <tr>
                  <th scope="col">Customer Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Customer Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {customers.length > 0 ? (
                customers.map((customer) => {
                  return (
                    <tbody key={customer._id}>
                      <tr>
                        <td>{customer._id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phonenumber}</td>

                        <td>
                          <div>
                            <button
                              onClick={() => {
                                setUpdateModal(true);
                                getCustomer(customer._id);
                              }}
                              color="secondary"
                            ></button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              onClick={() => {
                                removeCustomer(customer._id);
                              }}
                              color="error"
                            ></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={8}>
                      <h3 className="fw-bold text-center">No data Found</h3>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Modal
          opened={updateModal}
          onClose={() => setUpdateModal(false)}
          title="Customer Update"
        >
          <form onSubmit={updateCustomer}>
            <div className="mb-3">
              <label>Customer name</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter Customer name"
              />
            </div>
            <div className="mb-1">
              <label>Customer price/Qty</label>
              <input
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter Customer Email"
              />
            </div>
            <div className="mb-1">
              <label>Phone Number</label>
              <input
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter PhoneNumber"
              />
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-warning text-white">Update</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Customer;
