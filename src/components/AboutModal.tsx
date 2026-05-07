import { X } from 'lucide-react'
import profilePhoto from '../assets/jonas.jpg'
import { about } from '../content/about'
import './AboutModal.scss'

interface AboutModalProps {
  onClose: () => void
  isClosing: boolean
}

export default function AboutModal({ onClose, isClosing }: AboutModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal${isClosing ? ' modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Stäng">
          <X size={24} />
        </button>

        <div className="modal__content">
          <div className="modal__left">
            <img className="modal__avatar" src={profilePhoto} alt={about.name} />
            <h2 className="modal__name">{about.name}</h2>
            <p className="modal__role">{about.role}</p>
            <div className="modal__skills">
              {about.skills.map((skill) => (
                <span key={skill} className="modal__skill">{skill}</span>
              ))}
            </div>
          </div>

          <div className="modal__body">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
