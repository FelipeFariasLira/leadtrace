import React, { useState } from 'react'
import { X, Save, DollarSign, MessageSquare, User, Phone, Mail, Target } from 'lucide-react'
import { KANBAN_COLUMNS, fmt } from '../data/mockData'
import styles from './LeadModal.module.css'

export default function LeadModal({ lead, onClose, onSave }) {
    const [form, setForm] = useState({ ...lead })

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

    const handleSave = () => onSave(form)

    const col = KANBAN_COLUMNS.find(c => c.id === form.status)

    return (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
            <div className={styles.drawer} id="lead-modal">
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>{lead.name}</h2>
                        <span className={styles.tag} style={{ background: `${col?.color}22`, color: col?.color }}>
                            {col?.label}
                        </span>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.body}>
                    {/* Info */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Informações do Lead</h3>
                        <div className={styles.infoGrid}>
                            <InfoRow icon={<User size={14} />} label="Nome" value={lead.name} />
                            <InfoRow icon={<Phone size={14} />} label="Telefone" value={lead.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')} />
                            <InfoRow icon={<Mail size={14} />} label="E-mail" value={lead.email} />
                            <InfoRow icon={<Target size={14} />} label="Anúncio" value={lead.adName} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Estágio</h3>
                        <div className={styles.statusGrid}>
                            {KANBAN_COLUMNS.map(col => (
                                <button
                                    key={col.id}
                                    className={`${styles.statusBtn} ${form.status === col.id ? styles.statusActive : ''}`}
                                    style={form.status === col.id
                                        ? { borderColor: col.color, color: col.color, background: `${col.color}18` }
                                        : {}
                                    }
                                    onClick={() => set('status', col.id)}
                                >
                                    {col.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Value */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Valor Contratado</h3>
                        <div className={styles.inputWrap}>
                            <DollarSign size={16} className={styles.inputIcon} />
                            <input
                                type="number"
                                className={`input ${styles.valueInput}`}
                                value={form.value}
                                onChange={e => set('value', Number(e.target.value))}
                                placeholder="0"
                                min="0"
                                id="lead-value-input"
                            />
                        </div>
                        {form.value > 0 && (
                            <div className={styles.valuePreview}>{fmt(form.value)}</div>
                        )}
                    </div>

                    {/* Notes */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Observações</h3>
                        <div className={styles.inputWrap}>
                            <MessageSquare size={16} className={`${styles.inputIcon} ${styles.topIcon}`} />
                            <textarea
                                className={`input ${styles.notesInput}`}
                                value={form.notes}
                                onChange={e => set('notes', e.target.value)}
                                placeholder="Notas sobre o lead..."
                                rows={4}
                                id="lead-notes-input"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleSave} id="btn-save-lead">
                        <Save size={15} /> Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

function InfoRow({ icon, label, value }) {
    return (
        <div className={styles.infoRow}>
            <span className={styles.infoIcon}>{icon}</span>
            <span className={styles.infoLabel}>{label}</span>
            <span className={styles.infoValue}>{value}</span>
        </div>
    )
}
