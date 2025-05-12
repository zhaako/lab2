import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/features/auth/authSlice.js'
import categoriesReducer from 'src/features/categories/categoriesSlice.js'
import transactionsReducer from 'src/features/transactions/transactionsSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
    },
})