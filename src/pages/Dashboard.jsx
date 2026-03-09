import React, { useMemo, useState } from 'react'
import { MOCK_LEADS, MOCK_CAMPAIGNS, SPARKLINES, FUNNEL_STAGES, getKpiData, fmt } from '../data/mockData'
import KpiCard from '../components/KpiCard'
import styles from './Dashboard.module.css'
import { TrendingUp, Award, ArrowRight, ExternalLink } from 'lucide-react'

export default function Dashboard() {
    const [leads] = useState(MOCK_LEADS)
    const kpi = useMemo(() => getKpiData(leads), [leads])

    const totalLeads = leads.length
    const staged = FUNNEL_STAGES.map(s => ({
        ...s,
        count: Math.round((totalLeads * s.pct) / 100)
    }))

    // Build ads ranking from all campaigns
    const adsRanking = useMemo(() => {
        const all = MOCK_CAMPAIGNS.flatMap(c =>
            c.ads.map(a => ({ ...a, campaign: c.name }))
        ).sort((a, b) => a.cpl - b.cpl)
        return all
    }, [])

    return (
        <div className={styles.page}>
            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                <KpiCard
                    id="revenue"
                    label="Receita Atribuída"
                    value={fmt(kpi.revenue)}
                    delta={18}
                    deltaLabel="vs. mês anterior"
                    trend={SPARKLINES.revenue}
                />
                <KpiCard
                    id="roi"
                    label="ROI"
                    value={`${kpi.roi}%`}
                    delta={18}
                    deltaLabel="vs. mês anterior"
                    trend={SPARKLINES.roi}
                />
                <KpiCard
                    id="investment"
                    label="Investimento Total"
                    value={fmt(kpi.investment)}
                    delta={-13}
                    inverted
                    deltaLabel="vs. mês anterior"
                    trend={SPARKLINES.investment}
                />
                <KpiCard
                    id="cac"
                    label="CAC"
                    value={fmt(kpi.cac)}
                    delta={13}
                    inverted
                    deltaLabel="vs. mês anterior"
                    trend={SPARKLINES.cac}
                />
                <KpiCard
                    id="ticket"
                    label="Ticket Médio"
                    value={fmt(kpi.ticket)}
                    delta={18}
                    deltaLabel="vs. mês anterior"
                    trend={SPARKLINES.ticket}
                />
            </div>

            {/* Funil */}
            <div className={`card ${styles.funnelCard}`}>
                <div className={styles.sectionHeader}>
                    <TrendingUp size={18} className={styles.sectionIcon} />
                    <h2>Funil Comercial</h2>
                </div>

                <div className={styles.funnelStats}>
                    {staged.map((s, i) => (
                        <div key={s.id} className={styles.funnelStat}>
                            <span className={styles.funnelCount} style={{ color: s.color }}>
                                {s.count}
                            </span>
                            <span className={styles.funnelLabel}>{s.label}</span>
                            <span className={styles.funnelPct} style={{ color: s.color }}>
                                {s.pct}%
                            </span>
                        </div>
                    ))}
                </div>

                <FunnelViz stages={staged} />
            </div>

            {/* Ranking de Anúncios */}
            <div className={`card ${styles.rankingCard}`}>
                <div className={styles.sectionHeader}>
                    <Award size={18} className={styles.sectionIcon} />
                    <h2>Ranking de Anúncios</h2>
                    <span className={styles.badge}>por menor CPL</span>
                </div>

                <div className={styles.table}>
                    <div className={styles.tableHead}>
                        <span>#</span>
                        <span>Anúncio</span>
                        <span>Campanha</span>
                        <span>Leads</span>
                        <span>Investido</span>
                        <span>CPL</span>
                        <span>CPC</span>
                        <span>CTR</span>
                    </div>
                    {adsRanking.map((ad, i) => (
                        <div key={ad.id} className={styles.tableRow}>
                            <span className={styles.rank}>{i + 1}</span>
                            <span className={styles.adName}>{ad.name}</span>
                            <span className={styles.campaign}>{ad.campaign}</span>
                            <span className={styles.num}>{ad.leads}</span>
                            <span className={styles.num}>{fmt(ad.spent)}</span>
                            <span className={`${styles.num} ${styles.cpl}`}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.cpl)}
                            </span>
                            <span className={styles.num}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.cpc)}
                            </span>
                            <span className={styles.num}>{ad.ctr}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function FunnelViz({ stages }) {
    const total = stages[0]?.count || 1
    return (
        <div className={styles.funnel}>
            {stages.map((s, i) => {
                const width = Math.max((s.count / total) * 100, 4)
                return (
                    <div key={s.id} className={styles.funnelSegment} style={{ flex: 1 }}>
                        <div
                            className={styles.funnelBar}
                            style={{
                                background: `linear-gradient(90deg, ${s.color}cc, ${s.color}66)`,
                                height: `${28 + (stages.length - i) * 8}px`,
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
