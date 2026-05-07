import { useState } from 'react'
import { Code, Menu, X } from 'lucide-react'
import { nav } from '../content/nav'
import './Navbar.scss'

interface NavbarProps {
  onNavClick: (section: string) => void
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const [open, setOpen] = useState(false)

  function handleClick(id: string) {
    setOpen(false)
    onNavClick(id)
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Code className="navbar__icon" />
        <span className="navbar__logo">{nav.siteTitle}</span>
      </div>
      <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul
        className={`navbar__dropdown${open ? ' navbar__dropdown--open' : ''}`}
        aria-hidden={!open}
      >
        {nav.links.map(({ label, id }) => (
          <li key={id}>
            <a
              href="#"
              tabIndex={open ? 0 : -1}
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
