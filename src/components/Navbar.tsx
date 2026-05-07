import { useState } from 'react'
import { Code, Menu, X } from 'lucide-react'
import { nav } from '../content/nav'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.scss'

interface NavbarProps {
  onNavClick: (section: string) => void
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const t = nav[lang]

  function handleClick(id: string) {
    setOpen(false)
    onNavClick(id)
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Code className="navbar__icon" />
        <span className="navbar__logo">{t.siteTitle}</span>
      </div>
      <div className="navbar__right">
        <button className="navbar__lang" onClick={toggleLang} aria-label="Toggle language">
          {lang === 'sv' ? '🇬🇧 EN' : '🇸🇪 SV'}
        </button>
        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul
        className={`navbar__dropdown${open ? ' navbar__dropdown--open' : ''}`}
        inert={!open}
      >
        {t.links.map(({ label, id }) => (
          <li key={id}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleClick(id) }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
