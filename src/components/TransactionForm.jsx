import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTransaction } from 'src/features/transactions/transactionsSlice.js'

const TransactionForm = ({ categories, onClose }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        categoryId: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createTransaction({
                ...formData,
                amount: parseFloat(formData.amount),
                categoryId: parseInt(formData.categoryId)
            })).unwrap()
            onClose()
        } catch (error) {
            console.error('Failed to create transaction:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Тип транзакции
                </label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="expense">Расход</option>
                    <option value="income">Доход</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Сумма
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₸</span>
                    </div>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Категория
                </label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Выберите категорию</option>
                    {categories
                        .filter((category) => category.type === formData.type)
                        .map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Описание
                </label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Дата
                </label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary"
                >
                    Отмена
                </button>
                <button type="submit" className="btn btn-primary">
                    Сохранить
                </button>
            </div>
        </form>
    )
}

export default TransactionForm