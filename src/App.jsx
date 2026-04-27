import { useState, useEffect, useRef } from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  burgundy: '#6B1A2A', burDeep: '#3D0D18', gold: '#C9A84C',
  goldLight: '#E8D5A0', cream: '#F5EFE0', dark: '#1A0A0E',
  darkMid: '#2C1218', muted: '#8C7B6B', green: '#2D6A4F',
  font: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', sans-serif",
}

// ─── WINE DATA ────────────────────────────────────────────────────────────────
const WINES = [
  { id: 1, name: 'Château Margaux', region: 'Bordeaux, Frankreich', year: '2018', style: 'Klassisch · Elegant', color: '#8B2035', gradient: 'linear-gradient(145deg, #4a1020, #8B2035)', emoji: '🍷', tags: ['tannin', 'komplex', 'klassisch'] },
  { id: 2, name: 'Gut Oggau Theodora', region: 'Burgenland, Österreich', year: '2022', style: 'Biodynamisch · Natürlich', color: '#C4622D', gradient: 'linear-gradient(145deg, #7a3015, #C4622D)', emoji: '🌿', tags: ['natürlich', 'lebendig', 'biodynamisch'] },
  { id: 3, name: 'Dom Pérignon', region: 'Champagne, Frankreich', year: '2015', style: 'Festlich · Prestige', color: '#C9A84C', gradient: 'linear-gradient(145deg, #7a6020, #C9A84C)', emoji: '✨', tags: ['perlend', 'festlich', 'prestige'] },
  { id: 4, name: 'Penfolds Grange', region: 'South Australia', year: '2019', style: 'Kraftvoll · Ikonisch', color: '#6B1A2A', gradient: 'linear-gradient(145deg, #3d0d18, #6B1A2A)', emoji: '🦅', tags: ['kräftig', 'ikonisch', 'ausgebaut'] },
  { id: 5, name: 'Egon Müller Scharzhofberger', region: 'Mosel, Deutschland', year: '2021', style: 'Filigran · Minerell', color: '#1D4E89', gradient: 'linear-gradient(145deg, #0d2547, #1D4E89)', emoji: '💎', tags: ['riesling', 'mineral', 'filigran'] },
  { id: 6, name: 'Masseria Li Veli Askos', region: 'Apulien, Italien', year: '2022', style: 'Südlich · Lebendig', color: '#8B4513', gradient: 'linear-gradient(145deg, #4a2008, #8B4513)', emoji: '☀️', tags: ['primitivo', 'fruchtig', 'südlich'] },
]

const VOCAB = [
  { word: 'Tannine', emoji: '🍂', front: 'Was sind Tannine?', back: 'Natürliche Gerbstoffe aus Trauben­schalen, Kernen und Holz. Sie erzeugen das trockene, zusammen­ziehende Gefühl im Mund — wie schwarzer Tee ohne Milch.', example: 'Spürst du wie dein Gaumen sich trocken anfühlt? Das sind die Tannine.', level: 1 },
  { word: 'Terroir', emoji: '🌍', front: 'Was bedeutet Terroir?', back: 'Der französische Begriff für alles was einen Weinberg einzigartig macht: Boden, Klima, Hanglage, Mikroklima. Zwei Weinberge nebeneinander können völlig verschiedene Weine erzeugen.', example: 'Deshalb schmeckt ein Chablis anders als ein Burgunder — obwohl beide aus Chardonnay sind.', level: 1 },
  { word: 'Vinifikation', emoji: '⚗️', front: 'Was ist Vinifikation?', back: 'Der gesamte Prozess der Weinherstellung — von der Ernte bis zur Flasche. Maischen, Vergären, Keltern, Ausbau. Jede Entscheidung des Winzers prägt den finalen Wein.', example: 'Rotwein braucht Kontakt mit den Schalen — Weißwein meist nicht.', level: 2 },
  { word: 'Elevage', emoji: '🛢️', front: 'Was bedeutet Elevage?', back: 'Der Ausbau des Weins nach der Gärung — meist in Eichenfässern oder Stahltanks. Im Holzfass nimmt der Wein Vanille­noten, Röstaromen und mehr Struktur an.', example: 'Dom Pérignon reift mindestens 8 Jahre bevor er auf den Markt kommt.', level: 2 },
  { word: 'Biodynamisch', emoji: '🌙', front: 'Was ist biodynamischer Weinbau?', back: 'Eine Philosophie die den Weinberg als lebendiges Ökosystem betrachtet. Kein synthetischer Dünger, kein Pestizide — stattdessen wird nach dem Mondkalender gearbeitet und Kräuterpräparate eingesetzt.', example: 'Gut Oggau in Österreich ist einer der bekanntesten biodynamischen Betriebe.', level: 2 },
]

const DNA_PROFILES = {
  classic: { name: 'Der klassische Genießer', sub: 'Elegant · Strukturiert · Beständig', desc: 'Du weißt was du willst. Qualität über Trends. Dein Keller: Bordeaux, Burgund, Barolo.', color: T.burgundy, emoji: '🎩', wines: ['Château Margaux 2018', 'Penfolds Grange 2019'] },
  natural: { name: 'Der neugierige Entdecker', sub: 'Natürlich · Lebendig · Mutig', desc: 'Konventionen interessieren dich nicht. Du trinkst was lebt. Dein Keller: Naturwein, Biodynamisch, Orange Wine.', color: T.green, emoji: '🌿', wines: ['Gut Oggau Theodora 2022', 'Masseria Li Veli 2022'] },
  prestige: { name: 'Der Connoisseur', sub: 'Prestige · Kompromisslos · Ikonisch', desc: 'Nur das Beste. Du kennst die großen Namen und willst hinter die Kulissen. Dein Keller: Champagne, Grand Cru, Ikonen.', color: '#C9A84C', emoji: '✨', wines: ['Dom Pérignon 2015', 'Egon Müller Scharzhofberger 2021'] },
  mineral: { name: 'Der Finesse-Liebhaber', sub: 'Filigran · Mineral · Präzise', desc: 'Kraft interessiert dich wenig — du suchst Eleganz und Spannung. Dein Keller: Riesling, Chablis, Loire.', color: '#1D4E89', emoji: '💎', wines: ['Egon Müller Scharzhofberger 2021', 'Gut Oggau Theodora 2022'] },
}

// ─── TINY COMPONENTS ─────────────────────────────────────────────────────────
const s = (styles) => styles // identity for style objects

const Screen = ({ children, style }) => (
  <div style={{
    width: '100%', maxWidth: 430, height: '100dvh', maxHeight: 900,
    background: T.dark, overflow: 'hidden', position: 'relative',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 0 80px rgba(0,0,0,0.8)',
    ...style
  }}>
    {children}
  </div>
)

const GoldText = ({ children, style }) => (
  <span style={{
    background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight}, ${T.gold})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 3s linear infinite',
    ...style,
    fontFamily: T.font,
  }}>{children}</span>
)

const Btn = ({ children, onClick, style, variant = 'primary' }) => {
  const base = {
    width: '100%', padding: '16px', borderRadius: 14,
    fontSize: 15, fontWeight: 500, cursor: 'pointer',
    transition: 'all 0.2s', border: 'none', fontFamily: T.body,
    letterSpacing: '0.02em',
  }
  const variants = {
    primary: { background: `linear-gradient(135deg, ${T.burgundy}, #8B2035)`, color: T.cream, boxShadow: `0 4px 20px ${T.burgundy}66` },
    gold: { background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.dark, boxShadow: `0 4px 20px ${T.gold}44` },
    ghost: { background: 'rgba(255,255,255,0.06)', color: T.cream, border: `1px solid rgba(255,255,255,0.1)` },
  }
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>
}

const Points = ({ pts, streak }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(201,168,76,0.12)', borderRadius: 20, padding: '6px 12px', border: `1px solid ${T.gold}33` }}>
      <span style={{ fontSize: 14 }}>⭐</span>
      <span style={{ fontSize: 13, color: T.gold, fontWeight: 600 }}>{pts.toLocaleString('de-DE')}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,100,50,0.12)', borderRadius: 20, padding: '6px 12px', border: '1px solid rgba(255,100,50,0.2)' }}>
      <span style={{ fontSize: 14 }}>🔥</span>
      <span style={{ fontSize: 13, color: '#FF8C42', fontWeight: 600 }}>{streak}</span>
    </div>
  </div>
)

// ─── SCREEN 1: WELCOME ────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', position: 'relative' }}>
        {/* Background texture */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 30%, ${T.burgundy}44 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ animation: 'fadeUp 0.6s ease forwards', textAlign: 'center', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🍷</div>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', color: T.gold, textTransform: 'uppercase', marginBottom: 10, fontFamily: T.body }}>
              HAWESKO
            </div>
            <GoldText style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, display: 'block' }}>
              Sommelier
            </GoldText>
          </div>

          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7, marginBottom: 48, maxWidth: 280, fontFamily: T.body }}>
            Entdecke deine Wein-DNA. Werde vom Liebhaber zum Kenner.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Btn onClick={onNext} variant="gold">
              Jetzt starten →
            </Btn>
            <div style={{ fontSize: 12, color: T.muted, textAlign: 'center', fontFamily: T.body }}>
              Kostenlos · Kein Account nötig
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 32 }}>
          {['🎓 Zertifikate', '⭐ Punkte', '🛒 Shop'].map(item => (
            <div key={item} style={{ fontSize: 11, color: T.muted, fontFamily: T.body }}>{item}</div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN 2: TASTE DNA SWIPE ────────────────────────────────────────────────
function TasteDNAScreen({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [liked, setLiked] = useState([])
  const [disliked, setDisliked] = useState([])
  const [swipeDir, setSwipeDir] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(null)

  const wine = WINES[current]
  const progress = (current / WINES.length) * 100

  const swipe = (dir) => {
    if (animating || current >= WINES.length) return
    setSwipeDir(dir)
    setAnimating(true)
    if (dir === 'right') setLiked(p => [...p, wine])
    else setDisliked(p => [...p, wine])
    setTimeout(() => {
      setSwipeDir(null)
      setAnimating(false)
      setDragX(0)
      if (current + 1 >= WINES.length) {
        const likedTags = [...liked, ...(dir === 'right' ? [wine] : [])].flatMap(w => w.tags)
        let profile = 'classic'
        if (likedTags.filter(t => ['natürlich','biodynamisch','lebendig'].includes(t)).length >= 2) profile = 'natural'
        else if (likedTags.filter(t => ['prestige','festlich','perlend'].includes(t)).length >= 2) profile = 'prestige'
        else if (likedTags.filter(t => ['mineral','filigran','riesling'].includes(t)).length >= 2) profile = 'mineral'
        onComplete(profile, liked.length + (dir === 'right' ? 1 : 0))
      } else {
        setCurrent(p => p + 1)
      }
    }, 380)
  }

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; setIsDragging(true) }
  const onTouchMove = (e) => { if (startX.current !== null) setDragX(e.touches[0].clientX - startX.current) }
  const onTouchEnd = () => {
    setIsDragging(false)
    if (Math.abs(dragX) > 80) swipe(dragX > 0 ? 'right' : 'left')
    else setDragX(0)
    startX.current = null
  }

  const cardStyle = () => {
    let transform = `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`
    if (swipeDir === 'left') transform = 'translateX(-130%) rotate(-20deg)'
    if (swipeDir === 'right') transform = 'translateX(130%) rotate(20deg)'
    return {
      transform,
      transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      opacity: swipeDir ? 0 : 1,
    }
  }

  const likeOpacity = Math.min(1, Math.max(0, dragX / 100))
  const nopeOpacity = Math.min(1, Math.max(0, -dragX / 100))

  return (
    <Screen>
      {/* Header */}
      <div style={{ padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: T.body }}>Taste DNA</div>
          <div style={{ fontSize: 18, fontFamily: T.font, color: T.cream, fontWeight: 600 }}>Was spricht dich an?</div>
        </div>
        <div style={{ fontSize: 12, color: T.muted, fontFamily: T.body }}>{current + 1} / {WINES.length}</div>
      </div>

      {/* Progress */}
      <div style={{ margin: '0 24px 24px', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold})`, borderRadius: 4, transition: 'width 0.3s ease' }} />
      </div>

      {/* Card Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

          {/* LIKE indicator */}
          <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, opacity: likeOpacity, transform: 'rotate(-12deg)', transition: 'opacity 0.1s' }}>
            <div style={{ border: `3px solid ${T.green}`, borderRadius: 8, padding: '6px 14px', color: T.green, fontSize: 18, fontWeight: 700, fontFamily: T.font }}>JA ✓</div>
          </div>
          {/* NOPE indicator */}
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10, opacity: nopeOpacity, transform: 'rotate(12deg)', transition: 'opacity 0.1s' }}>
            <div style={{ border: `3px solid #E74C3C`, borderRadius: 8, padding: '6px 14px', color: '#E74C3C', fontSize: 18, fontWeight: 700, fontFamily: T.font }}>NEIN ✗</div>
          </div>

          {/* Wine Card */}
          <div style={{
            ...cardStyle(),
            background: wine.gradient,
            borderRadius: 24,
            padding: '32px 28px',
            minHeight: 380,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            userSelect: 'none',
          }}>
            <div>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{wine.emoji}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontFamily: T.body }}>
                {wine.region} · {wine.year}
              </div>
              <div style={{ fontSize: 26, fontFamily: T.font, color: '#fff', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
                {wine.name}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: T.body }}>
                {wine.style}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {wine.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 12px', fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: T.body, letterSpacing: '0.05em' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Swipe hint */}
        <div style={{ marginTop: 20, fontSize: 12, color: T.muted, fontFamily: T.body, textAlign: 'center' }}>
          ← Wische oder tippe die Buttons
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 20, marginTop: 16, justifyContent: 'center' }}>
          {[
            { icon: '✗', label: 'Nicht mein Stil', action: () => swipe('left'), color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
            { icon: '✓', label: 'Gefällt mir', action: () => swipe('right'), color: T.green, bg: `rgba(45,106,79,0.15)` },
          ].map(({ icon, label, action, color, bg }) => (
            <button key={icon} onClick={action} style={{
              background: bg, border: `2px solid ${color}44`, borderRadius: 16,
              padding: '14px 28px', color, fontSize: 20, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              transition: 'all 0.2s',
            }}>
              <span>{icon}</span>
              <span style={{ fontSize: 10, fontFamily: T.body, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN 3: DNA RESULT ─────────────────────────────────────────────────────
function DNAResultScreen({ profile, likedCount, onNext }) {
  const p = DNA_PROFILES[profile]
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '52px 28px 36px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease' }}>
          <div style={{ fontSize: 11, color: T.gold, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12, fontFamily: T.body }}>
            🧬 Deine Wein-DNA
          </div>
          <div style={{ fontSize: 13, color: T.muted, fontFamily: T.body }}>
            Basierend auf {likedCount} von {WINES.length} Weinen die du gemocht hast
          </div>
        </div>

        {/* DNA Card */}
        <div style={{
          background: `linear-gradient(145deg, ${p.color}33, ${p.color}11)`,
          border: `1px solid ${p.color}55`,
          borderRadius: 24, padding: 28, marginBottom: 24,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'scale(0.9)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        }}>
          <div style={{ fontSize: 52, textAlign: 'center', marginBottom: 16 }}>{p.emoji}</div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, fontFamily: T.font, color: T.cream, fontWeight: 700, marginBottom: 6 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: p.color === T.gold ? T.gold : T.gold, letterSpacing: '0.1em', fontFamily: T.body }}>{p.sub}</div>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(245,239,224,0.75)', lineHeight: 1.7, textAlign: 'center', fontFamily: T.body, marginBottom: 20 }}>
            {p.desc}
          </div>

          <div style={{ borderTop: `1px solid ${p.color}33`, paddingTop: 16 }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontFamily: T.body }}>
              Deine ersten Empfehlungen
            </div>
            {p.wines.map(w => (
              <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.gold, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: T.cream, fontFamily: T.body }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level start */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28,
          border: '1px solid rgba(255,255,255,0.08)',
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.5s'
        }}>
          <div>
            <div style={{ fontSize: 12, color: T.muted, fontFamily: T.body }}>Dein Start-Level</div>
            <div style={{ fontSize: 16, color: T.cream, fontFamily: T.font, fontWeight: 600 }}>🍇 Weinliebhaber</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: T.gold, fontFamily: T.body }}>+200 Punkte</div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: T.body }}>für DNA-Analyse</div>
          </div>
        </div>

        <Btn onClick={onNext} variant="gold">
          Jetzt lernen → Level 1 starten
        </Btn>
      </div>
    </Screen>
  )
}

// ─── SCREEN 4: LEARNING (Flashcards) ─────────────────────────────────────────
function LearningScreen({ points, streak, onUpdatePoints, onNext }) {
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(null) // 'correct' | 'wrong'
  const [completed, setCompleted] = useState([])
  const [showComplete, setShowComplete] = useState(false)

  const card = VOCAB[cardIndex]
  const totalCards = VOCAB.length
  const progress = (completed.length / totalCards) * 100

  const handleFlip = () => { if (!answered) setFlipped(f => !f) }

  const handleAnswer = (correct) => {
    if (answered) return
    setAnswered(correct ? 'correct' : 'wrong')
    if (correct) onUpdatePoints(20)
  }

  const handleNext = () => {
    setCompleted(p => [...p, cardIndex])
    setAnswered(null)
    setFlipped(false)
    if (cardIndex + 1 >= totalCards) setShowComplete(true)
    else setCardIndex(p => p + 1)
  }

  if (showComplete) return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <GoldText style={{ fontSize: 32, fontWeight: 700, display: 'block', marginBottom: 12 }}>Lektion abgeschlossen!</GoldText>
        <p style={{ fontSize: 15, color: T.muted, fontFamily: T.body, lineHeight: 1.7, marginBottom: 32 }}>
          Du hast {totalCards} Vokabeln gelernt und {totalCards * 20} Punkte gesammelt.
        </p>
        <div style={{ background: `rgba(201,168,76,0.1)`, border: `1px solid ${T.gold}33`, borderRadius: 16, padding: '16px 24px', marginBottom: 32 }}>
          <div style={{ fontSize: 28, color: T.gold, fontFamily: T.font, fontWeight: 700 }}>+{totalCards * 20} ⭐</div>
          <div style={{ fontSize: 12, color: T.muted, fontFamily: T.body, marginTop: 4 }}>Weinpunkte verdient</div>
        </div>
        <Btn onClick={onNext} variant="gold">Weiter zum Shop →</Btn>
      </div>
    </Screen>
  )

  return (
    <Screen>
      {/* Header */}
      <div style={{ padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: T.body }}>Level 1 · Lektion 1</div>
          <div style={{ fontSize: 18, fontFamily: T.font, color: T.cream, fontWeight: 600 }}>Wein-Vokabeln</div>
        </div>
        <Points pts={points} streak={streak} />
      </div>

      {/* Progress */}
      <div style={{ margin: '0 24px 20px', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold})`, borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 24px' }}>
        {/* Card count */}
        <div style={{ fontSize: 12, color: T.muted, textAlign: 'center', marginBottom: 16, fontFamily: T.body }}>
          Karte {cardIndex + 1} von {totalCards}
        </div>

        {/* Flashcard */}
        <div onClick={handleFlip} style={{
          flex: 1, maxHeight: 340, cursor: answered ? 'default' : 'pointer',
          perspective: 1000, marginBottom: 20, position: 'relative',
        }}>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            background: `linear-gradient(145deg, ${T.darkMid}, #1f0c10)`,
            border: `1px solid rgba(201,168,76,0.2)`,
            borderRadius: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 28, textAlign: 'center',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{card.emoji}</div>
            <div style={{ fontSize: 28, fontFamily: T.font, color: T.cream, fontWeight: 700, marginBottom: 12 }}>{card.word}</div>
            <div style={{ fontSize: 16, color: T.muted, fontFamily: T.body, marginBottom: 24 }}>{card.front}</div>
            <div style={{ fontSize: 12, color: `${T.gold}88`, fontFamily: T.body, border: `1px dashed ${T.gold}44`, borderRadius: 8, padding: '6px 16px' }}>
              Tippen zum Aufdecken
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            background: `linear-gradient(145deg, ${T.burDeep}, ${T.darkMid})`,
            border: `1px solid ${T.gold}33`,
            borderRadius: 20,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 28, overflowY: 'auto',
            transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}>
            <div style={{ fontSize: 11, color: T.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: T.body }}>Definition</div>
            <div style={{ fontSize: 15, color: T.cream, lineHeight: 1.7, marginBottom: 20, fontFamily: T.body }}>{card.back}</div>
            <div style={{ background: 'rgba(201,168,76,0.08)', borderRadius: 10, padding: '12px 14px', border: `1px solid ${T.gold}22` }}>
              <div style={{ fontSize: 10, color: T.gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: T.body }}>Beispiel</div>
              <div style={{ fontSize: 13, color: `${T.cream}BB`, fontStyle: 'italic', lineHeight: 1.6, fontFamily: T.body }}>{card.example}</div>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {flipped && !answered && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, animation: 'fadeUp 0.3s ease' }}>
            <button onClick={() => handleAnswer(false)} style={{
              flex: 1, padding: '14px', borderRadius: 14, fontSize: 14, fontFamily: T.body,
              background: 'rgba(231,76,60,0.12)', border: '2px solid rgba(231,76,60,0.3)',
              color: '#E74C3C', cursor: 'pointer',
            }}>✗ Nochmal</button>
            <button onClick={() => handleAnswer(true)} style={{
              flex: 1, padding: '14px', borderRadius: 14, fontSize: 14, fontFamily: T.body,
              background: `rgba(45,106,79,0.15)`, border: `2px solid ${T.green}44`,
              color: T.green, cursor: 'pointer',
            }}>✓ Gewusst! +20⭐</button>
          </div>
        )}

        {answered && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{
              borderRadius: 14, padding: '14px 16px', marginBottom: 12,
              background: answered === 'correct' ? `rgba(45,106,79,0.15)` : 'rgba(231,76,60,0.1)',
              border: `1px solid ${answered === 'correct' ? T.green : '#E74C3C'}33`,
              fontSize: 13, color: answered === 'correct' ? T.green : '#E74C3C',
              fontFamily: T.body, textAlign: 'center',
            }}>
              {answered === 'correct' ? '✓ Super! +20 Weinpunkte verdient' : '✗ Kein Problem — kommt nächste Runde wieder'}
            </div>
            <Btn onClick={handleNext} variant={cardIndex + 1 >= totalCards ? 'gold' : 'ghost'}>
              {cardIndex + 1 >= totalCards ? 'Lektion abschließen 🎉' : 'Nächste Karte →'}
            </Btn>
          </div>
        )}
      </div>
    </Screen>
  )
}

// ─── SCREEN 5: SHOP ───────────────────────────────────────────────────────────
function ShopScreen({ profile, points, onRestart }) {
  const p = DNA_PROFILES[profile]
  const recommendations = [
    { name: 'Château Margaux 2018', price: '€ 189', tag: 'Passend zu deiner DNA', emoji: '🍷', badge: 'Top Pick' },
    { name: 'Gut Oggau Theodora', price: '€ 34', tag: 'Biodynamisch · Natürlich', emoji: '🌿', badge: 'Neu' },
    { name: 'Dom Pérignon 2015', price: '€ 229', tag: 'Für besondere Momente', emoji: '✨', badge: 'Prestige' },
  ]

  return (
    <Screen>
      <div style={{ flex: 1, overflowY: 'auto', padding: '52px 24px 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: T.body }}>Dein Shop</div>
            <Points pts={points} streak={3} />
          </div>
          <div style={{ fontSize: 22, fontFamily: T.font, color: T.cream, fontWeight: 700 }}>Passend zu dir</div>
          <div style={{ fontSize: 13, color: T.muted, fontFamily: T.body, marginTop: 4 }}>Basierend auf deiner Wein-DNA: <span style={{ color: T.gold }}>{p.name}</span></div>
        </div>

        {/* Points banner */}
        <div style={{ background: `linear-gradient(135deg, ${T.burgundy}44, ${T.burDeep}88)`, borderRadius: 16, padding: '16px 20px', marginBottom: 24, border: `1px solid ${T.gold}33` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: T.cream, fontFamily: T.body, marginBottom: 2 }}>Deine Weinpunkte</div>
              <div style={{ fontSize: 24, fontFamily: T.font, fontWeight: 700 }}><GoldText>{points.toLocaleString('de-DE')} ⭐</GoldText></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: T.muted, fontFamily: T.body }}>nächste Stufe</div>
              <div style={{ fontSize: 13, color: T.gold, fontFamily: T.body }}>500 = €5 Rabatt</div>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${Math.min(100, (points / 500) * 100)}%`, background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold})`, borderRadius: 4, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: T.muted, fontFamily: T.body, marginTop: 6 }}>{points} / 500 Punkte bis €5 Rabatt</div>
        </div>

        {/* Recommendations */}
        <div style={{ fontSize: 13, color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, fontFamily: T.body }}>
          Empfehlungen für dich
        </div>
        {recommendations.map((wine, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: '16px 18px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ fontSize: 36 }}>{wine.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ fontSize: 14, color: T.cream, fontFamily: T.font, fontWeight: 600, lineHeight: 1.3 }}>{wine.name}</div>
                <span style={{ fontSize: 9, background: T.gold, color: T.dark, borderRadius: 6, padding: '2px 6px', fontFamily: T.body, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>{wine.badge}</span>
              </div>
              <div style={{ fontSize: 11, color: T.muted, fontFamily: T.body, marginTop: 2, marginBottom: 8 }}>{wine.tag}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 16, color: T.gold, fontFamily: T.font, fontWeight: 700 }}>{wine.price}</span>
                <button style={{ background: `${T.burgundy}`, borderRadius: 8, padding: '6px 14px', color: T.cream, fontSize: 12, fontFamily: T.body, border: 'none', cursor: 'pointer' }}>
                  In den Shop →
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Next lesson CTA */}
        <div style={{ background: `linear-gradient(135deg, ${T.burDeep}, ${T.darkMid})`, borderRadius: 16, padding: '18px 20px', marginTop: 8, border: `1px solid ${T.gold}22` }}>
          <div style={{ fontSize: 13, color: T.gold, fontFamily: T.font, fontWeight: 600, marginBottom: 6 }}>🎓 Nächste Lektion verfügbar</div>
          <div style={{ fontSize: 12, color: T.muted, fontFamily: T.body, marginBottom: 14 }}>Regionen & Jahrgänge · Level 1 · Karte 2</div>
          <Btn variant="ghost" onClick={onRestart} style={{ fontSize: 13, padding: '12px' }}>
            Demo neu starten →
          </Btn>
        </div>
      </div>
    </Screen>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [dnaProfile, setDnaProfile] = useState(null)
  const [likedCount, setLikedCount] = useState(0)
  const [points, setPoints] = useState(200)
  const [streak, setStreak] = useState(1)

  const handleDNAComplete = (profile, liked) => {
    setDnaProfile(profile)
    setLikedCount(liked)
    setScreen('result')
  }

  const handleUpdatePoints = (add) => setPoints(p => p + add)

  return (
    <div style={{ width: '100vw', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0608' }}>
      {screen === 'welcome' && <WelcomeScreen onNext={() => setScreen('dna')} />}
      {screen === 'dna'     && <TasteDNAScreen onComplete={handleDNAComplete} />}
      {screen === 'result'  && <DNAResultScreen profile={dnaProfile} likedCount={likedCount} onNext={() => { setStreak(s => s + 1); setScreen('learn') }} />}
      {screen === 'learn'   && <LearningScreen points={points} streak={streak} onUpdatePoints={handleUpdatePoints} onNext={() => setScreen('shop')} />}
      {screen === 'shop'    && <ShopScreen profile={dnaProfile} points={points} onRestart={() => { setScreen('welcome'); setPoints(200); setStreak(1) }} />}
    </div>
  )
}
