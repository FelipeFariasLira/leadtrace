import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AppLayout from './components/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Kanban from './pages/Kanban'
import Leads from './pages/Leads'
import Campaigns from './pages/Campaigns'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
    const { user } = useAuth()
    return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
    const { user } = useAuth()
    return user ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route
                        path="/"
                        element={<ProtectedRoute><AppLayout /></ProtectedRoute>}
                    >
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="kanban" element={<Kanban />} />
                        <Route path="leads" element={<Leads />} />
                        <Route path="campaigns" element={<Campaigns />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
