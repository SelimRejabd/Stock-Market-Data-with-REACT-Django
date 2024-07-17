import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStockData,
  clearMessages,
} from "../features/stock/slice/StockSlice";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AddStockScreen = () => {
  const [newStock, setNewStock] = useState({
    date: "",
    trade_code: "",
    high: 0,
    low: 0,
    open: 0,
    close: 0,
    volume: 0,
  });
  const dispatch = useDispatch();

  const handleAddStock = (e) => {
    e.preventDefault();
    dispatch(addStockData(newStock));
    setNewStock({
      date: "",
      trade_code: "",
      high: 0,
      low: 0,
      open: 0,
      close: 0,
      volume: 0,
    });
  };

  const successMessage = useSelector((state) => state.stocks.successMessage);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700"
        >
          <i className="fas fa-arrow-left mr-2"></i> Go Back
        </Link>
        <h2 className="text-2xl font-bold  text-center">ADD NEW STOCK</h2>
        <form onSubmit={handleAddStock} className="ml-[450px] w-[600px] space-y-4">
          <div className="mb-2">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={newStock.date}
              onChange={(e) =>
                setNewStock({ ...newStock, date: formatDate(e.target.value) })
              }
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Trade Code</label>
            <input
              type="text"
              value={newStock.trade_code}
              onChange={(e) =>
                setNewStock({ ...newStock, trade_code: e.target.value })
              }
              className="border p-2 w-full"
              placeholder="Trade Code"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">High</label>
            <input
              type="number"
              value={newStock.high}
              onChange={(e) =>
                setNewStock({ ...newStock, high: Number(e.target.value) })
              }
              className="border p-2 w-full"
              placeholder="High"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Low</label>
            <input
              type="number"
              value={newStock.low}
              onChange={(e) =>
                setNewStock({ ...newStock, low: Number(e.target.value) })
              }
              className="border p-2 w-full"
              placeholder="Low"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 ">Open</label>
            <input
              type="number"
              value={newStock.open}
              onChange={(e) =>
                setNewStock({ ...newStock, open: Number(e.target.value) })
              }
              className="border p-2 w-full"
              placeholder="Open"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 ">Close</label>
            <input
              type="number"
              value={newStock.close}
              onChange={(e) =>
                setNewStock({ ...newStock, close: Number(e.target.value) })
              }
              className="border p-2 w-full"
              placeholder="Close"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Volume</label>
            <input
              type="number"
              value={newStock.volume}
              onChange={(e) =>
                setNewStock({ ...newStock, volume: Number(e.target.value) })
              }
              className="border p-2 w-full"
              placeholder="Volume"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStockScreen;
