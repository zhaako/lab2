import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../features/transactions/transactionsSlice.js'
import { fetchCategories } from '../features/categories/categoriesSlice.js'
import TransactionForm from 'src/components/TransactionForm.jsx'
import TransactionList from 'src/components/TransactionList.jsx'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { transactions } = useSelector((state) => state.transactions)
  const { categories } = useSelector((state) => state.categories)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchCategories())
  }, [dispatch])

  const balance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount)
  }, 0)

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Текущий баланс</h3>
          <div className="mt-2 text-3xl font-semibold text-gray-900">
            ₸{balance.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Доходы</h3>
          <div className="mt-2 text-3xl font-semibold text-green-600">
            ₸{income.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Расходы</h3>
          <div className="mt-2 text-3xl font-semibold text-red-600">
            ₸{expenses.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Транзакции</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Добавить транзакцию
        </button>
      </div>

      <TransactionList transactions={transactions} categories={categories} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Добавить транзакцию
            </h3>
            <TransactionForm
              categories={categories}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard 