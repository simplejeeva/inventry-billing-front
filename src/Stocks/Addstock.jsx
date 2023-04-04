import { Modal } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { API } from "../Global";

const AddStock = () => {
  const [addModal, setAddModal] = useState(false);
  const [newStockName, setNewStockName] = useState("");
  const [newStockPricePerQty, setNewStockPricePerQty] = useState("");
  const [newStockAvailability, setNewStockAvailability] = useState("");
  const [newStockRequirement, setNewStockRequirement] = useState("");

  const addStock = (e) => {
    e.preventDefault();
    setAddModal(false);
    const newStock = {
      name: newStockName,
      pricePerQty: newStockPricePerQty,
      availability: newStockAvailability,
      requirement: newStockRequirement,
    };
    fetch(`${API}/api/stocks`, {
      method: "POST",
      body: JSON.stringify(newStock),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(toast.success("Added Successfully"));
  };
  return (
    <button onClick={() => setAddModal(true)} className={"btn btn-success"}>
      Add New Stock
      <Modal
        opened={addModal}
        onClose={() => setAddModal(false)}
        title="New Stock"
      >
        <form onSubmit={addStock}>
          <div className="mb-2">
            <label>Stock name</label>
            <input
              onChange={(e) => setNewStockName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter stock name"
              required
            />
          </div>
          <div className="mb-2">
            <label>Price per Qty</label>
            <input
              onChange={(e) => setNewStockPricePerQty(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-2">
            <label>Availability</label>
            <input
              onChange={(e) => setNewStockAvailability(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter stocks availability"
              required
            />
          </div>
          <div className="mb-2">
            <label>Requirement</label>
            <input
              onChange={(e) => setNewStockRequirement(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter required Stock"
              required
            />
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-success text-white">Create</button>
          </div>
        </form>
      </Modal>
    </button>
  );
};

export default AddStock;
