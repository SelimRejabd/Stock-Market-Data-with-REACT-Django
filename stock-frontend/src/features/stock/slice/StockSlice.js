import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const stockDataFromJsonFile = createAsyncThunk(
  "stocks/stockDataJson",
  async (page) => {
    const response = await fetch(`/api/stocks?page=${page}`);
    const data = await response.json();
    return { data: data.results, count: data.count };
  }
);

export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async (value) => {
    const response = await axios.get(`/api/stocks-data/?search=${value.searchData}&page=${value.page}`);
    const data = response.data;
    return { data: data.results, count: data.count };
  }
);

export const fetchStockDataById = createAsyncThunk(
  "stocks/fetchStockDataById",
  async (id) => {
    const response = await axios.get(`/api/stocks-data/${id}/`);
    return response.data;
  }
);

export const addStockData = createAsyncThunk(
  "stocks/addStockData",
  async (stockData) => {
    const response = await fetch("/api/stocks-data/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData),
    });
    const data = await response.json();
    return data;
  }
);

export const updateStockData = createAsyncThunk(
  "stocks/updateStockData",
  async (stockData) => {
    const response = await axios.put(
      `/api/stocks-data/update/${stockData.id}/`,
      stockData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteStockData = createAsyncThunk(
  "stocks/deleteStockData",
  async (id) => {
    axios.delete(`/api/stocks-data/delete/${id}`);
    return { id };
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stockData: [],
    stock: {},
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    successMessage: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearMessages(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload.data;
        state.totalPages = Math.ceil(action.payload.count / 10);
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStockDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.stock = action.payload;
      })
      .addCase(fetchStockDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStockData.pending, (state) => {
        state.error = null;
      })
      .addCase(addStockData.fulfilled, (state, action) => {
        state.stockData.push(action.payload);
        state.successMessage = "Data added successfully!";
      })
      .addCase(addStockData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateStockData.pending, (state) => {
        state.error = null;
      })
      .addCase(updateStockData.fulfilled, (state, action) => {
        const index = state.stockData.findIndex(
          (stock) => stock.id === action.payload.id
        );
        state.stockData[index] = action.payload;
        state.successMessage = "Data updated successfully!";
      })
      .addCase(deleteStockData.fulfilled, (state, action) => {
        state.stockData = state.stockData.filter(
          (stock) => stock.id !== action.payload.id
        );
        state.successMessage = "Data deleted successfully!";
      })
      .addCase(deleteStockData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(stockDataFromJsonFile.pending, (state) => {
        state.error = null;
      })
      .addCase(stockDataFromJsonFile.fulfilled, (state, action) => {
        state.stockData = action.payload.data;
        state.totalPages = Math.ceil(action.payload.count / 10);
      })
      .addCase(stockDataFromJsonFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setPage, clearMessages } = stockSlice.actions;

export default stockSlice.reducer;
