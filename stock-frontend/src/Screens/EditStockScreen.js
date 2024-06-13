import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  clearMessages,
  fetchStockDataById,
  updateStockData,
} from "../features/stock/slice/StockSlice";

const EditStockScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const stock = useSelector((state) => state.stocks.stock);
  const successMessage = useSelector((state) => state.stocks.successMessage);

  const [newStock, setNewStock] = useState({
    id: "",
    date: "",
    trade_code: "",
    high: 0,
    low: 0,
    open: 0,
    close: 0,
    volume: 0,
  });

  useEffect(() => {
    if (id && id !== "") {
      dispatch(fetchStockDataById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (stock) {
      setNewStock({
        id: stock.id,
        date: stock.date,
        trade_code: stock.trade_code,
        high: stock.high,
        low: stock.low,
        open: stock.open,
        close: stock.close,
        volume: stock.volume,
      });
    }
  }, [stock]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch]);

  const handleEditStock = (e) => {
    e.preventDefault();
    dispatch(updateStockData(newStock));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 mb-5 text-white rounded bg-blue-500 hover:bg-blue-700"
        >
          <i className="fas fa-arrow-left mr-2"></i> Go Back
        </Link>
        <h2 className="text-2xl font-bold mb-4 text-center">EDIT STOCK</h2>
        <form onSubmit={handleEditStock} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newStock.date}
              onChange={(e) =>
                setNewStock({ ...newStock, date: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Trade Code</label>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">High</label>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Low</label>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Open</label>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Close</label>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Volume</label>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStockScreen;
