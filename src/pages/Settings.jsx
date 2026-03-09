import React, { useState } from 'react'
import {
    MessageSquare, Facebook, User, Save, CheckCircle,
    Link2, Key, QrCode, RefreshCw, Zap
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Settings.module.css'

const TABS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'facebook', label: 'Facebook Ads', icon: Facebook },
    { id: 'account', label: 'Minha Conta', icon: User },
]

export default function Settings() {
    const { user, loginWithFacebook, updateUser } = useAuth()
    const [tab, setTab] = useState('whatsapp')
    const [waUrl, setWaUrl] = useState('https://api.evolution.io')
    const [waKey, setWaKey] = useState('')
    const [waStatus, setWaStatus] = useState('disconnected') // disconnected | connecting | connected
    const [saved, setSaved] = useState(false)

    const handleSaveWa = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleConnectWa = () => {
        setWaStatus('connecting')
        setTimeout(() => setWaStatus('connected'), 2500)
    }

    const handleFb = async () => {
        await loginWithFacebook()
        updateUser({ facebookConnected: true })
    }

    return (
        <div className={styles.page}>
            {/* Tab bar */}
            <div className={styles.tabs}>
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
                        onClick={() => setTab(id)}
                        id={`tab-${id}`}
                    >
                        <Icon size={15} /> {label}
                    </button>
                ))}
            </div>

            {/* WhatsApp Panel */}
            {tab === 'whatsapp' && (
                <div className={styles.panel}>
                    <div className={`card ${styles.card}`}>
                        <div className={styles.cardHeader2}>
                            <MessageSquare size={18} className={styles.cardIcon} />
                            <div>
                                <h2>Conexão WhatsApp</h2>
                                <p>Configure a Evolution API para captura automática de leads via WhatsApp</p>
                            </div>
                        </div>

                        <div className={styles.form}>
                            <div className={styles.field}>
                                <label htmlFor="wa-url">
                                    <Link2 size={14} /> URL da Evolution API
                                </label>
                                <input
                                    id="wa-url"
                                    className="input"
                                    value={waUrl}
                                    onChange={e => setWaUrl(e.target.value)}
                                    placeholder="https://api.evolution.io"
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="wa-key">
                                    <Key size={14} /> API Key
                                </label>
                                <input
                                    id="wa-key"
                                    className="input"
                                    type="password"
                                    value={waKey}
                                    onChange={e => setWaKey(e.target.value)}
                                    placeholder="sua-api-key"
                                />
                            </div>
                            <button className="btn btn-primary" onClick={handleSaveWa} id="btn-save-wa">
                                {saved ? <><CheckCircle size={15} /> Salvo!</> : <><Save size={15} /> Salvar Configurações</>}
                            </button>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className={`card ${styles.card}`}>
                        <div className={styles.cardHeader2}>
                            <QrCode size={18} className={styles.cardIcon} />
                            <div>
                                <h2>Conectar Instância</h2>
                                <p>Escaneie o QR Code com o WhatsApp para conectar</p>
                            </div>
                            <span className={`${styles.status} ${waStatus === 'connected' ? styles.connected : waStatus === 'connecting' ? styles.connecting : styles.disconnected}`}>
                                {waStatus === 'connected' ? '● Conectado' : waStatus === 'connecting' ? '● Conectando...' : '● Desconectado'}
                            </span>
                        </div>

                        <div className={styles.qrArea}>
                            {waStatus === 'connected' ? (
                                <div className={styles.qrSuccess}>
                                    <CheckCircle size={40} style={{ color: 'var(--color-success)' }} />
                                    <span>WhatsApp conectado com sucesso!</span>
                                </div>
                            ) : waStatus === 'connecting' ? (
                                <div className={styles.qrLoading}>
                                    <RefreshCw size={32} className={styles.spin} />
                                    <span>Gerando QR Code...</span>
                                </div>
                            ) : (
                                <div className={styles.qrWaiting}>
                                    <QrCode size={80} className={styles.qrIcon} />
                                    <span>Salve as configurações e clique em gerar QR Code</span>
                                </div>
                            )}
                        </div>

                        <button
                            className="btn btn-secondary"
                            onClick={handleConnectWa}
                            disabled={waStatus === 'connecting' || waStatus === 'connected'}
                            id="btn-connect-wa"
                        >
                            <RefreshCw size={14} /> Gerar QR Code
                        </button>
                    </div>
                </div>
            )}

            {/* Facebook Panel */}
            {tab === 'facebook' && (
                <div className={styles.panel}>
                    <div className={`card ${styles.card}`}>
                        <div className={styles.cardHeader2}>
                            <Facebook size={18} style={{ color: '#1877f2' }} />
                            <div>
                                <h2>Conexão Facebook Ads</h2>
                                <p>Conecte sua conta para importar campanhas, métricas e calcular CPL/CPC em tempo real</p>
                            </div>
                            {user?.facebookConnected && (
                                <span className={styles.connected}>● Conectado</span>
                            )}
                        </div>

                        {user?.facebookConnected ? (
                            <div className={styles.fbConnected}>
                                <CheckCircle size={24} style={{ color: 'var(--color-success)' }} />
                                <div>
                                    <strong>Conta conectada</strong>
                                    <span>Sincronização automática ativa</span>
                                </div>
                                <button className="btn btn-secondary btn-sm">Desconectar</button>
                            </div>
                        ) : (
                            <div className={styles.fbConnect}>
                                <p className={styles.fbDesc}>
                                    A integração permite que o LeadTrace leia seus anúncios, conjuntos de anúncios e campanhas.
                                    Acesso somente leitura — nenhum dado será alterado.
                                </p>
                                <button className={styles.fbBtn} onClick={handleFb} id="btn-fb-connect">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Entrar com Facebook
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Account Panel */}
            {tab === 'account' && (
                <div className={styles.panel}>
                    <div className={`card ${styles.card}`}>
                        <div className={styles.cardHeader2}>
                            <User size={18} className={styles.cardIcon} />
                            <div>
                                <h2>Dados da Conta</h2>
                                <p>Gerencie suas informações pessoais e plano de assinatura</p>
                            </div>
                        </div>

                        <div className={styles.form}>
                            <div className={styles.field}>
                                <label>Nome</label>
                                <input className="input" defaultValue={user?.name} id="acc-name" />
                            </div>
                            <div className={styles.field}>
                                <label>E-mail</label>
                                <input className="input" defaultValue={user?.email} type="email" id="acc-email" />
                            </div>
                            <button className="btn btn-primary" id="btn-save-account">
                                <Save size={15} /> Salvar
                            </button>
                        </div>
                    </div>

                    <div className={`card ${styles.card} ${styles.planCard}`}>
                        <div className={styles.planBadge}>
                            <Zap size={14} /> Plano {user?.plan}
                        </div>
                        <h2>Você está no plano Pro</h2>
                        <p>Até 5 instâncias WhatsApp · Facebook Ads · CRM Kanban · Relatórios avançados</p>
                        <button className="btn btn-primary" id="btn-upgrade">Upgrade para Enterprise</button>
                    </div>
                </div>
            )}
        </div>
    )
}
