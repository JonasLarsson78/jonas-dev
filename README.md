# Jonas Dev

Personlig SPA-webbplats för Jonas Larsson – systemutvecklare med fokus på frontend och moderna webbapplikationer.

## Funktioner

- Fullskärms hero med animerad gradient-text och typewriter-effekt
- Hamburgar-meny med animerad dropdown
- Modaler med in/ut-animationer för: Om mig, Tjänster, Färdigheter, Kontakt och FAQ
- Hero-bild övergår till svartvit + blur när modal öppnas
- Escape-tangent stänger aktiv modal
- Mobilanpassad layout
- All text samlad i `src/content/` för enkel redigering

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [SCSS](https://sass-lang.com)
- [Lucide React](https://lucide.dev)
- [Fira Code](https://github.com/tonsky/FiraCode) + [Playwrite CA](https://fonts.google.com/specimen/Playwrite+CA) (via Fontsource)
- Byggt med hjälp av [Claude Code](https://claude.ai/code)

## Kom igång

```bash
npm install
npm run dev
```

## Bygga för produktion

```bash
npm run build
npm run preview
```

## Struktur

```
src/
├── assets/          # Bilder
├── components/      # React-komponenter + SCSS
├── content/         # All redigerbar text (nav, hero, about, services, faq...)
└── main.tsx
```

## Innehåll

Redigera filerna i `src/content/` för att uppdatera text och data utan att röra komponenterna:

| Fil | Innehåll |
|---|---|
| `nav.ts` | Sidtitel och menylänkar |
| `hero.ts` | Hero-titel, undertext och footer |
| `about.ts` | Om mig – bio, skills och profilbild |
| `services.ts` | Tjänster med pris och leveranstid |
| `techstack.ts` | Färdigheter kategoriserade |
| `contact.ts` | Kontaktuppgifter |
| `faq.ts` | Frågor och svar |

## Deploy

Projektet är konfigurerat för [Vercel](https://vercel.com). Koppla repot i Vercel-dashboarden eller kör:

```bash
vercel
```
