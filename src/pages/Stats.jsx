import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from 'src/features/transactions/transactionsSlice.js'
import { fetchCategories } from 'src/features/categories/categoriesSlice.js'

const Stats = () => {
  const dispatch = useDispatch()
  const { transactions } = useSelector((state) => state.transactions)
  const { categories } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchCategories())
  }, [dispatch])

  const getCategoryStats = () => {
    const stats = {}
    categories.forEach((category) => {
      const categoryTransactions = transactions.filter(
        (t) => t.categoryId === category.id
      )
      const total = categoryTransactions.reduce(
        (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
        0
      )
      stats[category.id] = {
        name: category.name,
        total,
        count: categoryTransactions.length,
      }
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Статистика по категориям</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryStats).map(([categoryId, stats]) => (
          <div key={categoryId} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">{stats.name}</h3>
            <div className="mt-2">
              <p
                className={`text-2xl font-semibold ${
                  stats.total >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ₸{Math.abs(stats.total).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {stats.count} транзакций
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Общая статистика
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Всего транзакций</p>
            <p className="text-2xl font-semibold text-gray-900">
              {transactions.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Доходы</p>
            <p className="text-2xl font-semibold text-green-600">
              ₸
              {transactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Расходы</p>
            <p className="text-2xl font-semibold text-red-600">
              ₸
              {transactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats 