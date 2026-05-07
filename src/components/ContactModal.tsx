import { X, Mail, Phone, GitBranch, Link2 } from 'lucide-react'
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

export default function ContactModal({ onClose, isClosing }: ContactModalProps) {
  const { lang } = useLanguage()
  const t = contact[lang]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`cmodal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="cmodal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <h2 className="cmodal__title">{t.title}</h2>

        <ul className="cmodal__list">
          {t.items.map((item) => (
            <li key={item.label}>
              <a className="cmodal__item" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
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
