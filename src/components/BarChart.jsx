import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../Global";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [stocks, setStocks] = useState([]);
  const [availability, setAvailability] = useState();
  const [name, setName] = useState();

  const handleClick = () => {
    setAvailability(stocks.map((e) => e.availability));
    setName(stocks.map((n) => n.name));
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
  const data = {
    labels: name,
    datasets: [
      {
        label: "Stocks",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: availability,
      },
    ],
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-10">
          <div className="my-3 text-center">
            <Bar data={data} />
          </div>
          <div className="my-3 text-center">
            <button onClick={handleClick} className="btn btn-primary">
              Click Me to Get Stock Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
