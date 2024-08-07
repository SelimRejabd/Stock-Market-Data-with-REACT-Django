import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchStockData,
  setPage,
  deleteStockData,
  clearMessages,
} from "../features/stock/slice/StockSlice";
import StockTable from "../components/StockTable";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stockData, loading, page, totalPages } = useSelector(
    (state) => state.stocks
  );
  const successMessage = useSelector((state) => state.stocks.successMessage);
  const [pageInput, setPageInput] = useState(page);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const value = {
      page,
      searchData,
    };
    dispatch(fetchStockData(value));
  }, [dispatch, page, searchData]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch, navigate]);

  const handlePrevious = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handleGoToPage = () => {
    if (pageInput >= 1 && pageInput <= totalPages) {
      dispatch(setPage(pageInput));
    }
  };

  const handleDeleteStock = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      dispatch(deleteStockData(id));
    }
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-center">STOCK MARKET DATA</h1>
      <div className="flex justify-between mt-5 ml-10 mr-10">
        <Link to="/add-stock/">
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-5 mb-5">
            Add Stock
          </button>
        </Link>

        <input
          type="text"
          placeholder="Search by id, trade code or date"
          value={searchData}
          onChange={handleSearch}
          className="h-10 w-[300px] mt-5 mp-10 shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <StockTable data={stockData} onDelete={handleDeleteStock} />
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white mr-10 px-4 py-2 rounded"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {page} of {totalPages}
            </p>
            <button
              className="bg-blue-500 text-white ml-10 px-4 py-2 rounded items-center"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="number"
              value={pageInput}
              onChange={(e) => setPageInput(Number(e.target.value))}
              className="border p-2 mr-4"
              min="1"
              max={totalPages}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleGoToPage}
            >
              Go to Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
