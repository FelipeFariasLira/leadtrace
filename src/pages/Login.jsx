import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Facebook } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Login.module.css'
import logoSrc from '../assets/logo-leadtrace.png'

export default function Login() {
    const { login, loginWithFacebook, loading } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleFacebook = async () => {
        setError('')
        try {
            await loginWithFacebook()
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.page}>
            {/* Animated background blobs */}
            <div className={styles.blob1} />
            <div className={styles.blob2} />
            <div className={styles.blob3} />

            <div className={styles.card}>
                {/* Logo */}
                <div className={styles.logo} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={logoSrc} alt="Leadtrace Logo" style={{ height: '48px', objectFit: 'contain' }} />
                </div>

                <p className={styles.tagline}>Rastreie leads do anúncio ao fechamento</p>

                {/* Facebook Login */}
                <button
                    type="button"
                    className={styles.facebookBtn}
                    onClick={handleFacebook}
                    disabled={loading}
                    id="btn-facebook-login"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Entrar com Facebook
                </button>

                <div className={styles.orDivider}>
                    <span />
                    <p>ou acesse com e-mail</p>
                    <span />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email-input">E-mail</label>
                        <div className={styles.inputWrap}>
                            <Mail size={16} className={styles.inputIcon} />
                            <input
                                id="email-input"
                                type="email"
                                className={`input ${styles.input}`}
                                placeholder="seu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password-input">Senha</label>
                        <div className={styles.inputWrap}>
                            <Lock size={16} className={styles.inputIcon} />
                            <input
                                id="password-input"
                                type={showPw ? 'text' : 'password'}
                                className={`input ${styles.input}`}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowPw(v => !v)}
                                tabIndex={-1}
                                aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <a href="#" className={styles.forgot}>Esqueci a senha</a>

                    {error && <div className={styles.error}>{error}</div>}

                    <button
                        type="submit"
                        className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                        disabled={loading}
                        id="btn-login-submit"
                    >
                        {loading ? <span className={styles.spinner} /> : 'Entrar'}
                    </button>
                </form>

                <p className={styles.register}>
                    Não tem conta?{' '}
                    <a href="#" className={styles.registerLink}>Cadastre-se</a>
                </p>
            </div>
        </div>
    )
}
