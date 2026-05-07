import { useState } from 'react'
import { X, Mail, Phone, GitBranch, Link2, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contact } from '../content/contact'
import { useLanguage } from '../context/LanguageContext'
import './ContactModal.scss'

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={20} />,
  phone: <Phone size={20} />,
  github: <GitBranch size={20} />,
  linkedin: <Link2 size={20} />,
}

interface ContactModalProps {
  onClose: () => void
  isClosing: boolean
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactModal({ onClose, isClosing }: ContactModalProps) {
  const { lang } = useLanguage()
  const t = contact[lang]

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`cmodal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="cmodal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <h2 className="cmodal__title">{t.title}</h2>

        <form className="cmodal__form" onSubmit={handleSubmit}>
          <div className="cmodal__field">
            <label className="cmodal__fieldlabel">{t.form.name}</label>
            <input
              className="cmodal__input"
              type="text"
              placeholder={t.form.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              required
              disabled={status === 'sending' || status === 'success'}
            />
          </div>
          <div className="cmodal__field">
            <label className="cmodal__fieldlabel">{t.form.email}</label>
            <input
              className="cmodal__input"
              type="email"
              placeholder={t.form.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              required
              disabled={status === 'sending' || status === 'success'}
            />
          </div>
          <div className="cmodal__field">
            <label className="cmodal__fieldlabel">{t.form.message}</label>
            <textarea
              className="cmodal__textarea"
              placeholder={t.form.messagePlaceholder}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              required
              disabled={status === 'sending' || status === 'success'}
            />
          </div>

          {status === 'success' && (
            <div className="cmodal__feedback cmodal__feedback--success">
              <CheckCircle size={16} />
              {t.form.success}
            </div>
          )}
          {status === 'error' && (
            <div className="cmodal__feedback cmodal__feedback--error">
              <AlertCircle size={16} />
              {t.form.error}
            </div>
          )}

          <button
            className="cmodal__submit"
            type="submit"
            disabled={status === 'sending' || status === 'success'}
          >
            <Send size={16} />
            {status === 'sending' ? t.form.sending : t.form.submit}
          </button>
        </form>

        <div className="cmodal__divider">
          <span>{t.divider}</span>
        </div>

        <ul className="cmodal__list">
          {t.items.map((item) => (
            <li key={item.label}>
              <a
                className="cmodal__item"
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="cmodal__icon">{iconMap[item.icon]}</span>
                <div className="cmodal__text">
                  <span className="cmodal__label">{item.label}</span>
                  <span className="cmodal__value">{item.value}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
