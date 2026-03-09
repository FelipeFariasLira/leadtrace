import React from 'react'
import { MOCK_CAMPAIGNS, fmt } from '../data/mockData'
import {
    TrendingUp, Users, DollarSign, BarChart2, MousePointer,
    Facebook, CheckCircle, ChevronDown, ExternalLink
} from 'lucide-react'
import styles from './Campaigns.module.css'

export default function Campaigns() {
    return (
        <div className={styles.page}>
            <div className={styles.connectBanner}>
                <Facebook size={18} style={{ color: '#1877f2' }} />
                <div>
                    <strong>Conectar Facebook Ads</strong>
                    <span>Sincronize campanhas e veja dados em tempo real</span>
                </div>
                <button className="btn btn-accent btn-sm" id="btn-connect-facebook">
                    <ExternalLink size={13} /> Conectar Conta
                </button>
                <span className={styles.demoTag}>Dados Demo</span>
            </div>

            {MOCK_CAMPAIGNS.map(camp => (
                <CampaignCard key={camp.id} campaign={camp} />
            ))}
        </div>
    )
}

function CampaignCard({ campaign: c }) {
    const [open, setOpen] = React.useState(false)
    const budgetPct = Math.round((c.spent / c.budget) * 100)

    return (
        <div className={`card ${styles.campaignCard}`}>
            {/* Header */}
            <div className={styles.campHeader}>
                <div className={styles.campTitle}>
                    <span className={styles.campStatus}><CheckCircle size={14} /> {c.status === 'active' ? 'Ativa' : 'Pausada'}</span>
                    <h3>{c.name}</h3>
                    <span className={styles.campDates}>{c.startDate} – {c.endDate}</span>
                </div>
                <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setOpen(v => !v)}
                    id={`btn-toggle-camp-${c.id}`}
                >
                    Anúncios <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
                </button>
            </div>

            {/* Budget bar */}
            <div className={styles.budgetBar}>
                <div className={styles.budgetTrack}>
                    <div className={styles.budgetFill} style={{ width: `${budgetPct}%` }} />
                </div>
                <span>{fmt(c.spent)} de {fmt(c.budget)} ({budgetPct}%)</span>
            </div>

            {/* KPIs */}
            <div className={styles.metricsGrid}>
                <Metric icon={<Users size={16} />} label="Leads" value={c.leads} />
                <Metric icon={<DollarSign size={16} />} label="CPL" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.cpl)} highlight />
                <Metric icon={<MousePointer size={16} />} label="CPC" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.cpc)} />
                <Metric icon={<BarChart2 size={16} />} label="CTR" value={`${c.ctr}%`} />
                <Metric icon={<TrendingUp size={16} />} label="Conversões" value={c.conversions} />
                <Metric icon={<Users size={16} />} label="Cliques" value={c.clicks.toLocaleString('pt-BR')} />
            </div>

            {/* Ads breakdown */}
            {open && (
                <div className={styles.adsSection}>
                    <div className={styles.adsHead}>
                        <span>Anúncio</span>
                        <span>Investido</span>
                        <span>Leads</span>
                        <span>CPL</span>
                        <span>CPC</span>
                        <span>CTR</span>
                    </div>
                    {c.ads.map(ad => (
                        <div key={ad.id} className={styles.adRow}>
                            <span className={styles.adName}>{ad.name}</span>
                            <span>{fmt(ad.spent)}</span>
                            <span>{ad.leads}</span>
                            <span className={styles.cpl}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.cpl)}</span>
                            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.cpc)}</span>
                            <span>{ad.ctr}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function Metric({ icon, label, value, highlight }) {
    return (
        <div className={styles.metric}>
            <span className={styles.metricIcon}>{icon}</span>
            <span className={styles.metricLabel}>{label}</span>
            <span className={`${styles.metricValue} ${highlight ? styles.highlight : ''}`}>{value}</span>
        </div>
    )
}
