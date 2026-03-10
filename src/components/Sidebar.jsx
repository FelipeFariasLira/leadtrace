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

import logoSrc from '../assets/logo-leadtrace.png'

function LogoFull() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <img src={logoSrc} alt="Leadtrace Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>
    )
}

function LogoIconOnly() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img src={logoSrc} alt="Leadtrace Logo" style={{ width: '32px', height: '32px', objectFit: 'cover', objectPosition: 'left center' }} />
        </div>
    )
}
