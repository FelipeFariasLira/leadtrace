import React, { useState, useMemo } from 'react'
import { Search, Filter, Download, Phone, ExternalLink } from 'lucide-react'
import { MOCK_LEADS, MOCK_CAMPAIGNS, KANBAN_COLUMNS, fmt } from '../data/mockData'
import LeadModal from '../components/LeadModal'
import styles from './Leads.module.css'

const STATUS_COLORS = {
    new: { label: 'Novo Lead', color: '#6366f1' },
    treating: { label: 'Em Tratativa', color: '#8b5cf6' },
    scheduled: { label: 'Agendado', color: '#f59e0b' },
    closed: { label: 'Fechado', color: '#22d3a5' },
    discarded: { label: 'Descartado', color: '#ef4444' },
}

export default function Leads() {
    const [leads, setLeads] = useState(MOCK_LEADS)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [filterCampaign, setFilterCampaign] = useState('')
    const [selectedLead, setSelectedLead] = useState(null)

    const campaigns = useMemo(() => [...new Set(MOCK_LEADS.map(l => l.campaign))], [])

    const filtered = useMemo(() => leads.filter(l => {
        const q = search.toLowerCase()
        const matchSearch = !q || l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.adName.toLowerCase().includes(q)
        const matchStatus = !filterStatus || l.status === filterStatus
        const matchCampaign = !filterCampaign || l.campaign === filterCampaign
        return matchSearch && matchStatus && matchCampaign
    }), [leads, search, filterStatus, filterCampaign])

    const updateLead = (updated) => {
        setLeads(p => p.map(l => l.id === updated.id ? updated : l))
        setSelectedLead(null)
    }

    const exportCsv = () => {
        const header = ['Nome', 'Telefone', 'Email', 'Campanha', 'Anúncio', 'Status', 'Valor', 'Data Entrada']
        const rows = filtered.map(l => [l.name, l.phone, l.email, l.campaign, l.adName, STATUS_COLORS[l.status]?.label, l.value, l.enteredAt])
        const csv = [header, ...rows].map(r => r.join(',')).join('\n')
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
        const a = document.createElement('a'); a.href = url; a.download = 'leads.csv'; a.click()
    }

    return (
        <div className={styles.page}>
            {/* Filters */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <Search size={15} className={styles.searchIcon} />
                    <input
                        className={`input ${styles.search}`}
                        placeholder="Buscar lead, telefone, anúncio..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        id="leads-search"
                    />
                </div>

                <select
                    className={`input ${styles.select}`}
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    id="leads-filter-status"
                >
                    <option value="">Todos os status</option>
                    {KANBAN_COLUMNS.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                </select>

                <select
                    className={`input ${styles.select}`}
                    value={filterCampaign}
                    onChange={e => setFilterCampaign(e.target.value)}
                    id="leads-filter-campaign"
                >
                    <option value="">Todas as campanhas</option>
                    {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <button className="btn btn-secondary btn-sm" onClick={exportCsv} id="btn-export-csv">
                    <Download size={14} /> Exportar CSV
                </button>
            </div>

            <div className={styles.count}>
                {filtered.length} lead{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </div>

            {/* Table */}
            <div className={`card ${styles.tableCard}`}>
                <div className={styles.tableHead}>
                    <span>Nome</span>
                    <span>Telefone</span>
                    <span>Campanha / Anúncio</span>
                    <span>Status</span>
                    <span>Valor</span>
                    <span>Entrada</span>
                    <span></span>
                </div>
                <div className={styles.tableBody}>
                    {filtered.map(lead => {
                        const st = STATUS_COLORS[lead.status]
                        return (
                            <div key={lead.id} className={styles.tableRow} id={`lead-row-${lead.id}`}>
                                <span className={styles.leadName}>{lead.name}</span>
                                <span className={styles.phone}>
                                    <Phone size={12} />
                                    {lead.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}
                                </span>
                                <div>
                                    <div className={styles.campaign}>{lead.campaign}</div>
                                    <div className={styles.adName}>{lead.adName}</div>
                                </div>
                                <span>
                                    <span className={`badge`} style={{ background: `${st.color}22`, color: st.color }}>
                                        {st.label}
                                    </span>
                                </span>
                                <span className={`${styles.value} ${lead.value > 0 ? styles.hasValue : ''}`}>
                                    {lead.value > 0 ? fmt(lead.value) : '—'}
                                </span>
                                <span className={styles.date}>
                                    {new Date(lead.enteredAt).toLocaleDateString('pt-BR')}
                                </span>
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setSelectedLead(lead)}
                                    id={`btn-lead-detail-${lead.id}`}
                                >
                                    <ExternalLink size={13} />
                                </button>
                            </div>
                        )
                    })}
                    {filtered.length === 0 && (
                        <div className={styles.empty}>Nenhum lead encontrado</div>
                    )}
                </div>
            </div>

            {selectedLead && (
                <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} onSave={updateLead} />
            )}
        </div>
    )
}
