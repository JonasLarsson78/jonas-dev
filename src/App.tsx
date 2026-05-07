import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutModal from './components/AboutModal'
import ServicesModal from './components/ServicesModal'
import ContactModal from './components/ContactModal'
import FaqModal from './components/FaqModal'
import TechStackModal from './components/TechStackModal'

const CLOSE_DURATION = 280

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const closeModal = useCallback(() => {
    if (!activeSection || isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setActiveSection(null)
      setIsClosing(false)
    }, CLOSE_DURATION)
  }, [activeSection, isClosing])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeModal])

  return (
    <>
      <Navbar onNavClick={setActiveSection} />
      <Hero dimmed={activeSection !== null} />
      {activeSection === 'om-mig' && (
        <AboutModal onClose={closeModal} isClosing={isClosing} />
      )}
      {activeSection === 'tjanster' && (
        <ServicesModal onClose={closeModal} isClosing={isClosing} />
      )}
      {activeSection === 'kontakt' && (
        <ContactModal onClose={closeModal} isClosing={isClosing} />
      )}
      {activeSection === 'techstack' && (
        <TechStackModal onClose={closeModal} isClosing={isClosing} />
      )}
      {activeSection === 'faq' && (
        <FaqModal onClose={closeModal} isClosing={isClosing} />
      )}
    </>
  )
}

export default App
