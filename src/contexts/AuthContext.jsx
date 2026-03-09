import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USER = {
    id: '1',
    name: 'Felipe Moraes',
    email: 'felipe@leadtrace.io',
    avatar: null,
    plan: 'Pro',
    facebookConnected: false,
    whatsappConnected: false,
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('lt_user')
        return stored ? JSON.parse(stored) : null
    })
    const [loading, setLoading] = useState(false)

    const login = useCallback(async (email, password) => {
        setLoading(true)
        // Mock: any valid email/password logs in
        await new Promise(r => setTimeout(r, 800))
        if (!email || !password) throw new Error('Preencha todos os campos')
        const u = { ...MOCK_USER, email }
        localStorage.setItem('lt_user', JSON.stringify(u))
        setUser(u)
        setLoading(false)
    }, [])

    const loginWithFacebook = useCallback(async () => {
        // In production: redirect to Facebook OAuth endpoint
        setLoading(true)
        await new Promise(r => setTimeout(r, 600))
        const u = { ...MOCK_USER, facebookConnected: true }
        localStorage.setItem('lt_user', JSON.stringify(u))
        setUser(u)
        setLoading(false)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('lt_user')
        setUser(null)
    }, [])

    const updateUser = useCallback((data) => {
        setUser(prev => {
            const updated = { ...prev, ...data }
            localStorage.setItem('lt_user', JSON.stringify(updated))
            return updated
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithFacebook, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
