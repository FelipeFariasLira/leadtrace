import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Kanban, Users, Megaphone, Settings,
    ChevronLeft, ChevronRight, LogOut, Zap
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Sidebar.module.css'

const NAV = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/kanban', label: 'CRM Kanban', icon: Kanban },
    { to: '/leads', label: 'Leads', icon: Users },
    { to: '/campaigns', label: 'Campanhas', icon: Megaphone },
]

const BOTTOM_NAV = [
    { to: '/settings', label: 'Configurações', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            {/* Logo */}
            <div className={styles.logo}>
                {!collapsed ? <LogoFull /> : <LogoIconOnly />}
            </div>

            {/* Toggle */}
            <button className={styles.toggle} onClick={onToggle} aria-label="Colapsar menu">
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Main Nav */}
            <nav className={styles.nav}>
                {NAV.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <Icon size={20} />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className={styles.divider} />

            {/* Bottom Nav */}
            <nav className={styles.nav}>
                {BOTTOM_NAV.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <Icon size={20} />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
                <button className={`${styles.navItem} ${styles.logoutBtn}`} onClick={handleLogout}>
                    <LogOut size={20} />
                    {!collapsed && <span>Sair</span>}
                </button>
            </nav>

            {/* User info */}
            {!collapsed && user && (
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userPlan}><Zap size={10} /> Plano {user.plan}</span>
                    </div>
                </div>
            )}
        </aside>
    )
}

/* ── Logo SVG — icone fiel ao brand oficial ── */
function BrandIcon({ width = 36, height = 43 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 72 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pin body — gradiente azul */}
            <path
                d="M36 2C19.4 2 6 15.4 6 32C6 54.5 36 84 36 84C36 84 66 54.5 66 32C66 15.4 52.6 2 36 2Z"
                fill="url(#ltPinBody)"
            />
            {/* Anel branco interno */}
            <circle cx="36" cy="32" r="16" stroke="white" strokeWidth="3.5" fill="none" opacity="0.9" />
            {/* Círculo central com gradiente laranja-vermelho */}
            <circle cx="36" cy="32" r="9" fill="url(#ltCenter)" />
            {/* Quadrado laranja — canto superior direito */}
            <rect x="46" y="8" width="13" height="13" rx="2.5" fill="#F5A621" />
            <defs>
                <linearGradient id="ltPinBody" x1="6" y1="2" x2="66" y2="84" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4DAEF8" />
                    <stop offset="100%" stopColor="#1A6FCC" />
                </linearGradient>
                <radialGradient id="ltCenter" cx="38%" cy="33%" r="62%">
                    <stop offset="0%" stopColor="#FBB040" />
                    <stop offset="55%" stopColor="#F47520" />
                    <stop offset="100%" stopColor="#C83008" />
                </radialGradient>
            </defs>
        </svg>
    )
}

function LogoFull() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BrandIcon width={36} height={43} />
            <div style={{ lineHeight: 1 }}>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#4BA8F5', letterSpacing: '-0.02em' }}>Lead</span>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#F5A621', letterSpacing: '-0.02em' }}>trace</span>
            </div>
        </div>
    )
}

function LogoIconOnly() {
    return <BrandIcon width={30} height={36} />
}
