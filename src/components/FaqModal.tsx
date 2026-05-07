import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { faq } from '../content/faq'
import './FaqModal.scss'

interface FaqModalProps {
  onClose: () => void
  isClosing: boolean
}

export default function FaqModal({ onClose, isClosing }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`fmodal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="fmodal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <h2 className="fmodal__title">{faq.title}</h2>

        <ul className="fmodal__list">
          {faq.items.map((item, i) => (
            <li key={i} className={`fmodal__item${openIndex === i ? ' fmodal__item--open' : ''}`}>
              <button className="fmodal__question" onClick={() => toggle(i)}>
                <span>{item.question}</span>
                <ChevronDown size={18} className="fmodal__chevron" />
              </button>
              <div className="fmodal__answer">
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
