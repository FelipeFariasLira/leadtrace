import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Calendar, RefreshCw, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Topbar.module.css'

const PAGE_NAMES = {
    '/dashboard': 'Dashboard',
    '/kanban': 'CRM Kanban',
    '/leads': 'Leads',
    '/campaigns': 'Campanhas',
    '/settings': 'Configurações',
}

export default function Topbar() {
    const location = useLocation()
    const { user } = useAuth()
    const pageName = PAGE_NAMES[location.pathname] || 'LeadTrace'
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1200)
    }

    const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

    return (
        <header className={styles.topbar}>
            <div className={styles.left}>
                <h1 className={styles.title}>{pageName}</h1>
            </div>

            {location.pathname === '/dashboard' && (
                <div className={styles.alert}>
                    <AlertTriangle size={14} />
                    <span>Atenção: ainda há leads em tratativa. Os cálculos podem não refletir o panorama real.</span>
                </div>
            )}

            <div className={styles.right}>
                {location.pathname === '/dashboard' && (
                    <>
                        <div className={styles.dateRange}>
                            <Calendar size={14} />
                            <span>01/03/2026</span>
                            <span className={styles.dateSep}>a</span>
                            <span>{today}</span>
                        </div>
                        <button
                            className={`btn btn-primary btn-sm ${styles.refreshBtn}`}
                            onClick={handleRefresh}
                        >
                            <RefreshCw size={14} className={refreshing ? styles.spinning : ''} />
                            Atualizar
                        </button>
                    </>
                )}
                <button className={styles.notifBtn} aria-label="Notificações">
                    <Bell size={18} />
                    <span className={styles.notifDot} />
                </button>
            </div>
        </header>
    )
}
