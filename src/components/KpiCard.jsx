import React from 'react'
import {
    DollarSign, TrendingUp, CreditCard, Target, Star,
    ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
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

    // Gradient IDs must be unique per card type if we want different colors, 
    // but we can just use the isPositive boolean to pick the right generic gradient ID
    const gradientId = `colorTrend_${isPositive ? 'pos' : 'neg'}`
    const strokeColor = isPositive ? '#22d3a5' : '#ef4444'

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

            {/* Premium Area Chart Sparkline */}
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={48}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.35} />
                                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ display: 'none' }}
                            cursor={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="v"
                            stroke={strokeColor}
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                            isAnimationActive={true}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
