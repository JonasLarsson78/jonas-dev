import wallpaper from '../assets/wallpaper.png'
import { hero } from '../content/hero'
import './Hero.scss'

interface HeroProps {
  dimmed: boolean
}

export default function Hero({ dimmed }: HeroProps) {
  return (
    <section className="hero">
      <img
        src={wallpaper}
        alt="Jonas Dev hero"
        className={dimmed ? 'hero__img--bw' : ''}
      />
      <div className={`hero__overlay${dimmed ? ' hero__overlay--hidden' : ''}`}>
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__subtitle">{hero.subtitle}</p>
      </div>
      <footer className="hero__footer">{hero.footer}</footer>
    </section>
  )
}
