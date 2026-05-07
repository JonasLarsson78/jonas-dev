import { X, Clock, Banknote } from 'lucide-react'
import { services } from '../content/services'
import { useLanguage } from '../context/LanguageContext'
import './ServicesModal.scss'

interface ServicesModalProps {
  onClose: () => void
  isClosing: boolean
}

export default function ServicesModal({ onClose, isClosing }: ServicesModalProps) {
  const { lang } = useLanguage()
  const t = services[lang]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`smodal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="smodal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <h2 className="smodal__title">{t.title}</h2>

        <ul className="smodal__list">
          {t.items.map((item) => (
            <li key={item.name} className="smodal__item">
              <div className="smodal__item-main">
                <span className="smodal__item-name">{item.name}</span>
                <span className="smodal__item-desc">{item.description}</span>
              </div>
              <div className="smodal__item-meta">
                <span className="smodal__item-price">
                  <Banknote size={14} />
                  {item.price}
                </span>
                <span className="smodal__item-delivery">
                  <Clock size={14} />
                  {item.delivery}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
