import React, { useState, useCallback } from 'react'
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor,
    useSensor, useSensors, DragOverlay
} from '@dnd-kit/core'
import {
    SortableContext, verticalListSortingStrategy, useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MOCK_LEADS, KANBAN_COLUMNS, fmt } from '../data/mockData'
import { Plus, Phone, Calendar, X, ChevronRight } from 'lucide-react'
import LeadModal from '../components/LeadModal'
import styles from './Kanban.module.css'

export default function Kanban() {
    const [leads, setLeads] = useState(MOCK_LEADS)
    const [activeId, setActiveId] = useState(null)
    const [selectedLead, setSelectedLead] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor)
    )

    const columns = KANBAN_COLUMNS.map(col => ({
        ...col,
        leads: leads.filter(l => l.status === col.id)
    }))

    const activeLead = activeId ? leads.find(l => l.id === activeId) : null

    const handleDragStart = ({ active }) => setActiveId(active.id)

    const handleDragEnd = ({ active, over }) => {
        setActiveId(null)
        if (!over) return
        const targetCol = KANBAN_COLUMNS.find(c => c.id === over.id)
        const targetLead = leads.find(l => l.id === over.id)
        const newStatus = targetCol?.id || targetLead?.status
        if (!newStatus) return
        setLeads(prev => prev.map(l =>
            l.id === active.id ? { ...l, status: newStatus } : l
        ))
    }

    const updateLead = useCallback((updated) => {
        setLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
        setSelectedLead(null)
    }, [])

    const totalValue = leads.filter(l => l.status === 'closed').reduce((s, l) => s + l.value, 0)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.stat}>
                    <span>Fechamentos</span>
                    <strong className={styles.statValue}>{fmt(totalValue)}</strong>
                </div>
                <button className="btn btn-primary btn-sm" id="btn-new-lead">
                    <Plus size={15} /> Novo Lead
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className={styles.board}>
                    {columns.map(col => (
                        <KanbanColumn
                            key={col.id}
                            column={col}
                            onOpenLead={setSelectedLead}
                        />
                    ))}
                </div>
                <DragOverlay>
                    {activeLead ? <LeadCard lead={activeLead} overlay /> : null}
                </DragOverlay>
            </DndContext>

            {selectedLead && (
                <LeadModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                    onSave={updateLead}
                />
            )}
        </div>
    )
}

function KanbanColumn({ column, onOpenLead }) {
    const closedValue = column.leads.reduce((s, l) => s + l.value, 0)

    return (
        <div className={styles.column} id={`col-${column.id}`}>
            <div className={styles.colHeader} style={{ borderTopColor: column.color }}>
                <div className={styles.colTitle}>
                    <span className={styles.colDot} style={{ background: column.color }} />
                    <span>{column.label}</span>
                </div>
                <span className={styles.colCount}>{column.leads.length}</span>
            </div>

            {column.id === 'closed' && column.leads.length > 0 && (
                <div className={styles.colValue} style={{ color: column.color }}>
                    {fmt(closedValue)}
                </div>
            )}

            <SortableContext
                id={column.id}
                items={column.leads.map(l => l.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.cardList}>
                    {column.leads.map(lead => (
                        <LeadCard
                            key={lead.id}
                            lead={lead}
                            columnColor={column.color}
                            onOpen={onOpenLead}
                        />
                    ))}
                    {column.leads.length === 0 && (
                        <div className={styles.empty}>Nenhum lead</div>
                    )}
                </div>
            </SortableContext>
        </div>
    )
}

function LeadCard({ lead, columnColor, onOpen, overlay }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id })
    const style = overlay ? {} : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${styles.card} ${overlay ? styles.cardOverlay : ''}`}
            onClick={() => onOpen && onOpen(lead)}
            id={`lead-${lead.id}`}
        >
            <div className={styles.cardHeader}>
                <span className={styles.cardName}>{lead.name}</span>
                {lead.value > 0 && (
                    <span className={styles.cardValue}>{fmt(lead.value)}</span>
                )}
            </div>

            <div className={styles.cardMeta}>
                <span className={styles.cardAd}>{lead.adName}</span>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.cardPhone}>
                    <Phone size={11} /> {lead.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}
                </span>
                <span className={styles.cardDate}>
                    <Calendar size={11} />
                    {new Date(lead.enteredAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </span>
            </div>
        </div>
    )
}
