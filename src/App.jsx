import { useState, useEffect } from "react";

/* ─── TOKENS ──────────────────────────────────────────────────────────────── */
const T = {
  gold: "#C9A84C", goldL: "#E8D08A",
  dark: "#0A0A0A", dark2: "#111", dark3: "#181818",
  mid: "#555", blue: "#2B5BE0", green: "#22c55e",
  red: "#FF3B00",
  font: "'DM Sans', -apple-system, sans-serif",
  serif: "'Playfair Display', Georgia, serif",
};

/* ─── ICONS ───────────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 18, fill = "none", stroke = "currentColor", sw = 1.5, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d && <path d={d} />}{children}
  </svg>
);
const Icons = {
  palette: <Icon fill="none" stroke="currentColor" sw={1.5}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></Icon>,
  film: <Icon><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></Icon>,
  monitor: <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Icon>,
  cpu: <Icon><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></Icon>,
  mail: <Icon><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>,
  layers: <Icon><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>,
  user: <Icon><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4" stroke="currentColor" fill="none"/></Icon>,
  code: <Icon><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Icon>,
  github: <Icon><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></Icon>,
  extLink: <Icon sw={2}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>,
  play: <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  arrowR: <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  video: <Icon><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></Icon>,
  zap: <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  close: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  prev: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  next: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  // Project icons
  shoppingCart: <Icon sw={1.5}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></Icon>,
  building: <Icon sw={1.5}><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><line x1="6" y1="11" x2="6" y2="11"/><line x1="10" y1="11" x2="10" y2="11"/><line x1="14" y1="11" x2="14" y2="11"/><line x1="18" y1="11" x2="18" y2="11"/><line x1="6" y1="15" x2="6" y2="15"/><line x1="10" y1="15" x2="10" y2="15"/><line x1="14" y1="15" x2="14" y2="15"/><line x1="18" y1="15" x2="18" y2="15"/></Icon>,
  lock: <Icon sw={1.5}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>,
  activity: <Icon sw={1.5}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>,
  creditCard: <Icon sw={1.5}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></Icon>,
  download: <Icon sw={1.5}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>,
};

/* ─── GRAPHIC DESIGN SVGs ─────────────────────────────────────────────────── */
function Design0() {
  return (
    <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <linearGradient id="vbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1C1008"/><stop offset="100%" stopColor="#2E1A0E"/></linearGradient>
        <radialGradient id="vglow" cx="50%" cy="55%" r="45%"><stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18"/><stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="480" height="480" fill="url(#vbg)"/><rect width="480" height="480" fill="url(#vglow)"/>
      <rect x="18" y="18" width="444" height="444" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.45"/>
      <rect x="26" y="26" width="428" height="428" fill="none" stroke="#C9A84C" strokeWidth="0.3" opacity="0.2"/>
      <ellipse cx="240" cy="295" rx="78" ry="18" fill="#0A0704" opacity="0.6"/>
      <rect x="174" y="186" width="132" height="112" rx="10" fill="#2A1F10"/>
      <rect x="180" y="192" width="120" height="100" rx="8" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5"/>
      <rect x="186" y="170" width="108" height="22" rx="5" fill="#1E1508"/>
      <rect x="186" y="170" width="108" height="22" rx="5" fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.6"/>
      <text x="240" y="238" textAnchor="middle" fill="#C9A84C" fontSize="11" fontFamily="Georgia,serif" letterSpacing="6">VELORA</text>
      <line x1="200" y1="246" x2="280" y2="246" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
      <text x="240" y="258" textAnchor="middle" fill="#C9A84C" fontSize="6.5" fontFamily="Arial,sans-serif" letterSpacing="3" opacity="0.7">SKIN RITUAL</text>
      <text x="240" y="90" textAnchor="middle" fill="#C9A84C" fontSize="9" fontFamily="Arial,sans-serif" letterSpacing="8" fontWeight="700" opacity="0.6">V E L O R A</text>
      <line x1="140" y1="97" x2="340" y2="97" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3"/>
      <text x="240" y="136" textAnchor="middle" fill="#fff" fontSize="22" fontFamily="Georgia,serif" fontWeight="400" opacity="0.92" letterSpacing="1">Lumière Crème</text>
      <text x="240" y="156" textAnchor="middle" fill="#C9A84C" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="3" opacity="0.55">RADIANCE MOISTURISER</text>
      <text x="240" y="370" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.5">"Ritual. Radiance. Results."</text>
      <text x="240" y="392" textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="Arial,sans-serif" letterSpacing="4" opacity="0.35">velora.co · @veloraskin</text>
      <circle cx="220" cy="420" r="2" fill="#C9A84C" opacity="0.3"/><circle cx="240" cy="420" r="2.5" fill="#C9A84C" opacity="0.5"/><circle cx="260" cy="420" r="2" fill="#C9A84C" opacity="0.3"/>
    </svg>
  );
}
function Design1() {
  return (
    <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="480" height="480" fill="#0D0D0D"/>
      <polygon points="0,0 120,0 0,180" fill="#FF3B00" opacity="0.9"/>
      <text x="18" y="44" fill="#0D0D0D" fontSize="20" fontFamily="Arial,sans-serif" fontWeight="900" letterSpacing="-1">KOVA</text>
      <text x="18" y="58" fill="#0D0D0D" fontSize="7" fontFamily="Arial,sans-serif" letterSpacing="3" opacity="0.7">STREET</text>
      <path d="M160,155 L120,185 L140,195 L140,310 L340,310 L340,195 L360,185 L320,155 L295,175 C280,160 260,152 240,152 C220,152 200,160 185,175 Z" fill="#1A1A1A" stroke="#333" strokeWidth="1"/>
      <text x="240" y="250" textAnchor="middle" fill="#FF3B00" fontSize="52" fontFamily="Arial,sans-serif" fontWeight="900" opacity="0.85">K</text>
      <text x="240" y="356" textAnchor="middle" fill="#FF3B00" fontSize="9" fontFamily="Arial,sans-serif" letterSpacing="5" fontWeight="700">NEW DROP</text>
      <text x="240" y="380" textAnchor="middle" fill="#fff" fontSize="30" fontFamily="Arial,sans-serif" fontWeight="900" letterSpacing="-1">SERIES 07</text>
      <text x="240" y="402" textAnchor="middle" fill="#ffffff55" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="3">LIMITED · 200 PIECES</text>
      <line x1="60" y1="418" x2="420" y2="418" stroke="#ffffff" strokeWidth="0.4" opacity="0.15"/>
      <text x="60" y="438" fill="#ffffff55" fontSize="7.5" fontFamily="Arial,sans-serif" letterSpacing="1">AVAILABLE 14 MAR</text>
      <text x="420" y="438" textAnchor="end" fill="#FF3B00" fontSize="7.5" fontFamily="Arial,sans-serif" letterSpacing="1">KOVA.CO</text>
      <rect x="350" y="140" width="88" height="34" rx="17" fill="#FF3B00"/>
      <text x="394" y="162" textAnchor="middle" fill="#0D0D0D" fontSize="13" fontFamily="Arial,sans-serif" fontWeight="900">₦18,500</text>
    </svg>
  );
}
function Design2() {
  return (
    <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs><linearGradient id="zbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F5EDD8"/><stop offset="100%" stopColor="#EDE0C4"/></linearGradient></defs>
      <rect width="480" height="480" fill="url(#zbg)"/>
      <rect x="0" y="0" width="480" height="132" fill="#1E120A"/>
      <circle cx="240" cy="54" r="32" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <text x="240" y="62" textAnchor="middle" fill="#C9A84C" fontSize="28" fontFamily="Georgia,serif" fontWeight="700">Z</text>
      <text x="240" y="102" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Georgia,serif" letterSpacing="8">ZENO</text>
      <text x="240" y="118" textAnchor="middle" fill="#C9A84C" fontSize="7.5" fontFamily="Arial,sans-serif" letterSpacing="5" opacity="0.7">COFFEE</text>
      <text x="240" y="162" textAnchor="middle" fill="#1E120A" fontSize="9" fontFamily="Arial,sans-serif" letterSpacing="5" fontWeight="700" opacity="0.5">OUR MENU</text>
      <line x1="60" y1="170" x2="420" y2="170" stroke="#1E120A" strokeWidth="0.6" opacity="0.2"/>
      {[["Espresso","₦800"],["Flat White","₦1,200"],["Cold Brew","₦1,500"],["Matcha Latte","₦1,800"],["Caramel Macchiato","₦1,600"]].map(([name,price],i)=>(
        <g key={name}><text x="60" y={202+i*38} fill="#1E120A" fontSize="13" fontFamily="Georgia,serif" opacity="0.9">{name}</text><line x1="60" y1={206+i*38} x2="420" y2={206+i*38} stroke="#1E120A" strokeWidth="0.3" opacity={i===4?0:0.15} strokeDasharray="2 3"/><text x="420" y={202+i*38} textAnchor="end" fill="#1E120A" fontSize="13" fontFamily="Georgia,serif" fontWeight="700" opacity="0.8">{price}</text></g>
      ))}
      <path d="M210,368 L214,410 L266,410 L270,368 Z" fill="#C9A84C" opacity="0.22" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5"/>
      <path d="M268,378 Q288,378 288,392 Q288,406 268,406" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5"/>
      <text x="240" y="450" textAnchor="middle" fill="#1E120A" fontSize="7.5" fontFamily="Arial,sans-serif" letterSpacing="3" opacity="0.35">Lagos · ABUJA · PORT HARCOURT</text>
      <text x="240" y="466" textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="Arial,sans-serif" letterSpacing="2" opacity="0.5">zenocoffee.ng</text>
    </svg>
  );
}
function Design3() {
  return (
    <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <linearGradient id="axbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#05080F"/><stop offset="100%" stopColor="#0B1422"/></linearGradient>
        <linearGradient id="axbar" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#00C2FF"/><stop offset="100%" stopColor="#0066FF"/></linearGradient>
      </defs>
      <rect width="480" height="480" fill="url(#axbg)"/>
      {[0,1,2,3,4,5,6,7,8].map(i=><line key={`g${i}`} x1={i*60} y1="0" x2={i*60} y2="480" stroke="#fff" strokeWidth="0.3" opacity="0.03"/>)}
      {[0,1,2,3,4,5,6,7,8].map(i=><line key={`h${i}`} x1="0" y1={i*60} x2="480" y2={i*60} stroke="#fff" strokeWidth="0.3" opacity="0.03"/>)}
      <rect x="0" y="0" width="480" height="4" fill="url(#axbar)"/>
      <text x="240" y="90" textAnchor="middle" fill="#fff" fontSize="36" fontFamily="Arial,sans-serif" fontWeight="900" letterSpacing="-1">AXON</text>
      <rect x="164" y="96" width="152" height="3" fill="url(#axbar)" rx="1.5"/>
      <text x="240" y="116" textAnchor="middle" fill="#00C2FF" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="6" opacity="0.8">FITNESS</text>
      <rect x="40" y="150" width="400" height="146" rx="12" fill="#ffffff" opacity="0.04" stroke="#00C2FF" strokeWidth="0.5" strokeOpacity="0.2"/>
      <text x="240" y="196" textAnchor="middle" fill="#ffffff55" fontSize="9" fontFamily="Arial,sans-serif" letterSpacing="5">JOIN NOW &amp; GET</text>
      <text x="240" y="248" textAnchor="middle" fill="#fff" fontSize="58" fontFamily="Arial,sans-serif" fontWeight="900" letterSpacing="-2">50% OFF</text>
      <text x="240" y="278" textAnchor="middle" fill="#00C2FF" fontSize="10" fontFamily="Arial,sans-serif" letterSpacing="3">FIRST 3 MONTHS</text>
      {["Unlimited Classes","Personal Trainer","Nutrition Plan","24/7 Access"].map((f,i)=>(
        <g key={f}><rect x="88" y={322+i*30} width="8" height="8" rx="2" fill="url(#axbar)"/><text x="106" y={332+i*30} fill="#ffffffcc" fontSize="11" fontFamily="Arial,sans-serif">{f}</text></g>
      ))}
      <rect x="120" y="446" width="240" height="22" rx="11" fill="url(#axbar)"/>
      <text x="240" y="461" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial,sans-serif" fontWeight="700" letterSpacing="2">AXONFITNESS.NG</text>
    </svg>
  );
}
const DESIGN_SVGS = [<Design0/>,<Design1/>,<Design2/>,<Design3/>];
const DESIGN_DATA = [
  { type:"Product Social Media Post", title:"Velora Skin — Lumière Crème", desc:"Luxury skincare Instagram post for Velora. Dark gold aesthetic, product jar centrepiece, elegant serif typography and premium brand language.", tags:["Social Media","Skincare","Luxury","Instagram Post","Product Design"] },
  { type:"Brand Drop Flyer", title:"Kova Street — Series 07 Drop", desc:"Streetwear new-drop announcement flyer for Kova. Bold red diagonal slash, tee product mockup, limited edition details and Naira pricing.", tags:["Streetwear","Flyer Design","Brand Identity","Drop Campaign","Typography"] },
  { type:"Café Menu Card", title:"Zeno Coffee — Menu Design", desc:"Branded menu card for Zeno Coffee. Warm cream palette, dark header band, gold logomark, hand-listed drinks with prices in Naira, and a line-art cup.", tags:["Menu Design","Café Branding","Print Design","Gold & Cream","Brand Identity"] },
  { type:"Fitness Promo Banner", title:"Axon Fitness — 50% Off Campaign", desc:"Gym membership promotional banner for Axon Fitness. Dark-tech grid aesthetic, blue gradient accents, bold offer headline and feature bullet list.", tags:["Fitness","Social Banner","Promo Design","Blue Gradient","Campaign Creative"] },
];

/* ─── DECK COVERS (title-slide SVG thumbnails, one per presentation) ─────── */
function DeckCover1() {
  return (<svg viewBox="0 0 480 300" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="dc1g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0f1923"/><stop offset="100%" stopColor="#1a2d42"/></linearGradient></defs><rect width="480" height="300" fill="url(#dc1g)"/><rect x="0" y="0" width="8" height="300" fill="#2B5BE0"/><text x="360" y="240" fill="#1a2d42" fontSize="160" fontFamily="Georgia,serif" fontWeight="900">01</text><text x="28" y="75" fill="#2B5BE0" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="4" fontWeight="700">DIGITAL MARKETING</text><text x="28" y="118" fill="white" fontSize="42" fontFamily="Georgia,serif" fontWeight="700">Trends</text><text x="28" y="170" fill="#2B5BE0" fontSize="42" fontFamily="Georgia,serif" fontWeight="700">2025</text><line x1="28" y1="192" x2="200" y2="192" stroke="#2B5BE0" strokeWidth="1.5"/><text x="28" y="215" fill="#ffffff55" fontSize="9" fontFamily="Arial,sans-serif">Kelvin Tony Bidi · Full Stack Developer &amp; VA</text><text x="440" y="284" textAnchor="end" fill="#ffffff20" fontSize="8" fontFamily="Arial,sans-serif">4 slides</text></svg>);
}
function DeckCover2() {
  return (<svg viewBox="0 0 480 300" style={{width:"100%",height:"100%",display:"block"}}><rect width="240" height="300" fill="#1C1A17"/><rect x="240" width="240" height="300" fill="#B85042"/><text x="250" y="220" fill="#C04535" fontSize="130" fontFamily="Georgia,serif" fontWeight="900">BG</text><text x="20" y="75" fill="#B85042" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="4" fontWeight="700">BUSINESS</text><text x="20" y="120" fill="white" fontSize="36" fontFamily="Georgia,serif" fontWeight="700">Growth</text><text x="20" y="162" fill="white" fontSize="36" fontFamily="Georgia,serif" fontWeight="700">Strategies</text><line x1="20" y1="185" x2="160" y2="185" stroke="#B85042" strokeWidth="1.5"/><text x="20" y="208" fill="#88807855" fontSize="9" fontFamily="Arial,sans-serif" fontStyle="italic">A Practical Framework for Scaling Revenue</text><text x="220" y="284" textAnchor="end" fill="#ffffff20" fontSize="8" fontFamily="Arial,sans-serif">5 slides</text></svg>);
}
function DeckCover3() {
  return (<svg viewBox="0 0 480 300" style={{width:"100%",height:"100%",display:"block"}}><rect width="480" height="300" fill="#051828"/><rect x="0" y="0" width="480" height="8" fill="#00A896"/><rect x="0" y="292" width="480" height="8" fill="#00A896"/><text x="320" y="220" fill="#082838" fontSize="130" fontFamily="Georgia,serif" fontWeight="900">SM</text><text x="28" y="68" fill="#00A896" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="4" fontWeight="700">SOCIAL MEDIA</text><text x="28" y="130" fill="white" fontSize="52" fontFamily="Georgia,serif" fontWeight="700">Master</text><text x="28" y="188" fill="white" fontSize="52" fontFamily="Georgia,serif" fontWeight="700">class</text>{[{n:1,l:"Strategy"},{n:2,l:"Content"},{n:3,l:"Ads"},{n:4,l:"Analytics"}].map((m,i)=>(<g key={m.n}><circle cx={28+i*56} cy={222} r={10} fill="#00A896"/><text x={28+i*56} y={226} textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial,sans-serif" fontWeight="700">{m.n}</text><text x={28+i*56} y={244} textAnchor="middle" fill="#88A8B8" fontSize="7" fontFamily="Arial,sans-serif">{m.l}</text></g>))}<text x="452" y="284" textAnchor="end" fill="#ffffff20" fontSize="8" fontFamily="Arial,sans-serif">12 slides</text></svg>);
}
function DeckCover4() {
  return (<svg viewBox="0 0 480 300" style={{width:"100%",height:"100%",display:"block"}}><rect width="480" height="300" fill="#0A0A0F"/><rect x="0" y="0" width="8" height="300" fill="#6B35D3"/><rect x="0" y="276" width="480" height="24" fill="#2A1455"/><text x="300" y="230" fill="#18102A" fontSize="170" fontFamily="Georgia,serif" fontWeight="900">GD</text><text x="28" y="75" fill="#6B35D3" fontSize="8" fontFamily="Arial,sans-serif" letterSpacing="4" fontWeight="700">GRAPHIC DESIGN</text><text x="28" y="125" fill="white" fontSize="44" fontFamily="Georgia,serif" fontWeight="700">Design</text><text x="28" y="175" fill="white" fontSize="44" fontFamily="Georgia,serif" fontWeight="700">That</text><text x="28" y="220" fill="#6B35D3" fontSize="36" fontFamily="Georgia,serif" fontWeight="700">Converts</text><text x="452" y="268" textAnchor="end" fill="#ffffff20" fontSize="8" fontFamily="Arial,sans-serif">12 slides</text></svg>);
}

const DECKS=[
  {
    title:"Digital Marketing Trends 2025",
    subtitle:"12-slide deck · Dark navy palette",
    desc:"5 key trends, platform guide, content strategy, email automation, 90-day action plan — deeply researched and beautifully designed.",
    slides:"12 slides",
    accent:T.blue,
    file:"deck1_DigitalMarketing.pptx",
    cover:<DeckCover1/>,
    tags:["Market Trends","Strategy","Platforms","Action Plan"],
  },
  {
    title:"Business Growth Strategies",
    subtitle:"12-slide deck · Terracotta palette",
    desc:"Acquire, Retain, Expand framework. KPI benchmarks, retention deep-dive, marketing funnel, team scaling, and 90-day roadmap.",
    slides:"12 slides",
    accent:"#B85042",
    file:"deck2_BusinessGrowth.pptx",
    cover:<DeckCover2/>,
    tags:["Growth Framework","KPIs","Retention","Revenue Expansion"],
  },
  {
    title:"Social Media Masterclass",
    subtitle:"12-slide deck · Ocean teal palette",
    desc:"Platforms, content pillars, optimal scheduling, analytics KPIs, paid ads funnel, community management, and influencer tiers.",
    slides:"12 slides",
    accent:"#00A896",
    file:"deck3_SocialMedia.pptx",
    cover:<DeckCover3/>,
    tags:["Content Strategy","Analytics","Paid Ads","Influencers"],
  },
  {
    title:"Graphic Design & Visual Branding",
    subtitle:"12-slide deck · Dark purple palette",
    desc:"Brand identity systems, colour psychology, typography, design principles, social media specs, tools, and the full design process.",
    slides:"12 slides",
    accent:"#6B35D3",
    file:"deck4_GraphicDesign.pptx",
    cover:<DeckCover4/>,
    tags:["Brand Identity","Typography","Colour Theory","Design Process"],
  },
];

/* ─── DEV PROJECTS ────────────────────────────────────────────────────────── */
const DEV_PROJECTS=[
  {name:"MarketForge",url:"https://github.com/Codex723/MarketForge",desc:"Full-stack multi-vendor marketplace for Nigeria with smart delivery routing across 36 cities, Paystack payment integration, JWT auth, and Cloudinary media management.",stack:["Next.js 14","Express.js","MongoDB","Paystack","JWT"],accent:T.gold,icon:Icons.shoppingCart},
  {name:"Hotel Management System",url:"https://github.com/Codex723/Hotel-Management-System",desc:"Full-stack Property Management System (PMS) that digitises the complete guest lifecycle — from reservation and room assignment to automated billing and checkout.",stack:["TypeScript","Node.js","Express","MongoDB"],accent:T.blue,icon:Icons.building},
  {name:"Stellar Vault",url:"https://github.com/Stellar-Vault-Org/Stellar-Vault",desc:"Decentralised yield aggregator on Soroban (Stellar Network) implementing SEP-0056. Users deposit assets into secure non-custodial vaults with automated yield optimisation.",stack:["TypeScript","Soroban","Stellar Network","DeFi"],accent:"#8B5BE0",icon:Icons.lock},
  {name:"StellarStream",url:"https://github.com/Codex723/StellarStream",desc:"Decentralised real-time payroll protocol on Soroban — streams assets second-by-second with linear distribution logic and non-custodial security.",stack:["TypeScript","Soroban","Stellar"],accent:"#1a9E50",icon:Icons.activity},
  {name:"Creditra Frontend",url:"https://github.com/Codex723/Creditra-Frontend",desc:"Frontend contribution to Creditra, a financial platform improving credit accessibility and management across emerging markets.",stack:["TypeScript","React.js"],accent:T.red,icon:Icons.creditCard},
];
const TECH=[
  {label:"Frontend",items:["HTML5","CSS3","JavaScript","React","Next.js 14"],color:T.blue},
  {label:"Backend",items:["Node.js","Express.js","PHP","REST APIs"],color:T.gold},
  {label:"Database",items:["MongoDB","MySQL"],color:"#1a9E50"},
  {label:"Tools",items:["Git","GitHub","VSCode","Postman"],color:"#8B5BE0"},
  {label:"Blockchain",items:["Soroban","Stellar","DeFi"],color:T.red},
];

/* ─── SHARED STYLES ───────────────────────────────────────────────────────── */
const s={
  secHead:{display:"flex",alignItems:"center",gap:12,marginBottom:28},
  secIcon:{width:36,height:36,borderRadius:8,background:"rgba(201,168,76,0.1)",border:"0.5px solid rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:T.gold,flexShrink:0},
  secLbl:{fontSize:11,letterSpacing:"3px",textTransform:"uppercase",color:"#666",fontWeight:500},
  card:{borderRadius:12,overflow:"hidden",border:"0.5px solid rgba(255,255,255,0.07)",background:"#111",transition:"transform .25s, border-color .25s, box-shadow .25s",cursor:"pointer"},
  cardHov:{transform:"translateY(-4px)",borderColor:"rgba(201,168,76,0.5)",boxShadow:"0 16px 48px rgba(0,0,0,0.6)"},
  cardThumb:{width:"100%",aspectRatio:"16/10",overflow:"hidden",position:"relative",display:"block"},
  overlay:{position:"absolute",inset:0,background:"rgba(0,0,0,0)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .25s",opacity:0},
  overlayHov:{background:"rgba(0,0,0,0.35)",opacity:1},
  viewPill:{background:"rgba(201,168,76,0.92)",color:"#0A0A0A",fontSize:11,fontWeight:700,padding:"7px 18px",borderRadius:20,letterSpacing:".8px"},
  cardBody:{padding:"14px 16px 18px"},
  cardType:{fontSize:9,letterSpacing:"2px",color:T.gold,fontWeight:600,textTransform:"uppercase",marginBottom:5},
  cardTitle:{fontSize:13,fontWeight:600,color:"#fff",marginBottom:4},
  cardDesc:{fontSize:11,color:"#555",lineHeight:1.55},
};

function SectionHead({icon,label}){return(<div style={s.secHead}><div style={s.secIcon}>{icon}</div><span style={s.secLbl}>{label}</span></div>);}
function Card({children,onClick,style}){const[hov,setHov]=useState(false);return(<div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...s.card,...(hov?s.cardHov:{}),...style}}>{typeof children==="function"?children(hov):children}</div>);}
function Lightbox({open,onClose,children}){useEffect(()=>{const h=(e)=>e.key==="Escape"&&onClose();window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onClose]);if(!open)return null;return(<div onClick={(e)=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(10px)"}}><div style={{background:"#111",borderRadius:16,maxWidth:860,width:"100%",maxHeight:"90vh",overflowY:"auto",border:"0.5px solid rgba(255,255,255,0.1)",position:"relative"}}><button onClick={onClose} style={{position:"absolute",top:14,right:14,width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.08)",border:"none",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}>{Icons.close}</button>{children}</div></div>);}
function LBInfo({type,title,desc,tags,nav}){return(<div style={{padding:"22px 26px 26px"}}><div style={{fontSize:9,letterSpacing:"2px",color:T.gold,fontWeight:600,textTransform:"uppercase",marginBottom:7}}>{type}</div><div style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:"#fff",marginBottom:8}}>{title}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.7,marginBottom:18}}>{desc}</div>{tags&&<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>{tags.map(t=><span key={t} style={{fontSize:10,padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"}}>{t}</span>)}</div>}{nav&&<div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>{nav}</div>}</div>);}
function NavBtn({children,onClick}){return<button onClick={onClick} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:T.font,display:"flex",alignItems:"center",gap:6}}>{children}</button>;}

/* ─── DEV PROJECT CARD ────────────────────────────────────────────────────── */
function DevCard({project}){
  const[hov,setHov]=useState(false);
  return(
    <a href={project.url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{textDecoration:"none",display:"block",borderRadius:14,padding:"22px 22px 20px",background:hov?"#151515":"#111",border:`0.5px solid ${hov?project.accent+"70":"rgba(255,255,255,0.07)"}`,transition:"all .25s",boxShadow:hov?`0 12px 40px ${project.accent}20`:"none",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:project.accent,opacity:hov?1:0.3,transition:"opacity .25s"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:8,background:`${project.accent}18`,border:`0.5px solid ${project.accent}35`,display:"flex",alignItems:"center",justifyContent:"center",color:project.accent,flexShrink:0}}>
              {project.icon}
            </div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.2}}>{project.name}</div>
            <div style={{fontSize:9,color:project.accent,letterSpacing:"1.5px",marginTop:2,fontWeight:600,textTransform:"uppercase"}}>GitHub Project</div>
          </div>
        </div>
        <div style={{color:hov?project.accent:"rgba(255,255,255,0.2)",transition:"color .2s",flexShrink:0,marginTop:2}}>{Icons.extLink}</div>
      </div>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.7,marginBottom:14}}>{project.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {project.stack.map(t=><span key={t} style={{fontSize:9.5,padding:"3px 10px",borderRadius:20,background:`${project.accent}12`,border:`0.5px solid ${project.accent}35`,color:project.accent,fontWeight:500}}>{t}</span>)}
      </div>
    </a>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
export default function Portfolio(){
  const[designLB,setDesignLB]=useState(null);
  const[videos,setVideos]=useState([null]);
  const handleVideo=(i,file)=>{if(!file)return;const url=URL.createObjectURL(file);setVideos(v=>{const n=[...v];n[i]=url;return n;});};

  const navLinks=[
    {label:"About",href:"#about"},
    {label:"Dev Projects",href:"#dev"},
    {label:"Design",href:"#design"},
    {label:"Slides",href:"#slides"},
    {label:"Video",href:"#video"},
    {label:"Contact",href:"#contact"},
  ];
  const sec={maxWidth:980,margin:"0 auto",padding:"64px 40px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"};

  return(
    <div style={{minHeight:"100vh",background:T.dark,color:"#fff",fontFamily:T.font}}>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(10,10,10,0.94)",backdropFilter:"blur(14px)",borderBottom:"0.5px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:56}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:6,background:T.gold,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
          </div>
          <span style={{fontSize:13,fontWeight:600,letterSpacing:.5}}>Kelvin Tony Bidi</span>
        </div>
        <div style={{display:"flex",gap:2}}>
          {navLinks.map(n=>(
            <a key={n.label} href={n.href} style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:11,fontWeight:500,padding:"6px 9px",borderRadius:6,transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{n.label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"88px 40px 72px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",position:"relative",overflow:"hidden"}}>
        {[520,300].map((sz,i)=><div key={i} style={{position:"absolute",top:-sz*.27,right:-sz*.27,width:sz,height:sz,borderRadius:"50%",border:`0.5px solid rgba(201,168,76,${i===0?.07:.12})`,pointerEvents:"none"}}/>)}
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(201,168,76,0.08)",border:"0.5px solid rgba(201,168,76,0.25)",color:T.gold,fontSize:10,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",padding:"5px 14px",borderRadius:20,marginBottom:28}}>
          {Icons.zap}&nbsp;Available for Immediate Start &nbsp;·&nbsp; Remote &nbsp;·&nbsp; Nigeria
        </div>
        <h1 style={{fontFamily:T.serif,fontSize:"clamp(44px,7vw,80px)",fontWeight:900,lineHeight:1.03,letterSpacing:"-2px",marginBottom:18}}>
          Kelvin Tony<br/><span style={{color:T.gold}}>Bidi</span>
        </h1>
        <p style={{fontSize:16,color:"rgba(255,255,255,0.45)",fontWeight:300,maxWidth:600,lineHeight:1.75,marginBottom:32}}>
          Full Stack Developer — building real-world web apps with React, Next.js, Node.js &amp; MongoDB. I also bring creative range: graphic design, video editing, and polished presentations.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:36}}>
          {["Full Stack Dev","React · Next.js","Node.js · Express","MongoDB","TypeScript","Blockchain · Soroban","Creative + Design"].map(t=>(
            <span key={t} style={{fontSize:11,fontWeight:500,background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",padding:"5px 13px",borderRadius:20}}>{t}</span>
          ))}
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="#contact" style={{background:T.gold,color:"#0A0A0A",padding:"13px 28px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
            Hire Me {Icons.arrowR}
          </a>
          <a href="https://github.com/Codex723" target="_blank" rel="noopener noreferrer" style={{background:"transparent",color:"rgba(255,255,255,0.55)",border:"0.5px solid rgba(255,255,255,0.18)",padding:"13px 28px",borderRadius:8,fontSize:13,fontWeight:400,textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>
            {Icons.github} GitHub
          </a>
          <a href="#dev" style={{background:"transparent",color:"rgba(255,255,255,0.55)",border:"0.5px solid rgba(255,255,255,0.18)",padding:"13px 28px",borderRadius:8,fontSize:13,fontWeight:400,textDecoration:"none"}}>
            View Portfolio
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"0.5px solid rgba(255,255,255,0.06)",maxWidth:980,margin:"0 auto"}}>
        {[["5+","Real-World Apps"],["10+","GitHub Projects"],["Full","Stack Depth"],["100%","Remote Ready"]].map(([n,l])=>(
          <div key={l} style={{padding:24,borderRight:"0.5px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
            <div style={{fontFamily:T.serif,fontSize:28,fontWeight:700,lineHeight:1}}><span style={{color:T.gold}}>{n}</span></div>
            <div style={{fontSize:11,color:T.mid,marginTop:5}}>{l}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" style={sec}>
        <SectionHead icon={Icons.user} label="About Me"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
          <div>
            <p style={{fontSize:15,lineHeight:1.85,color:"rgba(255,255,255,0.5)",marginBottom:18}}>
              I&apos;m a Full Stack Developer from Kaduna, Nigeria. I build clean, powerful web applications with modern stacks — and bring creative range to every project through graphic design, video editing, and presentation design.
            </p>
            <p style={{fontSize:14,lineHeight:1.8,color:"rgba(255,255,255,0.3)",marginBottom:20}}>
              I&apos;ve shipped multi-vendor marketplaces, hotel PMS systems, and DeFi protocols on the Stellar blockchain. My creative work — branded graphics, video edits, and polished decks — makes me a developer who communicates as well as he codes.
            </p>
            <a href="https://github.com/Codex723" target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:7,color:T.gold,fontSize:12,textDecoration:"none",border:"0.5px solid rgba(201,168,76,0.3)",padding:"7px 16px",borderRadius:8,fontWeight:500}}>
              {Icons.github} github.com/Codex723
            </a>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[[Icons.code,"Full Stack Dev","Advanced"],[Icons.palette,"Graphic Design","Advanced"],[Icons.film,"Video Editing","Advanced"],[Icons.monitor,"PowerPoint","Expert"],[Icons.layers,"ChatGPT Research","Expert"]].map(([icon,name,lvl])=>(
              <div key={name} style={{background:"#141414",borderRadius:10,border:"0.5px solid rgba(255,255,255,0.07)",padding:16}}>
                <div style={{color:T.gold,marginBottom:10}}>{icon}</div>
                <div style={{fontSize:12,fontWeight:600,color:"#fff",marginBottom:3}}>{name}</div>
                <div style={{fontSize:10,color:"#555"}}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEV PROJECTS */}
      <section id="dev" style={sec}>
        <SectionHead icon={Icons.code} label="Full Stack Development · GitHub Projects"/>
        {/* Tech stack */}
        <div style={{marginBottom:30}}>
          {TECH.map(g=>(
            <div key={g.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:g.color,fontWeight:700,width:72,flexShrink:0}}>{g.label}</span>
              {g.items.map(item=><span key={item} style={{fontSize:10,padding:"3px 10px",borderRadius:20,background:`${g.color}12`,border:`0.5px solid ${g.color}35`,color:g.color,fontWeight:500}}>{item}</span>)}
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {DEV_PROJECTS.map(p=><DevCard key={p.name} project={p}/>)}
        </div>
      </section>

      {/* DESIGN */}
      <section id="design" style={sec}>
        <SectionHead icon={Icons.palette} label="Graphic Design"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {DESIGN_DATA.map((d,i)=>(
            <Card key={d.title} onClick={()=>setDesignLB(i)}>
              {hov=><>
                <div style={s.cardThumb}>{DESIGN_SVGS[i]}<div style={{...s.overlay,...(hov?s.overlayHov:{})}}><div style={s.viewPill}>VIEW FULL</div></div></div>
                <div style={s.cardBody}><div style={s.cardType}>{d.type}</div><div style={s.cardTitle}>{d.title}</div><div style={s.cardDesc}>{d.desc.slice(0,82)}…</div></div>
              </>}
            </Card>
          ))}
        </div>
      </section>

      {/* SLIDES */}
      <section id="slides" style={sec}>
        <SectionHead icon={Icons.layers} label="PowerPoint Presentations"/>
        <div style={{background:"rgba(43,91,224,0.04)",border:"0.5px solid rgba(43,91,224,0.15)",borderRadius:10,padding:"12px 16px",marginBottom:28,fontSize:12,color:"rgba(255,255,255,0.35)",display:"flex",gap:8,alignItems:"center"}}>
          {Icons.check} Real .pptx files — click Download to get the full presentation
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
          {DECKS.map((dk)=>(
            <div key={dk.title} style={{borderRadius:14,overflow:"hidden",background:"#111",border:"0.5px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column"}}>
              <div style={{aspectRatio:"16/10",background:"#000",position:"relative",overflow:"hidden"}}>
                {dk.cover}
                <div style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.7)",color:"#fff",fontSize:8,fontWeight:600,padding:"3px 8px",borderRadius:4,letterSpacing:"1px"}}>{dk.slides.toUpperCase()}</div>
              </div>
              <div style={{padding:"18px 18px 14px",flex:1,display:"flex",flexDirection:"column",gap:6}}>
                <div style={{fontSize:9,letterSpacing:"1.5px",color:dk.accent,fontWeight:700,textTransform:"uppercase"}}>{dk.subtitle}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",fontFamily:T.serif,lineHeight:1.3}}>{dk.title}</div>
                <div style={{fontSize:11.5,color:"rgba(255,255,255,0.38)",lineHeight:1.65,marginTop:2,flex:1}}>{dk.desc}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:6}}>
                  {dk.tags.map(t=><span key={t} style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:`${dk.accent}14`,border:`0.5px solid ${dk.accent}35`,color:dk.accent,fontWeight:500}}>{t}</span>)}
                </div>
              </div>
              <a href={`/${dk.file}`} download style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px 0",background:dk.accent,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none",letterSpacing:"0.5px"}}>
                {Icons.download} Download .pptx
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
<section id="video" style={sec}>
  <SectionHead icon={Icons.film} label="Video Editing" />
  
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>

    {/* Card 1 — Product Promo */}
    <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.08)", background: "#0e0e0e" }}>
      <div style={{ aspectRatio: "16/10", background: "#000", position: "relative", overflow: "hidden" }}>
        <video src="/video_product_promo.mp4" controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={s.cardBody}>
        <div style={s.cardType}>Video Editing · Product</div>
        <div style={s.cardTitle}>Product Promo Reel</div>
        <div style={s.cardDesc}>
          Clean, high-impact product showcase with precise timing, motion sync, and a refined brand-focused color grade.
        </div>
      </div>
    </div>

    {/* Card 2 — Brand Story */}
    <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.08)", background: "#0e0e0e" }}>
      <div style={{ aspectRatio: "16/10", background: "#000", position: "relative", overflow: "hidden" }}>
        <video src="/video_brand_story.mp4" controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={s.cardBody}>
        <div style={s.cardType}>Video Editing · Storytelling</div>
        <div style={s.cardTitle}>Brand Story Film</div>
        <div style={s.cardDesc}>
          Narrative-led edit focused on pacing, emotion, and seamless audio-visual alignment from concept to final delivery.
        </div>
      </div>
    </div>

    {/* Card 3 — AI Modelling */}
    <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.08)", background: "#0e0e0e" }}>
      <div style={{ aspectRatio: "16/10", background: "#000", position: "relative", overflow: "hidden" }}>
        <video src="/video_ai.mp4" controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={s.cardBody}>
        <div style={s.cardType}>AI Modelling · Visual</div>
        <div style={s.cardTitle}>AI Model Dance Reel</div>
        <div style={s.cardDesc}>
          AI-generated model performing a fluid, stylized dance sequence, designed for short-form social platforms.
        </div>
      </div>
    </div>

  </div>
</section>

      {/* CONTACT */}
      <section id="contact" style={{...sec,borderBottom:"none"}}>
        <SectionHead icon={Icons.mail} label="Contact"/>
        <div style={{background:"linear-gradient(135deg,#141414 0%,#1a1a14 100%)",border:"0.5px solid rgba(201,168,76,0.2)",borderRadius:16,padding:"52px 40px",textAlign:"center"}}>
          <h2 style={{fontFamily:T.serif,fontSize:36,fontWeight:700,marginBottom:10}}>Ready to Work Together?</h2>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.35)",marginBottom:32}}>Available for freelance, contract, and remote full-time dev work.</p>
          <div style={{background:"#0A0A0A",borderRadius:10,padding:"22px 30px",display:"inline-block",textAlign:"left",marginBottom:24}}>
            <div style={{fontSize:9,color:"#444",letterSpacing:"2px",marginBottom:5}}>EMAIL</div>
            <div style={{fontSize:14,color:T.gold,marginBottom:14}}>bidifortune@gmail.com</div>
            <div style={{fontSize:9,color:"#444",letterSpacing:"2px",marginBottom:5}}>GITHUB</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",fontWeight:500,marginBottom:14}}>github.com/Codex723</div>
          </div>
          <br/>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.08)",border:"0.5px solid rgba(34,197,94,0.25)",color:T.green,fontSize:11,padding:"5px 14px",borderRadius:20,fontWeight:500}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:T.green}}/> Available for immediate start
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"0.5px solid rgba(255,255,255,0.06)",padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:980,margin:"0 auto"}}>
        <span style={{fontSize:11,color:"#2a2a2a"}}>Kelvin Tony Bidi · Full Stack Developer</span>
        <span style={{fontSize:11,color:"#2a2a2a"}}>2026</span>
      </footer>

      {/* LIGHTBOXES */}
      {designLB!==null&&<Lightbox open onClose={()=>setDesignLB(null)}><div style={{width:"100%",aspectRatio:"16/9",borderRadius:"14px 14px 0 0",overflow:"hidden",background:"#111"}}>{DESIGN_SVGS[designLB]}</div><LBInfo type={DESIGN_DATA[designLB].type} title={DESIGN_DATA[designLB].title} desc={DESIGN_DATA[designLB].desc} tags={DESIGN_DATA[designLB].tags} nav={[<NavBtn key="p" onClick={()=>setDesignLB(i=>(i-1+4)%4)}>{Icons.prev} Prev</NavBtn>,<NavBtn key="n" onClick={()=>setDesignLB(i=>(i+1)%4)}>Next {Icons.next}</NavBtn>]}/></Lightbox>}
    </div>
  );
}
