import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import styles from './AppLayout.module.css'

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={styles.layout}>
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
            <div className={`${styles.body} ${collapsed ? styles.collapsed : ''}`}>
                <Topbar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
