import React from "react";
import { Link } from "react-router-dom";

const StockTable = ({ data, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 ml-10">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trade Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              High
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Low
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Open
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Close
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((stock, index) => (
            <tr key={index}>
              <td className="px-1 py-1 whitespace-nowrap">{stock.id}</td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.date}</td>
              <td className="px-1 py-1 whitespace-nowrap">
                {stock.trade_code}
              </td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.high}</td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.low}</td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.open}</td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.close}</td>
              <td className="px-1 py-1 whitespace-nowrap">{stock.volume}</td>
              <td className="px-1 py-1 whitespace-nowrap">
                <Link to={`/update/${stock.id}`}>
                  <button className="bg-yellow-500 text-white px-1 py-1 rounded mr-2">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-1 py-1 rounded"
                  onClick={() => onDelete(stock.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
