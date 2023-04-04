import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Modal } from "@mantine/core";
import { API } from "../Global";
import ReactToPrint from "react-to-print";
import { toast } from "react-hot-toast";

const AddInvoice = () => {
  const [stock, setStock] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [stocks, setStocks] = useState([""]);
  const [quantity, setQuantity] = useState("");
  const [pricePerQty, setPricePerQty] = useState("");
  const [list, setList] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [gst, setGst] = useState("");
  const [total, setTotal] = useState("");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;

  const handleChange = (event) => {
    setStock(event.target.value);
  };

  const handlePrint = () => {
    toast.success("PDF Download Success");
  };

  const addListItem = (e) => {
    e.preventDefault();
    setAddModal(false);
    const newListItem = {
      itemName: stock,
      pricePerQty: pricePerQty,
      quantity: quantity,
      gst: gst,
      total: parseInt(
        (gst * quantity * pricePerQty) / 100 + quantity * pricePerQty
      ),
    };
    setList([...list, newListItem]);
    setGrandTotal(
      parseInt(
        grandTotal +
          (gst * quantity * pricePerQty) / 100 +
          quantity * pricePerQty
      )
    );

    setStock("");
    setPricePerQty("");
    setQuantity("");
    setGst("");
    setTotal("");
  };
  //Get Stocks
  const getStocks = () => {
    fetch(`${API}/api/stocks`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setStocks(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => getStocks(), [stocks]);

  //User Name
  const [userName, setUserName] = useState();
  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("userName"));
    if (user) {
      setUserName(user);
    }
  }, [userName]);

  //GEt Customer Details

  const [addModals, setAddModals] = useState(false);
  const [customers, setCustomers] = useState([""]);

  const [customersEmail, setCustomersEmail] = useState("");
  const [customersName, setCustomersName] = useState("");
  const [customersNumber, setCustomersNumber] = useState("");
  const [customersList, setCustomersList] = useState([]);
  //handle Change
  const handleChanged = (event) => {
    setCustomersName(event.target.value);
    // console.log(customers);
  };

  //Show Customer Details
  const addListCustomer = (e) => {
    e.preventDefault();
    setAddModal(false);
    const newListCustomer = {
      name: customersName,
      email: customersEmail,
      phonenumber: customersNumber,
    };
    setCustomersList([...customersList, newListCustomer]);

    setCustomersName("");
    setCustomersEmail("");
    setCustomersNumber("");
  };

  const getCustomer = () => {
    fetch(`${API}/api/customers`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setCustomers(res))
      .catch((e) => console.log(e));
  };
  // console.log(customersList);
  useEffect(() => getCustomer(), [customers]);
  const componentRef = useRef();
  return (
    <div className="container-fluid py-2 bg-light rounded my-5">
      <div className="d-flex justify-content-between">
        <button
          onClick={() => setAddModal(true)}
          className="btn btn-primary mx-5 mt-3"
        >
          Select Item
        </button>
        <button
          onClick={() => setAddModals(true)}
          className="btn btn-primary mx-5 mt-3"
        >
          Select Customer Details
        </button>
      </div>

      {/* Invoice Table */}
      <div
        className="invoice_container container shadow rounded my-5"
        ref={componentRef}
      >
        <h3 className="text-center fw-bold my-3">Invoice</h3>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5>From : {userName}</h5>
            <h5>Date: {today}</h5>
          </div>
          <div>
            <h3>Customer Details</h3>
            {customersList.length > 0
              ? customersList.map((e, i) => {
                  return (
                    <ul key={i}>
                      <li>{e.name}</li>
                      <li>{e.email}</li>
                      <li>{e.phonenumber}</li>
                    </ul>
                  );
                })
              : null}
          </div>
        </div>
        <div className="container table-responsive">
          <table className="table table-striped  table-bordered table-hover bg-light">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Item Name
                </th>
                <th scope="col" className="text-center">
                  Price Per Qty
                </th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col" className="text-center">
                  GST(%)
                </th>
                <th scope="col" className="text-center">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((lst, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{lst.itemName}</td>
                      <td className="text-center">{lst.pricePerQty}</td>
                      <td className="text-center">{lst.quantity}</td>
                      <td className="text-center">{lst.gst} </td>
                      <td className="text-center">{lst.total}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>
                    <h3 className="fw-bold text-center">No data Found</h3>
                  </td>
                </tr>
              )}
              <tr>
                <td></td>
                <td> </td>
                <td> </td>
                <td className="text-center fw-bolder">Grand Total</td>
                <td className="text-center fw-bolder">{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="Print_btn text-center my-5">
        <ReactToPrint
          trigger={() => (
            <button onClick={handlePrint} className="btn btn-primary">
              Print/Download Invoice
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      {/* Item adding to Table */}
      <Modal
        opened={addModal}
        onClose={() => setAddModal(false)}
        title="New List Item"
      >
        <form onSubmit={addListItem}>
          <div className="mb-1">
            <Box sx={{ maxWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stock</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={stock || ""}
                  label="Stock"
                  defaultValue="select"
                  onChange={handleChange}
                >
                  {stocks.map((stoc, index) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setPricePerQty(stoc.pricePerQty);
                        }}
                        key={index}
                        value={stoc.name}
                      >
                        {stoc.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="mb-1">
            <label>Item price per Qty</label>
            <input
              onChange={handleChange}
              type="number"
              value={pricePerQty}
              className="form-control"
              placeholder="Enter price"
            />
          </div>
          <div className="mb-1">
            <label>Quantity</label>
            <input
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              value={quantity}
              className="form-control"
              placeholder="Enter quantity"
            />
          </div>
          <div className="mb-1">
            <label>Gst</label>
            <input
              onChange={(e) => {
                setGst(e.target.value);
              }}
              type="number"
              value={gst}
              className="form-control"
              placeholder="Enter gst %"
            />
          </div>
          <div className="mb-1">
            <label>Total</label>
            <input
              value={total}
              type="number"
              className="form-control"
              placeholder="Auto Calculated"
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Add List Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Customer Detail Modal */}
      <Modal
        opened={addModals}
        onClose={() => setAddModals(false)}
        title="New Customer Data"
      >
        <form onSubmit={addListCustomer}>
          <div className="mb-1">
            <Box sx={{ maxWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Customers</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue="choose"
                  label="Customers"
                  value={customersName || ""}
                  onChange={handleChanged}
                >
                  {customers.map((cus, index) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setCustomersEmail(cus.email);
                          setCustomersNumber(cus.phonenumber);
                        }}
                        key={index}
                        value={cus.name}
                      >
                        {cus.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="mb-1">
            <label>Customer Email</label>
            <input
              onChange={handleChanged}
              type="text"
              value={customersEmail}
              className="form-control"
            />
          </div>
          <div className="mb-1">
            <label>Customer Number</label>
            <input
              onChange={handleChanged}
              type="text"
              value={customersNumber}
              className="form-control"
            />
          </div>
          <div className="d-grid mt-4">
            <button
              onClick={() => setAddModals(false)}
              className="btn btn-primary"
            >
              Add To Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddInvoice;
