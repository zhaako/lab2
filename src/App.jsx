import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from 'src/pages/Login.jsx'
import Register from 'src/pages/Register.jsx'
import Dashboard from 'src/pages/Dashboard.jsx'
import Stats from 'src/pages/Stats.jsx'
import Settings from 'src/pages/Settings.jsx'
import Navigation from 'src/components/Navigation.jsx'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    return isAuthenticated ? children : <Navigate to="/login" />
}

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navigation />
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/stats"
                            element={
                                <PrivateRoute>
                                    <Stats />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <PrivateRoute>
                                    <Settings />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App