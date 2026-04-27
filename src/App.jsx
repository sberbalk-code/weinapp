import { useState, useRef, useMemo, useEffect } from 'react'

// ─── CORK CURRENCY IMAGE ──────────────────────────────────────────────────────
const CORK = 'data:image/png;base64,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'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const H = {
  red: '#9B1B30', redDark: '#7A1525',
  black: '#1A1A1A', dark: '#111111',
  grayDark: '#3D3D3D', grayMid: '#6B6B6B',
  grayLight: '#B8B8B8', grayBg: '#F5F5F3', grayLine: '#E8E8E6',
  white: '#FFFFFF', cream: '#FAF7F2',
  gold: '#C4962A', goldLight: '#E8D5A0',
  green: '#2A6B45', blue: '#1D4E89',
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', -apple-system, sans-serif",
}

// ─── CORK COMPONENT ───────────────────────────────────────────────────────────
const CorkCurrency = ({ count, small }) => (
  <div style={{ display:'flex', alignItems:'center', gap: small ? 4 : 6,
    background: 'rgba(196,150,42,0.08)', borderRadius: 20,
    padding: small ? '3px 10px' : '5px 12px',
    border: '1px solid rgba(196,150,42,0.2)' }}>
    <img src={CORK} alt="Korken" style={{ width: small ? 18 : 22, height: small ? 11 : 13, objectFit:'contain' }} />
    <span style={{ fontSize: small ? 12 : 14, fontWeight:600, color: H.gold, fontFamily: H.body, letterSpacing:'0.02em' }}>{count}</span>
  </div>
)

// ─── SHUFFLE ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── WINE DATA (11 real HAWESKO wines) ───────────────────────────────────────
const WINES = [
  { id:1, year:'2025', name:'Bulgarini Lugana', region:'Lugana DOC', producer:'Cantina Bulgarini',
    grape:'Turbiana', style:'trocken · jung & frisch', type:'Weißwein', price:'€ 12,95',
    badge:'SILBER', badgeColor:'#9B9B9B', rating:'4.9', reviews:'10',
    desc:'Pfirsich, Aprikose und weiße Blüten am Gardasee. Leicht, frisch, unverwechselbar.',
    tags:['jung & frisch','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6231095_mainimagevads_1_4036c50c8a0b24c29e68940ea50408e270051cff.webp',
    bg:'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=500&h=800&fit=crop&q=60',
    dna:['weiss','frisch','leicht'] },

  { id:2, year:'N.V.', name:'Krug Grande Cuvée 173ème', region:'Champagne AC', producer:'Maison Krug',
    grape:'Cuvée', style:'brut · komplex & reif', type:'Champagner', price:'€ 248,90',
    badge:'97 JS', badgeColor:H.gold, rating:'–', reviews:'–',
    desc:'150+ Reserveweine aus 13 Jahrgängen. Das ultimative Champagner-Meisterwerk seit 1843.',
    tags:['brut','komplex & reif'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6404681_mainimagevads_1_5112c36a76ddcc82353fd54a7f0505c4416be125.webp',
    bg:'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500&h=800&fit=crop&q=60',
    dna:['champagner','prestige','festlich'] },

  { id:3, year:'2025', name:"Grafenstück Winner's Selection Grauburgunder", region:'Pfalz · Deutschland', producer:'Weingut Metzger',
    grape:'Grauburgunder', style:'trocken · ausdrucksstark & fein', type:'Weißwein',
    price:'€ 7,99', oldPrice:'€ 13,90', discount:'–43%', badge:'GOLD', badgeColor:H.gold,
    rating:'4.8', reviews:'16',
    desc:'Apfel, gelbe Früchte, edle Mineralität. Weingut des Jahres 2026 — exklusiv bei HAWESKO.',
    tags:['ausdrucksstark','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6220294_mainimagevads_1_70587c6f215b0ae2d6194a07e79b87627c6e71ad.webp',
    bg:'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=800&fit=crop&q=60',
    dna:['weiss','mineral','deutschland'] },

  { id:4, year:'2025', name:'Hampton Water', region:'Languedoc AOP · Frankreich', producer:'Gérard Bertrand',
    grape:'Cuvée', style:'trocken · mineralisch & frisch', type:'Roséwein',
    price:'€ 16,90', oldPrice:'€ 18,90', discount:'–11%', badge:'BON JOVI', badgeColor:H.black,
    rating:'4.8', reviews:'5',
    desc:'Rock\'n Roll im Glas. Kollaboration von Jon Bon Jovi & Gérard Bertrand. Erdbeere, Zitrus, Garrigue.',
    tags:['mineralisch','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6444752_mainimagevads_1_b0a25f4f2653f0988baa59ac977bcdc8ebc06af3.webp',
    bg:'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500&h=800&fit=crop&q=60',
    dna:['rose','frisch','frankreich'] },

  { id:5, year:'2024', name:'I Frati Lugana', region:'Lugana DOC · Gardasee', producer:'Cà dei Frati',
    grape:'Turbiana', style:'trocken · jung & frisch', type:'Weißwein',
    price:'€ 14,90', badge:'92 JS', badgeColor:'#8B1A1A',
    rating:'4.8', reviews:'330',
    desc:'Die Lugana-Referenz schlechthin. Blüten, weißes Steinobst, feuchter Kalk. 92 James Suckling.',
    tags:['mineralisch','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6431574_mainimagevads_1_bb0ef7aec28597d155e4a86ac795059aac454559.webp',
    bg:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=800&fit=crop&q=60',
    dna:['weiss','mineral','gardasee'] },

  { id:6, year:'2025', name:'Kaitui Sauvignon Blanc', region:'Pfalz · Deutschland', producer:'Weingut Markus Schneider',
    grape:'Sauvignon Blanc', style:'trocken · aromatisch & frisch', type:'Weißwein',
    price:'€ 14,00', badge:'VEGAN', badgeColor:H.green,
    rating:'4.8', reviews:'120',
    desc:'Cassis, Stachelbeere, Kiwi, Maracuja. Neuseeländischer Stil — aus der Pfalz. Kaitui = Schneider.',
    tags:['aromatisch','trocken','vegan'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6212739_mainimagevads_1_6fdd183ca40b6727279887350d20fd4c08df09c4.webp',
    bg:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=800&fit=crop&q=60',
    dna:['weiss','aromatisch','frisch'] },

  { id:7, year:'2025', name:'Markus Schneider Rosé Saigner', region:'Pfalz · Deutschland', producer:'Weingut Markus Schneider',
    grape:'Cuvée', style:'trocken · würzig & kräftig', type:'Roséwein',
    price:'€ 11,90', badge:'NEU', badgeColor:H.red,
    rating:'4.8', reviews:'41',
    desc:'Saignée-Methode: Saft tropft ab, wird nicht gepresst. Brombeere, Cassis, Himbeere. Expressiv.',
    tags:['würzig','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6426036_mainimagevads_1_d8f41fa0e8c3e53e39d8aeb05d686d722b178a77.webp',
    bg:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=800&fit=crop&q=60',
    dna:['rose','kräftig','deutschland'] },

  { id:8, year:'2025', name:'Miraval Côtes de Provence rosé', region:'Côtes de Provence · Frankreich', producer:'Pitt & Perrin',
    grape:'Cuvée', style:'trocken · mineralisch & elegant', type:'Roséwein',
    price:'€ 19,90', oldPrice:'€ 22,90', discount:'–13%', badge:'IKONE', badgeColor:H.black,
    rating:'4.5', reviews:'139',
    desc:'Brad Pitt & Familie Perrin auf 350m Höhe. Erdbeere, Himbeere, Melone. Kraftvoll und mineralisch.',
    tags:['mineralisch','elegant','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6217133_mainimagevads_1_852e466afe593cac9d56dc644a9c84d5d7045709.webp',
    bg:'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=500&h=800&fit=crop&q=60',
    dna:['rose','mineral','provence'] },

  { id:9, year:'2023', name:'Susana Balbo Crios Torrontés', region:'Mendoza · Argentinien', producer:'Susana Balbo Wines',
    grape:'Torrontés', style:'trocken · aromatisch & blumig', type:'Weißwein',
    price:'€ 13,90', badge:'ARGENTINIEN', badgeColor:H.blue,
    rating:'–', reviews:'–',
    desc:'Maracuja, Ananas, Jasmin, Orangenblüte. Die "Weiße Königin der Anden" — einzigartig aromatisch.',
    tags:['aromatisch','trocken'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6423911_mainimagevads_1_e793643330c9dd220f986ea7d13a56f4d0aff32a.webp',
    bg:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=800&fit=crop&q=60',
    dna:['weiss','aromatisch','argentinien'] },

  { id:10, year:'2022', name:'Susana Balbo Signature Malbec', region:'Mendoza · Argentinien', producer:'Susana Balbo Wines',
    grape:'Malbec', style:'trocken · samtig & üppig', type:'Rotwein',
    price:'€ 29,90', badge:'PREMIUM', badgeColor:H.grayDark,
    rating:'5.0', reviews:'1',
    desc:'Tiefviolett. Schwarze Kirsche, Brombeere, Blaubeere. 94% Malbec, 6% Cabernet Franc. Lagerpotential 2032.',
    tags:['samtig','trocken','üppig'],
    img:'https://media.hawesko.de/pdmainhawesko_webp/hawesko_6504469_mainimagevads_1_852e466afe593cac9d56dc644a9c84d5d7045709.webp',
    bg:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&h=800&fit=crop&q=60',
    dna:['rot','samtig','argentinien'] },

  { id:11, year:'2024', name:'Un Giorno a Capri', region:'Campania IGT · Italien', producer:'Feudi di San Gregorio',
    grape:'Greco di Tufo', style:'trocken · fruchtig & aromatisch', type:'Weißwein',
    price:'€ 12,90', oldPrice:'€ 18,90', discount:'–32%', badge:'–32%', badgeColor:H.red,
    rating:'4.3', reviews:'27',
    desc:'Das azurblaue Capri im Glas. Verspielt, frisch, fruchtig. Gelbes Steinobst, Kräuter, Vanille.',
    tags:['fruchtig','trocken'],
    img:'https://media.hawesko.de/zoom_90/hawesko_6220294_mainimagevads_1_70587c6f215b0ae2d6194a07e79b87627c6e71ad.jpg',
    bg:'https://images.unsplash.com/photo-1533104816931-20fa896c6c3b?w=500&h=800&fit=crop&q=60',
    dna:['weiss','frisch','italien'] },
]

// ─── QUIZ DATA (with shuffled answers in component) ───────────────────────────
const QUIZ_RAW = [
  { q:'Was ist die bekannteste Rebsorte Deutschlands?', correct:'Riesling', wrong:['Grauburgunder','Malbec','Torrontés'] },
  { q:'Was bedeutet "trocken" auf einem Weinetikett?', correct:'Wenig Restzucker (unter 4 g/L)', wrong:['Sehr alkoholreich','Lange Reifezeit','Ohne Kohlensäure'] },
  { q:'Woher kommt der Malbec ursprünglich?', correct:'Frankreich — heute Argentiniens Star', wrong:['Spanien','Portugal','Italien'] },
  { q:'Was ist "Turbiana" — die Rebsorte des Lugana?', correct:'Eine autochthone Traube vom Gardasee', wrong:['Eine Champagnensorte','Ein Rosé aus der Provence','Eine Torrontés-Variante'] },
  { q:'Was bedeutet "Saignée" in der Weinherstellung?', correct:'Saft tropft ohne Pressung ab', wrong:['Zweite Gärung in der Flasche','Mischung von Rot- und Weißwein','Lange Mazerationszeit'] },
  { q:'Welches Anbaugebiet liegt am Gardasee?', correct:'Lugana', wrong:['Champagne','Pfalz','Mendoza'] },
  { q:'Was bedeutet "AOC" bzw. "AOP" auf einer Flasche?', correct:'Geschützte Herkunftsbezeichnung', wrong:['Alkohol ohne Prozentangabe','Alter ohne Charakterangabe','Ausbau ohne Prägung'] },
  { q:'Welche Rebsorte steckt im Miraval Rosé?', correct:'Cinsault, Grenache, Rolle & Syrah', wrong:['Nur Pinot Noir','Malbec & Merlot','Riesling & Chardonnay'] },
]

// ─── VOCABULARY (35 cards) ────────────────────────────────────────────────────
const VOCAB_RAW = [
  // GRUNDLAGEN
  { word:'Tannine', cat:'Sensorik', level:1, def:'Natürliche Gerbstoffe aus Traubenschalen und Kernen. Sie erzeugen das trockene, zusammenziehende Gefühl im Mund — wie schwarzer Tee ohne Milch.', example:'Spüre wie sich der Gaumen nach einem kräftigen Rotwein anfühlt. Das sind die Tannine.' },
  { word:'Terroir', cat:'Anbau', level:1, def:'Die Gesamtheit aller Standortfaktoren: Boden, Klima, Hanglage, Exposition. Zwei Weinberge nebeneinander können durch ihr Terroir völlig verschiedene Weine erzeugen.', example:'Deshalb schmeckt ein Chablis anders als ein Maconnais — beide sind Chardonnay.' },
  { word:'Restzucker', cat:'Grundlagen', level:1, def:'Die nach der Gärung verbleibende Zuckermenge im Wein. Trocken: unter 4 g/L · Halbtrocken: 4–18 g/L · Lieblich: 18–45 g/L · Süß: über 45 g/L.', example:'Vinho Verde ist oft lieblich — man schmeckt die leichte Süße.' },
  { word:'Rebsorte', cat:'Grundlagen', level:1, def:'Die Traubensorte, aus der der Wein gemacht wird. Riesling, Grauburgunder, Turbiana, Malbec — jede hat ihren unverwechselbaren Charakter und ihre idealen Anbauregionen.', example:'Hawesko führt über 50 verschiedene Rebsorten im Sortiment.' },
  { word:'Jahrgang', cat:'Grundlagen', level:1, def:'Das Jahr der Weinlese. Witterung und Temperaturen variieren jährlich — deshalb kann derselbe Wein jahrgangsabhängig sehr unterschiedlich schmecken und reifen.', example:'2023 war ein außergewöhnlicher Jahrgang in Deutschland.' },
  { word:'Trocken', cat:'Grundlagen', level:1, def:'Weniger als 4 g Restzucker pro Liter. Der Wein schmeckt nicht süß — die Hefen haben den Traubenzucker vollständig in Alkohol umgewandelt.', example:'Der Krug Grande Cuvée ist brut — noch trockener als trocken.' },
  { word:'Weißwein', cat:'Grundlagen', level:1, def:'Aus hellen oder blauen Trauben hergestellt, wobei die Schalen sofort entfernt werden. Dadurch bleibt die Farbe hellgelb bis goldfarben, Gerbstoffe sind kaum vorhanden.', example:'Grauburgunder, Riesling und Turbiana sind bekannte Weißweinrebsorten.' },
  { word:'Rotwein', cat:'Grundlagen', level:1, def:'Der Saft gärt zusammen mit den roten Traubenschalen und Kernen. So gelangen Farbe, Tannine und Aromen in den Wein — das Maischen bestimmt den Charakter.', example:'Malbec aus Mendoza reift bis zu 10 Jahre im Keller.' },
  { word:'Roséwein', cat:'Grundlagen', level:1, def:'Kurzer Schalenkontakt mit roten Trauben gibt die zartrosa Farbe. Oder Saignée: Der Saft wird früh abgezogen — kräftiger, intensiver in Farbe und Aroma.', example:'Der Miraval nutzt die Saignée-Methode für seinen tiefrosa Farbton.' },
  { word:'Schaumwein', cat:'Grundlagen', level:1, def:'Enthält Kohlensäure durch eine zweite Gärung. Im Tank (Charmat) oder in der Flasche (Méthode Champenoise). Champagner, Prosecco, Sekt und Crémant sind die bekanntesten Vertreter.', example:'Krug reift mindestens 6 Jahre in der Flasche vor dem Verkauf.' },
  // SENSORIK
  { word:'Mineralität', cat:'Sensorik', level:2, def:'Ein Sinneseindruck von Kreide, Feuerstein, Schiefer oder nassem Stein im Wein. Entsteht durch bestimmte Böden, kühles Klima und präzise Vinifikation — nicht durch Mineralsalze.', example:'Der I Frati Lugana lebt von seiner lebendigen Mineralität.' },
  { word:'Säure', cat:'Sensorik', level:1, def:'Natürlicher Bestandteil jedes Weins. Hohe Säure macht den Mund wässrig, sorgt für Frische und Langlebigkeit. Zu wenig Säure wirkt flach — zu viel aggressiv.', example:'Riesling aus der Mosel hat eine kühle, elegante Säurestruktur.' },
  { word:'Abgang', cat:'Sensorik', level:2, def:'Der Nachgeschmack nach dem Schlucken. Ein langer Abgang gilt als Qualitätsmerkmal — je länger die Aromen anhalten, desto komplexer der Wein.', example:'Ein großer Burgunder hat einen Abgang von 60 Sekunden und mehr.' },
  { word:'Bouquet', cat:'Sensorik', level:2, def:'Das Geruchsspektrum eines gereiften Weins. Unterschied zum Aroma: Bouquet entsteht durch Reifung — es riecht nach Leder, Tabak, Trüffel, Honig statt nach frischer Frucht.', example:'Ein alter Barolo entwickelt ein komplexes Bouquet aus Rosen und Teer.' },
  { word:'Körper', cat:'Sensorik', level:2, def:'Das Gewicht und die Fülle des Weins im Mund. Leichter Körper: wie Wasser. Voller Körper: wie Vollmilch. Bestimmt durch Alkohol, Zucker, Glycerin und Extrakt.', example:'Susana Balbo Malbec ist ein Wein mit sehr vollem Körper.' },
  // AUSBAU
  { word:'Vinifikation', cat:'Ausbau', level:2, def:'Der gesamte Prozess der Weinherstellung — von der Ernte bis zur Flasche. Maischen, Vergären, Keltern, Ausbau, Abfüllung. Jede Entscheidung des Winzers prägt den finalen Wein.', example:'Ob Stahltank oder Barrique — das ist eine Entscheidung der Vinifikation.' },
  { word:'Barriquefass', cat:'Ausbau', level:2, def:'Kleines Eichenfass mit 225 Litern Inhalt. Der Wein nimmt Vanille, Röst- und Kokosnussaromen auf. Gleichzeitig oxidiert er sanft und wird runder, weicher in der Textur.', example:'Viele Bordeaux-Weine reifen 18–24 Monate im Barriquefass.' },
  { word:'Elevage', cat:'Ausbau', level:2, def:'Der Ausbau des Weins nach der Gärung — in Holzfässern, Stahltanks oder Betoneiern. Dauer und Material entscheiden über Stil und Charakter des fertigen Weins.', example:'Krug lagert durchschnittlich 6–7 Jahre im Keller bevor er verkauft wird.' },
  { word:'Malolaktische Gärung', cat:'Ausbau', level:3, def:'Biologischer Säureabbau durch Milchsäurebakterien. Harte Apfelsäure wird in weichere Milchsäure umgewandelt. Macht den Wein runder, butteriger — typisch für Chardonnay.', example:'Viele Weißburgunder durchlaufen eine vollständige Malolaktik.' },
  { word:'Dekantieren', cat:'Ausbau', level:2, def:'Langsames Umfüllen eines Weins in eine Karaffe. Doppelter Zweck: Weinstein und Sediment abtrennen — und dem Wein durch Sauerstoffkontakt die Möglichkeit geben, sich zu öffnen.', example:'Ein junger Malbec sollte mindestens 30 Minuten dekantiert werden.' },
  { word:'Mazerieren', cat:'Ausbau', level:3, def:'Kontakt zwischen Saft und Traubenschalen während oder nach der Gärung. Je länger die Mazerationszeit, desto mehr Farbe, Tannine und Aromen gehen in den Wein über.', example:'Orange Wine entsteht durch wochenlange Mazerierung von Weißweintrauben.' },
  { word:'Flaschengärung', cat:'Ausbau', level:3, def:'Zweite Gärung direkt in der Flasche. Kohlensäure kann nicht entweichen und löst sich im Wein. Typisch für Champagner, Crémant und Sekt — sorgt für feinperlige Mousse.', example:'Krug verwendet ausschließlich die traditionelle Flaschengärung.' },
  { word:'Cuvée', cat:'Ausbau', level:2, def:'Mischung aus verschiedenen Rebsorten, Jahrgängen oder Weinbergen. Ziel: eine Komplexität und Gleichmäßigkeit zu erreichen, die eine einzelne Sorte allein nicht leisten kann.', example:'Krug Grande Cuvée besteht aus über 150 verschiedenen Weinen.' },
  // ANBAU
  { word:'Biodynamisch', cat:'Anbau', level:2, def:'Weinbauphilosophie nach Rudolf Steiner. Der Weinberg als lebendiges Ökosystem — kein synthetischer Dünger, kein Pestizid. Kräuterpräparate und Mondkalender bestimmen den Rhythmus.', example:'Miraval bewirtschaftet seine Hänge in der Provence biodynamisch.' },
  { word:'Grand Cru', cat:'Anbau', level:3, def:'Höchste Klassifikationsstufe für Weinberge und Weine — hauptsächlich in Bordeaux und Burgund. Streng kontrollierte Qualitätsstufe mit strengen Ertragsmengen und Anforderungen.', example:'Château Margaux ist ein Premier Grand Cru Classé.' },
  { word:'AOC / AOP', cat:'Anbau', level:2, def:'Appellation d\'Origine Contrôlée / Protégée. Geschützte Herkunftsbezeichnung — regelt Anbaugebiet, erlaubte Rebsorten, Mindestalkohol, Hektarerträge und Vinifikation.', example:'Côtes de Provence AOP steht auf dem Miraval-Etikett.' },
  { word:'DOC / DOCG', cat:'Anbau', level:2, def:'Denominazione di Origine Controllata (e Garantita). Das italienische System der Herkunftskontrolle. DOCG ist die höchste Stufe — strenger als DOC, auch sensorisch geprüft.', example:'Lugana DOC schützt den Namen für Turbiana-Weine vom Gardasee.' },
  { word:'Phylloxera', cat:'Anbau', level:3, def:'Reblaus — winziges Insekt das Anfang des 20. Jahrhunderts fast den gesamten europäischen Weinbau vernichtete. Gerettet durch Pfropfung auf resistente amerikanische Unterlagen.', example:'Seither werden fast alle Reben auf amerikanische Wurzeln gepfropft.' },
  { word:'Ertragsbegrenzung', cat:'Anbau', level:3, def:'Bewusste Reduzierung der Traubenmenge pro Weinbergseinheit. Weniger Trauben bedeuten mehr Konzentration im einzelnen Beeren — Qualität statt Quantität.', example:'Grand Cru Lagen haben oft Erträge von unter 30 hl/ha.' },
  // EXPERTEN
  { word:'Saignée', cat:'Experten', level:3, def:'Rosé-Herstellungsmethode: Saft wird ohne Pressen aus der Maische abgezogen — "abgeblutet". Intensivere Farbe und mehr Aromen als beim einfachen Abpressen der Schalen.', example:'Markus Schneiders Rosé Saigner nutzt exklusiv diese Methode.' },
  { word:'Botrytis', cat:'Experten', level:3, def:'Edelfäule — ein Pilz der unter bestimmten Bedingungen Trauben befällt und Wasser entzieht. Konzentriert Zucker und Aromen für große Süßweine wie Sauternes oder Trockenbeerenauslese.', example:'Eiswein entsteht OHNE Botrytis — durch Frost statt Pilz.' },
  { word:'Brettanomyces', cat:'Experten', level:3, def:'Hefestamm der Phenolverbindungen produziert — riecht nach Pferdestall, Leder, Schweiß. Von manchen als Weinfehler betrachtet, von anderen als Terroir-Ausdruck geschätzt. "Brett" ist kontrovers.', example:'Bestimmte Rioja-Weine entwickeln absichtlich ein Brett-Profil.' },
  { word:'Assemblage', cat:'Experten', level:3, def:'Die Kunst des Zusammenstellens verschiedener Weine zur finalen Cuvée. Champagnerhäuser wie Krug assemblieren aus Hunderten Einzelweinen — Erfahrung und Sensorik entscheiden.', example:'Die Assemblage bei Krug dauert mehrere Wochen intensiver Verkostung.' },
  { word:'Oxidation', cat:'Experten', level:3, def:'Reaktion des Weins mit Sauerstoff. Kontrolliert erwünscht (Barriquereifung). Unkontrolliert ein Weinfehler: Wein riecht nach Essig, Klebstoff, Manzanilla. Schutz durch Schwefel.', example:'Ein offener Wein oxidiert innerhalb von 2–3 Tagen sichtbar.' },
  { word:'Chapitalisierung', cat:'Experten', level:3, def:'Zucker wird vor oder während der Gärung zugesetzt — nicht um den Wein zu süßen, sondern um mehr Alkohol zu produzieren. In kühlen Jahrgängen und Regionen erlaubt, im Süden verboten.', example:'In der Champagne ist Chapitalisierung unter strengen Bedingungen erlaubt.' },
]

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Screen = ({ children, bg, style }) => (
  <div style={{ width:'100%', maxWidth:430, height:'100dvh', maxHeight:900,
    background: bg || H.white, overflow:'hidden', position:'relative',
    display:'flex', flexDirection:'column',
    boxShadow: '0 0 80px rgba(0,0,0,0.2)', ...style }}>
    {children}
  </div>
)

const Logo = ({ inverted }) => (
  <div>
    <div style={{ fontSize:18, fontWeight:700, letterSpacing:'0.1em',
      color: inverted ? H.white : H.black, fontFamily:H.body, lineHeight:1 }}>HAWESKO</div>
    <div style={{ fontSize:7, letterSpacing:'0.18em', color: inverted ? 'rgba(255,255,255,0.45)' : H.grayLight,
      fontFamily:H.body, textTransform:'uppercase', marginTop:1 }}>JEDER WEIN EIN ERLEBNIS</div>
  </div>
)

const TopBar = ({ right, inverted, onBack }) => (
  <div style={{ padding:'52px 22px 14px', display:'flex', justifyContent:'space-between',
    alignItems:'center', background: inverted ? 'transparent' : H.white,
    borderBottom: inverted ? 'none' : `1px solid ${H.grayLine}`,
    position: inverted ? 'absolute' : 'relative', top:0, left:0, right:0, zIndex:10 }}>
    {onBack
      ? <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color: inverted?H.white:H.black, background:'none', border:'none', lineHeight:1, padding:0 }}>‹</button>
      : <Logo inverted={inverted} />}
    {right}
  </div>
)

const ProgressBar = ({ value, color }) => (
  <div style={{ height:2, background: H.grayLine, borderRadius:2, margin:'0 22px' }}>
    <div style={{ height:'100%', width:`${Math.min(100,value)}%`, background:color||H.red,
      borderRadius:2, transition:'width 0.35s ease' }} />
  </div>
)

const Badge = ({ text, color, small }) => (
  <span style={{ fontSize: small?8:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
    background: color||H.red, color:H.white, borderRadius:2, padding: small?'2px 5px':'3px 7px',
    fontFamily:H.body, whiteSpace:'nowrap' }}>{text}</span>
)

const Tag = ({ children }) => (
  <span style={{ fontSize:11, color:H.grayMid, border:`1px solid ${H.grayLine}`,
    borderRadius:20, padding:'3px 10px', fontFamily:H.body }}>{children}</span>
)

const PrimaryBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ width:'100%', padding:'15px', borderRadius:3,
    background:H.red, color:H.white, fontSize:13, fontWeight:600,
    letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:H.body,
    border:'none', cursor:'pointer', ...style }}>
    {children}
  </button>
)

const GhostBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ width:'100%', padding:'14px', borderRadius:3,
    background:'transparent', color:H.grayDark, fontSize:13, fontWeight:500,
    fontFamily:H.body, border:`1.5px solid ${H.grayLine}`, cursor:'pointer', ...style }}>
    {children}
  </button>
)

const CatLabel = ({ cat }) => {
  const colors = {
    'Grundlagen': { bg:'#F0EAE0', color:'#7A5C3A' },
    'Sensorik':   { bg:'#F5EAE8', color:'#8B2035' },
    'Ausbau':     { bg:'#E8EDF5', color:'#1D4E89' },
    'Anbau':      { bg:'#E8F0EB', color:'#2A6B45' },
    'Experten':   { bg:'#F5F0E0', color:'#8B6914' },
  }
  const c = colors[cat] || colors['Grundlagen']
  return <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
    background:c.bg, color:c.color, borderRadius:2, padding:'3px 8px', fontFamily:H.body }}>{cat}</span>
}

// ─── SCREEN: WELCOME ─────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <Screen bg={H.cream}>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(160deg, rgba(155,27,48,0.04) 0%, transparent 50%)`, pointerEvents:'none' }} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'52px 28px 40px' }}>
        <Logo />
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', animation:'fadeUp 0.6s ease' }}>
          <div style={{ width:40, height:1, background:H.red, marginBottom:28 }} />
          <h1 style={{ fontFamily:H.display, fontSize:36, color:H.black, fontWeight:700, lineHeight:1.15, marginBottom:20, letterSpacing:'-0.01em' }}>
            Entdecke die<br />
            <span style={{ color:H.red }}>Welt des Weins.</span>
          </h1>
          <p style={{ fontSize:15, color:H.grayMid, lineHeight:1.75, fontFamily:H.body, marginBottom:48, maxWidth:300 }}>
            Finde deinen Geschmack. Lerne die Sprache des Weins. Verdiene Korken.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:48 }}>
            {[
              { icon:'◆', text:'Taste DNA — dein persönliches Geschmacksprofil' },
              { icon:'◆', text:'35 Wein-Vokabeln — Schritt für Schritt' },
              { icon:'◆', text:'Neue Weine entdecken — per Swipe' },
              { icon:'◆', text:'Korken sammeln & einlösen bei HAWESKO' },
            ].map(f => (
              <div key={f.text} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 16px',
                background:H.white, borderRadius:4, border:`1px solid ${H.grayLine}` }}>
                <span style={{ fontSize:8, color:H.red }}>◆</span>
                <span style={{ fontSize:13, color:H.grayDark, fontFamily:H.body }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <PrimaryBtn onClick={onStart}>Jetzt starten</PrimaryBtn>
          <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:H.grayLight, fontFamily:H.body }}>
            Kostenlos · Kein Account erforderlich
          </div>
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: QUIZ ─────────────────────────────────────────────────────────────
function QuizScreen({ onComplete }) {
  const questions = useMemo(() => shuffle(QUIZ_RAW).slice(0,6).map(q => {
    const opts = shuffle([q.correct, ...q.wrong])
    return { ...q, opts, correctIdx: opts.indexOf(q.correct) }
  }), [])

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  const q = questions[idx]
  const answered = selected !== null

  const handleAnswer = i => {
    if (answered) return
    setSelected(i)
    if (i === q.correctIdx) setScore(s => s + 1)
  }

  const handleNext = () => {
    const nextScore = score + (selected === q.correctIdx ? 1 : 0)
    if (idx + 1 >= questions.length) {
      const pct = Math.round((nextScore / questions.length) * 100)
      const level = pct >= 70 ? 'kenner' : pct >= 40 ? 'entdecker' : 'einsteiger'
      onComplete(level, pct)
    } else {
      setIdx(i => i + 1); setSelected(null)
    }
  }

  return (
    <Screen>
      <TopBar right={<div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>{idx+1} / {questions.length}</div>} />
      <div style={{ padding:'0 22px 6px' }}><ProgressBar value={(idx/questions.length)*100} /></div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'20px 22px', overflowY:'auto' }}>
        <div style={{ fontSize:10, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body, marginBottom:16 }}>
          Wissens · Check
        </div>
        <div style={{ fontFamily:H.display, fontSize:21, color:H.black, fontWeight:600, lineHeight:1.35, marginBottom:28, animation:'fadeUp 0.3s ease' }}>
          {q.q}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10, flex:1 }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correctIdx
            const isSelected = selected === i
            let bg = H.white, border = `1.5px solid ${H.grayLine}`, color = H.black, icon = null
            if (answered) {
              if (isCorrect) { bg='#EBF5EE'; border=`2px solid ${H.green}`; color=H.green; icon='✓' }
              else if (isSelected) { bg='#F5EAEC'; border=`2px solid ${H.red}`; color=H.red; icon='✗' }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{ padding:'15px 18px', borderRadius:4,
                background:bg, border, color, fontSize:13, fontFamily:H.body, textAlign:'left',
                cursor: answered?'default':'pointer', transition:'all 0.2s',
                display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span>{opt}</span>
                {icon && <span style={{ fontWeight:700, fontSize:14 }}>{icon}</span>}
              </button>
            )
          })}
        </div>
        {answered && (
          <div style={{ marginTop:16, animation:'fadeUp 0.25s ease' }}>
            <div style={{ padding:'12px 16px', background: selected===q.correctIdx?'#EBF5EE':'#F5EAEC',
              borderRadius:4, marginBottom:12, fontSize:13,
              color: selected===q.correctIdx?H.green:H.red, fontFamily:H.body }}>
              {selected===q.correctIdx
                ? `Richtig. +3 Korken`
                : `Die richtige Antwort: ${q.opts[q.correctIdx]}`}
            </div>
            <PrimaryBtn onClick={handleNext}>
              {idx+1>=questions.length ? 'Auswertung' : 'Weiter'}
            </PrimaryBtn>
          </div>
        )}
      </div>
    </Screen>
  )
}

// ─── SCREEN: QUIZ RESULT ──────────────────────────────────────────────────────
function QuizResultScreen({ level, pct, corks, onNext }) {
  const levels = {
    einsteiger: { label:'Weineinsteiger', desc:'Willkommen in der Welt des Weins. Du startest mit den Grundlagen und wirst schnell Fortschritte machen.', col:H.green },
    entdecker:  { label:'Weinentdecker',  desc:'Du weißt schon einiges. Du startest bei Regionen und Rebsorten und kannst das meiste überspringen.', col:H.gold },
    kenner:     { label:'Weinkenner',     desc:'Beeindruckend. Du startest direkt bei Vinifikation und Degustation — für echte Connaisseures.', col:H.red },
  }
  const l = levels[level]
  return (
    <Screen bg={H.cream}>
      <TopBar right={<CorkCurrency count={corks} small />} />
      <div style={{ flex:1, overflowY:'auto', padding:'28px 24px 40px' }}>
        <div style={{ textAlign:'center', marginBottom:32, animation:'popIn 0.5s ease' }}>
          <div style={{ fontSize:10, color:H.grayMid, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body, marginBottom:24 }}>Dein Ergebnis</div>
          <div style={{ width:110, height:110, borderRadius:'50%', background:H.white,
            border:`3px solid ${l.col}`, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', margin:'0 auto 24px',
            boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize:32, fontWeight:700, color:l.col, fontFamily:H.display, lineHeight:1 }}>{pct}%</div>
            <div style={{ fontSize:9, color:H.grayLight, fontFamily:H.body, marginTop:3, letterSpacing:'0.1em' }}>RICHTIG</div>
          </div>
          <div style={{ fontSize:22, fontFamily:H.display, color:H.black, fontWeight:600, marginBottom:10 }}>
            {l.label}
          </div>
          <div style={{ fontSize:14, color:H.grayMid, fontFamily:H.body, lineHeight:1.7, maxWidth:280, margin:'0 auto' }}>
            {l.desc}
          </div>
        </div>
        <div style={{ background:H.white, borderRadius:4, padding:'18px 20px', marginBottom:24,
          border:`1px solid ${H.grayLine}` }}>
          <div style={{ fontSize:10, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase',
            fontFamily:H.body, marginBottom:14 }}>Nächste Schritte</div>
          {[
            'Taste DNA ermitteln — welche Weine passen zu dir?',
            'Erste Lektionen freischalten',
            `+${corks} Korken für den Wissens-Check erhalten`,
          ].map((t, i) => (
            <div key={i} style={{ display:'flex', gap:12, marginBottom:i<2?10:0, alignItems:'flex-start' }}>
              <span style={{ fontSize:8, color:H.red, marginTop:4 }}>◆</span>
              <span style={{ fontSize:13, color:H.grayDark, fontFamily:H.body }}>{t}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn onClick={onNext}>Taste DNA ermitteln</PrimaryBtn>
      </div>
    </Screen>
  )
}

// ─── SWIPE CARD (Full-screen, three-way) ──────────────────────────────────────
function DNASwipeCard({ wine, onSwipe }) {
  const startX = useRef(null), startY = useRef(null)
  const [drag, setDrag] = useState({ x:0, y:0 })
  const [gone, setGone] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const doSwipe = dir => {
    if (gone) return
    setGone(dir)
    setTimeout(() => onSwipe(dir, wine), 350)
  }

  const onTouchStart = e => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }
  const onTouchMove = e => {
    if (!startX.current) return
    setDrag({ x: e.touches[0].clientX - startX.current, y: e.touches[0].clientY - startY.current })
  }
  const onTouchEnd = () => {
    setIsDragging(false)
    const { x, y } = drag
    if (y < -90 && Math.abs(x) < 80) doSwipe('super')
    else if (x > 80) doSwipe('right')
    else if (x < -80) doSwipe('left')
    else setDrag({ x:0, y:0 })
    startX.current = null; startY.current = null
  }

  const likeOp   = Math.min(1, Math.max(0, drag.x / 80))
  const nopeOp   = Math.min(1, Math.max(0, -drag.x / 80))
  const superOp  = Math.min(1, Math.max(0, -drag.y / 80))

  const transform = gone==='left'  ? 'translateX(-130%) rotate(-18deg)' :
                    gone==='right' ? 'translateX(130%) rotate(18deg)' :
                    gone==='super' ? 'translateY(-130%) rotate(5deg)' :
                    `translateX(${drag.x}px) translateY(${Math.min(0, drag.y)}px) rotate(${drag.x * 0.04}deg)`

  return (
    <div style={{ position:'relative', borderRadius:8, overflow:'hidden', width:'100%',
      aspectRatio:'9/14', boxShadow:'0 20px 60px rgba(0,0,0,0.3)',
      transform, transition: isDragging?'none':'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      opacity: gone?0:1 }}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

      {/* Background from Unsplash */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <img src={wine.bg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover',
          filter:'blur(8px) brightness(0.7)', transform:'scale(1.1)' }}
          onError={e => { e.target.style.display='none' }} />
      </div>

      {/* Swipe indicators */}
      <div style={{ position:'absolute', top:24, left:20, zIndex:20, opacity:likeOp,
        transform:'rotate(-10deg)', pointerEvents:'none', transition:'opacity 0.1s' }}>
        <div style={{ border:`2.5px solid ${H.green}`, borderRadius:3, padding:'6px 14px',
          color:H.green, fontSize:14, fontWeight:700, background:'rgba(255,255,255,0.9)',
          fontFamily:H.body, letterSpacing:'0.08em' }}>MAG ICH</div>
      </div>
      <div style={{ position:'absolute', top:24, right:20, zIndex:20, opacity:nopeOp,
        transform:'rotate(10deg)', pointerEvents:'none' }}>
        <div style={{ border:`2.5px solid ${H.red}`, borderRadius:3, padding:'6px 14px',
          color:H.red, fontSize:14, fontWeight:700, background:'rgba(255,255,255,0.9)',
          fontFamily:H.body, letterSpacing:'0.08em' }}>NEIN</div>
      </div>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(-50%, -50%)`,
        zIndex:20, opacity:superOp, pointerEvents:'none' }}>
        <div style={{ border:`2.5px solid ${H.gold}`, borderRadius:3, padding:'8px 18px',
          color:H.gold, fontSize:14, fontWeight:700, background:'rgba(255,255,255,0.95)',
          fontFamily:H.body, letterSpacing:'0.08em', textAlign:'center' }}>
          ★ SEHR GERNE
        </div>
      </div>

      {/* Wine bottle — centered */}
      <div style={{ position:'absolute', inset:0, zIndex:5,
        display:'flex', alignItems:'center', justifyContent:'center', paddingBottom:120 }}>
        <img src={wine.img} alt={wine.name}
          style={{ maxHeight:'68%', maxWidth:'55%', objectFit:'contain',
            filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.6))' }}
          onError={e => { e.target.style.display='none' }} />
      </div>

      {/* Info overlay */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:10,
        background:'linear-gradient(to top, rgba(10,5,8,0.98) 0%, rgba(10,5,8,0.9) 60%, transparent 100%)',
        padding:'40px 20px 20px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.55)', fontFamily:H.body, letterSpacing:'0.05em' }}>
            {wine.year} · {wine.region}
          </span>
          <Badge text={wine.badge} color={wine.badgeColor} small />
        </div>
        <div style={{ fontFamily:H.display, fontSize:18, color:H.white, fontWeight:600,
          lineHeight:1.25, marginBottom:4 }}>{wine.name}</div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', fontFamily:H.body, marginBottom:10 }}>
          {wine.producer}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {wine.tags.slice(0,2).map(t => (
              <span key={t} style={{ fontSize:10, color:'rgba(255,255,255,0.55)',
                border:'1px solid rgba(255,255,255,0.2)', borderRadius:20, padding:'2px 8px', fontFamily:H.body }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ fontFamily:H.display, fontSize:20, color:H.white, fontWeight:700 }}>
            {wine.price}
            {wine.discount && <span style={{ fontSize:11, color:H.red, marginLeft:6, fontFamily:H.body }}>{wine.discount}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: TASTE DNA ────────────────────────────────────────────────────────
function TasteDNAScreen({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [liked, setLiked] = useState([])
  const [superLiked, setSuperLiked] = useState([])

  const handleSwipe = (dir, wine) => {
    if (dir === 'right') setLiked(p => [...p, wine])
    if (dir === 'super') { setLiked(p => [...p, wine]); setSuperLiked(p => [...p, wine]) }
    if (idx + 1 >= WINES.length) {
      const all = [...liked, ...(dir!=='left'?[wine]:[])]
      const supers = [...superLiked, ...(dir==='super'?[wine]:[])]
      const types = all.map(w => w.type)
      const rot = types.filter(t=>t==='Rotwein').length
      const weis = types.filter(t=>t==='Weißwein').length
      const rose = types.filter(t=>t==='Roséwein').length
      const champ = types.filter(t=>t==='Champagner').length
      let dna = 'allrounder'
      const max = Math.max(rot, weis, rose, champ)
      if (champ === max && champ > 0) dna = 'champagner'
      else if (rot === max && rot > 0) dna = 'rotwein'
      else if (rose === max && rose > 0) dna = 'rose'
      else if (weis > 0) dna = 'weisswein'
      onComplete(dna, all, supers)
    } else {
      setIdx(i => i + 1)
    }
  }

  const wine = WINES[idx]
  const progress = (idx / WINES.length) * 100

  return (
    <Screen bg={H.dark}>
      {/* Minimal dark top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:20,
        padding:'52px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Logo inverted />
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:H.body }}>
          {idx+1} · {WINES.length}
        </div>
      </div>

      {/* Progress */}
      <div style={{ position:'absolute', top:80, left:22, right:22, zIndex:20,
        height:1, background:'rgba(255,255,255,0.1)', borderRadius:1 }}>
        <div style={{ height:'100%', width:`${progress}%`, background:H.red,
          borderRadius:1, transition:'width 0.3s ease' }} />
      </div>

      {/* Card area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'96px 16px 100px', justifyContent:'center' }}>
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', letterSpacing:'0.2em',
          textTransform:'uppercase', fontFamily:H.body, textAlign:'center', marginBottom:14 }}>
          Taste DNA — Was spricht dich an?
        </div>
        <DNASwipeCard wine={wine} onSwipe={handleSwipe} />
      </div>

      {/* Three-way action buttons */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 20px 28px',
        zIndex:20, display:'flex', gap:12, alignItems:'center' }}>
        {/* Nope */}
        <button onClick={() => handleSwipe('left', wine)} style={{
          flex:1, padding:'13px 0', borderRadius:3,
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
          color:'rgba(255,255,255,0.7)', fontSize:12, fontFamily:H.body,
          fontWeight:500, cursor:'pointer', letterSpacing:'0.05em',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:16, color:H.red }}>✗</span>
          <span style={{ fontSize:10 }}>Mag ich nicht</span>
        </button>
        {/* Super Like */}
        <button onClick={() => handleSwipe('super', wine)} style={{
          flex:1.3, padding:'15px 0', borderRadius:3,
          background:`linear-gradient(135deg, ${H.gold}, #E8B84B)`,
          border:'none', color:H.dark, fontSize:12, fontFamily:H.body,
          fontWeight:700, cursor:'pointer', letterSpacing:'0.06em',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:18 }}>★</span>
          <span style={{ fontSize:10, textTransform:'uppercase' }}>Sehr gerne</span>
        </button>
        {/* Like */}
        <button onClick={() => handleSwipe('right', wine)} style={{
          flex:1, padding:'13px 0', borderRadius:3,
          background:'rgba(42,107,69,0.15)', border:'1px solid rgba(42,107,69,0.35)',
          color:'rgba(255,255,255,0.8)', fontSize:12, fontFamily:H.body,
          fontWeight:500, cursor:'pointer', letterSpacing:'0.05em',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:16, color:H.green }}>✓</span>
          <span style={{ fontSize:10 }}>Mag ich</span>
        </button>
      </div>

      {/* Swipe hint */}
      <div style={{ position:'absolute', bottom:100, left:0, right:0, textAlign:'center', zIndex:15 }}>
        <span style={{ fontSize:10, color:'rgba(255,255,255,0.2)', fontFamily:H.body, letterSpacing:'0.1em' }}>
          ← swipe · ↑ super like · →
        </span>
      </div>
    </Screen>
  )
}

// ─── SCREEN: DNA RESULT ───────────────────────────────────────────────────────
function DNAResultScreen({ dna, liked, supers, onNext }) {
  const profiles = {
    rotwein:    { label:'Der Rotwein-Liebhaber', desc:'Kräftig, komplex, charakterstark. Du liebst Substanz und Tiefe. Dein Keller: Malbec, Barolo, Rioja.', recs: WINES.filter(w=>w.type==='Rotwein') },
    weisswein:  { label:'Der Weißwein-Enthusiast', desc:'Frisch, aromatisch, mineralisch. Eleganz und Spannung begeistern dich. Dein Keller: Riesling, Grauburgunder, Lugana.', recs: WINES.filter(w=>w.type==='Weißwein').slice(0,3) },
    rose:       { label:'Der Rosé-Connaisseur', desc:'Verspielt, frisch, sommerhaft. Weine die verbinden — zwischen Rot und Weiß. Dein Keller: Provence, Pfalz Rosé.', recs: WINES.filter(w=>w.type==='Roséwein') },
    champagner: { label:'Der Prestige-Genießer', desc:'Nur das Beste. Perlage, Tiefe, Komplexität. Du weißt was du willst. Dein Keller: Champagne, Crémant.', recs: WINES.filter(w=>w.type==='Champagner') },
    allrounder: { label:'Der Offene Entdecker', desc:'Du bist für alles offen — der ideale Weinentdecker. Neues ist dein Ding. Kein Wein ist dir fremd.', recs: WINES.slice(0,3) },
  }
  const p = profiles[dna] || profiles.allrounder

  return (
    <Screen bg={H.cream}>
      <TopBar right={null} />
      <div style={{ flex:1, overflowY:'auto', padding:'20px 22px 40px' }}>
        <div style={{ fontSize:10, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase',
          fontFamily:H.body, marginBottom:20 }}>◆ Deine Wein-DNA</div>

        <div style={{ background:H.white, borderRadius:4, padding:'24px 20px', marginBottom:16,
          borderLeft:`4px solid ${H.red}`, boxShadow:'0 2px 16px rgba(0,0,0,0.05)' }}>
          <div style={{ fontFamily:H.display, fontSize:22, color:H.black, fontWeight:700, marginBottom:10 }}>
            {p.label}
          </div>
          <div style={{ fontSize:14, color:H.grayMid, fontFamily:H.body, lineHeight:1.7, marginBottom:16 }}>
            {p.desc}
          </div>
          <div style={{ paddingTop:14, borderTop:`1px solid ${H.grayLine}`, display:'flex', gap:16 }}>
            <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>
              <span style={{ color:H.black, fontWeight:600 }}>{liked.length}</span> Weine gemocht
            </div>
            {supers.length > 0 && (
              <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>
                <span style={{ color:H.gold, fontWeight:600 }}>★ {supers.length}</span> Super-Likes
              </div>
            )}
          </div>
        </div>

        {supers.length > 0 && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10, color:H.gold, letterSpacing:'0.15em', textTransform:'uppercase',
              fontFamily:H.body, marginBottom:10 }}>★ Deine Super-Likes</div>
            {supers.map(w => (
              <div key={w.id} style={{ background:H.white, borderRadius:4, padding:'12px 16px',
                marginBottom:8, display:'flex', gap:12, alignItems:'center',
                border:`1px solid rgba(196,150,42,0.2)` }}>
                <img src={w.img} alt={w.name} style={{ width:36, height:60, objectFit:'contain', flexShrink:0 }}
                  onError={e=>{e.target.style.display='none'}} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>{w.year} · {w.region}</div>
                  <div style={{ fontFamily:H.display, fontSize:13, color:H.black, fontWeight:600 }}>{w.name}</div>
                  <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body, marginTop:2 }}>{w.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontSize:10, color:H.grayMid, letterSpacing:'0.12em', textTransform:'uppercase',
          fontFamily:H.body, marginBottom:10 }}>Empfehlungen für dich</div>
        {p.recs.slice(0,3).map(w => (
          <div key={w.id} style={{ background:H.white, borderRadius:4, padding:'12px 16px',
            marginBottom:8, display:'flex', gap:12, alignItems:'center', border:`1px solid ${H.grayLine}` }}>
            <img src={w.img} alt={w.name} style={{ width:32, height:52, objectFit:'contain', flexShrink:0 }}
              onError={e=>{e.target.style.display='none'}} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>{w.year} · {w.region}</div>
              <div style={{ fontFamily:H.display, fontSize:13, color:H.black, fontWeight:600, lineHeight:1.3 }}>{w.name}</div>
              <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body, marginTop:2 }}>{w.price}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop:20 }}>
          <PrimaryBtn onClick={onNext}>Zum Lernbereich</PrimaryBtn>
        </div>
      </div>
    </Screen>
  )
}

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
function HomeScreen({ dna, liked, corks, onNav }) {
  return (
    <Screen bg={H.cream}>
      <div style={{ padding:'52px 22px 16px', background:H.white, borderBottom:`1px solid ${H.grayLine}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Logo />
          <CorkCurrency count={corks} />
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px 18px' }}>
        {/* Greeting */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:H.display, fontSize:24, color:H.black, fontWeight:600 }}>
            Guten Tag.
          </div>
          <div style={{ fontSize:13, color:H.grayMid, fontFamily:H.body, marginTop:4 }}>
            Dein Lernpfad wartet.
          </div>
        </div>

        {/* Progress card */}
        <div style={{ background:H.red, borderRadius:4, padding:'20px', marginBottom:16 }}>
          <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)', letterSpacing:'0.18em',
            textTransform:'uppercase', fontFamily:H.body, marginBottom:6 }}>Dein Fortschritt</div>
          <div style={{ fontFamily:H.display, fontSize:18, color:H.white, fontWeight:600, marginBottom:14 }}>
            Level I · Weinliebhaber
          </div>
          <div style={{ display:'flex', gap:16 }}>
            <div>
              <div style={{ fontFamily:H.display, fontSize:22, color:H.white, fontWeight:700 }}>{corks}</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontFamily:H.body, letterSpacing:'0.1em' }}>KORKEN</div>
            </div>
            <div style={{ width:1, background:'rgba(255,255,255,0.15)' }} />
            <div>
              <div style={{ fontFamily:H.display, fontSize:22, color:H.white, fontWeight:700 }}>3</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontFamily:H.body, letterSpacing:'0.1em' }}>TAGE SERIE</div>
            </div>
          </div>
        </div>

        {/* Main sections */}
        <div style={{ fontSize:9, color:H.grayLight, letterSpacing:'0.18em', textTransform:'uppercase',
          fontFamily:H.body, marginBottom:12 }}>Bereiche</div>
        {[
          { key:'learn',    icon:'I', title:'Lernen', sub:'Vokabeln & Wissen · +2 Korken pro Karte' },
          { key:'discover', icon:'II', title:'Weine entdecken', sub:'Neue Flaschen per Swipe finden' },
          { key:'cert',     icon:'III', title:'Zertifikate & Korken', sub:'Level freischalten · Prämien einlösen' },
        ].map(s => (
          <button key={s.key} onClick={() => onNav(s.key)} style={{
            width:'100%', background:H.white, borderRadius:4, padding:'16px 18px',
            marginBottom:10, border:`1px solid ${H.grayLine}`,
            display:'flex', alignItems:'center', gap:14, cursor:'pointer', textAlign:'left' }}>
            <div style={{ width:36, height:36, borderRadius:3, background:H.cream,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:H.display, fontSize:11, color:H.red, fontWeight:700, flexShrink:0 }}>
              {s.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:H.display, fontSize:16, color:H.black, fontWeight:600 }}>{s.title}</div>
              <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body, marginTop:2 }}>{s.sub}</div>
            </div>
            <span style={{ fontSize:18, color:H.grayLight }}>›</span>
          </button>
        ))}

        {/* Coming Soon: Bottle Scan */}
        <div style={{ background:H.dark, borderRadius:4, padding:'18px 20px', marginTop:6,
          border:`1px solid rgba(196,150,42,0.2)`, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, right:0, bottom:0, width:80,
            background:'linear-gradient(to left, rgba(196,150,42,0.08), transparent)', pointerEvents:'none' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize:9, color:H.gold, letterSpacing:'0.18em', textTransform:'uppercase',
                fontFamily:H.body, marginBottom:6 }}>Coming Soon</div>
              <div style={{ fontFamily:H.display, fontSize:16, color:H.white, fontWeight:600, marginBottom:6 }}>
                Flasche scannen
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', fontFamily:H.body, lineHeight:1.6, maxWidth:220 }}>
                Scanne jede HAWESKO-Flasche und erhalte sofort Korken, Beschreibung und Pairing-Tipps.
              </div>
            </div>
            {/* Camera SVG icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, opacity:0.4 }}>
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={H.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="4" stroke={H.gold} strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* Quick Picks */}
        {liked.length > 0 && (
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:9, color:H.grayLight, letterSpacing:'0.18em', textTransform:'uppercase',
              fontFamily:H.body, marginBottom:12 }}>Deine Auswahl</div>
            <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:6 }}>
              {liked.slice(0,5).map(w => (
                <div key={w.id} style={{ background:H.white, borderRadius:4, padding:'12px 14px',
                  minWidth:130, border:`1px solid ${H.grayLine}`, flexShrink:0 }}>
                  <img src={w.img} alt={w.name}
                    style={{ width:'100%', height:70, objectFit:'contain', marginBottom:8 }}
                    onError={e=>{e.target.style.display='none'}} />
                  <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>{w.year}</div>
                  <div style={{ fontFamily:H.display, fontSize:12, color:H.black, fontWeight:600, lineHeight:1.3, marginBottom:4 }}>
                    {w.name.split(' ').slice(0,3).join(' ')}
                  </div>
                  <div style={{ fontSize:12, color:H.red, fontWeight:700, fontFamily:H.body }}>{w.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}

// ─── SCREEN: LEARN ────────────────────────────────────────────────────────────
function LearnScreen({ corks, onAddCorks, onBack }) {
  const [view, setView] = useState('menu')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(null)
  const [completed, setCompleted] = useState(0)

  const vocab = useMemo(() => shuffle(VOCAB_RAW), [])
  const card = vocab[cardIdx]

  const handleAnswer = correct => {
    if (answered !== null) return
    setAnswered(correct ? 'correct' : 'wrong')
    if (correct) onAddCorks(2)
  }

  const handleNext = () => {
    setCompleted(c => c + 1)
    if (cardIdx + 1 >= vocab.length) setView('done')
    else { setCardIdx(i => i + 1); setFlipped(false); setAnswered(null) }
  }

  if (view === 'done') return (
    <Screen>
      <TopBar onBack={() => { setView('menu'); setCardIdx(0); setFlipped(false); setAnswered(null) }} right={<CorkCurrency count={corks} small />} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'40px 28px', textAlign:'center' }}>
        <div style={{ width:1, height:40, background:H.red, margin:'0 auto 24px' }} />
        <div style={{ fontFamily:H.display, fontSize:26, color:H.black, fontWeight:700, marginBottom:10 }}>
          Lektion abgeschlossen.
        </div>
        <div style={{ fontSize:14, color:H.grayMid, fontFamily:H.body, lineHeight:1.7, marginBottom:32 }}>
          {completed} Vokabeln gelernt · {completed * 2} Korken verdient
        </div>
        <div style={{ background:H.cream, border:`1px solid rgba(196,150,42,0.2)`,
          borderRadius:4, padding:'18px 32px', marginBottom:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}>
            <img src={CORK} alt="Korken" style={{ width:28, height:17, objectFit:'contain' }} />
            <span style={{ fontFamily:H.display, fontSize:28, color:H.gold, fontWeight:700 }}>+{completed * 2}</span>
          </div>
          <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body, marginTop:4 }}>Korken verdient</div>
        </div>
        <PrimaryBtn onClick={onBack}>Zurück zum Überblick</PrimaryBtn>
      </div>
    </Screen>
  )

  if (view === 'flashcard') return (
    <Screen>
      <TopBar onBack={() => { setView('menu'); setCardIdx(0); setFlipped(false); setAnswered(null) }}
        right={<CorkCurrency count={corks} small />} />
      <div style={{ padding:'0 22px 12px' }}>
        <ProgressBar value={(cardIdx / vocab.length) * 100} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 20px 20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <CatLabel cat={card.cat} />
          <span style={{ fontSize:11, color:H.grayLight, fontFamily:H.body }}>
            {cardIdx + 1} / {vocab.length}
          </span>
        </div>

        {/* Flashcard */}
        <div onClick={() => { if (!answered) setFlipped(f => !f) }}
          style={{ flex:1, maxHeight:310, cursor: answered?'default':'pointer',
            perspective:1000, position:'relative', marginBottom:16 }}>
          {/* Front */}
          <div style={{ position:'absolute', inset:0, background:H.white,
            border:`1px solid ${H.grayLine}`, borderRadius:4,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:28, textAlign:'center', backfaceVisibility:'hidden',
            transform: flipped?'rotateY(180deg)':'rotateY(0deg)',
            transition:'transform 0.45s ease', boxShadow:'0 2px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontFamily:H.display, fontSize:30, color:H.black, fontWeight:700, marginBottom:14 }}>
              {card.word}
            </div>
            <div style={{ fontSize:13, color:H.grayMid, fontFamily:H.body }}>
              {card.cat} · Level {card.level}
            </div>
            {!flipped && (
              <div style={{ marginTop:20, fontSize:11, color:H.grayLight, fontFamily:H.body,
                border:`1px dashed ${H.grayLine}`, borderRadius:3, padding:'5px 14px', letterSpacing:'0.05em' }}>
                Tippen zum Aufdecken
              </div>
            )}
          </div>
          {/* Back */}
          <div style={{ position:'absolute', inset:0, background:H.white,
            border:`1px solid ${H.grayLine}`, borderLeft:`4px solid ${H.red}`, borderRadius:4,
            display:'flex', flexDirection:'column', justifyContent:'center', padding:24,
            backfaceVisibility:'hidden', overflowY:'auto',
            transform: flipped?'rotateY(0deg)':'rotateY(-180deg)',
            transition:'transform 0.45s ease', boxShadow:'0 2px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize:9, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase',
              fontFamily:H.body, marginBottom:10 }}>Definition</div>
            <div style={{ fontSize:14, color:H.black, lineHeight:1.75, marginBottom:16, fontFamily:H.body }}>
              {card.def}
            </div>
            <div style={{ background:H.cream, borderRadius:3, padding:'12px 14px' }}>
              <div style={{ fontSize:9, color:H.grayMid, textTransform:'uppercase',
                letterSpacing:'0.12em', marginBottom:5, fontFamily:H.body }}>Beispiel</div>
              <div style={{ fontSize:13, color:H.grayDark, fontStyle:'italic', lineHeight:1.65, fontFamily:H.body }}>
                {card.example}
              </div>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {flipped && answered === null && (
          <div style={{ display:'flex', gap:10, animation:'fadeUp 0.25s ease' }}>
            <GhostBtn onClick={() => handleAnswer(false)}
              style={{ flex:1, borderColor:'rgba(155,27,48,0.25)', color:H.red }}>
              ✗ Nochmal
            </GhostBtn>
            <PrimaryBtn onClick={() => handleAnswer(true)} style={{ flex:1 }}>
              ✓ Gewusst · +2
            </PrimaryBtn>
          </div>
        )}

        {answered !== null && (
          <div style={{ animation:'fadeUp 0.25s ease' }}>
            <div style={{ padding:'12px 14px', background: answered==='correct'?'#EBF5EE':'#F5EAEC',
              borderRadius:3, marginBottom:12, fontSize:13,
              color: answered==='correct'?H.green:H.red, fontFamily:H.body, display:'flex', alignItems:'center', gap:10 }}>
              {answered==='correct' ? (
                <>
                  <span>Gewusst.</span>
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginLeft:'auto' }}>
                    <img src={CORK} alt="" style={{ width:18, height:11 }} />
                    <span style={{ fontWeight:700 }}>+2</span>
                  </div>
                </>
              ) : '✗ Kommt in der nächsten Runde wieder.'}
            </div>
            <PrimaryBtn onClick={handleNext}>
              {cardIdx + 1 >= vocab.length ? 'Lektion abschließen' : 'Nächste Karte'}
            </PrimaryBtn>
          </div>
        )}
      </div>
    </Screen>
  )

  // Menu
  const lessons = [
    { id:'vocab', title:'Wein-Vokabeln', sub:`${vocab.length} Begriffe · zufällig gemischt · +2 Korken pro Karte`, open:true },
    { id:'regions', title:'Regionen der Welt', sub:'Bordeaux, Pfalz, Toskana, Champagne', open:false },
    { id:'grapes', title:'Rebsorten', sub:'Riesling, Malbec, Turbiana, Sauvignon Blanc', open:false },
    { id:'pairing', title:'Food Pairing', sub:'Welcher Wein zu welchem Gericht?', open:false },
    { id:'degustation', title:'Degustation', sub:'Wie professionell verkosten? Level III', open:false },
  ]

  return (
    <Screen>
      <TopBar onBack={onBack} right={<CorkCurrency count={corks} small />} />
      <div style={{ flex:1, overflowY:'auto', padding:'20px 18px' }}>
        <div style={{ fontSize:9, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body, marginBottom:6 }}>Lernen</div>
        <div style={{ fontFamily:H.display, fontSize:22, color:H.black, fontWeight:600, marginBottom:24 }}>
          Wähle eine Lektion.
        </div>
        {lessons.map((l, i) => (
          <button key={l.id} onClick={() => l.open && setView('flashcard')}
            style={{ width:'100%', background:H.white, borderRadius:4, padding:'16px 18px',
              marginBottom:10, border:`1px solid ${H.grayLine}`,
              display:'flex', alignItems:'center', gap:14, cursor: l.open?'pointer':'default',
              textAlign:'left', opacity: l.open?1:0.45 }}>
            <div style={{ width:32, height:32, borderRadius:3, background:H.cream,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:H.display, fontSize:11, color:H.red, fontWeight:700, flexShrink:0 }}>
              {['I','II','III','IV','V'][i]}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:H.display, fontSize:16, color:H.black, fontWeight:600 }}>{l.title}</div>
              <div style={{ fontSize:11, color:H.grayMid, fontFamily:H.body, marginTop:2 }}>{l.sub}</div>
            </div>
            <span style={{ fontSize:10, background: l.open?H.red:H.grayBg,
              color: l.open?H.white:H.grayLight, borderRadius:2, padding:'3px 8px',
              fontFamily:H.body, fontWeight:600, letterSpacing:'0.05em', flexShrink:0 }}>
              {l.open ? 'Starten' : 'Bald'}
            </span>
          </button>
        ))}
      </div>
    </Screen>
  )
}

// ─── SCREEN: DISCOVER ─────────────────────────────────────────────────────────
function DiscoverScreen({ liked, onBack }) {
  const [idx, setIdx] = useState(0)
  const [cart, setCart] = useState([])
  const [done, setDone] = useState(false)

  const handleSwipe = (dir, wine) => {
    if (dir === 'right' || dir === 'super') setCart(p => [...p, wine])
    if (idx + 1 >= WINES.length) setDone(true)
    else setIdx(i => i + 1)
  }

  if (done) return (
    <Screen>
      <TopBar onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:'20px 18px 40px' }}>
        <div style={{ fontSize:9, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body, marginBottom:6 }}>Deine Auswahl</div>
        <div style={{ fontFamily:H.display, fontSize:22, color:H.black, fontWeight:600, marginBottom:24 }}>
          {cart.length} {cart.length === 1 ? 'Wein' : 'Weine'} vorgemerkt.
        </div>
        {cart.map(w => (
          <div key={w.id} style={{ background:H.white, borderRadius:4, padding:'14px 16px',
            marginBottom:10, display:'flex', gap:12, alignItems:'center', border:`1px solid ${H.grayLine}` }}>
            <img src={w.img} alt={w.name} style={{ width:36, height:60, objectFit:'contain', flexShrink:0 }}
              onError={e=>{e.target.style.display='none'}} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, color:H.grayMid, fontFamily:H.body }}>{w.year} · {w.region}</div>
              <div style={{ fontFamily:H.display, fontSize:14, color:H.black, fontWeight:600 }}>{w.name}</div>
              <div style={{ fontSize:13, color:H.red, fontWeight:700, fontFamily:H.body, marginTop:3 }}>{w.price}</div>
            </div>
          </div>
        ))}
        {cart.length === 0 && (
          <div style={{ textAlign:'center', padding:40, color:H.grayLight, fontFamily:H.body }}>Kein Wein vorgemerkt</div>
        )}
        <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
          <PrimaryBtn onClick={() => {}}>Im Shop bestellen →</PrimaryBtn>
          <GhostBtn onClick={onBack}>Zurück</GhostBtn>
        </div>
      </div>
    </Screen>
  )

  return (
    <Screen bg={H.dark}>
      <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:20,
        padding:'52px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button onClick={onBack} style={{ fontSize:22, cursor:'pointer', color:'rgba(255,255,255,0.6)',
          background:'none', border:'none', lineHeight:1, padding:0 }}>‹</button>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:9, color:H.gold, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body }}>Neue Weine</div>
          <div style={{ fontFamily:H.display, fontSize:13, color:H.white, fontWeight:600 }}>Passend zu dir entdecken</div>
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', fontFamily:H.body }}>{idx+1}/{WINES.length}</div>
      </div>

      <div style={{ position:'absolute', top:80, left:22, right:22, zIndex:20,
        height:1, background:'rgba(255,255,255,0.08)', borderRadius:1 }}>
        <div style={{ height:'100%', width:`${(idx/WINES.length)*100}%`, background:H.red, borderRadius:1, transition:'width 0.3s ease' }} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'96px 16px 100px', justifyContent:'center' }}>
        <DNASwipeCard wine={WINES[idx]} onSwipe={handleSwipe} />
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 20px 28px', zIndex:20, display:'flex', gap:12 }}>
        <button onClick={() => handleSwipe('left', WINES[idx])} style={{ flex:1, padding:'13px 0', borderRadius:3,
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
          color:'rgba(255,255,255,0.7)', fontSize:12, fontFamily:H.body, cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:16, color:H.red }}>✗</span>
          <span style={{ fontSize:10 }}>Kenne ich</span>
        </button>
        <button onClick={() => handleSwipe('super', WINES[idx])} style={{ flex:1.3, padding:'15px 0', borderRadius:3,
          background:`linear-gradient(135deg, ${H.gold}, #E8B84B)`,
          border:'none', color:H.dark, fontSize:12, fontFamily:H.body, fontWeight:700, cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:18 }}>★</span>
          <span style={{ fontSize:10, textTransform:'uppercase' }}>Sehr gerne</span>
        </button>
        <button onClick={() => handleSwipe('right', WINES[idx])} style={{ flex:1, padding:'13px 0', borderRadius:3,
          background:'rgba(42,107,69,0.15)', border:'1px solid rgba(42,107,69,0.35)',
          color:'rgba(255,255,255,0.8)', fontSize:12, fontFamily:H.body, cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <span style={{ fontSize:16, color:H.green }}>✓</span>
          <span style={{ fontSize:10 }}>Vormerken</span>
        </button>
      </div>

      <div style={{ position:'absolute', bottom:100, left:0, right:0, textAlign:'center', zIndex:15 }}>
        <span style={{ fontSize:10, color:'rgba(255,255,255,0.2)', fontFamily:H.body, letterSpacing:'0.1em' }}>← swipe · ↑ super like · →</span>
      </div>
    </Screen>
  )
}

// ─── SCREEN: CERTS & KORKEN ───────────────────────────────────────────────────
function CertScreen({ corks, onBack }) {
  const levels = [
    { num:'I', name:'Weinliebhaber', desc:'Grundlagen · Rebsorten · trocken / lieblich · Länder', done:true, cost:0 },
    { num:'II', name:'Weinkenner', desc:'Regionen · Jahrgänge · Food Pairing · Vinifikation', done:false, active:true, cost:500 },
    { num:'III', name:'HAWESKO Sommelier', desc:'Blindverkostung · Etikettenkunde · Degustation', done:false, active:false, cost:1500 },
  ]
  const rewards = [
    { corks:500,  label:'€ 5,– Rabatt im Shop' },
    { corks:1000, label:'Gratis Versand' },
    { corks:2500, label:'Exklusive Weinprobe (Invitation)' },
    { corks:5000, label:'Persönliche Sommelierberatung' },
  ]

  return (
    <Screen>
      <TopBar onBack={onBack} right={<CorkCurrency count={corks} />} />
      <div style={{ flex:1, overflowY:'auto', padding:'20px 18px 40px' }}>
        <div style={{ fontSize:9, color:H.red, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:H.body, marginBottom:6 }}>Zertifikate</div>
        <div style={{ fontFamily:H.display, fontSize:22, color:H.black, fontWeight:600, marginBottom:24 }}>Dein Lernpfad.</div>

        {levels.map((l, i) => (
          <div key={l.num} style={{ background:H.white, borderRadius:4, padding:'20px', marginBottom:12,
            border:`1px solid ${H.grayLine}`, position:'relative', overflow:'hidden' }}>
            {l.done && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:H.green }} />}
            {l.active && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:H.red }} />}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:32, height:32, borderRadius:3, background:H.cream,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:H.display, fontSize:13, color: l.done?H.green:l.active?H.red:H.grayLight, fontWeight:700 }}>
                  {l.num}
                </div>
                <div style={{ fontFamily:H.display, fontSize:17, color:H.black, fontWeight:600 }}>{l.name}</div>
              </div>
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.1em',
                background: l.done?H.green:l.active?H.red:H.grayBg,
                color: l.done||l.active?H.white:H.grayLight,
                borderRadius:2, padding:'3px 7px', fontFamily:H.body }}>
                {l.done?'Abgeschlossen':l.active?'Aktiv':'Gesperrt'}
              </span>
            </div>
            <div style={{ fontSize:13, color:H.grayMid, fontFamily:H.body, lineHeight:1.6, marginBottom: l.active?14:0 }}>
              {l.desc}
            </div>
            {l.active && (
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:12, color:H.grayMid, fontFamily:H.body }}>
                  Benötigt: <span style={{ color:H.gold, fontWeight:600 }}>{l.cost} Korken</span>
                </div>
                <button style={{ background:H.red, color:H.white, borderRadius:3, padding:'7px 16px',
                  fontSize:11, fontFamily:H.body, fontWeight:600, cursor:'pointer', border:'none',
                  letterSpacing:'0.06em' }}>Fortfahren</button>
              </div>
            )}
          </div>
        ))}

        {/* Korken einlösen */}
        <div style={{ marginTop:24 }}>
          <div style={{ fontSize:9, color:H.grayLight, letterSpacing:'0.18em', textTransform:'uppercase',
            fontFamily:H.body, marginBottom:14 }}>Korken einlösen</div>
          {rewards.map((r, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'12px 0', borderBottom:`1px solid ${H.grayLine}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src={CORK} alt="" style={{ width:20, height:12, objectFit:'contain' }} />
                <span style={{ fontFamily:H.display, fontSize:14, color:H.gold, fontWeight:600 }}>{r.corks}</span>
              </div>
              <span style={{ fontSize:13, color: corks>=r.corks?H.black:H.grayLight, fontFamily:H.body }}>{r.label}</span>
              <button disabled={corks<r.corks} style={{ fontSize:10, background: corks>=r.corks?H.red:'transparent',
                color: corks>=r.corks?H.white:H.grayLight, borderRadius:2, padding:'4px 10px',
                fontFamily:H.body, fontWeight:600, border: corks>=r.corks?'none':`1px solid ${H.grayLine}`,
                cursor: corks>=r.corks?'pointer':'default' }}>
                Einlösen
              </button>
            </div>
          ))}
        </div>

        {/* Coming Soon: Bottle Scan */}
        <div style={{ marginTop:24, background:H.dark, borderRadius:4, padding:'20px',
          border:`1px solid rgba(196,150,42,0.15)` }}>
          <div style={{ fontSize:9, color:H.gold, letterSpacing:'0.18em', textTransform:'uppercase',
            fontFamily:H.body, marginBottom:8 }}>Coming Soon</div>
          <div style={{ fontFamily:H.display, fontSize:17, color:H.white, fontWeight:600, marginBottom:8 }}>
            Flasche scannen · Korken kassieren
          </div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:H.body, lineHeight:1.65 }}>
            Jede gescannte HAWESKO-Flasche bringt dir Korken, Verkostungsnotizen und Pairing-Empfehlungen — direkt aus der Kamera.
          </div>
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:10 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                stroke={H.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="4" stroke={H.gold} strokeWidth="1.5"/>
            </svg>
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)', fontFamily:H.body }}>
              In Entwicklung · Bald verfügbar
            </span>
          </div>
        </div>
      </div>
    </Screen>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [level, setLevel]   = useState(null)
  const [pct, setPct]       = useState(0)
  const [dna, setDna]       = useState(null)
  const [liked, setLiked]   = useState([])
  const [supers, setSupers] = useState([])
  const [corks, setCorks]   = useState(0)

  const addCorks = n => setCorks(c => c + n)

  return (
    <div style={{ width:'100vw', height:'100dvh', display:'flex', alignItems:'center',
      justifyContent:'center', background:'#0D0608' }}>

      {screen==='welcome' && (
        <WelcomeScreen onStart={() => setScreen('quiz')} />
      )}
      {screen==='quiz' && (
        <QuizScreen onComplete={(l, p) => {
          setLevel(l); setPct(p); addCorks(p >= 70 ? 15 : p >= 40 ? 10 : 5); setScreen('quiz-result')
        }} />
      )}
      {screen==='quiz-result' && (
        <QuizResultScreen level={level} pct={pct} corks={corks}
          onNext={() => setScreen('dna')} />
      )}
      {screen==='dna' && (
        <TasteDNAScreen onComplete={(d, l, s) => {
          setDna(d); setLiked(l); setSupers(s); addCorks(l.length * 1 + s.length * 2); setScreen('dna-result')
        }} />
      )}
      {screen==='dna-result' && (
        <DNAResultScreen dna={dna} liked={liked} supers={supers}
          onNext={() => setScreen('home')} />
      )}
      {screen==='home' && (
        <HomeScreen dna={dna} liked={liked} corks={corks} onNav={s => setScreen(s)} />
      )}
      {screen==='learn' && (
        <LearnScreen corks={corks} onAddCorks={addCorks} onBack={() => setScreen('home')} />
      )}
      {screen==='discover' && (
        <DiscoverScreen liked={liked} onBack={() => setScreen('home')} />
      )}
      {screen==='cert' && (
        <CertScreen corks={corks} onBack={() => setScreen('home')} />
      )}
    </div>
  )
}
