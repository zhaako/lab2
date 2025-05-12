const getUsers = () => {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : [
        {
            id: 1,
            email: 'test@example.com',
            password: 'password123',
        },
    ]
}

const getCategories = () => {
    const categories = localStorage.getItem('categories')
    return categories ? JSON.parse(categories) : [
        { id: 1, name: 'Продукты', type: 'expense' },
        { id: 2, name: 'Транспорт', type: 'expense' },
        { id: 3, name: 'Развлечения', type: 'expense' },
        { id: 4, name: 'Зарплата', type: 'income' },
        { id: 5, name: 'Фриланс', type: 'income' },
    ]
}

const getTransactions = () => {
    const transactions = localStorage.getItem('transactions')
    return transactions ? JSON.parse(transactions) : [
        {
            id: 1,
            amount: 1500,
            type: 'expense',
            categoryId: 1,
            description: 'Продукты на неделю',
            date: '2024-03-15',
            userId: 1,
        },
        {
            id: 2,
            amount: 50000,
            type: 'income',
            categoryId: 4,
            description: 'Зарплата',
            date: '2024-03-01',
            userId: 1,
        },
    ]
}

// Mock API functions
export const mockApi = {
    // Auth
    login: async (email, password) => {
        const users = getUsers()
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
            return { user: { id: user.id, email: user.email }, token: 'mock-token' }
        }
        throw new Error('Неверный email или пароль')
    },

    register: async (email, password) => {
        const users = getUsers()
        if (users.some(u => u.email === email)) {
            throw new Error('Пользователь с таким email уже существует')
        }
        const newUser = {
            id: users.length + 1,
            email,
            password,
        }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        return { user: { id: newUser.id, email: newUser.email }, token: 'mock-token' }
    },

    // Categories
    getCategories: async () => {
        return getCategories()
    },

    createCategory: async (category) => {
        const categories = getCategories()
        const newCategory = {
            id: categories.length + 1,
            ...category,
        }
        categories.push(newCategory)
        localStorage.setItem('categories', JSON.stringify(categories))
        return newCategory
    },

    updateCategory: async (id, updates) => {
        const categories = getCategories()
        const index = categories.findIndex(c => c.id === id)
        if (index === -1) throw new Error('Категория не найдена')
        categories[index] = { ...categories[index], ...updates }
        localStorage.setItem('categories', JSON.stringify(categories))
        return categories[index]
    },

    deleteCategory: async (id) => {
        const categories = getCategories()
        const index = categories.findIndex(c => c.id === id)
        if (index === -1) throw new Error('Категория не найдена')
        categories.splice(index, 1)
        localStorage.setItem('categories', JSON.stringify(categories))
        return { success: true }
    },

    // Transactions
    getTransactions: async () => {
        return getTransactions()
    },

    createTransaction: async (transaction) => {
        const transactions = getTransactions()
        const newTransaction = {
            id: transactions.length + 1,
            ...transaction,
            userId: 1, // В реальном приложении здесь будет ID текущего пользователя
        }
        transactions.push(newTransaction)
        localStorage.setItem('transactions', JSON.stringify(transactions))
        return newTransaction
    },

    updateTransaction: async (id, updates) => {
        const transactions = getTransactions()
        const index = transactions.findIndex(t => t.id === id)
        if (index === -1) throw new Error('Транзакция не найдена')
        transactions[index] = { ...transactions[index], ...updates }
        localStorage.setItem('transactions', JSON.stringify(transactions))
        return transactions[index]
    },

    deleteTransaction: async (id) => {
        const transactions = getTransactions()
        const index = transactions.findIndex(t => t.id === id)
        if (index === -1) throw new Error('Транзакция не найдена')
        transactions.splice(index, 1)
        localStorage.setItem('transactions', JSON.stringify(transactions))
        return { success: true }
    },
}