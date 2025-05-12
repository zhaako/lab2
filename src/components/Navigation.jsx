import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'src/features/auth/authSlice.js'

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return null
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <nav className='bg-white shadow-sm'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex'>
                        <div className='flex-shrink-0 flex items-center'>
                            <Link to='/' className='text-xl font-bold text-gray-800'>
                                CoinKeeper
                            </Link>
                        </div>
                        <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                            <Link
                                to='/'
                                className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                            >
                                Доска
                            </Link>
                            <Link
                                to='/stats'
                                className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                            >
                                Статистика
                            </Link>
                            <Link
                                to='/settings'
                                className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                            >
                                Настройки
                            </Link>
                        </div>
                    </div>
                    <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                        <button
                            onClick={handleLogout}
                            className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
                        >
                            Выйти ({user?.email})
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
