import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from 'src/api/mockApi.js'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApi.getTransactions()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      const response = await mockApi.createTransaction(transaction)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await mockApi.updateTransaction(id, updates)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await mockApi.deleteTransaction(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  transactions: [],
  loading: false,
  error: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = [...state.transactions, action.payload]
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false
        const index = state.transactions.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.transactions[index] = action.payload
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = state.transactions.filter(t => t.id !== action.payload)
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = transactionsSlice.actions
export default transactionsSlice.reducer 