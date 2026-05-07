import { X } from 'lucide-react'
import { techstack } from '../content/techstack'
import { useLanguage } from '../context/LanguageContext'
import './TechStackModal.scss'

interface TechStackModalProps {
  onClose: () => void
  isClosing: boolean
}

export default function TechStackModal({ onClose, isClosing }: TechStackModalProps) {
  const { lang } = useLanguage()
  const t = techstack[lang]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`tmodal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="tmodal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <h2 className="tmodal__title">{t.title}</h2>

        <div className="tmodal__body">
          {t.categories.map((cat) => (
            <div key={cat.label} className="tmodal__category">
              <h3 className="tmodal__category-label">{cat.label}</h3>
              <div className="tmodal__grid">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="tmodal__card"
                    style={{ '--accent': item.color } as React.CSSProperties}
                  >
                    <div className="tmodal__card-header">
                      <span className="tmodal__dot" />
                      <span className="tmodal__card-name">{item.name}</span>
                    </div>
                    <p className="tmodal__card-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
