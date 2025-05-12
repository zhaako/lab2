import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from 'src/api/mockApi.js'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApi.getCategories()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await mockApi.createCategory(category)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await mockApi.updateCategory(id, updates)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await mockApi.deleteCategory(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  categories: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        const index = state.categories.findIndex(c => c.id === action.payload.id)
        if (index !== -1) {
          state.categories[index] = action.payload
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories = state.categories.filter(c => c.id !== action.payload)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer 