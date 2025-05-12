import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, updateCategory, deleteCategory } from 'src/features/categories/categoriesSlice.js'

const Settings = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categories)
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'expense',
  })

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    await dispatch(createCategory(newCategory))
    setNewCategory({ name: '', type: 'expense' })
  }

  const handleUpdateCategory = async (id, updates) => {
    await dispatch(updateCategory({ id, updates }))
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      await dispatch(deleteCategory(id))
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Настройки категорий</h2>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">
            Добавить новую категорию
          </h3>
          <form onSubmit={handleCreateCategory} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-gray-700"
              >
                Название
              </label>
              <input
                type="text"
                id="category-name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category-type"
                className="block text-sm font-medium text-gray-700"
              >
                Тип
              </label>
              <select
                id="category-type"
                value={newCategory.type}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, type: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Добавить категорию
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900">
                    {category.name}
                  </p>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.type === 'income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.type === 'income' ? 'Доход' : 'Расход'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateCategory(category.id, {
                        type:
                          category.type === 'income' ? 'expense' : 'income',
                      })
                    }
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Изменить тип
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Settings 