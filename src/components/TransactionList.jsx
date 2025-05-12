import { useDispatch } from 'react-redux'
import { deleteTransaction } from 'src/features/transactions/transactionsSlice.js'

const TransactionList = ({ transactions, categories }) => {
    const dispatch = useDispatch()

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить эту транзакцию?')) {
            await dispatch(deleteTransaction(id))
        }
    }

    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId)
        return category ? category.name : 'Неизвестная категория'
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {transaction.description}
                                    </p>
                                    <p className="ml-2 text-sm text-gray-500">
                                        {getCategoryName(transaction.categoryId)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <p
                                        className={`text-sm font-medium ${
                                            transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {transaction.type === 'income' ? '+' : '-'}₸
                                        {transaction.amount.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(transaction.id)}
                                        className="ml-4 text-red-600 hover:text-red-900"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList