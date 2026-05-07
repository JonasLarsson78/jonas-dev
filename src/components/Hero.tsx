import wallpaper from '../assets/wallpaper.png'
import { hero } from '../content/hero'
import { useLanguage } from '../context/LanguageContext'
import './Hero.scss'

interface HeroProps {
  dimmed: boolean
}

export default function Hero({ dimmed }: HeroProps) {
  const { lang } = useLanguage()
  const t = hero[lang]

  return (
    <section className="hero">
      <img
        src={wallpaper}
        alt="Jonas Dev hero"
        className={dimmed ? 'hero__img--bw' : ''}
      />
      <div className={`hero__overlay${dimmed ? ' hero__overlay--hidden' : ''}`} aria-hidden={dimmed}>
        <h1 className="hero__title">{t.title}</h1>
        <p className="hero__subtitle">{t.subtitle}</p>
      </div>
      <footer className="hero__footer">{t.footer}</footer>
    </section>
  )
}
