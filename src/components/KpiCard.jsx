import React, { useMemo } from 'react'
import {
    DollarSign, TrendingUp, CreditCard, Target, Star,
    ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import styles from './KpiCard.module.css'

const ICONS = {
    revenue: DollarSign,
    roi: TrendingUp,
    investment: CreditCard,
    cac: Target,
    ticket: Star,
}

export default function KpiCard({ id, label, value, delta, deltaLabel, trend = [], inverted = false }) {
    const Icon = ICONS[id] || DollarSign
    const isPositive = inverted ? delta <= 0 : delta >= 0
    const chartData = trend.map((v, i) => ({ i, v }))

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <div className={styles.iconBox}>
                    <Icon size={18} />
                </div>
            </div>

            <div className={styles.value}>{value}</div>

            <div className={styles.footer}>
                <span className={`${styles.delta} ${isPositive ? styles.pos : styles.neg}`}>
                    {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {Math.abs(delta)}%
                </span>
                {deltaLabel && <span className={styles.deltaLabel}>{deltaLabel}</span>}
            </div>

            {/* Mini sparkline */}
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke={isPositive ? '#22d3a5' : '#ef4444'}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Tooltip
                            contentStyle={{ display: 'none' }}
                            cursor={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
