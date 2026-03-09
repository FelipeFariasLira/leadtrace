// ============================================================
// LEADTRACE — Mock Data
// ============================================================

export const MOCK_LEADS = [
    { id: 'l1', name: 'Carlos Andrade', phone: '11987654321', email: 'carlos@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto A', status: 'new', value: 0, source: 'whatsapp', enteredAt: '2026-03-01', notes: '' },
    { id: 'l2', name: 'Ana Beatriz', phone: '21976543210', email: 'ana@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto B', status: 'treating', value: 3500, source: 'whatsapp', enteredAt: '2026-03-02', notes: 'Interessada no plano anual' },
    { id: 'l3', name: 'Roberto Lima', phone: '31965432109', email: 'rob@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'scheduled', value: 5200, source: 'whatsapp', enteredAt: '2026-03-02', notes: 'Reunião marcada para 12/03' },
    { id: 'l4', name: 'Fernanda Costa', phone: '41954321098', email: 'fe@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'closed', value: 8900, source: 'whatsapp', enteredAt: '2026-03-03', notes: '' },
    { id: 'l5', name: 'Marcos Oliveira', phone: '51943210987', email: 'marcos@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto A', status: 'discarded', value: 0, source: 'whatsapp', enteredAt: '2026-03-03', notes: 'Sem interesse' },
    { id: 'l6', name: 'Juliana Mendes', phone: '61932109876', email: 'ju@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto B', status: 'new', value: 0, source: 'whatsapp', enteredAt: '2026-03-04', notes: '' },
    { id: 'l7', name: 'Pedro Alves', phone: '71921098765', email: 'pedro@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'treating', value: 4100, source: 'whatsapp', enteredAt: '2026-03-04', notes: '' },
    { id: 'l8', name: 'Camila Rocha', phone: '81910987654', email: 'cam@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto A', status: 'closed', value: 6700, source: 'whatsapp', enteredAt: '2026-03-05', notes: '' },
    { id: 'l9', name: 'Diego Ferreira', phone: '91909876543', email: 'diego@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'treating', value: 2200, source: 'whatsapp', enteredAt: '2026-03-05', notes: '' },
    { id: 'l10', name: 'Larissa Santos', phone: '11898765432', email: 'lari@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto B', status: 'scheduled', value: 7500, source: 'whatsapp', enteredAt: '2026-03-06', notes: 'Contato agendado 15/03' },
    { id: 'l11', name: 'Thiago Nascimento', phone: '21887654321', email: 'thi@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'discarded', value: 0, source: 'whatsapp', enteredAt: '2026-03-06', notes: 'Não tem budget' },
    { id: 'l12', name: 'Patrícia Xavier', phone: '31876543210', email: 'pat@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto A', status: 'closed', value: 9800, source: 'whatsapp', enteredAt: '2026-03-07', notes: '' },
    { id: 'l13', name: 'Bruno Castro', phone: '41865432109', email: 'bruno@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto B', status: 'new', value: 0, source: 'whatsapp', enteredAt: '2026-03-08', notes: '' },
    { id: 'l14', name: 'Vanessa Torres', phone: '51854321098', email: 'van@email.com', campaign: 'Camp. Black', adName: 'Ad - Desconto', status: 'treating', value: 3100, source: 'whatsapp', enteredAt: '2026-03-08', notes: '' },
    { id: 'l15', name: 'Rafael Gomes', phone: '61843210987', email: 'rafael@email.com', campaign: 'Camp. Verão 2026', adName: 'Ad - Produto A', status: 'closed', value: 5500, source: 'whatsapp', enteredAt: '2026-03-09', notes: '' },
]

export const MOCK_CAMPAIGNS = [
    {
        id: 'c1',
        name: 'Camp. Verão 2026',
        platform: 'Facebook Ads',
        status: 'active',
        budget: 15000,
        spent: 12400,
        leads: 580,
        clicks: 4820,
        impressions: 142000,
        conversions: 87,
        cpl: 21.38,
        cpc: 2.57,
        ctr: 3.39,
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        ads: [
            { id: 'a1', name: 'Ad - Produto A', spent: 5500, leads: 260, cpl: 21.15, cpc: 2.40, ctr: 3.55 },
            { id: 'a2', name: 'Ad - Produto B', spent: 4200, leads: 180, cpl: 23.33, cpc: 2.80, ctr: 3.10 },
            { id: 'a3', name: 'Ad - Retargeting', spent: 2700, leads: 140, cpl: 19.29, cpc: 2.30, ctr: 3.80 },
        ]
    },
    {
        id: 'c2',
        name: 'Camp. Black',
        platform: 'Facebook Ads',
        status: 'active',
        budget: 10000,
        spent: 8800,
        leads: 420,
        clicks: 3200,
        impressions: 98000,
        conversions: 63,
        cpl: 20.95,
        cpc: 2.75,
        ctr: 3.27,
        startDate: '2026-02-15',
        endDate: '2026-03-31',
        ads: [
            { id: 'a4', name: 'Ad - Desconto', spent: 5800, leads: 280, cpl: 20.71, cpc: 2.60, ctr: 3.40 },
            { id: 'a5', name: 'Ad - Urgência', spent: 3000, leads: 140, cpl: 21.43, cpc: 3.10, ctr: 3.00 },
        ]
    },
]

// Sparkline data (7-day trend)
export const SPARKLINES = {
    revenue: [120, 145, 132, 160, 158, 175, 181.2],
    roi: [190, 210, 198, 225, 238, 248, 252],
    investment: [18, 19, 20, 21, 22, 22.8, 23.2],
    cac: [162, 155, 148, 150, 143, 145, 145],
    ticket: [4200, 4500, 4800, 4900, 5100, 5200, 5200],
}

export const FUNNEL_STAGES = [
    { id: 'new', label: 'Leads recebidos', color: '#6366f1', pct: 100 },
    { id: 'treating', label: 'Em tratativa', color: '#8b5cf6', pct: 50 },
    { id: 'scheduled', label: 'Agendados', color: '#f59e0b', pct: 10 },
    { id: 'discarded', label: 'Descartados', color: '#ef4444', pct: 25 },
    { id: 'closed', label: 'Fechados', color: '#22d3a5', pct: 15 },
]

export const KANBAN_COLUMNS = [
    { id: 'new', label: 'Novo Lead', color: '#6366f1' },
    { id: 'treating', label: 'Em Tratativa', color: '#8b5cf6' },
    { id: 'scheduled', label: 'Agendado', color: '#f59e0b' },
    { id: 'closed', label: 'Fechado', color: '#22d3a5' },
    { id: 'discarded', label: 'Descartado', color: '#ef4444' },
]

export function getKpiData(leads) {
    const closed = leads.filter(l => l.status === 'closed')
    const revenue = closed.reduce((s, l) => s + l.value, 0)
    const investment = MOCK_CAMPAIGNS.reduce((s, c) => s + c.spent, 0)
    const roi = investment > 0 ? ((revenue - investment) / investment * 100).toFixed(0) : 0
    const cac = closed.length > 0 ? (investment / closed.length).toFixed(0) : 0
    const ticket = closed.length > 0 ? (revenue / closed.length).toFixed(0) : 0
    return { revenue, investment, roi: Number(roi), cac: Number(cac), ticket: Number(ticket) }
}

export function fmt(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value)
}
