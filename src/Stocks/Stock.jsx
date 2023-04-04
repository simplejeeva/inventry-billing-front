import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AddStock from "./Addstock";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mantine/core";
import { toast } from "react-hot-toast";
import { API } from "../Global";

const Stock = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const [stockId, setStockId] = useState("");
  const [stockName, setStockName] = useState("");
  const [pricePerQty, setPricePerQty] = useState("");
  const [availability, setAvailability] = useState("");
  const [requirement, setRequirement] = useState("");
  const [stocks, setStocks] = useState([]);

  const updateStock = (e) => {
    e.preventDefault();
    setUpdateModal(false);
    const updatedStock = {
      name: stockName,
      pricePerQty: pricePerQty,
      availability: availability,
      requirement: requirement,
    };
    fetch(`${API}/api/stocks/${stockId}`, {
      method: "PUT",
      body: JSON.stringify(updatedStock),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(toast.success("Updated Successfully"));
  };

  const removeStock = (id) => {
    fetch(`${API}/api/stocks/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(toast.success("Deleted successfully!"))
      .catch((e) => console.log(e));
  };

  const getStock = (id) => {
    fetch(`${API}/api/stocks/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        setStockName(res.name);
        setPricePerQty(res.pricePerQty);
        setAvailability(res.availability);
        setStockId(res._id);
        setRequirement(res.requirement);
      })
      .catch((e) => console.log(e));
  };

  const getStocks = () => {
    fetch(`${API}/api/stocks`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setStocks(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => getStocks(), [stocks]);
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between my-3">
          <h3 className="fw-bold">Stocks List</h3>
          <div className="Add_btn">
            <AddStock />
          </div>
        </div>
        <div className="row g-4 my-2">
          <div className="container table-responsive">
            <table className="table table-striped  table-bordered table-hover bg-light">
              <thead>
                <tr>
                  <th scope="col">Stock Id</th>
                  <th scope="col">Stock Name</th>
                  <th scope="col">Stock Price/Qty</th>
                  <th scope="col">Stock Available</th>
                  <th scope="col">Stock Required</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {stocks.length > 0 ? (
                stocks.map((stock) => {
                  return (
                    <tbody key={stock._id}>
                      <tr>
                        <td>{stock._id}</td>
                        <td>{stock.name}</td>
                        <td>{stock.pricePerQty}</td>
                        <td>{stock.availability}</td>
                        <td>{stock.requirement}</td>
                        <td>
                          <div>
                            <button
                              onClick={() => {
                                setUpdateModal(true);
                                getStock(stock._id);
                              }}
                              color="secondary"
                            ></button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              onClick={() => {
                                removeStock(stock._id);
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
          title="Stock Update"
        >
          <form onSubmit={updateStock}>
            <div className="mb-3">
              <label>Stock name</label>
              <input
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter stock name"
              />
            </div>
            <div className="mb-1">
              <label>Stock price/Qty</label>
              <input
                value={pricePerQty}
                onChange={(e) => setPricePerQty(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter stock price per kg"
              />
            </div>
            <div className="mb-1">
              <label>Availability</label>
              <input
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter availability"
              />
            </div>
            <div className="mb-1">
              <label>Requirement</label>
              <input
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter requirement"
              />
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-success text-white">Update</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Stock;
