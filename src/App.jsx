import { useState, useRef } from 'react'

// ─── HAWESKO CI TOKENS ───────────────────────────────────────────────────────
const H = {
  red: '#9B1B30', redDark: '#7A1525', redLight: '#C4253E',
  black: '#1A1A1A', grayDark: '#3D3D3D', grayMid: '#6B6B6B',
  grayLight: '#B0B0B0', grayBg: '#F5F5F3', grayLine: '#E8E8E6',
  white: '#FFFFFF', gold: '#C4962A', green: '#2A6B45',
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', -apple-system, sans-serif",
}

// ─── REAL HAWESKO WINES ──────────────────────────────────────────────────────
const DISCOVERY_WINES = [
  { id:1, year:'2025', name:'Grafenstück Winner\'s Selection Grauburgunder', region:'Pfalz', producer:'Weingut Metzger', style:'trocken', tags:['ausdrucksstark & fein','trocken'], price:'€ 7,99', oldPrice:'€ 13,90', discount:'-43%', type:'Weißwein', grape:'Grauburgunder', color:'#D4A853', bg:'linear-gradient(160deg,#8B6914,#C4962A)', badge:'GOLD MEDAILLE', desc:'Ausdrucksstark und fein — der Flaggschiff-Grauburgunder aus der Pfalz.' },
  { id:2, year:'2025', name:'Chapelle Bellevoix Sauvignon Blanc Fumé', region:'Vin de France', producer:'', style:'trocken', tags:['fruchtig & aromatisch','trocken'], price:'€ 7,99', oldPrice:'€ 13,90', discount:'-43%', type:'Weißwein', grape:'Sauvignon Blanc', color:'#7EB87E', bg:'linear-gradient(160deg,#2A6B45,#5A9A5A)', badge:'VEGAN', desc:'Frisch und aromatisch — Sauvignon Blanc mit Tiefe aus Frankreich.' },
  { id:3, year:'2025', name:'Serpenthal Pinot Grigio', region:'Etschtaler DOC', producer:'', style:'trocken', tags:['jung & frisch','trocken'], price:'€ 7,99', oldPrice:'€ 13,90', discount:'-43%', type:'Weißwein', grape:'Pinot Grigio', color:'#B8A090', bg:'linear-gradient(160deg,#7A5A4A,#B8907A)', badge:'NEU', desc:'Jung und frisch — italienischer Pinot Grigio vom Etschtal.' },
  { id:4, year:'2025', name:'Gérard Bertrand Gris Blanc', region:'Pays d\'Oc IGP', producer:'Gérard Bertrand', style:'trocken', tags:['mineralisch & trocken'], price:'€ 7,99', oldPrice:'€ 9,95', discount:'-20%', type:'Roséwein', grape:'Cuvée', color:'#E8C4A0', bg:'linear-gradient(160deg,#C4622D,#E8A070)', badge:'NEUER JAHRGANG', desc:'Eleganter Gris Blanc aus dem Languedoc — frisch und mineralisch.' },
  { id:5, year:'2024', name:'Doppio Passo Primitivo', region:'Salento IGT', producer:'Casa Vinicola Botter', style:'trocken', tags:['kräftig & fruchtig','trocken'], price:'€ 9,99', oldPrice:'€ 12,90', discount:'-22%', type:'Rotwein', grape:'Primitivo', color:'#6B1A2A', bg:'linear-gradient(160deg,#3D0D18,#6B1A2A)', badge:'BESTSELLER', desc:'Der beliebteste Primitivo Italiens — kräftig, fruchtig, samtig.' },
  { id:6, year:'2025', name:'Ma Terre Burgunder Weiß', region:'Pfalz', producer:'Weingut Markus Schneider', style:'trocken', tags:['ausdrucksstark & fein'], price:'€ 12,99', oldPrice:'€ 16,90', discount:'-23%', type:'Weißwein', grape:'Grauburgunder', color:'#C4962A', bg:'linear-gradient(160deg,#7A5A14,#C4962A)', badge:'NEU', desc:'Markus Schneider zeigt Burgunder von seiner besten Seite.' },
  { id:7, year:'2024', name:'Pèppoli Chianti Classico', region:'Chianti Classico DOCG', producer:'Marchesi Antinori', style:'trocken', tags:['ausdrucksstark & fein','trocken'], price:'€ 14,99', oldPrice:'€ 18,90', discount:'-21%', type:'Rotwein', grape:'Sangiovese', color:'#8B1A2A', bg:'linear-gradient(160deg,#4A0D15,#8B1A2A)', badge:'ANTINORI', desc:'Antinori-Eleganz aus der Toskana — Sangiovese at its finest.' },
  { id:8, year:'2024', name:'Brolettino Lugana', region:'Lugana DOC', producer:'Cà dei Frati', style:'trocken', tags:['mineralisch','trocken'], price:'€ 11,99', oldPrice:'€ 15,90', discount:'-25%', type:'Weißwein', grape:'Turbiana', color:'#A8C87A', bg:'linear-gradient(160deg,#4A7A1A,#7AB83A)', badge:'GARDASEE', desc:'Der Bestseller vom Gardasee — mineralisch und unverwechselbar.' },
  { id:9, year:'2025', name:'Markus Schneider Blackprint', region:'Pfalz', producer:'Weingut Markus Schneider', style:'trocken', tags:['ausdrucksstark','trocken'], price:'€ 13,99', oldPrice:'€ 17,90', discount:'-22%', type:'Rotwein', grape:'Cuvée', color:'#2C2C2C', bg:'linear-gradient(160deg,#1A1A1A,#3D3D3D)', badge:'IKONE', desc:'Deutschlands bekanntester Rotwein — Kraft und Eleganz.' },
  { id:10, year:'2025', name:'Ventomar Vinho Verde Iced Edition', region:'Vinho Verde DOC', producer:'', style:'lieblich', tags:['jung & frisch','lieblich'], price:'€ 5,99', oldPrice:'€ 8,99', discount:'-33%', type:'Weißwein', grape:'Cuvée', color:'#5A8A5A', bg:'linear-gradient(160deg,#2A5A2A,#5A8A5A)', badge:'VEGAN', desc:'Erfrischend und leicht — der perfekte Sommerwein aus Portugal.' },
]

// ─── KNOWLEDGE QUIZ QUESTIONS ─────────────────────────────────────────────────
const QUIZ = [
  { q:'Welche Rebsorte ist das bekannteste deutsche Aushängeschild?', answers:['Riesling','Chardonnay','Grauburgunder','Merlot'], correct:0, level:1 },
  { q:'Was bedeutet "trocken" auf einem Weinetikett?', answers:['Wenig Restzucker','Sehr alkoholreich','Lange Reifezeit','Keine Sulfite'], correct:0, level:1 },
  { q:'Aus welchem Land kommt Primitivo ursprünglich?', answers:['Italien','Spanien','Frankreich','Portugal'], correct:0, level:1 },
  { q:'Was sind Tannine?', answers:['Gerbstoffe aus Schalen & Kernen','Fruchtsäuren des Weins','Hefekulturen für die Gärung','Zucker im Most'], correct:0, level:2 },
  { q:'Welche Region ist für Grauburgunder aus Deutschland bekannt?', answers:['Pfalz','Mosel','Rheingau','Ahr'], correct:0, level:2 },
  { q:'Was bedeutet "Terroir"?', answers:['Summe aller Standortfaktoren','Weinausbau im Holzfass','Alkoholgehalt des Weins','Methode der Weinlese'], correct:0, level:2 },
]

// ─── VOCAB ───────────────────────────────────────────────────────────────────
const VOCAB = [
  { word:'Tannine', emoji:'🍂', def:'Natürliche Gerbstoffe aus Traubenschalen und Kernen. Sie erzeugen das trockene, zusammenziehende Gefühl im Mund — wie schwarzer Tee.', example:'Spürst du, wie dein Gaumen sich anfühlt nach einem kräftigen Rotwein? Das sind die Tannine.', cat:'Sensorik' },
  { word:'Terroir', emoji:'🌍', def:'Alles was einen Weinberg einzigartig macht: Boden, Klima, Hanglage. Zwei Weinberge nebeneinander können völlig verschiedene Weine erzeugen.', example:'Deshalb schmeckt ein Chablis-Chardonnay anders als einer aus der Pfalz.', cat:'Anbau' },
  { word:'Restzucker', emoji:'🍬', def:'Die nach der Gärung verbleibende Zuckermenge im Wein. Trocken: unter 4 g/L. Lieblich: 18–45 g/L. Prägt maßgeblich den Geschmacksstil.', example:'Vinho Verde ist oft lieblich — man schmeckt das leichte Süße.', cat:'Ausbau' },
  { word:'Rebsorte', emoji:'🍇', def:'Die Traubensorte aus der der Wein gemacht wird. Riesling, Grauburgunder, Primitivo, Sauvignon Blanc — jede hat ihren eigenen Charakter.', example:'HAWESKO führt über 50 verschiedene Rebsorten im Sortiment.', cat:'Grundlagen' },
  { word:'Jahrgang', emoji:'📅', def:'Das Jahr der Weinlese. Witterung und Temperatur variieren jedes Jahr — deshalb kann derselbe Wein jahrgangsabhängig sehr unterschiedlich schmecken.', example:'2023 war ein außergewöhnlich guter Jahrgang in Deutschland.', cat:'Grundlagen' },
]

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
const Screen = ({ children, bg, style }) => (
  <div style={{ width:'100%', maxWidth:430, height:'100dvh', maxHeight:900, background: bg||H.white, overflow:'hidden', position:'relative', display:'flex', flexDirection:'column', boxShadow:'0 0 60px rgba(0,0,0,0.15)', ...style }}>
    {children}
  </div>
)

const HAWESKOLogo = ({ dark }) => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
    <div style={{ fontSize:20, fontWeight:700, letterSpacing:'0.08em', color: dark?H.white:H.black, fontFamily:H.body, lineHeight:1 }}>HAWESKO</div>
    <div style={{ fontSize:7.5, letterSpacing:'0.15em', color: dark?'rgba(255,255,255,0.5)':H.grayMid, fontFamily:H.body, textTransform:'uppercase', marginTop:1 }}>JEDER WEIN EIN ERLEBNIS</div>
  </div>
)

const Badge = ({ text, color }) => (
  <span style={{ fontSize:9, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', background: color||H.red, color:H.white, borderRadius:3, padding:'3px 7px', fontFamily:H.body, whiteSpace:'nowrap' }}>{text}</span>
)

const Tag = ({ children }) => (
  <span style={{ fontSize:11, color:H.grayMid, border:`1px solid ${H.grayLine}`, borderRadius:20, padding:'3px 10px', fontFamily:H.body }}>{children}</span>
)

const PrimaryBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ width:'100%', padding:'15px', borderRadius:4, background:H.red, color:H.white, fontSize:14, fontWeight:600, letterSpacing:'0.04em', textTransform:'uppercase', fontFamily:H.body, ...style }}>
    {children}
  </button>
)

const GhostBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ width:'100%', padding:'14px', borderRadius:4, background:'transparent', color:H.black, fontSize:14, fontWeight:500, fontFamily:H.body, border:`1.5px solid ${H.grayLine}`, ...style }}>
    {children}
  </button>
)

const ProgressBar = ({ value, color }) => (
  <div style={{ height:3, background:H.grayLine, borderRadius:2 }}>
    <div style={{ height:'100%', width:`${value}%`, background:color||H.red, borderRadius:2, transition:'width 0.35s ease' }} />
  </div>
)

const PointsPill = ({ pts }) => (
  <div style={{ display:'flex', alignItems:'center', gap:5, background:H.grayBg, borderRadius:20, padding:'5px 12px', border:`1px solid ${H.grayLine}` }}>
    <span style={{ fontSize:13 }}>⭐</span>
    <span style={{ fontSize:12, fontWeight:600, color:H.black, fontFamily:H.body }}>{pts.toLocaleString('de-DE')}</span>
  </div>
)

// ─── SWIPE CARD ──────────────────────────────────────────────────────────────
function SwipeCard({ wine, onSwipe }) {
  const startX = useRef(null)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [gone, setGone] = useState(null)

  const swipe = (dir) => {
    if (gone) return
    setGone(dir)
    setTimeout(() => onSwipe(dir, wine), 320)
  }

  const onTouchStart = e => { startX.current = e.touches[0].clientX; setIsDragging(true) }
  const onTouchMove  = e => { if (startX.current != null) setDragX(e.touches[0].clientX - startX.current) }
  const onTouchEnd   = () => {
    setIsDragging(false)
    if (Math.abs(dragX) > 70) swipe(dragX > 0 ? 'right' : 'left')
    else setDragX(0)
    startX.current = null
  }

  const likeOp  = Math.min(1, Math.max(0, dragX / 80))
  const nopeOp  = Math.min(1, Math.max(0, -dragX / 80))

  const transform = gone === 'left'  ? 'translateX(-130%) rotate(-18deg)' :
                    gone === 'right' ? 'translateX(130%) rotate(18deg)' :
                    `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`

  return (
    <div style={{ position:'relative', userSelect:'none' }}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

      {/* Indicators */}
      <div style={{ position:'absolute', top:20, left:20, zIndex:10, opacity:likeOp, transform:'rotate(-10deg)', pointerEvents:'none' }}>
        <div style={{ border:`2.5px solid ${H.green}`, borderRadius:4, padding:'5px 12px', color:H.green, fontSize:16, fontWeight:700 }}>WILL ICH ✓</div>
      </div>
      <div style={{ position:'absolute', top:20, right:20, zIndex:10, opacity:nopeOp, transform:'rotate(10deg)', pointerEvents:'none' }}>
        <div style={{ border:`2.5px solid ${H.red}`, borderRadius:4, padding:'5px 12px', color:H.red, fontSize:16, fontWeight:700 }}>KENNE ICH ✗</div>
      </div>

      {/* Card */}
      <div style={{ background:wine.bg, borderRadius:8, overflow:'hidden', transform, transition: isDragging?'none':'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)', opacity: gone ? 0 : 1 }}>
        {/* Wine visual area */}
        <div style={{ height:220, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', padding:24 }}>
          <div style={{ fontSize:80 }}>🍾</div>
          <div style={{ position:'absolute', top:12, left:12 }}><Badge text={wine.badge} color={wine.badge==='VEGAN'?H.green:wine.badge==='GOLD MEDAILLE'?H.gold:H.red} /></div>
          <div style={{ position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.15)', borderRadius:3, padding:'3px 8px', fontSize:11, color:'rgba(255,255,255,0.9)', fontFamily:H.body }}>{wine.type}</div>
        </div>

        {/* Wine info */}
        <div style={{ background:H.white, padding:'18px 20px 20px' }}>
          <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body, marginBottom:4 }}>{wine.year} · {wine.region}</div>
          <div style={{ fontSize:17, fontFamily:H.display, fontWeight:600, color:H.black, lineHeight:1.25, marginBottom:6 }}>{wine.name}</div>
          {wine.producer && <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body, marginBottom:10 }}>{wine.producer}</div>}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
            {wine.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
            <span style={{ fontSize:22, fontWeight:700, color:H.red, fontFamily:H.body }}>{wine.price}</span>
            <span style={{ fontSize:12, color:H.grayLight, textDecoration:'line-through', fontFamily:H.body }}>statt {wine.oldPrice}</span>
            <span style={{ fontSize:11, background:'#E8F0F8', color:'#1D4E89', borderRadius:3, padding:'2px 6px', fontFamily:H.body, fontWeight:600 }}>{wine.discount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: WELCOME ─────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <Screen bg={H.white}>
      {/* Top bar */}
      <div style={{ padding:'52px 24px 0', display:'flex', justifyContent:'center' }}>
        <HAWESKOLogo />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 28px 40px' }}>
        {/* Hero */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', animation:'fadeUp 0.5s ease' }}>
          <div style={{ fontSize:11, color:H.red, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:H.body, marginBottom:14 }}>
            Wein. Lernen. Entdecken.
          </div>
          <h1 style={{ fontSize:38, fontFamily:H.display, color:H.black, fontWeight:700, lineHeight:1.15, marginBottom:20 }}>
            Dein persönlicher<br />
            <span style={{ color:H.red }}>Sommelier-Kurs.</span>
          </h1>
          <p style={{ fontSize:15, color:H.grayDark, lineHeight:1.7, fontFamily:H.body, marginBottom:36 }}>
            Finde heraus, was dir schmeckt. Lerne die Sprache des Weins. Entdecke neue Weine passend zu deinem Geschmack.
          </p>

          {/* Feature pills */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:40 }}>
            {[
              { icon:'🧬', text:'Taste DNA — dein persönliches Geschmacksprofil' },
              { icon:'📚', text:'Vokabeln & Wissen — Schritt für Schritt' },
              { icon:'🍾', text:'Neue Weine entdecken — per Swipe' },
            ].map(f => (
              <div key={f.icon} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:H.grayBg, borderRadius:6 }}>
                <span style={{ fontSize:18 }}>{f.icon}</span>
                <span style={{ fontSize:13, color:H.grayDark, fontFamily:H.body }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <PrimaryBtn onClick={onStart}>Jetzt starten</PrimaryBtn>
        <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:H.grayLight, fontFamily:H.body }}>Kostenlos · Kein Account erforderlich</div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: KNOWLEDGE QUIZ ──────────────────────────────────────────────────
function KnowledgeQuizScreen({ onComplete }) {
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const q = QUIZ[idx]
  const progress = ((idx) / QUIZ.length) * 100

  const handleAnswer = (i) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (idx + 1 >= QUIZ.length) {
      const pct = (score + (selected === q.correct ? 1 : 0)) / QUIZ.length
      const level = pct >= 0.7 ? 'kenner' : pct >= 0.4 ? 'entdecker' : 'einsteiger'
      onComplete(level, Math.round(pct * 100))
    } else {
      setIdx(i => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  return (
    <Screen bg={H.white}>
      {/* Header */}
      <div style={{ padding:'52px 24px 0', borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <HAWESKOLogo />
          <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>{idx+1} / {QUIZ.length}</div>
        </div>
        <ProgressBar value={progress} />
        <div style={{ paddingBottom:16, marginTop:12 }}>
          <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body, marginBottom:6 }}>Wissens-Check</div>
          <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body }}>Wir ermitteln deinen Wissensstand</div>
        </div>
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'28px 24px', overflowY:'auto' }}>
        {/* Question */}
        <div style={{ fontSize:20, fontFamily:H.display, color:H.black, fontWeight:600, lineHeight:1.35, marginBottom:28, animation:'fadeUp 0.3s ease' }}>
          {q.q}
        </div>

        {/* Answers */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, flex:1 }}>
          {q.answers.map((ans, i) => {
            const isSelected = selected === i
            const isCorrect  = i === q.correct
            let bg = H.white, border = `1.5px solid ${H.grayLine}`, color = H.black
            if (answered) {
              if (isCorrect)            { bg = '#EAF5EE'; border = `2px solid ${H.green}`; color = H.green }
              else if (isSelected)      { bg = '#FAEAED'; border = `2px solid ${H.red}`;   color = H.red   }
            } else if (isSelected) {
              border = `2px solid ${H.red}`
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{ padding:'15px 18px', borderRadius:6, background:bg, border, color, fontSize:14, fontFamily:H.body, textAlign:'left', cursor:'pointer', transition:'all 0.2s', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span>{ans}</span>
                {answered && isCorrect  && <span>✓</span>}
                {answered && isSelected && !isCorrect && <span>✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <div style={{ marginTop:20, animation:'fadeUp 0.3s ease' }}>
            <div style={{ padding:'12px 16px', background: selected===q.correct?'#EAF5EE':'#FAEAED', borderRadius:6, marginBottom:14, fontSize:13, color: selected===q.correct?H.green:H.red, fontFamily:H.body }}>
              {selected === q.correct ? '✓ Richtig! Gut gemacht.' : `✗ Die richtige Antwort: ${q.answers[q.correct]}`}
            </div>
            <PrimaryBtn onClick={handleNext}>
              {idx + 1 >= QUIZ.length ? 'Auswertung anzeigen' : 'Weiter'}
            </PrimaryBtn>
          </div>
        )}
      </div>
    </Screen>
  )
}

// ─── SCREEN: QUIZ RESULT ─────────────────────────────────────────────────────
function QuizResultScreen({ level, pct, onNext }) {
  const levels = {
    einsteiger: { label:'🍇 Weineinsteiger', desc:'Willkommen in der Welt des Weins! Du startest bei Level 1 mit den Grundlagen.', color:H.green },
    entdecker:  { label:'🍷 Weinentdecker',  desc:'Du weißt schon einiges! Du startest bei Level 2 mit Regionen und Rebsorten.', color:H.gold },
    kenner:     { label:'🎓 Weinkenner',     desc:'Beeindruckend! Du startest direkt bei Level 3 — Vinifikation und Degustation.', color:H.red },
  }
  const l = levels[level]

  return (
    <Screen bg={H.grayBg}>
      <div style={{ padding:'52px 24px 0', display:'flex', justifyContent:'center' }}><HAWESKOLogo /></div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'32px 24px 40px', animation:'fadeUp 0.5s ease' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:11, color:H.grayMid, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body, marginBottom:16 }}>Dein Ergebnis</div>
          {/* Score ring */}
          <div style={{ width:120, height:120, borderRadius:'50%', background:H.white, border:`4px solid ${l.color}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize:32, fontWeight:700, color:l.color, fontFamily:H.body }}>{pct}%</div>
            <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>richtig</div>
          </div>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600, marginBottom:10 }}>{l.label}</div>
          <div style={{ fontSize:14, color:H.grayDark, fontFamily:H.body, lineHeight:1.6, maxWidth:300, margin:'0 auto' }}>{l.desc}</div>
        </div>

        {/* Next step info */}
        <div style={{ background:H.white, borderRadius:8, padding:'18px 20px', marginBottom:24 }}>
          <div style={{ fontSize:12, color:H.red, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:H.body, marginBottom:12 }}>Nächster Schritt</div>
          {[
            { icon:'🧬', text:'Taste DNA ermitteln — welche Weine passen zu dir?' },
            { icon:'📚', text:'Erste Lektion starten — 5 Minuten täglich' },
            { icon:'⭐', text:'+200 Punkte für den Wissens-Check' },
          ].map(f => (
            <div key={f.icon} style={{ display:'flex', gap:10, marginBottom:8, alignItems:'center' }}>
              <span style={{ fontSize:16 }}>{f.icon}</span>
              <span style={{ fontSize:13, color:H.grayDark, fontFamily:H.body }}>{f.text}</span>
            </div>
          ))}
        </div>

        <PrimaryBtn onClick={onNext}>Taste DNA ermitteln</PrimaryBtn>
      </div>
    </Screen>
  )
}

// ─── SCREEN: TASTE DNA ───────────────────────────────────────────────────────
function TasteDNAScreen({ onComplete }) {
  const [idx, setIdx]     = useState(0)
  const [liked, setLiked] = useState([])
  const [gone, setGone]   = useState(false)

  const wine = DISCOVERY_WINES[idx]
  const progress = (idx / DISCOVERY_WINES.length) * 100

  const handleSwipe = (dir) => {
    if (dir === 'right') setLiked(p => [...p, wine])
    setGone(false)
    if (idx + 1 >= DISCOVERY_WINES.length) {
      // Determine DNA
      const types = liked.map(w => w.type)
      const likedR = types.filter(t => t==='Rotwein').length
      const likedW = types.filter(t => t==='Weißwein').length
      const likedRose = types.filter(t => t==='Roséwein').length
      let dna = 'allrounder'
      if (likedR > likedW && likedR > likedRose) dna = 'rotweiner'
      else if (likedW > likedR) dna = 'weissweiner'
      else if (likedRose > likedR) dna = 'rose-fan'
      onComplete(dna, liked)
    } else {
      setIdx(i => i + 1)
    }
  }

  return (
    <Screen bg={H.grayBg}>
      {/* Header */}
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body }}>Taste DNA</div>
            <div style={{ fontSize:17, fontFamily:H.display, color:H.black, fontWeight:600 }}>Was spricht dich an?</div>
          </div>
          <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>{idx+1}/{DISCOVERY_WINES.length}</div>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'16px 20px' }}>
        <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body, textAlign:'center', marginBottom:14 }}>
          ← Swipe oder tippe die Buttons
        </div>

        <div style={{ flex:1 }}>
          <SwipeCard wine={wine} onSwipe={handleSwipe} />
        </div>

        {/* Action buttons */}
        <div style={{ display:'flex', gap:14, marginTop:16 }}>
          <button onClick={() => handleSwipe('left')} style={{ flex:1, padding:'14px', borderRadius:6, background:H.white, border:`1.5px solid ${H.grayLine}`, fontSize:13, color:H.grayDark, fontFamily:H.body, cursor:'pointer' }}>
            ✗ Kenne ich schon
          </button>
          <button onClick={() => handleSwipe('right')} style={{ flex:1, padding:'14px', borderRadius:6, background:H.red, color:H.white, fontSize:13, fontFamily:H.body, fontWeight:600, cursor:'pointer' }}>
            ✓ Interessiert mich
          </button>
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: DNA RESULT ──────────────────────────────────────────────────────
function DNAResultScreen({ dna, liked, onNext }) {
  const profiles = {
    rotweiner:  { label:'Der Rotwein-Liebhaber', emoji:'🍷', desc:'Kräftig, komplex, charakterstark. Du liebst Weine mit Tiefe und Substanz.', recs: DISCOVERY_WINES.filter(w=>w.type==='Rotwein').slice(0,3) },
    weissweiner:{ label:'Der Weißwein-Enthusiast',emoji:'🥂', desc:'Frisch, aromatisch, lebendig. Weine mit Eleganz und mineralischer Spannung.', recs: DISCOVERY_WINES.filter(w=>w.type==='Weißwein').slice(0,3) },
    'rose-fan': { label:'Der Rosé-Fan',           emoji:'🌸', desc:'Verspielt, frisch, unkompliziert. Du liebst Weine die einfach Spaß machen.', recs: DISCOVERY_WINES.filter(w=>w.type==='Roséwein').slice(0,2) },
    allrounder: { label:'Der Allrounder',          emoji:'🍾', desc:'Du bist offen für alles — genau richtig für Entdecker wie dich.', recs: DISCOVERY_WINES.slice(0,3) },
  }
  const p = profiles[dna] || profiles.allrounder

  return (
    <Screen bg={H.grayBg}>
      <div style={{ padding:'52px 24px 0', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <HAWESKOLogo />
        <div style={{ paddingBottom:16, marginTop:16 }}>
          <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body }}>🧬 Deine Wein-DNA</div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px 20px 32px' }}>
        {/* DNA Card */}
        <div style={{ background:H.white, borderRadius:8, padding:'24px 20px', marginBottom:16, borderLeft:`4px solid ${H.red}` }}>
          <div style={{ fontSize:36, marginBottom:12 }}>{p.emoji}</div>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600, marginBottom:8 }}>{p.label}</div>
          <div style={{ fontSize:14, color:H.grayDark, fontFamily:H.body, lineHeight:1.65 }}>{p.desc}</div>
          <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${H.grayLine}` }}>
            <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body }}>Du hast {liked.length} von {DISCOVERY_WINES.length} Weinen gemocht</div>
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ fontSize:13, color:H.black, fontFamily:H.body, fontWeight:600, marginBottom:12 }}>Passend zu dir:</div>
        {p.recs.map(w => (
          <div key={w.id} style={{ background:H.white, borderRadius:8, padding:'14px 16px', marginBottom:10, display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ width:48, height:48, borderRadius:6, background:w.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🍾</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body }}>{w.year} · {w.region}</div>
              <div style={{ fontSize:13, fontFamily:H.display, color:H.black, fontWeight:600, lineHeight:1.3 }}>{w.name}</div>
              <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body, marginTop:3 }}>{w.price}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop:8 }}>
          <PrimaryBtn onClick={onNext}>Zum Lernbereich</PrimaryBtn>
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: HOME ────────────────────────────────────────────────────────────
function HomeScreen({ dna, liked, points, onNav }) {
  return (
    <Screen bg={H.grayBg}>
      {/* Top bar */}
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <HAWESKOLogo />
          <PointsPill pts={points} />
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>
        {/* Greeting */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600 }}>Guten Tag! 👋</div>
          <div style={{ fontSize:13, color:H.grayMid, fontFamily:H.body, marginTop:4 }}>Bereit für deine nächste Lektion?</div>
        </div>

        {/* Daily streak */}
        <div style={{ background:`linear-gradient(135deg, ${H.red}, ${H.redDark})`, borderRadius:8, padding:'18px 20px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:H.body }}>Dein Fortschritt</div>
            <div style={{ fontSize:19, fontFamily:H.display, color:H.white, fontWeight:600, marginTop:2 }}>Level 1 · Weineinsteiger</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:28, color:H.white }}>🔥</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:H.body }}>3 Tage</div>
          </div>
        </div>

        {/* 3 Main Sections */}
        <div style={{ fontSize:12, color:H.grayMid, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:H.body, marginBottom:12 }}>Bereiche</div>

        {[
          { key:'learn',    icon:'📚', title:'Lernen',          sub:'Vokabeln & Wissen',        badge:'+20 ⭐ pro Karte', bg:H.white },
          { key:'discover', icon:'🍾', title:'Neue Weine',      sub:'Entdecken per Swipe',       badge:'Passend zu dir',   bg:H.white },
          { key:'cert',     icon:'🎓', title:'Zertifikate',     sub:'Level 1–3 freischalten',    badge:'1 offen',          bg:H.white },
        ].map(s => (
          <button key={s.key} onClick={() => onNav(s.key)} style={{ width:'100%', background:s.bg, borderRadius:8, padding:'18px 20px', marginBottom:12, border:`1px solid ${H.grayLine}`, display:'flex', alignItems:'center', gap:14, cursor:'pointer', textAlign:'left' }}>
            <div style={{ width:46, height:46, borderRadius:8, background:H.grayBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{s.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontFamily:H.display, color:H.black, fontWeight:600 }}>{s.title}</div>
              <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body, marginTop:2 }}>{s.sub}</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
              <div style={{ fontSize:10, background:'#FFF0E8', color:H.red, borderRadius:3, padding:'2px 7px', fontFamily:H.body, fontWeight:600, whiteSpace:'nowrap' }}>{s.badge}</div>
              <div style={{ fontSize:16, color:H.grayLight }}>›</div>
            </div>
          </button>
        ))}

        {/* Quick shop */}
        <div style={{ fontSize:12, color:H.grayMid, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:H.body, marginBottom:12, marginTop:8 }}>Empfehlungen für dich</div>
        <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8 }}>
          {liked.slice(0,4).map(w => (
            <div key={w.id} style={{ background:H.white, borderRadius:8, padding:'14px', minWidth:140, border:`1px solid ${H.grayLine}`, flexShrink:0 }}>
              <div style={{ width:'100%', height:70, borderRadius:6, background:w.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:10 }}>🍾</div>
              <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>{w.year}</div>
              <div style={{ fontSize:12, fontFamily:H.display, color:H.black, fontWeight:600, lineHeight:1.3, marginBottom:6 }}>{w.name.split(' ').slice(0,3).join(' ')}</div>
              <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body }}>{w.price}</div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: LEARN ───────────────────────────────────────────────────────────
function LearnScreen({ points, onUpdatePoints, onBack }) {
  const [view, setView]       = useState('menu') // menu | flashcard | done
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(null)

  const card = VOCAB[cardIdx]

  if (view === 'done') return (
    <Screen bg={H.grayBg}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 28px', textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
        <div style={{ fontSize:26, fontFamily:H.display, color:H.black, fontWeight:700, marginBottom:10 }}>Lektion abgeschlossen!</div>
        <div style={{ fontSize:14, color:H.grayDark, fontFamily:H.body, lineHeight:1.65, marginBottom:28 }}>Du hast {VOCAB.length} Vokabeln gelernt und {VOCAB.length * 20} Punkte gesammelt.</div>
        <div style={{ background:H.white, border:`1px solid ${H.grayLine}`, borderRadius:8, padding:'18px 28px', marginBottom:32 }}>
          <div style={{ fontSize:28, color:H.red, fontFamily:H.display, fontWeight:700 }}>+{VOCAB.length * 20} ⭐</div>
          <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body, marginTop:4 }}>Weinpunkte verdient</div>
        </div>
        <PrimaryBtn onClick={onBack}>Zurück zum Überblick</PrimaryBtn>
      </div>
    </Screen>
  )

  if (view === 'flashcard') return (
    <Screen bg={H.grayBg}>
      {/* Header */}
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <button onClick={() => { setView('menu'); setCardIdx(0); setFlipped(false); setAnswered(null) }} style={{ fontSize:22, cursor:'pointer', color:H.black }}>‹</button>
          <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>Karte {cardIdx+1} / {VOCAB.length}</div>
          <PointsPill pts={points} />
        </div>
        <ProgressBar value={(cardIdx/VOCAB.length)*100} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'20px' }}>
        {/* Category */}
        <div style={{ marginBottom:14 }}>
          <Badge text={card.cat} color={H.grayDark} />
        </div>

        {/* Flashcard */}
        <div onClick={() => !answered && setFlipped(f => !f)} style={{ flex:1, maxHeight:300, cursor: answered?'default':'pointer', position:'relative', perspective:1000, marginBottom:16 }}>
          {/* Front */}
          <div style={{ position:'absolute', inset:0, background:H.white, border:`1px solid ${H.grayLine}`, borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, textAlign:'center', backfaceVisibility:'hidden', transform: flipped?'rotateY(180deg)':'rotateY(0)', transition:'transform 0.45s ease', boxShadow:'0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize:44, marginBottom:16 }}>{card.emoji}</div>
            <div style={{ fontSize:28, fontFamily:H.display, color:H.black, fontWeight:700, marginBottom:10 }}>{card.word}</div>
            <div style={{ fontSize:13, color:H.grayMid, fontFamily:H.body, border:`1px dashed ${H.grayLine}`, borderRadius:6, padding:'6px 16px', marginTop:8 }}>Tippen zum Aufdecken</div>
          </div>
          {/* Back */}
          <div style={{ position:'absolute', inset:0, background:H.white, border:`1px solid ${H.grayLine}`, borderLeft:`4px solid ${H.red}`, borderRadius:8, display:'flex', flexDirection:'column', justifyContent:'center', padding:24, backfaceVisibility:'hidden', transform: flipped?'rotateY(0)':'rotateY(-180deg)', transition:'transform 0.45s ease', overflowY:'auto', boxShadow:'0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize:11, color:H.red, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:H.body, marginBottom:10 }}>Definition</div>
            <div style={{ fontSize:14, color:H.black, lineHeight:1.7, marginBottom:16, fontFamily:H.body }}>{card.def}</div>
            <div style={{ background:H.grayBg, borderRadius:6, padding:'12px 14px' }}>
              <div style={{ fontSize:10, color:H.grayMid, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5, fontFamily:H.body }}>Beispiel</div>
              <div style={{ fontSize:13, color:H.grayDark, fontStyle:'italic', lineHeight:1.6, fontFamily:H.body }}>{card.example}</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {flipped && !answered && (
          <div style={{ display:'flex', gap:10, animation:'fadeUp 0.25s ease' }}>
            <GhostBtn onClick={() => { setAnswered('wrong') }} style={{ flex:1, color:H.red, borderColor:H.red+'44' }}>✗ Nochmal</GhostBtn>
            <PrimaryBtn onClick={() => { setAnswered('correct'); onUpdatePoints(20) }} style={{ flex:1 }}>✓ Gewusst! +20⭐</PrimaryBtn>
          </div>
        )}
        {answered && (
          <div style={{ animation:'fadeUp 0.25s ease' }}>
            <div style={{ padding:'12px 14px', background: answered==='correct'?'#EAF5EE':'#FAEAED', borderRadius:6, marginBottom:12, fontSize:13, color: answered==='correct'?H.green:H.red, fontFamily:H.body }}>
              {answered==='correct' ? '✓ Super! +20 Weinpunkte' : '✗ Kommt in der nächsten Runde wieder'}
            </div>
            <PrimaryBtn onClick={() => {
              if (cardIdx + 1 >= VOCAB.length) setView('done')
              else { setCardIdx(i=>i+1); setFlipped(false); setAnswered(null) }
            }}>
              {cardIdx+1 >= VOCAB.length ? 'Lektion abschließen 🎉' : 'Nächste Karte →'}
            </PrimaryBtn>
          </div>
        )}
      </div>
    </Screen>
  )

  // Menu
  return (
    <Screen bg={H.grayBg}>
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color:H.black }}>‹</button>
          <HAWESKOLogo />
          <PointsPill pts={points} />
        </div>
        <div style={{ marginTop:16, paddingBottom:4 }}>
          <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body }}>Lernen</div>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600, marginTop:2 }}>Wähle eine Lektion</div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>
        {[
          { id:'vocab', icon:'🔤', title:'Wein-Vokabeln', desc:`${VOCAB.length} Begriffe · Flashcard-System · +${VOCAB.length*20} ⭐`, open:true },
          { id:'regions', icon:'🗺️', title:'Regionen der Welt', desc:'Bordeaux, Pfalz, Toskana & mehr', open:false },
          { id:'grapes', icon:'🍇', title:'Rebsorten', desc:'Riesling, Primitivo, Grauburgunder...', open:false },
          { id:'pairing', icon:'🍽️', title:'Food Pairing', desc:'Welcher Wein zu welchem Gericht?', open:false },
        ].map(l => (
          <button key={l.id} onClick={() => l.open && setView('flashcard')} style={{ width:'100%', background:H.white, borderRadius:8, padding:'18px 20px', marginBottom:12, border:`1px solid ${H.grayLine}`, display:'flex', alignItems:'center', gap:14, cursor: l.open?'pointer':'default', textAlign:'left', opacity: l.open?1:0.5 }}>
            <div style={{ width:46, height:46, borderRadius:8, background:H.grayBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{l.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontFamily:H.display, color:H.black, fontWeight:600 }}>{l.title}</div>
              <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body, marginTop:2 }}>{l.desc}</div>
            </div>
            <div style={{ fontSize:11, background: l.open?'#FFF0E8':'#F5F5F3', color: l.open?H.red:H.grayLight, borderRadius:3, padding:'3px 8px', fontFamily:H.body, fontWeight:600, whiteSpace:'nowrap', flexShrink:0 }}>
              {l.open ? 'Starten' : 'Bald'}
            </div>
          </button>
        ))}
      </div>
    </Screen>
  )
}

// ─── SCREEN: DISCOVER ────────────────────────────────────────────────────────
function DiscoverScreen({ liked, onBack }) {
  const [idx, setIdx]   = useState(0)
  const [cart, setCart] = useState([])
  const [done, setDone] = useState(false)

  const wines = DISCOVERY_WINES
  const wine  = wines[idx]

  const handleSwipe = (dir, w) => {
    if (dir === 'right') setCart(p => [...p, w])
    if (idx + 1 >= wines.length) setDone(true)
    else setIdx(i => i + 1)
  }

  if (done) return (
    <Screen bg={H.grayBg}>
      <div style={{ padding:'52px 24px 0', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color:H.black }}>‹</button>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'24px 20px' }}>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:26, fontFamily:H.display, color:H.black, fontWeight:700, marginBottom:6 }}>Deine Auswahl 🍾</div>
          <div style={{ fontSize:14, color:H.grayMid, fontFamily:H.body }}>Du hast {cart.length} Weine vorgemerkt</div>
        </div>
        {cart.map(w => (
          <div key={w.id} style={{ background:H.white, borderRadius:8, padding:'14px 16px', marginBottom:12, display:'flex', gap:14, alignItems:'center', border:`1px solid ${H.grayLine}` }}>
            <div style={{ width:50, height:50, borderRadius:6, background:w.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>🍾</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body }}>{w.year} · {w.region}</div>
              <div style={{ fontSize:14, fontFamily:H.display, color:H.black, fontWeight:600 }}>{w.name}</div>
              <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body }}>{w.price}</div>
            </div>
          </div>
        ))}
        {cart.length === 0 && <div style={{ textAlign:'center', color:H.grayMid, fontFamily:H.body, padding:40 }}>Kein Wein vorgemerkt</div>}
        <div style={{ marginTop:8 }}>
          <PrimaryBtn onClick={() => alert('→ Weiterleitung zu hawesko.de')}>Im Shop bestellen →</PrimaryBtn>
          <GhostBtn onClick={onBack} style={{ marginTop:10 }}>Zurück</GhostBtn>
        </div>
      </div>
    </Screen>
  )

  return (
    <Screen bg={H.grayBg}>
      {/* Header */}
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color:H.black }}>‹</button>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body }}>Neue Weine</div>
            <div style={{ fontSize:13, fontFamily:H.display, color:H.black, fontWeight:600 }}>Passend zu dir entdecken</div>
          </div>
          <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>{idx+1}/{wines.length}</div>
        </div>
        <ProgressBar value={(idx/wines.length)*100} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'16px 20px' }}>
        <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body, textAlign:'center', marginBottom:12 }}>
          ← Swipe oder tippe · ✓ Interessiert mich &nbsp;|&nbsp; ✗ Kenne ich schon
        </div>
        <div style={{ flex:1 }}>
          <SwipeCard wine={wine} onSwipe={handleSwipe} />
        </div>
        <div style={{ display:'flex', gap:12, marginTop:14 }}>
          <button onClick={() => handleSwipe('left', wine)} style={{ flex:1, padding:'13px', borderRadius:6, background:H.white, border:`1.5px solid ${H.grayLine}`, fontSize:13, color:H.grayDark, fontFamily:H.body, cursor:'pointer' }}>✗ Kenne ich schon</button>
          <button onClick={() => handleSwipe('right', wine)} style={{ flex:1, padding:'13px', borderRadius:6, background:H.red, color:H.white, fontSize:13, fontFamily:H.body, fontWeight:600, cursor:'pointer' }}>✓ Interessiert mich</button>
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: CERTS ───────────────────────────────────────────────────────────
function CertScreen({ onBack }) {
  const certs = [
    { level:1, name:'🍇 Weinliebhaber', desc:'Grundlagen: Rebsorten, trocken/lieblich, Länder', done:true, pts:500 },
    { level:2, name:'🍷 Weinkenner',    desc:'Regionen, Jahrgänge, Food Pairing, Vinifikation', done:false, pts:1000 },
    { level:3, name:'🎓 HAWESKO Sommelier', desc:'Blindverkostung, Etikettenkunde, Degustation', done:false, pts:2000 },
  ]
  return (
    <Screen bg={H.grayBg}>
      <div style={{ padding:'52px 24px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color:H.black }}>‹</button>
          <HAWESKOLogo />
          <div style={{ width:30 }} />
        </div>
        <div style={{ marginTop:16, paddingBottom:4 }}>
          <div style={{ fontSize:11, color:H.red, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:H.body }}>Zertifikate</div>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600, marginTop:2 }}>Dein Lernweg</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>
        {certs.map((c, i) => (
          <div key={c.level} style={{ background:H.white, borderRadius:8, padding:'20px', marginBottom:14, border:`1px solid ${H.grayLine}`, position:'relative', overflow:'hidden', opacity: c.done||i===1?1:0.5 }}>
            {c.done && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:H.green }} />}
            {!c.done && i===1 && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:H.red }} />}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div style={{ fontSize:20, fontFamily:H.display, color:H.black, fontWeight:600 }}>{c.name}</div>
              <Badge text={c.done?'Abgeschlossen':i===1?'Aktiv':'Gesperrt'} color={c.done?H.green:i===1?H.red:H.grayLight} />
            </div>
            <div style={{ fontSize:13, color:H.grayDark, fontFamily:H.body, lineHeight:1.6, marginBottom:12 }}>{c.desc}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>Belohnung: <strong style={{ color:H.gold }}>{c.pts} ⭐</strong></div>
              {i===1 && <button style={{ background:H.red, color:H.white, borderRadius:4, padding:'7px 16px', fontSize:12, fontFamily:H.body, fontWeight:600, cursor:'pointer' }}>Starten</button>}
            </div>
          </div>
        ))}

        {/* Redeem */}
        <div style={{ marginTop:8, background:H.white, borderRadius:8, padding:'18px 20px', border:`1px solid ${H.grayLine}` }}>
          <div style={{ fontSize:15, fontFamily:H.display, color:H.black, fontWeight:600, marginBottom:6 }}>Punkte einlösen</div>
          {[['500 ⭐','€5 Rabatt im Shop'],['1.000 ⭐','Gratis Versand'],['2.500 ⭐','Exklusive Weinprobe']].map(([pts,rew]) => (
            <div key={pts} style={{ display:'flex', justifyContent:'space-between', paddingBottom:8, borderBottom:`1px solid ${H.grayLine}`, marginBottom:8 }}>
              <span style={{ fontSize:13, color:H.grayDark, fontFamily:H.body }}>{pts}</span>
              <span style={{ fontSize:13, color:H.black, fontFamily:H.body, fontWeight:500 }}>{rew}</span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]   = useState('welcome')
  const [level, setLevel]     = useState(null)
  const [pct, setPct]         = useState(0)
  const [dna, setDna]         = useState(null)
  const [liked, setLiked]     = useState([])
  const [points, setPoints]   = useState(200)

  const addPoints = (n) => setPoints(p => p + n)

  return (
    <div style={{ width:'100vw', height:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', background:'#E0DDD8' }}>
      {screen === 'welcome'  && <WelcomeScreen onStart={() => setScreen('quiz')} />}
      {screen === 'quiz'     && <KnowledgeQuizScreen onComplete={(l,p) => { setLevel(l); setPct(p); addPoints(200); setScreen('quiz-result') }} />}
      {screen === 'quiz-result' && <QuizResultScreen level={level} pct={pct} onNext={() => setScreen('dna')} />}
      {screen === 'dna'      && <TasteDNAScreen onComplete={(d,l) => { setDna(d); setLiked(l); setScreen('dna-result') }} />}
      {screen === 'dna-result' && <DNAResultScreen dna={dna} liked={liked} onNext={() => setScreen('home')} />}
      {screen === 'home'     && <HomeScreen dna={dna} liked={liked} points={points} onNav={s => setScreen(s)} />}
      {screen === 'learn'    && <LearnScreen points={points} onUpdatePoints={addPoints} onBack={() => setScreen('home')} />}
      {screen === 'discover' && <DiscoverScreen liked={liked} onBack={() => setScreen('home')} />}
      {screen === 'cert'     && <CertScreen onBack={() => setScreen('home')} />}
    </div>
  )
}
