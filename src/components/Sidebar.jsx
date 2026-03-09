import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Kanban, Users, Megaphone, Settings,
    ChevronLeft, ChevronRight, LogOut, HelpCircle, Zap
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
                {!collapsed ? (
                    <LogoFull />
                ) : (
                    <LogoIcon />
                )}
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

function LogoFull() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="32" height="38" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 2C15.163 2 8 9.163 8 18c0 11.25 16 36 16 36S40 29.25 40 18C40 9.163 32.837 2 24 2z" fill="url(#pinG)" />
                <circle cx="24" cy="18" r="6" fill="none" stroke="white" strokeWidth="2.5" opacity="0.9" />
                <circle cx="24" cy="18" r="3" fill="#f5a623" />
                <rect x="30" y="4" width="8" height="8" rx="1.5" fill="#f5a623" opacity="0.95" />
                <defs>
                    <linearGradient id="pinG" x1="8" y1="2" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4a9eff" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                </defs>
            </svg>
            <div>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#4a9eff', letterSpacing: '-0.02em' }}>Lead</span>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#f5a623', letterSpacing: '-0.02em' }}>trace</span>
            </div>
        </div>
    )
}

function LogoIcon() {
    return (
        <svg width="28" height="34" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 2C15.163 2 8 9.163 8 18c0 11.25 16 36 16 36S40 29.25 40 18C40 9.163 32.837 2 24 2z" fill="url(#pinG2)" />
            <circle cx="24" cy="18" r="6" fill="none" stroke="white" strokeWidth="2.5" opacity="0.9" />
            <circle cx="24" cy="18" r="3" fill="#f5a623" />
            <rect x="30" y="4" width="8" height="8" rx="1.5" fill="#f5a623" opacity="0.95" />
            <defs>
                <linearGradient id="pinG2" x1="8" y1="2" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4a9eff" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
            </defs>
        </svg>
    )
}
