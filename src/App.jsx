import { useState, useEffect, useRef } from "react";

// ── PREMIUM DESIGN SYSTEM ─────────────────────────────────────────────────────
const C = {
  // Backgrounds
  bg:"#080810", bg2:"#0F0F1A", bg3:"#15151F", card:"#12121C",
  cardHover:"#1A1A28", glass:"rgba(255,255,255,0.04)",
  // Borders
  border:"rgba(255,255,255,0.08)", borderHover:"rgba(255,255,255,0.14)",
  // Brand
  blue:"#4F8EF7", blueDeep:"#2563EB", blueDark:"#1a3a7a",
  blueGlow:"rgba(79,142,247,0.25)", blueLight:"rgba(79,142,247,0.12)",
  purple:"#A78BFA", purpleDeep:"#7C3AED",
  purpleGlow:"rgba(167,139,250,0.25)", purpleLight:"rgba(167,139,250,0.12)",
  // Accent
  green:"#34D399", greenDeep:"#059669", greenLight:"rgba(52,211,153,0.12)",
  orange:"#FB923C", orangeLight:"rgba(251,146,60,0.12)",
  red:"#F87171", redLight:"rgba(248,113,113,0.12)",
  yellow:"#FBBF24", cyan:"#22D3EE",
  // Text
  text:"#F0F0FF", text2:"#C4C4D4", muted:"#7B7B9A", faint:"#3D3D55",
  // Gradients (used inline)
  grad1:"linear-gradient(135deg, #4F8EF7 0%, #A78BFA 100%)",
  grad2:"linear-gradient(135deg, #34D399 0%, #4F8EF7 100%)",
  grad3:"linear-gradient(135deg, #FB923C 0%, #F87171 100%)",
  grad4:"linear-gradient(135deg, #A78BFA 0%, #F87171 100%)",
};

// ── SVG ICON SYSTEM ────────────────────────────────────────────────────────────
const Icon = ({ name, size=20, color="currentColor", style:s }) => {
  const icons = {
    // Navigation
    diary: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    workout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 9h2v6H3zM19 9h2v6h-2z"/><rect x="5" y="11.5" width="14" height="1" rx=".5"/></svg>,
    progress: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    profile: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    // Actions
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    fire: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M12 23C7.03 23 3 18.97 3 14c0-2.21.9-4.21 2.34-5.66L12 2l6.66 6.34A7.97 7.97 0 0 1 21 14c0 4.97-4.03 9-9 9zm0-2c3.87 0 7-3.13 7-7 0-1.69-.63-3.25-1.76-4.42L12 5.17l-5.24 4.41A5.97 5.97 0 0 0 5 14c0 3.87 3.13 7 7 7z"/></svg>,
    water: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M12 2L5.5 8.5A9 9 0 1 0 12 2zm0 16a5 5 0 0 1-5-5c0-2.21 1.79-4 4-4a4 4 0 0 0 4 4 5 5 0 0 1-3 5z"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="10"/><path d="M17 4H7l-2 5a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5l-2-5z"/><line x1="5" y1="4" x2="2" y2="4"/><line x1="22" y1="4" x2="19" y2="4"/></svg>,
    // Food
    scan: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9V5a2 2 0 0 1 2-2h4M15 3h4a2 2 0 0 1 2 2v4M3 15v4a2 2 0 0 1 2 2h4M15 21h4a2 2 0 0 1 2-2v-4"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    barcode: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="4" height="16"/><rect x="6" y="4" width="1" height="16"/><rect x="8" y="4" width="3" height="16"/><rect x="13" y="4" width="1" height="16"/><rect x="15" y="4" width="2" height="16"/><rect x="19" y="4" width="4" height="16"/></svg>,
    // Workout
    dumbbell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11"/><path d="M3 9h2v6H3zm16 0h2v6h-2z"/><rect x="5" y="11.5" width="14" height="1"/></svg>,
    lightning: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    timer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14 15"/><path d="M9 3h6M12 1v2"/></svg>,
    // Charts
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    weight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    ai: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M12 16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z"/><path d="M4 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/><path d="M22 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  };
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,...s}}>{icons[name]||null}</span>;
};

// ── APP LOGO SVG ───────────────────────────────────────────────────────────────
const AppLogo = ({ size=40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="logoGrad1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4F8EF7"/>
        <stop offset="100%" stopColor="#A78BFA"/>
      </linearGradient>
      <linearGradient id="logoGrad2" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399"/>
        <stop offset="100%" stopColor="#4F8EF7"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    {/* Background rounded rect */}
    <rect width="80" height="80" rx="18" fill="url(#logoGrad1)"/>
    {/* Dumbbell icon */}
    <rect x="18" y="34" width="44" height="12" rx="6" fill="white" opacity="0.95"/>
    <rect x="10" y="26" width="14" height="28" rx="5" fill="white"/>
    <rect x="56" y="26" width="14" height="28" rx="5" fill="white"/>
    <rect x="10" y="32" width="14" height="16" rx="4" fill="white" opacity="0.5"/>
    <rect x="56" y="32" width="14" height="16" rx="4" fill="white" opacity="0.5"/>
    {/* Lightning bolt accent */}
    <polygon points="43,22 36,41 42,41 37,58 50,35 43,35" fill="url(#logoGrad2)" opacity="0.9" filter="url(#glow)"/>
  </svg>
);

// ── PREMIUM UI COMPONENTS ──────────────────────────────────────────────────────
const GlassCard = ({ children, style:s, onClick, glow }) => (
  <div onClick={onClick} style={{
    background: C.glass,
    backdropFilter:"blur(12px)",
    border:`1px solid ${C.border}`,
    borderRadius:20,
    overflow:"hidden",
    cursor:onClick?"pointer":"default",
    transition:"all .2s",
    boxShadow: glow ? `0 0 24px ${glow}` : "none",
    ...s
  }}>{children}</div>
);

const GradientBtn = ({ children, onClick, gradient, full, sm, disabled, style:s }) => {
  const grad = gradient || C.grad1;
  return (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? C.faint : grad,
    border:"none", borderRadius:14, color:"#fff",
    padding: sm ? "10px 20px" : "15px 24px",
    fontSize: sm ? 13 : 15, fontWeight:700,
    cursor: disabled?"not-allowed":"pointer",
    width: full?"100%":"auto",
    opacity: disabled?0.5:1,
    letterSpacing:"0.3px",
    boxShadow: disabled ? "none" : "0 4px 20px rgba(0,0,0,0.3)",
    transition:"all .2s",
    ...s
  }}>{children}</button>
  );
};

const GhostBtn = ({ children, onClick, color, sm, full }) => {
  const btnColor = color || C.blue;
  return (
  <button onClick={onClick} style={{
    background:"transparent", border:`1.5px solid ${btnColor}40`,
    borderRadius:14, color:btnColor,
    padding: sm?"9px 18px":"13px 22px",
    fontSize: sm?13:15, fontWeight:600,
    cursor:"pointer", width:full?"100%":"auto",
    transition:"all .2s",
  }}>{children}</button>
  );
};

const PremiumInput = ({ value, onChange, placeholder, type="text", autoFocus, style:s }) => (
  <input value={value} onChange={onChange} placeholder={placeholder} type={type} autoFocus={autoFocus}
    style={{
      width:"100%", padding:"14px 18px",
      background:"rgba(255,255,255,0.05)",
      border:`1.5px solid ${C.border}`,
      borderRadius:14, fontSize:15, color:C.text,
      outline:"none", boxSizing:"border-box",
      transition:"border-color .2s",
      ...s
    }}
    onFocus={e=>e.target.style.borderColor=C.blue}
    onBlur={e=>e.target.style.borderColor=C.border}
  />
);

// Enhanced Ring Chart
const RingChart = ({ segments, size=90, label, sub, thickness=9 }) => {
  const total=segments.reduce((s,g)=>s+g.val,0)||1;
  let off=0; const r=(size-thickness*2)/2, circ=2*Math.PI*r, cx=size/2, cy=size/2;
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.faint} strokeWidth={thickness}/>
        {segments.map((seg,i)=>{
          const pct=seg.val/total, dash=pct*circ;
          const el=<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-off*circ}
            strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>;
          off+=pct; return el;
        })}
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:thickness===9?15:13,fontWeight:800,color:C.text,lineHeight:1}}>{label}</div>
        {sub&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{sub}</div>}
      </div>
    </div>
  );
};

// Premium bar chart
const BarViz = ({ data, color, height=70, showValues }) => {
  const max=Math.max(...data.map(d=>d.val),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:5,height}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          {showValues&&d.val>0&&<div style={{fontSize:7,color:C.muted,fontWeight:700}}>{d.val}</div>}
          <div style={{
            width:"100%",
            borderRadius:"6px 6px 0 0",
            background: d.highlight
              ? `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`
              : `${color}30`,
            height:`${Math.max(4,(d.val/max)*(height-22))}px`,
            transition:"height .5s cubic-bezier(.4,0,.2,1)",
            boxShadow: d.highlight ? `0 -4px 12px ${color}44` : "none",
          }}/>
          <div style={{fontSize:9,color:d.highlight?C.text2:C.muted,fontWeight:d.highlight?700:400}}>{d.label}</div>
        </div>
      ))}
    </div>
  );
};

// Line chart (premium)
const LineViz = ({data,color,height=100,label}) => {
  if(!data||data.length<2) return (
    <div style={{height,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
      <Icon name="chart" size={28} color={C.faint}/>
      <div style={{fontSize:12,color:C.muted}}>Log more sessions to see your trend</div>
    </div>
  );
  const max=Math.max(...data.map(d=>d.val),1),min=Math.min(...data.map(d=>d.val),0);
  const W=300,H=height-22;
  const pts=data.map((d,i)=>({x:(i/(data.length-1))*W,y:H-((d.val-min)/(max-min||1))*H}));
  const path=pts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area=`${path} L${pts[pts.length-1].x},${H} L0,${H} Z`;
  const gid=`lv${color.replace(/[^a-z0-9]/gi,"")}${Math.random().toString(36).slice(2,5)}`;
  return (
    <div>
      {label&&<div style={{fontSize:11,color:C.muted,marginBottom:6}}>{label}</div>}
      <svg viewBox={`0 0 ${W} ${H+22}`} style={{width:"100%",height}}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`}/>
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={C.bg2}/>
            <circle cx={p.x} cy={p.y} r="2.5" fill={color}/>
          </g>
        ))}
        {data.map((d,i)=><text key={i} x={(i/(data.length-1))*W} y={H+18} textAnchor="middle" fontSize="8" fill={C.muted}>{d.label}</text>)}
      </svg>
    </div>
  );
};

// Stat badge
const StatBadge = ({ label, value, color, icon }) => (
  <div style={{background:C.glass,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 12px",flex:1}}>
    {icon&&<div style={{marginBottom:6}}><Icon name={icon} size={18} color={color}/></div>}
    <div style={{fontSize:22,fontWeight:900,color,lineHeight:1}}>{value}</div>
    <div style={{fontSize:11,color:C.muted,marginTop:4}}>{label}</div>
  </div>
);

// Section header
const SectionHeader = ({ title, action }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,marginTop:4}}>
    <div style={{fontSize:17,fontWeight:800,color:C.text,letterSpacing:"-0.3px"}}>{title}</div>
    {action}
  </div>
);

// Tag / pill
const Tag = ({ children, color, bg }) => {
  const tagColor = color || C.blue;
  return (
  <span style={{
    background: bg || `${tagColor}18`,
    color: tagColor,
    fontSize:10, fontWeight:700,
    borderRadius:8, padding:"3px 8px",
    whiteSpace:"nowrap", letterSpacing:"0.2px",
    border:`1px solid ${tagColor}25`,
  }}>{children}</span>
  );
};


const MUSCLE_EMOJI = {
  "Chest":"🫁","Back":"🔙","Legs":"🦵","Shoulders":"💆","Arms":"💪",
  "Core":"🔥","Glutes":"🍑","Cardio":"🏃","Full Body":"⚡","Calves":"🦶",
  "Forearms":"🤜","Traps":"🏔️",
};

const BASE_EXERCISES = [
  {id:"bench_bb",      name:"Bench Press (Barbell)",           muscle:"Chest",     equipment:"Barbell",    type:"strength", secondary:["Triceps","Shoulders"]},
  {id:"bench_db",      name:"Bench Press (Dumbbell)",          muscle:"Chest",     equipment:"Dumbbell",   type:"strength", secondary:["Triceps","Shoulders"]},
  {id:"incline_bb",    name:"Incline Bench Press (Barbell)",   muscle:"Chest",     equipment:"Barbell",    type:"strength", secondary:["Shoulders","Triceps"]},
  {id:"incline_db",    name:"Incline Bench Press (Dumbbell)",  muscle:"Chest",     equipment:"Dumbbell",   type:"strength", secondary:["Shoulders","Triceps"]},
  {id:"decline_bb",    name:"Decline Bench Press (Barbell)",   muscle:"Chest",     equipment:"Barbell",    type:"strength", secondary:["Triceps"]},
  {id:"decline_db",    name:"Decline Bench Press (Dumbbell)",  muscle:"Chest",     equipment:"Dumbbell",   type:"strength", secondary:["Triceps"]},
  {id:"chest_fly_db",  name:"Chest Fly (Dumbbell)",            muscle:"Chest",     equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"cable_fly",     name:"Cable Fly",                       muscle:"Chest",     equipment:"Cable",      type:"strength", secondary:[]},
  {id:"pec_deck",      name:"Butterfly (Pec Deck)",            muscle:"Chest",     equipment:"Machine",    type:"strength", secondary:[]},
  {id:"chest_press_m", name:"Chest Press (Machine)",           muscle:"Chest",     equipment:"Machine",    type:"strength", secondary:["Triceps","Shoulders"]},
  {id:"pushup",        name:"Push-up",                         muscle:"Chest",     equipment:"Bodyweight", type:"strength", secondary:["Triceps","Shoulders"]},
  {id:"pushup_wide",   name:"Push-up (Wide Grip)",             muscle:"Chest",     equipment:"Bodyweight", type:"strength", secondary:["Triceps"]},
  {id:"dips_chest",    name:"Chest Dips",                      muscle:"Chest",     equipment:"Bodyweight", type:"strength", secondary:["Triceps","Shoulders"]},
  {id:"pullover_db",   name:"Pullover (Dumbbell)",             muscle:"Chest",     equipment:"Dumbbell",   type:"strength", secondary:["Back","Triceps"]},
  {id:"deadlift",      name:"Deadlift (Barbell)",              muscle:"Back",      equipment:"Barbell",    type:"strength", secondary:["Legs","Glutes","Traps"]},
  {id:"sumo_dl",       name:"Sumo Deadlift (Barbell)",         muscle:"Back",      equipment:"Barbell",    type:"strength", secondary:["Legs","Glutes"]},
  {id:"row_bb",        name:"Bent Over Row (Barbell)",         muscle:"Back",      equipment:"Barbell",    type:"strength", secondary:["Biceps","Shoulders"]},
  {id:"row_db",        name:"Bent Over Row (Dumbbell)",        muscle:"Back",      equipment:"Dumbbell",   type:"strength", secondary:["Biceps"]},
  {id:"tbar_row",      name:"T-Bar Row",                       muscle:"Back",      equipment:"Barbell",    type:"strength", secondary:["Biceps"]},
  {id:"pullup",        name:"Pull-up",                         muscle:"Back",      equipment:"Bodyweight", type:"strength", secondary:["Biceps","Shoulders"]},
  {id:"chinup",        name:"Chin-up",                         muscle:"Back",      equipment:"Bodyweight", type:"strength", secondary:["Biceps"]},
  {id:"lat_cable",     name:"Lat Pulldown (Cable)",            muscle:"Back",      equipment:"Cable",      type:"strength", secondary:["Biceps"]},
  {id:"seat_row_c",    name:"Seated Cable Row (V-Grip)",       muscle:"Back",      equipment:"Cable",      type:"strength", secondary:["Biceps"]},
  {id:"seat_row_wb",   name:"Seated Cable Row (Wide Bar)",     muscle:"Back",      equipment:"Cable",      type:"strength", secondary:["Biceps","Shoulders"]},
  {id:"single_row_db", name:"Single Arm Row (Dumbbell)",       muscle:"Back",      equipment:"Dumbbell",   type:"strength", secondary:["Biceps"]},
  {id:"row_machine",   name:"Machine Row",                     muscle:"Back",      equipment:"Machine",    type:"strength", secondary:["Biceps"]},
  {id:"good_morning",  name:"Good Morning (Barbell)",          muscle:"Back",      equipment:"Barbell",    type:"strength", secondary:["Glutes","Legs"]},
  {id:"hyperext",      name:"Back Extension",                  muscle:"Back",      equipment:"Bodyweight", type:"strength", secondary:["Glutes"]},
  {id:"squat_bb",      name:"Back Squat (Barbell)",            muscle:"Legs",      equipment:"Barbell",    type:"strength", secondary:["Glutes","Core"]},
  {id:"front_squat",   name:"Front Squat (Barbell)",           muscle:"Legs",      equipment:"Barbell",    type:"strength", secondary:["Core","Glutes"]},
  {id:"goblet_sq",     name:"Goblet Squat (Dumbbell)",         muscle:"Legs",      equipment:"Dumbbell",   type:"strength", secondary:["Glutes","Core"]},
  {id:"hack_sq",       name:"Hack Squat (Machine)",            muscle:"Legs",      equipment:"Machine",    type:"strength", secondary:["Glutes"]},
  {id:"leg_press",     name:"Leg Press (Machine)",             muscle:"Legs",      equipment:"Machine",    type:"strength", secondary:["Glutes"]},
  {id:"rdl_bb",        name:"Romanian Deadlift (Barbell)",     muscle:"Legs",      equipment:"Barbell",    type:"strength", secondary:["Glutes","Back"]},
  {id:"rdl_db",        name:"Romanian Deadlift (Dumbbell)",    muscle:"Legs",      equipment:"Dumbbell",   type:"strength", secondary:["Glutes"]},
  {id:"leg_curl_m",    name:"Lying Leg Curl (Machine)",        muscle:"Legs",      equipment:"Machine",    type:"strength", secondary:[]},
  {id:"leg_curl_seat", name:"Seated Leg Curl (Machine)",       muscle:"Legs",      equipment:"Machine",    type:"strength", secondary:[]},
  {id:"leg_ext",       name:"Leg Extension (Machine)",         muscle:"Legs",      equipment:"Machine",    type:"strength", secondary:[]},
  {id:"lunge_bb",      name:"Lunge (Barbell)",                 muscle:"Legs",      equipment:"Barbell",    type:"strength", secondary:["Glutes"]},
  {id:"lunge_db",      name:"Lunge (Dumbbell)",                muscle:"Legs",      equipment:"Dumbbell",   type:"strength", secondary:["Glutes"]},
  {id:"split_squat",   name:"Bulgarian Split Squat",           muscle:"Legs",      equipment:"Dumbbell",   type:"strength", secondary:["Glutes","Core"]},
  {id:"step_up_db",    name:"Step Up (Dumbbell)",              muscle:"Legs",      equipment:"Dumbbell",   type:"strength", secondary:["Glutes"]},
  {id:"nordic_curl",   name:"Nordic Hamstring Curl",           muscle:"Legs",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"wall_sit",      name:"Wall Sit",                        muscle:"Legs",      equipment:"Bodyweight", type:"time",     secondary:[]},
  {id:"hip_thrust_bb", name:"Hip Thrust (Barbell)",            muscle:"Glutes",    equipment:"Barbell",    type:"strength", secondary:["Legs"]},
  {id:"hip_thrust_db", name:"Hip Thrust (Dumbbell)",           muscle:"Glutes",    equipment:"Dumbbell",   type:"strength", secondary:["Legs"]},
  {id:"glute_bridge",  name:"Glute Bridge (Bodyweight)",       muscle:"Glutes",    equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"sumo_sq_db",    name:"Sumo Squat (Dumbbell)",           muscle:"Glutes",    equipment:"Dumbbell",   type:"strength", secondary:["Legs"]},
  {id:"cable_kickback",name:"Cable Kickback",                  muscle:"Glutes",    equipment:"Cable",      type:"strength", secondary:[]},
  {id:"abductor_m",    name:"Hip Abduction (Machine)",         muscle:"Glutes",    equipment:"Machine",    type:"strength", secondary:[]},
  {id:"adductor_m",    name:"Hip Adduction (Machine)",         muscle:"Glutes",    equipment:"Machine",    type:"strength", secondary:[]},
  {id:"rdl_single",    name:"Single Leg RDL (Dumbbell)",       muscle:"Glutes",    equipment:"Dumbbell",   type:"strength", secondary:["Legs","Core"]},
  {id:"calf_stand_m",  name:"Standing Calf Raise (Machine)",   muscle:"Calves",    equipment:"Machine",    type:"strength", secondary:[]},
  {id:"calf_seat_m",   name:"Seated Calf Raise (Machine)",     muscle:"Calves",    equipment:"Machine",    type:"strength", secondary:[]},
  {id:"calf_bw",       name:"Calf Raise (Bodyweight)",         muscle:"Calves",    equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"calf_db",       name:"Single Leg Calf Raise (DB)",      muscle:"Calves",    equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"donkey_calf",   name:"Donkey Calf Raise",               muscle:"Calves",    equipment:"Machine",    type:"strength", secondary:[]},
  {id:"ohp_bb",        name:"Overhead Press (Barbell)",        muscle:"Shoulders", equipment:"Barbell",    type:"strength", secondary:["Triceps","Traps"]},
  {id:"ohp_db",        name:"Shoulder Press (Dumbbell)",       muscle:"Shoulders", equipment:"Dumbbell",   type:"strength", secondary:["Triceps"]},
  {id:"ohp_m",         name:"Shoulder Press (Machine)",        muscle:"Shoulders", equipment:"Machine",    type:"strength", secondary:["Triceps"]},
  {id:"arnold_press",  name:"Arnold Press (Dumbbell)",         muscle:"Shoulders", equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"lateral_db",    name:"Lateral Raise (Dumbbell)",        muscle:"Shoulders", equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"lateral_c",     name:"Lateral Raise (Cable)",           muscle:"Shoulders", equipment:"Cable",      type:"strength", secondary:[]},
  {id:"front_raise_db",name:"Front Raise (Dumbbell)",          muscle:"Shoulders", equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"face_pull",     name:"Face Pull (Cable)",               muscle:"Shoulders", equipment:"Cable",      type:"strength", secondary:["Traps"]},
  {id:"rear_fly_db",   name:"Rear Delt Fly (Dumbbell)",        muscle:"Shoulders", equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"rear_fly_m",    name:"Reverse Pec Deck",                muscle:"Shoulders", equipment:"Machine",    type:"strength", secondary:[]},
  {id:"upright_row_bb",name:"Upright Row (Barbell)",           muscle:"Shoulders", equipment:"Barbell",    type:"strength", secondary:["Traps","Biceps"]},
  {id:"shrug_bb",      name:"Shrug (Barbell)",                 muscle:"Traps",     equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"shrug_db",      name:"Shrug (Dumbbell)",                muscle:"Traps",     equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"shrug_m",       name:"Shrug (Machine)",                 muscle:"Traps",     equipment:"Machine",    type:"strength", secondary:[]},
  {id:"rack_pull",     name:"Rack Pull (Barbell)",             muscle:"Traps",     equipment:"Barbell",    type:"strength", secondary:["Back"]},
  {id:"farmer_walk",   name:"Farmer Walk (Dumbbell)",          muscle:"Traps",     equipment:"Dumbbell",   type:"strength", secondary:["Forearms","Core"]},
  {id:"curl_bb",       name:"Bicep Curl (Barbell)",            muscle:"Arms",      equipment:"Barbell",    type:"strength", secondary:["Forearms"]},
  {id:"curl_db",       name:"Bicep Curl (Dumbbell)",           muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"hammer_curl",   name:"Hammer Curl (Dumbbell)",          muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:["Forearms"]},
  {id:"cable_curl",    name:"Cable Curl",                      muscle:"Arms",      equipment:"Cable",      type:"strength", secondary:[]},
  {id:"preacher_curl", name:"Preacher Curl (Barbell)",         muscle:"Arms",      equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"conc_curl",     name:"Concentration Curl (Dumbbell)",   muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"incline_curl",  name:"Incline Curl (Dumbbell)",         muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"ez_curl",       name:"EZ Bar Curl",                     muscle:"Arms",      equipment:"EZ Bar",     type:"strength", secondary:[]},
  {id:"machine_curl",  name:"Bicep Curl (Machine)",            muscle:"Arms",      equipment:"Machine",    type:"strength", secondary:[]},
  {id:"pushdown_c",    name:"Triceps Rope Pushdown (Cable)",   muscle:"Arms",      equipment:"Cable",      type:"strength", secondary:[]},
  {id:"pushdown_bar",  name:"Triceps Bar Pushdown (Cable)",    muscle:"Arms",      equipment:"Cable",      type:"strength", secondary:[]},
  {id:"skull_bb",      name:"Skull Crusher (Barbell)",         muscle:"Arms",      equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"skull_ez",      name:"Skull Crusher (EZ Bar)",          muscle:"Arms",      equipment:"EZ Bar",     type:"strength", secondary:[]},
  {id:"ohp_tricep_db", name:"Overhead Tricep Ext. (Dumbbell)", muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"ohp_tricep_c",  name:"Overhead Tricep Ext. (Cable)",    muscle:"Arms",      equipment:"Cable",      type:"strength", secondary:[]},
  {id:"dips_tricep",   name:"Tricep Dips",                     muscle:"Arms",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"close_bench",   name:"Close Grip Bench Press",          muscle:"Arms",      equipment:"Barbell",    type:"strength", secondary:["Chest"]},
  {id:"kickback_db",   name:"Tricep Kickback (Dumbbell)",      muscle:"Arms",      equipment:"Dumbbell",   type:"strength", secondary:[]},
  {id:"dips_bench",    name:"Bench Dip",                       muscle:"Arms",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"wrist_curl_bb", name:"Wrist Curl (Barbell)",            muscle:"Forearms",  equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"reverse_curl",  name:"Reverse Curl (Barbell)",          muscle:"Forearms",  equipment:"Barbell",    type:"strength", secondary:["Arms"]},
  {id:"dead_hang",     name:"Dead Hang",                       muscle:"Forearms",  equipment:"Bodyweight", type:"time",     secondary:["Back"]},
  {id:"plank",         name:"Plank",                           muscle:"Core",      equipment:"Bodyweight", type:"time",     secondary:[]},
  {id:"side_plank",    name:"Side Plank",                      muscle:"Core",      equipment:"Bodyweight", type:"time",     secondary:[]},
  {id:"crunch",        name:"Crunch",                          muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"sit_up",        name:"Sit Up",                          muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"russian_twist", name:"Russian Twist",                   muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"leg_raise",     name:"Hanging Leg Raise",               muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"leg_raise_ly",  name:"Lying Leg Raise",                 muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"ab_wheel",      name:"Ab Wheel Rollout",                muscle:"Core",      equipment:"Other",      type:"strength", secondary:[]},
  {id:"cable_crunch",  name:"Cable Crunch",                    muscle:"Core",      equipment:"Cable",      type:"strength", secondary:[]},
  {id:"hollow_hold",   name:"Hollow Hold",                     muscle:"Core",      equipment:"Bodyweight", type:"time",     secondary:[]},
  {id:"v_up",          name:"V-Up",                            muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:[]},
  {id:"mountain_clim", name:"Mountain Climber",                muscle:"Core",      equipment:"Bodyweight", type:"strength", secondary:["Cardio"]},
  {id:"ab_machine",    name:"Ab Crunch (Machine)",             muscle:"Core",      equipment:"Machine",    type:"strength", secondary:[]},
  {id:"running",       name:"Running",                         muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"treadmill",     name:"Treadmill",                       muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"cycling",       name:"Cycling (Stationary)",            muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"elliptical",    name:"Elliptical",                      muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"rowing_erg",    name:"Rowing (Erg)",                    muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"stair_climb",   name:"Stair Climber",                   muscle:"Cardio",    equipment:"Cardio",     type:"cardio",   secondary:[]},
  {id:"jump_rope",     name:"Jump Rope",                       muscle:"Cardio",    equipment:"Other",      type:"cardio",   secondary:[]},
  {id:"burpee",        name:"Burpee",                          muscle:"Cardio",    equipment:"Bodyweight", type:"strength", secondary:["Full Body"]},
  {id:"box_jump",      name:"Box Jump",                        muscle:"Cardio",    equipment:"Other",      type:"strength", secondary:["Legs","Glutes"]},
  {id:"battle_rope",   name:"Battle Rope",                     muscle:"Cardio",    equipment:"Other",      type:"cardio",   secondary:[]},
  {id:"kb_swing",      name:"Kettlebell Swing",                muscle:"Full Body", equipment:"Kettlebell", type:"strength", secondary:["Glutes","Back"]},
  {id:"kb_goblet",     name:"Kettlebell Goblet Squat",         muscle:"Full Body", equipment:"Kettlebell", type:"strength", secondary:["Legs","Glutes"]},
  {id:"kb_press",      name:"Kettlebell Press",                muscle:"Full Body", equipment:"Kettlebell", type:"strength", secondary:["Shoulders"]},
  {id:"kb_snatch",     name:"Kettlebell Snatch",               muscle:"Full Body", equipment:"Kettlebell", type:"strength", secondary:[]},
  {id:"power_clean",   name:"Power Clean (Barbell)",           muscle:"Full Body", equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"clean_jerk",    name:"Clean & Jerk (Barbell)",          muscle:"Full Body", equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"thruster",      name:"Thruster (Barbell)",              muscle:"Full Body", equipment:"Barbell",    type:"strength", secondary:[]},
  {id:"turkish_gu",    name:"Turkish Get Up (Kettlebell)",     muscle:"Full Body", equipment:"Kettlebell", type:"strength", secondary:[]},
  {id:"push_press",    name:"Push Press (Barbell)",            muscle:"Full Body", equipment:"Barbell",    type:"strength", secondary:["Shoulders"]},
  {id:"warmup",        name:"Warm Up",                         muscle:"Full Body", equipment:"Bodyweight", type:"time",     secondary:[]},
  {id:"band_pull",     name:"Band Pull Apart",                 muscle:"Shoulders", equipment:"Other",      type:"strength", secondary:[]},
  {id:"foam_roll",     name:"Foam Rolling",                    muscle:"Full Body", equipment:"Other",      type:"time",     secondary:[]},
];

const PROGRAMS = [
  { id:"beg_ppl", name:"Beginner Push/Pull/Legs (Gym)", level:"Beginner", goal:"Gain Muscle", equipment:"Gym", emoji:"🏋️", color:"#2F80ED",
    desc:"Three weekly workouts: push (chest, shoulders, triceps), pull (back and biceps), and legs (quads, hamstrings, glutes, calves).",
    routines:[
      { name:"Push", desc:"Focus on push muscles — chest, shoulders, triceps.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"bench_bb",sets:5,repsRange:"4–15"},{id:"ohp_db",sets:3,repsRange:"12–15"},
        {id:"pec_deck",sets:3,repsRange:"15–20"},{id:"lateral_db",sets:3,repsRange:"15–20"},{id:"pushdown_c",sets:3,repsRange:"15–20"}]},
      { name:"Pull", desc:"Back, traps, rear delts, and biceps.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"lat_cable",sets:3,repsRange:"10–12"},{id:"seat_row_c",sets:3,repsRange:"12–15"},
        {id:"shrug_db",sets:3,repsRange:"12–15"},{id:"hammer_curl",sets:3,repsRange:"12–15"},{id:"face_pull",sets:3,repsRange:"15–20"}]},
      { name:"Legs", desc:"Quads, hamstrings, glutes, and calves.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"leg_press",sets:5,repsRange:"5–12"},{id:"leg_curl_m",sets:3,repsRange:"12–15"},
        {id:"leg_ext",sets:3,repsRange:"12–15"},{id:"calf_stand_m",sets:3,repsRange:"15–20"}]}]},
  { id:"int_ppl", name:"Intermediate Push/Pull/Legs (Gym)", level:"Intermediate", goal:"Gain Muscle", equipment:"Gym", emoji:"💪", color:"#8B5CF6",
    desc:"A 6-day PPL for intermediate lifters with higher volume and compound movements.",
    routines:[
      { name:"Push A", desc:"Heavy press focus.", exercises:[
        {id:"bench_bb",sets:4,repsRange:"4–6"},{id:"incline_db",sets:3,repsRange:"8–12"},{id:"cable_fly",sets:3,repsRange:"12–15"},
        {id:"ohp_bb",sets:3,repsRange:"6–10"},{id:"lateral_db",sets:4,repsRange:"12–15"},{id:"skull_bb",sets:3,repsRange:"8–12"},{id:"pushdown_c",sets:3,repsRange:"12–15"}]},
      { name:"Pull A", desc:"Deadlift and back thickness.", exercises:[
        {id:"deadlift",sets:4,repsRange:"4–6"},{id:"row_bb",sets:3,repsRange:"6–10"},{id:"lat_cable",sets:3,repsRange:"8–12"},
        {id:"seat_row_c",sets:3,repsRange:"8–12"},{id:"face_pull",sets:3,repsRange:"15–20"},{id:"curl_bb",sets:3,repsRange:"8–12"},{id:"hammer_curl",sets:2,repsRange:"12–15"}]},
      { name:"Legs A", desc:"Quad-dominant leg day.", exercises:[
        {id:"squat_bb",sets:4,repsRange:"4–6"},{id:"leg_press",sets:3,repsRange:"8–12"},{id:"leg_ext",sets:3,repsRange:"10–15"},
        {id:"rdl_bb",sets:3,repsRange:"8–12"},{id:"leg_curl_m",sets:3,repsRange:"10–15"},{id:"calf_stand_m",sets:4,repsRange:"8–12"}]}]},
  { id:"beg_full", name:"Beginner Full-Body (Gym)", level:"Beginner", goal:"Gain Muscle", equipment:"Gym", emoji:"⚡", color:"#22C55E",
    desc:"3 full-body sessions per week hitting every major muscle group each time.",
    routines:[
      { name:"Full Body A", desc:"Compound lifts — squat, press, row.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"squat_bb",sets:3,repsRange:"5"},{id:"bench_bb",sets:3,repsRange:"5"},
        {id:"row_bb",sets:3,repsRange:"5"},{id:"ohp_bb",sets:2,repsRange:"8"},{id:"lat_cable",sets:2,repsRange:"10"}]},
      { name:"Full Body B", desc:"Alternate with Workout A.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"squat_bb",sets:3,repsRange:"5"},{id:"ohp_bb",sets:3,repsRange:"5"},
        {id:"deadlift",sets:1,repsRange:"5"},{id:"bench_bb",sets:2,repsRange:"8"},{id:"pullup",sets:2,repsRange:"8"}]}]},
  { id:"beg_bw", name:"Beginner Full-Body (Bodyweight)", level:"Beginner", goal:"General Fitness", equipment:"Bodyweight", emoji:"🤸", color:"#F97316",
    desc:"No equipment needed. Build foundational strength using only your bodyweight.",
    routines:[
      { name:"Workout A", desc:"Upper body push and core.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"pushup",sets:3,repsRange:"8–15"},{id:"dips_bench",sets:3,repsRange:"8–15"},
        {id:"plank",sets:3,repsRange:"30–60s"},{id:"crunch",sets:3,repsRange:"15–20"},{id:"mountain_clim",sets:3,repsRange:"20"}]},
      { name:"Workout B", desc:"Lower body and pull.", exercises:[
        {id:"warmup",sets:1,repsRange:"5 min"},{id:"squat_bb",sets:3,repsRange:"12–15"},{id:"lunge_db",sets:3,repsRange:"10/leg"},
        {id:"glute_bridge",sets:3,repsRange:"15–20"},{id:"calf_bw",sets:3,repsRange:"20"},{id:"hollow_hold",sets:3,repsRange:"20–30s"}]}]},
  { id:"upper_lower", name:"Upper/Lower Split (Gym)", level:"Intermediate", goal:"Gain Muscle", equipment:"Gym", emoji:"🔄", color:"#EAB308",
    desc:"4-day upper/lower split. Great for building size and strength simultaneously.",
    routines:[
      { name:"Upper A (Strength)", desc:"Heavy compound upper movements.", exercises:[
        {id:"bench_bb",sets:4,repsRange:"4–6"},{id:"row_bb",sets:4,repsRange:"4–6"},{id:"ohp_bb",sets:3,repsRange:"6–8"},
        {id:"lat_cable",sets:3,repsRange:"8–10"},{id:"curl_bb",sets:3,repsRange:"8–10"},{id:"skull_bb",sets:3,repsRange:"8–10"}]},
      { name:"Lower A (Strength)", desc:"Heavy squat and deadlift focus.", exercises:[
        {id:"squat_bb",sets:4,repsRange:"4–6"},{id:"rdl_bb",sets:3,repsRange:"6–8"},{id:"leg_press",sets:3,repsRange:"8–10"},
        {id:"leg_curl_m",sets:3,repsRange:"8–10"},{id:"calf_stand_m",sets:4,repsRange:"8–12"}]},
      { name:"Upper B (Hypertrophy)", desc:"Volume upper session.", exercises:[
        {id:"incline_db",sets:4,repsRange:"8–12"},{id:"seat_row_c",sets:4,repsRange:"8–12"},{id:"ohp_db",sets:3,repsRange:"10–12"},
        {id:"pullup",sets:3,repsRange:"8–12"},{id:"lateral_db",sets:4,repsRange:"12–15"},{id:"face_pull",sets:3,repsRange:"15–20"},
        {id:"hammer_curl",sets:3,repsRange:"12–15"},{id:"pushdown_c",sets:3,repsRange:"12–15"}]},
      { name:"Lower B (Hypertrophy)", desc:"Volume leg session.", exercises:[
        {id:"hack_sq",sets:4,repsRange:"8–12"},{id:"rdl_db",sets:3,repsRange:"10–12"},{id:"leg_ext",sets:4,repsRange:"10–15"},
        {id:"leg_curl_seat",sets:4,repsRange:"10–15"},{id:"split_squat",sets:3,repsRange:"10/leg"},{id:"calf_seat_m",sets:4,repsRange:"12–15"}]}]},
];

const BASE_FOODS = [
  {id:"oatmeal",     name:"Oatmeal",              serving:"1 cup",        cal:154,carbs:27,fat:3, protein:5, fiber:4},
  {id:"eggs",        name:"Eggs, boiled",          serving:"1 medium",     cal:63, carbs:0, fat:4, protein:6, fiber:0},
  {id:"egg_white",   name:"Egg Whites",            serving:"3 whites",     cal:51, carbs:1, fat:0, protein:11,fiber:0},
  {id:"chicken",     name:"Chicken Breast",        serving:"100g",         cal:165,carbs:0, fat:4, protein:31,fiber:0},
  {id:"chicken_th",  name:"Chicken Thigh",         serving:"100g",         cal:209,carbs:0, fat:13,protein:26,fiber:0},
  {id:"rice",        name:"White Rice",            serving:"1 cup cooked", cal:206,carbs:45,fat:0, protein:4, fiber:1},
  {id:"brown_rice",  name:"Brown Rice",            serving:"1 cup cooked", cal:215,carbs:45,fat:2, protein:5, fiber:3},
  {id:"bread",       name:"Whole Grain Bread",     serving:"1 slice",      cal:91, carbs:17,fat:1, protein:4, fiber:2},
  {id:"avocado",     name:"Avocado",               serving:"1 medium",     cal:240,carbs:13,fat:22,protein:3, fiber:10},
  {id:"banana",      name:"Banana",                serving:"1 medium",     cal:105,carbs:27,fat:0, protein:1, fiber:3},
  {id:"apple",       name:"Apple",                 serving:"1 medium",     cal:95, carbs:25,fat:0, protein:0, fiber:4},
  {id:"blueberry",   name:"Blueberries",           serving:"1 cup",        cal:84, carbs:21,fat:0, protein:1, fiber:4},
  {id:"salmon",      name:"Salmon",                serving:"100g",         cal:208,carbs:0, fat:13,protein:20,fiber:0},
  {id:"tuna",        name:"Tuna (canned)",         serving:"100g",         cal:116,carbs:0, fat:1, protein:26,fiber:0},
  {id:"shrimp",      name:"Shrimp",                serving:"100g",         cal:99, carbs:0, fat:1, protein:24,fiber:0},
  {id:"greek_yogurt",name:"Greek Yogurt",          serving:"1 cup",        cal:130,carbs:9, fat:0, protein:22,fiber:0},
  {id:"cottage",     name:"Cottage Cheese",        serving:"1/2 cup",      cal:110,carbs:4, fat:5, protein:14,fiber:0},
  {id:"milk",        name:"Whole Milk",            serving:"1 cup",        cal:149,carbs:12,fat:8, protein:8, fiber:0},
  {id:"whey",        name:"Whey Protein Shake",    serving:"1 scoop",      cal:120,carbs:3, fat:2, protein:24,fiber:0},
  {id:"sweet_potato",name:"Sweet Potato",          serving:"1 medium",     cal:103,carbs:24,fat:0, protein:2, fiber:4},
  {id:"broccoli",    name:"Broccoli",              serving:"1 cup",        cal:31, carbs:6, fat:0, protein:3, fiber:2},
  {id:"spinach",     name:"Spinach",               serving:"1 cup",        cal:7,  carbs:1, fat:0, protein:1, fiber:1},
  {id:"almonds",     name:"Almonds",               serving:"1 oz",         cal:164,carbs:6, fat:14,protein:6, fiber:3},
  {id:"pb",          name:"Peanut Butter",         serving:"2 tbsp",       cal:190,carbs:7, fat:16,protein:7, fiber:2},
  {id:"pasta",       name:"Pasta",                 serving:"1 cup cooked", cal:220,carbs:43,fat:1, protein:8, fiber:2},
  {id:"protein_bar", name:"Protein Bar",           serving:"1 bar",        cal:211,carbs:21,fat:5, protein:20,fiber:4},
  {id:"beef",        name:"Lean Ground Beef 90%",  serving:"100g",         cal:176,carbs:0, fat:10,protein:20,fiber:0},
  {id:"steak",       name:"Sirloin Steak",         serving:"100g",         cal:207,carbs:0, fat:12,protein:26,fiber:0},
  {id:"turkey",      name:"Turkey Breast",         serving:"100g",         cal:135,carbs:0, fat:1, protein:30,fiber:0},
  {id:"tofu",        name:"Firm Tofu",             serving:"100g",         cal:76, carbs:2, fat:5, protein:8, fiber:0},
  {id:"lentils",     name:"Lentils",               serving:"1 cup cooked", cal:230,carbs:40,fat:1, protein:18,fiber:16},
  {id:"chickpeas",   name:"Chickpeas",             serving:"1 cup cooked", cal:269,carbs:45,fat:4, protein:15,fiber:12},
  {id:"quinoa",      name:"Quinoa",                serving:"1 cup cooked", cal:222,carbs:39,fat:4, protein:8, fiber:5},
  {id:"bagel",       name:"Everything Bagel",      serving:"1 bagel",      cal:290,carbs:56,fat:2, protein:11,fiber:2},
  {id:"lox",         name:"Lox (Smoked Salmon)",   serving:"2 oz",         cal:80, carbs:0, fat:3, protein:12,fiber:0},
  {id:"coffee",      name:"Black Coffee",          serving:"1 cup",        cal:2,  carbs:0, fat:0, protein:0, fiber:0},
  {id:"olive_oil",   name:"Olive Oil",             serving:"1 tbsp",       cal:119,carbs:0, fat:14,protein:0, fiber:0},
  {id:"hummus",      name:"Hummus",                serving:"2 tbsp",       cal:70, carbs:8, fat:3, protein:2, fiber:2},
  {id:"cheese",      name:"Cheddar Cheese",        serving:"1 oz",         cal:113,carbs:0, fat:9, protein:7, fiber:0},
  {id:"pizza",       name:"Cheese Pizza",          serving:"1 slice",      cal:272,carbs:34,fat:10,protein:12,fiber:2},
  {id:"burger",      name:"Beef Burger (no bun)",  serving:"1 patty",      cal:288,carbs:0, fat:20,protein:28,fiber:0},
  {id:"sushi_roll",  name:"Sushi Roll (8 pcs)",    serving:"8 pieces",     cal:300,carbs:46,fat:5, protein:10,fiber:1},
  {id:"dark_choc",   name:"Dark Chocolate 70%",    serving:"1 oz",         cal:170,carbs:13,fat:12,protein:2, fiber:3},
  {id:"granola",     name:"Granola",               serving:"1/4 cup",      cal:149,carbs:24,fat:5, protein:3, fiber:2},
  {id:"orange_juice",name:"Orange Juice",          serving:"1 cup",        cal:112,carbs:26,fat:0, protein:2, fiber:0},
  {id:"smoothie",    name:"Protein Smoothie",      serving:"1 serving",    cal:316,carbs:45,fat:5, protein:25,fiber:5},
  {id:"oat_bar",     name:"Oat Granola Bar",       serving:"1 bar",        cal:190,carbs:29,fat:7, protein:4, fiber:2},
  {id:"almond_milk", name:"Almond Milk (unsw.)",   serving:"1 cup",        cal:30, carbs:1, fat:3, protein:1, fiber:1},
  {id:"tortilla",    name:"Flour Tortilla",        serving:"1 medium",     cal:146,carbs:25,fat:4, protein:4, fiber:2},
  {id:"cream_cheese",name:"Cream Cheese",          serving:"1 tbsp",       cal:51, carbs:1, fat:5, protein:1, fiber:0},
];

const GOAL_PRESETS = {
  lose_weight:  {cal:1600,carbs:160,fat:55, protein:130,fiber:30,water:10},
  maintain:     {cal:2000,carbs:200,fat:65, protein:120,fiber:25,water:8},
  build_muscle: {cal:2500,carbs:280,fat:75, protein:180,fiber:25,water:8},
  athletic:     {cal:2800,carbs:320,fat:80, protein:200,fiber:30,water:10},
};

const todayStr = () => new Date().toISOString().split("T")[0];
const fmtDate  = d => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
const fmtTime  = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const oneRM    = (w,r) => r===1?w:Math.round(w*(1+r/30));
const uid      = () => `${Date.now()}_${Math.random().toString(36).slice(2,6)}`;

const useLS = (key,init) => {
  const [v,setV] = useState(()=>{ try{ return JSON.parse(localStorage.getItem(key))??init; }catch{ return init; }});
  const set = val => { const n=typeof val==="function"?val(v):val; setV(n); localStorage.setItem(key,JSON.stringify(n)); };
  return [v,set];
};

// ── UI COMPONENTS ─────────────────────────────────────────────────────────────
const Pill = ({children,color="rgba(47,128,237,0.15)",text="#2F80ED",sm}) => (
  <span style={{background:color,color:text,fontSize:sm?9:10,fontWeight:700,borderRadius:6,padding:sm?"1px 5px":"2px 8px",whiteSpace:"nowrap"}}>{children}</span>
);
const Btn = ({children,onClick,color="#2F80ED",ghost,full,sm,disabled}) => (
  <button onClick={onClick} disabled={disabled}
    style={{background:ghost?"transparent":color,color:ghost?color:"#fff",border:ghost?`1.5px solid ${color}`:"none",
      borderRadius:12,padding:sm?"8px 16px":"13px 20px",fontSize:sm?13:15,fontWeight:700,
      cursor:disabled?"not-allowed":"pointer",width:full?"100%":"auto",opacity:disabled?0.4:1}}>
    {children}
  </button>
);
const DarkInput = ({value,onChange,placeholder,type="text",autoFocus,style:s}) => (
  <input value={value} onChange={onChange} placeholder={placeholder} type={type} autoFocus={autoFocus}
    style={{width:"100%",padding:"11px 14px",background:"#242424",border:"1px solid #2A2A2A",borderRadius:12,
      fontSize:14,color:"#FFFFFF",outline:"none",boxSizing:"border-box",...s}}/>
);

const MiniBar = ({data,color,height=70}) => {
  const max=Math.max(...data.map(d=>d.val),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:4,height}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{width:"100%",borderRadius:"3px 3px 0 0",background:d.highlight?color:color+"44",height:`${Math.max(2,(d.val/max)*(height-16))}px`,transition:"height .4s"}}/>
          <div style={{fontSize:8,color:d.highlight?"#FFFFFF":"#6B7280",fontWeight:d.highlight?700:400}}>{d.label}</div>
        </div>
      ))}
    </div>
  );
};

const LineChart = ({data,color,height=90,label}) => {
  if(!data||data.length<2) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:12}}>Log more sessions to see trend</div>;
  const max=Math.max(...data.map(d=>d.val),1),min=Math.min(...data.map(d=>d.val),0);
  const W=300,H=height-18;
  const pts=data.map((d,i)=>({x:(i/(data.length-1))*W,y:H-((d.val-min)/(max-min||1))*H}));
  const path=pts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area=`${path} L${pts[pts.length-1].x},${H} L0,${H} Z`;
  const gid=`g${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <div>
      {label&&<div style={{fontSize:11,color:"#9CA3AF",marginBottom:4}}>{label}</div>}
      <svg viewBox={`0 0 ${W} ${H+18}`} style={{width:"100%",height}}>
        <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient></defs>
        <path d={area} fill={`url(#${gid})`}/>
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color}/>)}
        {data.map((d,i)=><text key={i} x={(i/(data.length-1))*W} y={H+15} textAnchor="middle" fontSize="8" fill="#6B7280">{d.label}</text>)}
      </svg>
    </div>
  );
};

const Donut = ({segments,size=80,label,sub}) => {
  const total=segments.reduce((s,g)=>s+g.val,0)||1;
  let off=0; const r=30,circ=2*Math.PI*r,cx=size/2,cy=size/2;
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2A2A2A" strokeWidth={8}/>
        {segments.map((seg,i)=>{
          const pct=seg.val/total,dash=pct*circ;
          const el=<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={8} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-off*circ} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>;
          off+=pct; return el;
        })}
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:13,fontWeight:800,color:"#FFFFFF"}}>{label}</div>
        {sub&&<div style={{fontSize:9,color:"#9CA3AF"}}>{sub}</div>}
      </div>
    </div>
  );
};

// ── ONBOARDING ─────────────────────────────────────────────────────────────────
function Onboarding({onDone}) {
  const [step,setStep]=useState(0);
  const [d,setD]=useState({name:"",age:"",sex:"M",height:"",weight:"",goal:"build_muscle"});
  const goalOpts=[
    {k:"lose_weight",   color:C.orange,  grad:C.grad3, title:"Lose Weight",       sub:"Burn fat, feel lighter",       icon:"🔥"},
    {k:"maintain",      color:C.cyan,    grad:"linear-gradient(135deg,#22D3EE,#4F8EF7)", title:"Maintain Weight",  sub:"Stay balanced & healthy",     icon:"⚖️"},
    {k:"build_muscle",  color:C.blue,    grad:C.grad1, title:"Build Muscle",       sub:"Get stronger, gain mass",      icon:"💪"},
    {k:"athletic",      color:C.purple,  grad:C.grad4, title:"Athletic Performance",sub:"Maximize speed & power",      icon:"⚡"},
  ];
  const steps=[
    // Step 0 — Splash
    { ok:true, content:(
      <div style={{textAlign:"center",padding:"10px 0 20px"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
          <AppLogo size={88}/>
        </div>
        <div style={{fontSize:32,fontWeight:900,color:C.text,letterSpacing:"-1px",marginBottom:8}}>FitTrack<span style={{background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}> Pro</span></div>
        <div style={{fontSize:16,color:C.muted,lineHeight:1.7,maxWidth:280,margin:"0 auto"}}>Your complete fitness companion. Track workouts, log nutrition, crush goals.</div>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:24}}>
          {["138+ Exercises","AI Nutrition","Smart PRs"].map(t=>(
            <div key={t} style={{background:C.glass,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 12px",fontSize:11,fontWeight:600,color:C.text2}}>{t}</div>
          ))}
        </div>
      </div>
    )},
    // Step 1 — Name
    { ok:!!d.name, content:(
      <div style={{marginTop:8}}>
        <div style={{fontSize:26,fontWeight:900,color:C.text,marginBottom:6}}>What's your name?</div>
        <div style={{fontSize:14,color:C.muted,marginBottom:20}}>We'll personalize your experience</div>
        <PremiumInput value={d.name} onChange={e=>setD({...d,name:e.target.value})} placeholder="Your name" autoFocus style={{fontSize:20,textAlign:"center",padding:"18px"}}/>
      </div>
    )},
    // Step 2 — Body
    { ok:!!(d.age&&d.height&&d.weight), content:(
      <div style={{marginTop:8}}>
        <div style={{fontSize:26,fontWeight:900,color:C.text,marginBottom:6}}>About you</div>
        <div style={{fontSize:14,color:C.muted,marginBottom:20}}>Used to calculate your calorie needs</div>
        <div style={{display:"flex",gap:10,marginBottom:10}}>
          <PremiumInput value={d.age} onChange={e=>setD({...d,age:e.target.value})} placeholder="Age" type="number" style={{flex:1,textAlign:"center"}}/>
          <PremiumInput value={d.height} onChange={e=>setD({...d,height:e.target.value})} placeholder="Height cm" type="number" style={{flex:1,textAlign:"center"}}/>
        </div>
        <PremiumInput value={d.weight} onChange={e=>setD({...d,weight:e.target.value})} placeholder="Weight kg" type="number" style={{textAlign:"center",marginBottom:12}}/>
        <div style={{display:"flex",gap:8}}>
          {["M","F"].map(s=>(
            <button key={s} onClick={()=>setD({...d,sex:s})} style={{
              flex:1,padding:"14px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer",
              border:`1.5px solid ${d.sex===s?C.blue:"transparent"}`,
              background:d.sex===s?`${C.blue}18`:C.glass,
              color:d.sex===s?C.blue:C.muted,transition:"all .2s",
            }}>{s==="M"?"♂ Male":"♀ Female"}</button>
          ))}
        </div>
      </div>
    )},
    // Step 3 — Goal
    { ok:!!d.goal, content:(
      <div style={{marginTop:8}}>
        <div style={{fontSize:26,fontWeight:900,color:C.text,marginBottom:6}}>Your goal</div>
        <div style={{fontSize:14,color:C.muted,marginBottom:20}}>We'll set the perfect targets for you</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {goalOpts.map(g=>(
            <button key={g.k} onClick={()=>setD({...d,goal:g.k})} style={{
              display:"flex",alignItems:"center",gap:16,padding:"16px 18px",borderRadius:16,cursor:"pointer",textAlign:"left",
              border:`1.5px solid ${d.goal===g.k?g.color:"transparent"}`,
              background:d.goal===g.k?`${g.color}15`:C.glass,transition:"all .2s",
            }}>
              <div style={{width:44,height:44,borderRadius:12,background:d.goal===g.k?g.grad:C.glass,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{g.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:d.goal===g.k?g.color:C.text}}>{g.title}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{g.sub}</div>
              </div>
              {d.goal===g.k&&<div style={{marginLeft:"auto",width:20,height:20,borderRadius:"50%",background:g.grad,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="check" size={12} color="#fff"/></div>}
            </button>
          ))}
        </div>
      </div>
    )},
    // Step 4 — Summary
    { ok:true, content:(()=>{
      const p=GOAL_PRESETS[d.goal||"build_muscle"];
      const g=goalOpts.find(o=>o.k===d.goal)||goalOpts[2];
      return (
        <div style={{marginTop:8}}>
          <div style={{fontSize:26,fontWeight:900,color:C.text,marginBottom:6}}>You're all set, {d.name||"Champ"}! 🎉</div>
          <div style={{fontSize:14,color:C.muted,marginBottom:20}}>Here's your personalized plan</div>
          <div style={{background:`linear-gradient(135deg,${g.color}20,${g.color}08)`,border:`1px solid ${g.color}30`,borderRadius:18,padding:"20px",marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:15,color:g.color,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:20}}>{g.icon}</span> {g.title}
            </div>
            {[["🔥","Calories",p.cal,"kcal"],["🌾","Carbs",p.carbs,"g"],["🥑","Fat",p.fat,"g"],["💪","Protein",p.protein,"g"],["💧","Water",p.water,"glasses"]].map(([e,l,v,u])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.muted,fontSize:14}}>{e} {l}</span>
                <span style={{fontWeight:700,color:g.color,fontSize:14}}>{v} {u}</span>
              </div>
            ))}
          </div>
        </div>
      );
    })()},
  ];

  const cur=steps[step];
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"stretch",justifyContent:"center",padding:"0 0 40px"}}>
      {/* Background glow */}
      <div style={{position:"fixed",top:-100,left:-100,width:400,height:400,background:`radial-gradient(circle, ${C.blueGlow} 0%, transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:-100,right:-100,width:300,height:300,background:`radial-gradient(circle, ${C.purpleGlow} 0%, transparent 70%)`,pointerEvents:"none"}}/>

      <div style={{width:"100%",maxWidth:430,padding:"60px 24px 24px",display:"flex",flexDirection:"column",position:"relative"}}>
        {/* Progress dots */}
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:32}}>
          {steps.map((_,i)=>(
            <div key={i} style={{height:3,borderRadius:9,
              background:i<step?C.blue:i===step?C.grad1:C.faint,
              width:i===step?28:i<step?12:8,
              transition:"all .4s cubic-bezier(.4,0,.2,1)"}}/>
          ))}
        </div>

        <div style={{flex:1}}>{cur.content}</div>

        <div style={{display:"flex",gap:10,marginTop:28,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
          {step>0&&(
            <GhostBtn onClick={()=>setStep(step-1)} color={C.muted} full sm>← Back</GhostBtn>
          )}
          <GradientBtn onClick={()=>{
            if(step<steps.length-1)setStep(step+1);
            else{const p=GOAL_PRESETS[d.goal];onDone({profile:{name:d.name||"Athlete",age:parseInt(d.age)||25,sex:d.sex,height:parseInt(d.height)||170,unit:"kg",goal:d.goal},goals:{...p},initWeight:parseFloat(d.weight)||0});}
          }} gradient={C.grad1} full sm disabled={!cur.ok}>
            {step===steps.length-1?"🚀 Start Training →":"Continue →"}
          </GradientBtn>
        </div>
      </div>
    </div>
  );
}


// ── ROOT APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [onboarded,setOnboarded] = useLS("ft_ob8",false);
  const [tab,setTab]             = useState("diary");
  const [workouts,setWorkouts]   = useLS("ft_wk8",[]);
  const [diary,setDiary]         = useLS("ft_dy8",{});
  const [goals,setGoals]         = useLS("ft_gl8",GOAL_PRESETS.build_muscle);
  const [weight,setWeight]       = useLS("ft_wt8",[]);
  const [measurements,setMeasurements]=useLS("ft_ms8",[]);
  const [profile,setProfile]     = useLS("ft_pr8",{name:"Athlete",age:25,sex:"M",height:175,unit:"kg",goal:"build_muscle"});
  const [water,setWater]         = useLS("ft_wa8",{});
  const [prs,setPrs]             = useLS("ft_prs8",{});
  const [customEx,setCustomEx]   = useLS("ft_cex8",[]);
  const [customFoods,setCustomFoods]=useLS("ft_cfd8",[]);
  const [activeW,setActiveW]     = useState(null);
  const [detailEx,setDetailEx]   = useState(null);

  const EXERCISES=[...BASE_EXERCISES,...customEx];
  const FOODS=[...BASE_FOODS,...customFoods];
  const td=todayStr();
  const todayDiary=diary[td]||{breakfast:[],lunch:[],dinner:[],snacks:[]};
  const setTodayDiary=d=>setDiary({...diary,[td]:d});
  const todayWater=water[td]||0;
  const setTodayWater=n=>setWater({...water,[td]:n});
  const allF=Object.values(todayDiary).flat();
  const totals={
    cal:allF.reduce((s,f)=>s+f.cal,0),
    carbs:allF.reduce((s,f)=>s+f.carbs,0),
    fat:allF.reduce((s,f)=>s+f.fat,0),
    protein:allF.reduce((s,f)=>s+f.protein,0),
    fiber:allF.reduce((s,f)=>s+(f.fiber||0),0)
  };
  const streak=(()=>{let s=0,d=new Date();while(true){const k=d.toISOString().split("T")[0];if(!(Object.values(diary[k]||{}).flat().length>0||workouts.some(w=>w.date===k)))break;s++;d.setDate(d.getDate()-1);}return s;})();

  if(!onboarded) return <Onboarding onDone={({profile:p,goals:g,initWeight:w})=>{setProfile(p);setGoals(g);if(w>0)setWeight([{date:td,val:w}]);setOnboarded(true);}}/>;
  if(activeW) return <ActiveWorkout workout={activeW} setWorkout={setActiveW} EXERCISES={EXERCISES}
    onFinish={w=>{
      setWorkouts(p=>[...p,{...w,duration:Math.round((Date.now()-w.startTime)/60000)}]);
      const np={...prs};
      w.exercises.forEach(ex=>ex.sets.filter(s=>s.done&&s.weight&&s.reps).forEach(s=>{const rm=oneRM(parseFloat(s.weight),parseInt(s.reps));if(!np[ex.id]||rm>np[ex.id])np[ex.id]=rm;}));
      setPrs(np);setActiveW(null);
    }}/>;
  if(detailEx) return <ExerciseDetail ex={detailEx} workouts={workouts} prs={prs} onBack={()=>setDetailEx(null)}/>;

  const TABS=[
    {id:"diary",   icon:"diary",   label:"Diary"},
    {id:"workout", icon:"workout", label:"Workout"},
    {id:"progress",icon:"progress",label:"Progress"},
    {id:"profile", icon:"profile", label:"Profile"},
  ];

  return (
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:80,color:C.text,overflowX:"hidden"}}>
      {/* Global ambient glow */}
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,height:300,background:`radial-gradient(ellipse at top, ${C.blueGlow} 0%, transparent 70%)`,pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1}}>
        {tab==="diary"    &&<DiaryTab    diary={todayDiary} setDiary={setTodayDiary} goals={goals} totals={totals} water={todayWater} setWater={setTodayWater} streak={streak} FOODS={FOODS} setCustomFoods={setCustomFoods}/>}
        {tab==="workout"  &&<WorkoutTab  workouts={workouts} onStart={w=>setActiveW(w)} prs={prs} EXERCISES={EXERCISES} setCustomEx={setCustomEx} onViewEx={setDetailEx}/>}
        {tab==="progress" &&<ProgressTab workouts={workouts} diary={diary} goals={goals} weight={weight} setWeight={setWeight} measurements={measurements} setMeasurements={setMeasurements} totals={totals} prs={prs} EXERCISES={EXERCISES}/>}
        {tab==="profile"  &&<ProfileTab  profile={profile} setProfile={setProfile} goals={goals} setGoals={setGoals} workouts={workouts} setOnboarded={setOnboarded}/>}
      </div>

      {/* Premium Tab Bar */}
      <div style={{
        position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:430,
        background:"rgba(8,8,16,0.92)",
        backdropFilter:"blur(24px) saturate(180%)",
        borderTop:`1px solid ${C.border}`,
        display:"flex",zIndex:100,
        paddingBottom:"env(safe-area-inset-bottom,8px)",
        paddingTop:4,
      }}>
        {TABS.map(t=>{
          const active=tab===t.id;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 0 10px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
              {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:36,height:2,borderRadius:9,background:C.grad1}}/>}
              <div style={{
                display:"flex",alignItems:"center",justifyContent:"center",
                width:32,height:32,borderRadius:10,
                background:active?C.blueLight:"transparent",
                transition:"all .2s",
              }}>
                <Icon name={t.icon} size={18} color={active?C.blue:C.muted}/>
              </div>
              <span style={{fontSize:10,fontWeight:active?700:500,color:active?C.blue:C.muted,letterSpacing:"0.2px"}}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


// ── DIARY TAB ──────────────────────────────────────────────────────────────────
function DiaryTab({diary,setDiary,goals,totals,water,setWater,streak,FOODS,setCustomFoods}) {
  const [addModal,setAdd]=useState(null);
  const [aiModal,setAI]=useState(false);
  const remaining=goals.cal-totals.cal;
  const pct=Math.min(100,(totals.cal/goals.cal)*100);
  const meals=[{id:"breakfast",label:"Breakfast",icon:"🌅",time:"6–10 AM"},{id:"lunch",label:"Lunch",icon:"☀️",time:"12–2 PM"},{id:"dinner",label:"Dinner",icon:"🌙",time:"6–9 PM"},{id:"snacks",label:"Snacks",icon:"🍎",time:"Anytime"}];

  return (
    <div>
      {/* Header */}
      <div style={{padding:"56px 20px 20px",background:`linear-gradient(180deg, rgba(79,142,247,0.12) 0%, transparent 100%)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:4}}>
              {new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
            </div>
            <div style={{fontSize:13,color:C.muted}}>
              {remaining>0 ? <span style={{color:C.green}}>{remaining} cal left</span> : <span style={{color:C.orange}}>{Math.abs(remaining)} over</span>}
            </div>
          </div>
          {streak>0&&(
            <div style={{display:"flex",alignItems:"center",gap:8,background:`${C.orange}18`,border:`1px solid ${C.orange}30`,borderRadius:14,padding:"8px 14px"}}>
              <Icon name="fire" size={18} color={C.orange}/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:C.orange,lineHeight:1}}>{streak}</div>
                <div style={{fontSize:9,color:C.muted,fontWeight:600}}>STREAK</div>
              </div>
            </div>
          )}
        </div>

        {/* Macro ring + calories */}
        <div style={{display:"flex",alignItems:"center",gap:20,background:C.glass,border:`1px solid ${C.border}`,borderRadius:22,padding:"18px 20px",backdropFilter:"blur(12px)"}}>
          <RingChart
            segments={[
              {val:totals.carbs,color:"#60A5FA"},
              {val:totals.fat,color:C.purple},
              {val:totals.protein,color:C.green},
            ]}
            size={86} label={`${totals.cal}`} sub="cal" thickness={9}
          />
          <div style={{flex:1}}>
            {[{l:"Carbs",v:totals.carbs,m:goals.carbs,c:"#60A5FA"},{l:"Protein",v:totals.protein,m:goals.protein,c:C.green},{l:"Fat",v:totals.fat,m:goals.fat,c:C.purple},{l:"Fiber",v:totals.fiber,m:goals.fiber,c:C.yellow}].map(m=>(
              <div key={m.l} style={{marginBottom:7}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:11,color:C.muted,fontWeight:500}}>{m.l}</span>
                  <span style={{fontSize:11,fontWeight:700,color:m.c}}>{m.v}<span style={{color:C.faint}}>/{m.m}g</span></span>
                </div>
                <div style={{height:3,background:C.faint,borderRadius:9,overflow:"hidden"}}>
                  <div style={{height:3,background:m.c,borderRadius:9,width:`${Math.min(100,(m.v/m.m)*100)}%`,transition:"width .6s cubic-bezier(.4,0,.2,1)",boxShadow:`0 0 6px ${m.c}66`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Meal Logger Button */}
        <button onClick={()=>setAI(true)} style={{
          width:"100%",marginTop:14,
          background:C.grad1,
          border:"none",borderRadius:16,padding:"15px 20px",
          fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",gap:10,
          boxShadow:"0 8px 32px rgba(79,142,247,0.3)",
          letterSpacing:"0.2px",
        }}>
          <Icon name="ai" size={18} color="#fff"/>
          AI Meal Log · Photo Scan · Barcode
        </button>
      </div>

      {/* Meal sections */}
      <div style={{padding:"4px 16px"}}>
        {meals.map(meal=>(
          <MealSection key={meal.id} meal={meal} items={diary[meal.id]||[]}
            onAdd={()=>setAdd(meal.id)}
            onRemove={i=>{const a=[...(diary[meal.id]||[])];a.splice(i,1);setDiary({...diary,[meal.id]:a});}}/>
        ))}

        {/* Water tracker */}
        <GlassCard style={{padding:"16px 18px",marginBottom:16,marginTop:4}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:10,background:`${C.cyan}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name="water" size={16} color={C.cyan}/>
              </div>
              <span style={{fontWeight:700,fontSize:15}}>Hydration</span>
            </div>
            <span style={{fontSize:12,color:C.muted,fontWeight:600}}>{water} / {goals.water||8} glasses</span>
          </div>
          <div style={{display:"flex",gap:6}}>
            {Array.from({length:goals.water||8},(_,i)=>{
              const filled=i<water;
              return (
                <div key={i} onClick={()=>setWater(i<water?i:i+1)}
                  style={{flex:1,aspectRatio:"1",borderRadius:10,cursor:"pointer",
                    background:filled?`${C.cyan}25`:C.glass,
                    border:`1px solid ${filled?C.cyan:C.border}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:13,transition:"all .2s",
                    boxShadow:filled?`0 0 10px ${C.cyan}33`:"none",
                  }}>
                  {filled?"💧":""}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {addModal&&<FoodModal meal={addModal} onClose={()=>setAdd(null)} FOODS={FOODS} setCustomFoods={setCustomFoods} onAdd={f=>{const a=[...(diary[addModal]||[]),f];setDiary({...diary,[addModal]:a});setAdd(null);}}/>}
      {aiModal&&<AILogger onClose={()=>setAI(false)} onAdd={(foods,meal)=>{const a=[...(diary[meal]||[]),...foods];setDiary({...diary,[meal]:a});setAI(false);}}/>}
    </div>
  );
}

// helper to avoid reference error - will be overridden by closure above
// diary tab water helpers accessed via props above

function MealSection({meal,items,onAdd,onRemove}) {
  const [open,setOpen]=useState(true);
  const cal=items.reduce((s,f)=>s+f.cal,0);
  const prot=items.reduce((s,f)=>s+f.protein,0);

  return (
    <GlassCard style={{marginBottom:10}}>
      <div onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,borderRadius:12,background:C.glass,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
            {meal.icon}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:C.text}}>{meal.label}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:1}}>{meal.time}</div>
          </div>
          {items.length>0&&<Tag color={C.blue}>{items.length} items</Tag>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {cal>0&&<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:800,color:C.text}}>{cal}</div><div style={{fontSize:9,color:C.muted}}>cal</div></div>}
          <button onClick={e=>{e.stopPropagation();onAdd();}} style={{
            background:C.grad1,color:"#fff",border:"none",borderRadius:10,
            width:32,height:32,fontSize:16,cursor:"pointer",fontWeight:700,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 4px 12px rgba(79,142,247,0.3)",
          }}><Icon name="plus" size={16} color="#fff"/></button>
          <div style={{color:C.faint,fontSize:11,transform:open?"rotate(0)":"rotate(180deg)",transition:"transform .3s"}}>▲</div>
        </div>
      </div>

      {open&&items.length>0&&(
        <div style={{borderTop:`1px solid ${C.border}`,padding:"8px 16px 12px"}}>
          {/* Mini macro row */}
          {cal>0&&(
            <div style={{display:"flex",alignItems:"center",gap:14,padding:"8px 0 10px",borderBottom:`1px solid ${C.border}`,marginBottom:8}}>
              <RingChart segments={[{val:items.reduce((s,f)=>s+f.carbs,0),color:"#60A5FA"},{val:items.reduce((s,f)=>s+f.fat,0),color:C.purple},{val:prot,color:C.green}]} size={52} label={`${cal}`} thickness={6}/>
              <div style={{flex:1,display:"flex",gap:16}}>
                {[["Carbs",items.reduce((s,f)=>s+f.carbs,0),"#60A5FA"],["Fat",items.reduce((s,f)=>s+f.fat,0),C.purple],["Protein",prot,C.green]].map(([l,v,c])=>(
                  <div key={l}><div style={{fontSize:10,color:C.muted,marginBottom:2}}>{l}</div><div style={{fontWeight:800,fontSize:14,color:c}}>{v}g</div></div>
                ))}
              </div>
            </div>
          )}
          {items.map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<items.length-1?`1px solid ${C.border}`:"none"}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>{f.name}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1}}>{f.serving} · C{f.carbs} F{f.fat} P{f.protein}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:14,fontWeight:800,color:C.text2}}>{f.cal}</span>
                <button onClick={()=>onRemove(i)} style={{background:`${C.red}15`,border:`1px solid ${C.red}25`,borderRadius:8,width:26,height:26,cursor:"pointer",color:C.red,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function FoodModal({meal,onClose,onAdd,FOODS,setCustomFoods}) {
  const [q,setQ]=useState("");
  const [qty,setQty]=useState({});
  const [showCF,setShowCF]=useState(false);
  const [cf,setCf]=useState({name:"",serving:"",cal:"",carbs:"",fat:"",protein:"",fiber:""});
  const results=q?FOODS.filter(f=>f.name.toLowerCase().includes(q.toLowerCase())):FOODS.slice(0,22);
  const scale=f=>{const n=parseFloat(qty[f.id])||1;return{...f,cal:Math.round(f.cal*n),carbs:Math.round(f.carbs*n),fat:Math.round(f.fat*n),protein:Math.round(f.protein*n),fiber:Math.round((f.fiber||0)*n),serving:`${n>1?n+"x ":""}${f.serving}`};};

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"flex-end",backdropFilter:"blur(4px)"}}>
      <div style={{background:C.bg2,width:"100%",maxWidth:430,margin:"0 auto",borderRadius:"24px 24px 0 0",maxHeight:"88vh",display:"flex",flexDirection:"column",border:`1px solid ${C.border}`,borderBottom:"none"}}>
        {/* Handle */}
        <div style={{width:36,height:4,background:C.faint,borderRadius:9,margin:"12px auto 0"}}/>
        <div style={{padding:"14px 18px 10px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontWeight:800,fontSize:17,color:C.text}}>Add to {meal.charAt(0).toUpperCase()+meal.slice(1)}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{FOODS.length} foods available</div>
            </div>
            <button onClick={onClose} style={{background:C.glass,border:`1px solid ${C.border}`,borderRadius:10,width:32,height:32,cursor:"pointer",color:C.muted,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="close" size={14} color={C.muted}/></button>
          </div>
          <div style={{position:"relative",marginBottom:8}}>
            <PremiumInput value={q} onChange={e=>setQ(e.target.value)} placeholder="Search foods…" autoFocus style={{paddingLeft:40}}/>
            <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
          <button onClick={()=>setShowCF(!showCF)} style={{width:"100%",padding:"8px",borderRadius:10,border:`1px solid ${showCF?C.purple:C.border}`,background:showCF?`${C.purple}15`:"transparent",color:showCF?C.purple:C.muted,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            {showCF?"▲ Close":"+ Create Custom Food"}
          </button>
        </div>
        {showCF&&(
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,background:`${C.purple}08`}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <PremiumInput placeholder="Food name" value={cf.name} onChange={e=>setCf({...cf,name:e.target.value})} style={{gridColumn:"1/-1"}}/>
              <PremiumInput placeholder="Serving size" value={cf.serving} onChange={e=>setCf({...cf,serving:e.target.value})}/>
              <PremiumInput placeholder="Calories" type="number" value={cf.cal} onChange={e=>setCf({...cf,cal:e.target.value})}/>
              {["carbs","fat","protein","fiber"].map(k=><PremiumInput key={k} placeholder={k.charAt(0).toUpperCase()+k.slice(1)+" g"} type="number" value={cf[k]} onChange={e=>setCf({...cf,[k]:e.target.value})}/>)}
            </div>
            <GradientBtn gradient={C.grad4} full sm onClick={()=>{if(!cf.name||!cf.cal)return;const food={id:uid(),name:cf.name,serving:cf.serving||"1 serving",cal:parseInt(cf.cal)||0,carbs:parseInt(cf.carbs)||0,fat:parseInt(cf.fat)||0,protein:parseInt(cf.protein)||0,fiber:parseInt(cf.fiber)||0,custom:true};setCustomFoods(p=>[...p,food]);onAdd(food);setShowCF(false);}} style={{marginTop:10}}>Save & Log</GradientBtn>
          </div>
        )}
        <div style={{overflowY:"auto",flex:1}}>
          {results.map(f=>(
            <div key={f.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:14,fontWeight:600,color:C.text}}>{f.name}</span>
                  {f.custom&&<Tag color={C.purple}>custom</Tag>}
                </div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>{f.serving} · {f.cal} cal · P{f.protein}g C{f.carbs}g F{f.fat}g</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <input type="number" min="0.5" step="0.5" value={qty[f.id]||""} onChange={e=>setQty({...qty,[f.id]:e.target.value})} placeholder="1"
                  style={{width:38,padding:"6px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,textAlign:"center",background:C.bg3,color:C.text}}/>
                <button onClick={()=>onAdd(scale(f))} style={{background:C.grad1,color:"#fff",border:"none",borderRadius:10,width:32,height:32,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(79,142,247,0.3)"}}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AILogger({onClose,onAdd}) {
  const [mode,setMode]=useState("text");
  const [text,setText]=useState("");
  const [meal,setMeal]=useState("breakfast");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  const [imgData,setImgData]=useState(null);
  const [barcode,setBarcode]=useState("");
  const fileRef=useRef();

  const callClaude=async(messages)=>{
    const r=await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json","anthropic-dangerous-allow-browser":"true"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,
        system:'You are a nutrition expert. Return ONLY a valid JSON array, no markdown, no text outside the array. Each element: {"name":"string","serving":"string","cal":number,"carbs":number,"fat":number,"protein":number,"fiber":number}',
        messages})});
    if(!r.ok) throw new Error(`API error ${r.status}`);
    const d=await r.json();
    if(d.error) throw new Error(d.error.message);
    const raw=(d.content?.[0]?.text||"[]").trim();
    const s=raw.indexOf("["),e=raw.lastIndexOf("]");
    if(s===-1||e===-1) throw new Error("Invalid response format");
    return JSON.parse(raw.slice(s,e+1));
  };

  const run=async()=>{
    setLoading(true);setError("");setResult(null);
    try{
      let parsed;
      if(mode==="text"){
        parsed=await callClaude([{role:"user",content:`Identify food items and estimate nutrition for: ${text}`}]);
      }else if(mode==="photo"&&imgData){
        parsed=await callClaude([{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:imgData.split(",")[1]}},{type:"text",text:"Identify all food items in this photo and estimate the nutrition for each."}]}]);
      }else if(mode==="barcode"&&barcode){
        const r=await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.trim()}.json`);
        if(!r.ok) throw new Error("Network error");
        const d=await r.json();
        if(d.status===1&&d.product){const p=d.product,n=p.nutriments||{};parsed=[{name:p.product_name||"Product",serving:p.serving_size||"100g",cal:Math.round(n["energy-kcal_serving"]||n["energy-kcal_100g"]||0),carbs:Math.round(n.carbohydrates_serving||n.carbohydrates_100g||0),fat:Math.round(n.fat_serving||n.fat_100g||0),protein:Math.round(n.proteins_serving||n.proteins_100g||0),fiber:Math.round(n.fiber_serving||n.fiber_100g||0)}];}
        else throw new Error("Product not found in database");
      }
      setResult((parsed||[]).map(f=>({...f,id:uid()})));
    }catch(e){setError(e.message||"Could not analyze. Try again.");}
    setLoading(false);
  };

  const modeItems=[{k:"text",icon:"ai",label:"Describe"},{k:"photo",icon:"camera",label:"Photo"},{k:"barcode",icon:"barcode",label:"Barcode"}];
  const canRun=(mode==="text"&&text.trim())||(mode==="photo"&&imgData)||(mode==="barcode"&&barcode.trim());

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:300,display:"flex",alignItems:"flex-end",backdropFilter:"blur(6px)"}}>
      <div style={{background:C.bg2,width:"100%",maxWidth:430,margin:"0 auto",borderRadius:"24px 24px 0 0",maxHeight:"93vh",display:"flex",flexDirection:"column",border:`1px solid ${C.border}`,borderBottom:"none"}}>
        <div style={{width:36,height:4,background:C.faint,borderRadius:9,margin:"12px auto 0"}}/>
        <div style={{padding:"14px 18px 12px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <div style={{fontWeight:900,fontSize:18,color:C.text,letterSpacing:"-0.3px"}}>✨ Smart Food Logger</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>Powered by Claude AI</div>
            </div>
            <button onClick={onClose} style={{background:C.glass,border:`1px solid ${C.border}`,borderRadius:12,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="close" size={14} color={C.muted}/></button>
          </div>
          {/* Mode selector */}
          <div style={{display:"flex",gap:6,background:C.bg3,borderRadius:14,padding:4}}>
            {modeItems.map(m=>(
              <button key={m.k} onClick={()=>{setMode(m.k);setResult(null);setError("");}}
                style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:mode===m.k?C.blue:"transparent",color:mode===m.k?"#fff":C.muted,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"all .2s"}}>
                <Icon name={m.icon} size={14} color={mode===m.k?"#fff":C.muted}/>{m.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{padding:"16px 18px",flex:1,overflowY:"auto"}}>
          {/* Meal selector */}
          <div style={{display:"flex",gap:5,marginBottom:14}}>
            {["breakfast","lunch","dinner","snacks"].map(m=>(
              <button key={m} onClick={()=>setMeal(m)} style={{flex:1,padding:"7px 0",borderRadius:10,border:`1px solid ${meal===m?C.blue:C.border}`,background:meal===m?C.blueLight:"transparent",color:meal===m?C.blue:C.muted,fontSize:11,fontWeight:600,cursor:"pointer",textTransform:"capitalize",transition:"all .2s"}}>{m}</button>
            ))}
          </div>

          {mode==="text"&&<textarea value={text} onChange={e=>setText(e.target.value)}
            placeholder={'Describe what you ate...\n\n"2 scrambled eggs on toast with avocado"\n"Chicken rice bowl with veggies"\n"Big Mac and medium fries"'}
            style={{width:"100%",padding:"14px",borderRadius:14,border:`1.5px solid ${C.border}`,background:C.bg3,color:C.text,fontSize:14,minHeight:120,boxSizing:"border-box",resize:"none",outline:"none",fontFamily:"inherit",lineHeight:1.6,marginBottom:12}}/>}

          {mode==="photo"&&(
            <>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setImgData(ev.target.result);r.readAsDataURL(f);}}/>
              {imgData
                ?<div style={{marginBottom:12}}><img src={imgData} alt="meal" style={{width:"100%",borderRadius:16,maxHeight:220,objectFit:"cover",marginBottom:10}}/><GhostBtn onClick={()=>{setImgData(null);setResult(null);}} color={C.red} sm>Remove photo</GhostBtn></div>
                :<div style={{border:`2px dashed ${C.border}`,borderRadius:18,padding:"40px 20px",textAlign:"center",marginBottom:12,cursor:"pointer"}} onClick={()=>fileRef.current?.click()}>
                  <div style={{width:56,height:56,borderRadius:16,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Icon name="camera" size={26} color={C.blue}/></div>
                  <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:6}}>Take or Upload a Photo</div>
                  <div style={{fontSize:13,color:C.muted,marginBottom:16}}>AI identifies every food item and estimates nutrition instantly</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <GradientBtn gradient={C.grad1} sm onClick={e=>{e.stopPropagation();fileRef.current?.click();}}>📸 Camera</GradientBtn>
                    <GhostBtn color={C.blue} sm onClick={e=>{e.stopPropagation();fileRef.current?.click();}}>🖼 Upload</GhostBtn>
                  </div>
                </div>}
            </>
          )}

          {mode==="barcode"&&(
            <div style={{marginBottom:12}}>
              <div style={{border:`2px dashed ${C.border}`,borderRadius:18,padding:"28px 20px",textAlign:"center",marginBottom:10}}>
                <div style={{width:56,height:56,borderRadius:16,background:C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Icon name="barcode" size={24} color={C.blue}/></div>
                <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:6}}>Barcode Lookup</div>
                <div style={{fontSize:13,color:C.muted,marginBottom:14}}>2M+ products via Open Food Facts</div>
                <PremiumInput value={barcode} onChange={e=>setBarcode(e.target.value)} placeholder="Enter barcode number…" style={{textAlign:"center",letterSpacing:2,fontSize:16}}/>
              </div>
            </div>
          )}

          <GradientBtn onClick={run} gradient={C.grad1} full disabled={loading||!canRun} style={{marginBottom:12,letterSpacing:"0.5px"}}>
            {loading?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Analyzing…</span>:"🔍 Analyze"}
          </GradientBtn>

          {error&&<div style={{color:C.red,fontSize:13,padding:"12px 16px",background:`${C.red}12`,borderRadius:12,border:`1px solid ${C.red}25`,marginBottom:10}}>{error}</div>}

          {result&&(
            <div>
              <div style={{fontWeight:800,fontSize:16,marginBottom:12,color:C.text}}>{result.length} item{result.length!==1?"s":""} identified</div>
              {result.map((f,i)=>(
                <div key={i} style={{background:C.glass,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontWeight:700,fontSize:14,color:C.text}}>{f.name}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{f.serving}</div></div>
                    <div style={{fontWeight:900,color:C.blue,fontSize:17}}>{f.cal}<span style={{fontSize:10,fontWeight:500,color:C.muted}}> cal</span></div>
                  </div>
                  <div style={{display:"flex",gap:12,marginTop:8}}>
                    {[["C",f.carbs,"#60A5FA"],["F",f.fat,C.purple],["P",f.protein,C.green],["Fi",f.fiber,C.yellow]].map(([l,v,c])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:5,height:5,borderRadius:"50%",background:c}}/><span style={{fontSize:11,color:C.muted}}>{l} <span style={{color:C.text2,fontWeight:600}}>{v}g</span></span></div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{background:C.blueLight,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",marginBottom:12,textAlign:"center",fontSize:13,fontWeight:700,color:C.blue}}>
                Total: {result.reduce((s,f)=>s+f.cal,0)} cal · P{result.reduce((s,f)=>s+f.protein,0)}g · C{result.reduce((s,f)=>s+f.carbs,0)}g
              </div>
              <GradientBtn onClick={()=>onAdd(result,meal)} gradient={C.grad2} full>✓ Log to {meal.charAt(0).toUpperCase()+meal.slice(1)}</GradientBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkoutTab({workouts,onStart,prs,EXERCISES,setCustomEx,onViewEx}) {
  const [view,setView]=useState("home");
  const [showCE,setShowCE]=useState(false);
  const [newEx,setNewEx]=useState({name:"",muscle:"Chest",equipment:"Barbell",type:"strength"});
  const weekW=workouts.filter(w=>(new Date()-new Date(w.date))/86400000<7).length;
  const vol=workouts.slice(-20).reduce((s,w)=>s+w.exercises.reduce((ss,e)=>ss+e.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((sss,set)=>sss+(parseFloat(set.weight)*parseInt(set.reps)),0),0),0);

  if(view==="programs") return <ProgramExplorer onBack={()=>setView("home")} onStart={onStart} EXERCISES={EXERCISES}/>;

  return (
    <div>
      <div style={{background:C.bg2,padding:"20px 16px 14px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontSize:22,fontWeight:900}}>Workout</div>
          <button onClick={()=>setShowCE(true)} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",color:C.muted}}>+ Custom Ex</button>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[{l:"This week",v:weekW},{l:"Vol (recent)",v:`${Math.round(vol)}kg`},{l:"Total workouts",v:workouts.length}].map((s,i)=>(
            <div key={i}><div style={{fontSize:18,fontWeight:900,color:C.blue}}>{s.v}</div><div style={{fontSize:11,color:C.muted}}>{s.l}</div></div>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        <Btn color={C.blue} full onClick={()=>onStart({id:Date.now(),date:todayStr(),name:"Quick Workout",startTime:Date.now(),exercises:[]})}>⚡ Start Empty Workout</Btn>
        <div style={{marginTop:10,marginBottom:16}}>
          <button onClick={()=>setView("programs")} style={{width:"100%",padding:"12px",borderRadius:14,border:`1px solid ${C.border}`,background:C.bg3,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>📋 Explore Programs ({PROGRAMS.length})</span><span style={{color:C.blue,fontWeight:700}}>View All →</span>
          </button>
        </div>

        {Object.keys(prs).length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>🏆 Personal Records</div>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
              {Object.entries(prs).slice(0,6).map(([id,rm])=>{
                const ex=EXERCISES.find(e=>e.id===id);
                return ex?(<div key={id} onClick={()=>onViewEx(ex)} style={{background:C.card,borderRadius:14,padding:"10px 14px",border:`1px solid ${C.border}`,minWidth:110,flexShrink:0,cursor:"pointer"}}>
                  <div style={{fontSize:9,color:C.muted}}>{ex.muscle}</div>
                  <div style={{fontSize:12,fontWeight:700}}>{ex.name.split(" (")[0]}</div>
                  <div style={{fontSize:18,fontWeight:900,color:C.blue,marginTop:2}}>{rm}kg</div>
                  <div style={{fontSize:9,color:C.muted}}>est. 1RM</div>
                </div>):null;
              })}
            </div>
          </div>
        )}

        <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>Exercise Library ({EXERCISES.length})</div>
        <ExerciseBrowser EXERCISES={EXERCISES} onView={onViewEx}
          onAdd={ex=>onStart({id:Date.now(),date:todayStr(),name:ex.name,startTime:Date.now(),exercises:[{...ex,sets:[{weight:"",reps:"",done:false}]}]})}/>

        <div style={{fontWeight:700,fontSize:15,marginBottom:8,marginTop:16}}>Recent Workouts</div>
        {workouts.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"30px 0"}}>No workouts yet. Start your first one! 💪</div>}
        {workouts.slice().reverse().slice(0,6).map((w,i)=>{
          const done=w.exercises.reduce((s,e)=>s+e.sets.filter(s=>s.done).length,0);
          const v=w.exercises.reduce((s,e)=>s+e.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((ss,set)=>ss+(parseFloat(set.weight)*parseInt(set.reps)),0),0);
          return(<div key={i} style={{background:C.card,borderRadius:14,padding:"12px 14px",marginBottom:8,border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontWeight:700,fontSize:14}}>{w.name}</div><div style={{fontSize:11,color:C.muted}}>{fmtDate(w.date)} · {w.duration}m · {done} sets</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:800,color:C.blue}}>{Math.round(v)}kg</div><div style={{fontSize:10,color:C.muted}}>volume</div></div>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:6}}>
              {w.exercises.slice(0,4).map((e,j)=><Pill key={j} sm color="rgba(47,128,237,0.15)" text={C.blue}>{e.name.split(" (")[0]}</Pill>)}
              {w.exercises.length>4&&<Pill sm color={C.bg3} text={C.muted}>+{w.exercises.length-4}</Pill>}
            </div>
          </div>);
        })}
      </div>

      {showCE&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:C.bg2,borderRadius:22,padding:24,width:"100%",maxWidth:360,border:`1px solid ${C.border}`}}>
            <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>Create Custom Exercise</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <DarkInput value={newEx.name} onChange={e=>setNewEx({...newEx,name:e.target.value})} placeholder="Exercise name" autoFocus/>
              {[["muscle",["Chest","Back","Legs","Shoulders","Arms","Core","Glutes","Calves","Forearms","Traps","Cardio","Full Body"]],
                ["equipment",["Barbell","Dumbbell","Cable","Machine","Bodyweight","Kettlebell","EZ Bar","Other"]],
                ["type",["strength","cardio","time"]]].map(([k,opts])=>(
                <select key={k} value={newEx[k]} onChange={e=>setNewEx({...newEx,[k]:e.target.value})}
                  style={{padding:"10px 12px",borderRadius:12,border:`1px solid ${C.border}`,fontSize:14,background:C.bg3,color:"#fff"}}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              ))}
            </div>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={()=>setShowCE(false)} style={{flex:1,padding:"10px",borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:600}}>Cancel</button>
              <button onClick={()=>{if(!newEx.name.trim())return;setCustomEx(p=>[...p,{...newEx,id:uid(),custom:true,secondary:[]}]);setShowCE(false);setNewEx({name:"",muscle:"Chest",equipment:"Barbell",type:"strength"});}}
                style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:C.blue,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>Add Exercise</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseBrowser({EXERCISES,onView,onAdd}) {
  const [q,setQ]=useState("");
  const [muscle,setMuscle]=useState("All");
  const [showAll,setShowAll]=useState(false);
  const muscles=["All","Chest","Back","Legs","Glutes","Calves","Shoulders","Arms","Traps","Core","Cardio","Full Body","Forearms"];
  const res=EXERCISES.filter(e=>(muscle==="All"||e.muscle===muscle)&&e.name.toLowerCase().includes(q.toLowerCase()));
  const shown=showAll?res:res.slice(0,8);
  return (
    <div>
      <DarkInput value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${EXERCISES.length} exercises…`} style={{marginBottom:8}}/>
      <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8,marginBottom:8}}>
        {muscles.map(m=><button key={m} onClick={()=>{setMuscle(m);setShowAll(false);}} style={{padding:"4px 10px",borderRadius:22,border:"none",background:muscle===m?C.blue:C.bg3,color:muscle===m?"#fff":C.muted,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{MUSCLE_EMOJI[m]||""} {m}</button>)}
      </div>
      {shown.map(e=>(
        <div key={e.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:C.card,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:6}}>
          <div onClick={()=>onView(e)} style={{flex:1,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:13,fontWeight:600}}>{e.name}</span>
              {e.custom&&<Pill sm color="rgba(139,92,246,0.2)" text={C.purple}>custom</Pill>}
            </div>
            <div style={{fontSize:11,color:C.muted}}>{e.muscle} · {e.equipment}{e.secondary?.length?` · ${e.secondary.slice(0,2).join(", ")}`:""}</div>
          </div>
          <button onClick={()=>onAdd(e)} style={{background:C.blue,color:"#fff",border:"none",borderRadius:8,padding:"6px 10px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>Log</button>
        </div>
      ))}
      {res.length>8&&<button onClick={()=>setShowAll(!showAll)} style={{width:"100%",padding:"8px",border:`1px solid ${C.border}`,borderRadius:12,background:"transparent",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>{showAll?`Show less ▲`:`Show all ${res.length} results ▼`}</button>}
    </div>
  );
}

function ProgramExplorer({onBack,onStart,EXERCISES}) {
  const [selected,setSelected]=useState(null);
  const [levelF,setLevelF]=useState("All");
  const levels=["All","Beginner","Intermediate","Advanced"];
  const filtered=PROGRAMS.filter(p=>levelF==="All"||p.level===levelF);
  if(selected) return <ProgramDetail program={selected} onBack={()=>setSelected(null)} onStart={onStart} EXERCISES={EXERCISES}/>;
  return (
    <div>
      <div style={{background:C.bg2,padding:"16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:18}}>←</button>
        <div style={{fontWeight:800,fontSize:18}}>Explore Programs</div>
      </div>
      <div style={{padding:"10px 16px 0"}}>
        <div style={{display:"flex",gap:6,paddingBottom:10}}>
          {levels.map(l=><button key={l} onClick={()=>setLevelF(l)} style={{padding:"5px 12px",borderRadius:22,border:"none",background:levelF===l?C.blue:C.bg3,color:levelF===l?"#fff":C.muted,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>{l}</button>)}
        </div>
      </div>
      <div style={{padding:"4px 16px 16px"}}>
        {filtered.map(p=>(
          <div key={p.id} onClick={()=>setSelected(p)} style={{display:"flex",alignItems:"center",gap:14,background:C.card,borderRadius:16,padding:"14px",marginBottom:10,border:`1px solid ${C.border}`,cursor:"pointer"}}>
            <div style={{width:70,height:70,background:p.color+"22",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,flexShrink:0,border:`2px solid ${p.color}44`}}>{p.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:3}}>{p.level} · {p.goal}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{p.routines.length} routines · {p.equipment}</div>
            </div>
            <span style={{color:C.text2,fontSize:18}}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgramDetail({program,onBack,onStart,EXERCISES}) {
  return (
    <div>
      <div style={{background:C.bg2,padding:"16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:18}}>←</button>
        <div style={{fontWeight:800,fontSize:18}}>Program</div>
      </div>
      <div style={{padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
          <div style={{width:80,height:80,background:program.color+"22",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,border:`2px solid ${program.color}44`}}>{program.emoji}</div>
          <div><div style={{fontWeight:800,fontSize:17}}>{program.name}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>
              {[["📊",program.level],["🎯",program.goal],["🏋️",program.equipment],["📋",`${program.routines.length} Routines`]].map(([e,v])=>(<span key={v} style={{marginRight:10}}>{e} {v}</span>))}
            </div>
          </div>
        </div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:16,background:C.bg3,borderRadius:14,padding:"10px 14px",border:`1px solid ${C.border}`}}>{program.desc}</div>
        {program.routines.map((r,ri)=>(
          <div key={ri} style={{marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontWeight:800,fontSize:16}}>{r.name}</div>
              <button onClick={()=>onStart({id:Date.now(),date:todayStr(),name:r.name,startTime:Date.now(),
                exercises:r.exercises.map(re=>{const ex=EXERCISES.find(e=>e.id===re.id)||{id:re.id,name:re.id,muscle:"Other",equipment:"Other",type:"strength",secondary:[]};return{...ex,sets:Array.from({length:re.sets},()=>({weight:"",reps:"",done:false}))};})
              })} style={{background:C.blue,color:"#fff",border:"none",borderRadius:12,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Start</button>
            </div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.5}}>{r.desc}</div>
            {r.exercises.map((re,i)=>{
              const ex=EXERCISES.find(e=>e.id===re.id);
              return(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:C.card,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:6}}>
                <div style={{width:44,height:44,background:C.bg3,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{MUSCLE_EMOJI[ex?.muscle]||"💪"}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:C.blue}}>{ex?.name||re.id}</div>
                  <div style={{fontSize:12,color:C.muted}}>{re.sets} sets · {re.repsRange} reps</div>
                </div>
              </div>);
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExerciseDetail({ex,workouts,prs,onBack}) {
  const [tab,setTab]=useState("summary");
  const pr=prs[ex.id];
  const history=workouts.filter(w=>w.exercises.some(e=>e.id===ex.id)).slice().reverse();
  const prog=history.map(w=>{const e2=w.exercises.find(e=>e.id===ex.id);const best=e2.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((b,s)=>{const rm=oneRM(parseFloat(s.weight),parseInt(s.reps));return rm>b?rm:b;},0);return{val:best,label:new Date(w.date+"T12:00").toLocaleDateString("en-US",{month:"numeric",day:"numeric"})};}).filter(d=>d.val>0);
  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <div style={{background:C.bg2,padding:"16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:18}}>←</button>
        <div style={{fontWeight:700,fontSize:16}}>{ex.name.split(" (")[0]}</div>
        <div style={{width:36}}/>
      </div>
      <div style={{background:C.bg2,height:180,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",borderBottom:`1px solid ${C.border}`}}>
        <div style={{fontSize:90,opacity:.8}}>{MUSCLE_EMOJI[ex.muscle]||"💪"}</div>
        <div style={{position:"absolute",bottom:12,left:16,display:"flex",gap:6}}>
          <Pill color="rgba(47,128,237,0.3)" text={C.blue}>{ex.muscle}</Pill>
          <Pill color={C.bg3} text={C.muted}>{ex.equipment}</Pill>
          {ex.secondary?.slice(0,2).map(s=><Pill key={s} sm color={C.bg3} text={C.text2}>{s}</Pill>)}
        </div>
      </div>
      <div style={{display:"flex",background:C.bg2,borderBottom:`1px solid ${C.border}`}}>
        {["summary","history"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px",border:"none",background:"none",fontWeight:tab===t?700:400,color:tab===t?C.blue:C.muted,fontSize:13,cursor:"pointer",borderBottom:tab===t?"2px solid #2F80ED":"2px solid transparent",textTransform:"capitalize"}}>{t}</button>
        ))}
      </div>
      <div style={{padding:16}}>
        {tab==="summary"&&(
          <>
            {pr?(
              <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:18}}>🏆</span><span style={{fontWeight:700,color:C.muted,fontSize:13}}>Personal Records</span></div>
                <div style={{fontWeight:900,fontSize:32,color:C.blue}}>{pr}<span style={{fontSize:14,fontWeight:400,color:C.muted}}> kg</span></div>
                <div style={{fontSize:11,color:C.muted,marginBottom:14}}>Estimated 1RM</div>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  {[0.9,0.8,0.7,0.6].map(p=>(<div key={p} style={{flex:1,textAlign:"center",background:C.bg3,borderRadius:12,padding:"10px 0",border:`1px solid ${C.border}`}}>
                    <div style={{fontWeight:700,fontSize:15,color:C.blue}}>{Math.round(pr*p)}</div>
                    <div style={{fontSize:10,color:C.muted}}>{Math.round(p*100)}%</div>
                  </div>))}
                </div>
                {prog.length>=2&&<LineChart data={prog} color={C.blue} height={120} label="Estimated 1RM over sessions (kg)"/>}
              </div>
            ):(
              <div style={{textAlign:"center",padding:"40px 0",color:C.muted}}>
                <div style={{fontSize:48,marginBottom:10}}>📊</div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>No data yet</div>
                <div style={{fontSize:13}}>Complete this exercise in a workout to see your progress here.</div>
              </div>
            )}
          </>
        )}
        {tab==="history"&&(
          <div>
            {history.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"30px 0"}}>No history yet for this exercise.</div>}
            {history.map((w,i)=>{
              const e2=w.exercises.find(e=>e.id===ex.id);
              return(<div key={i} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"12px 14px",marginBottom:8}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{fmtDate(w.date)}</div>
                {e2.sets.filter(s=>s.done).map((s,j)=>(
                  <div key={j} style={{display:"flex",gap:16,padding:"5px 0",borderTop:j===0?`1px solid ${C.border}`:"none",marginTop:j===0?4:0}}>
                    <span style={{fontSize:12,color:C.muted,minWidth:40}}>Set {j+1}</span>
                    <span style={{fontSize:12,fontWeight:600}}>{s.weight}kg × {s.reps}</span>
                    <span style={{fontSize:11,color:C.text2}}>{oneRM(parseFloat(s.weight),parseInt(s.reps))}kg 1RM</span>
                  </div>
                ))}
                {e2.sets.filter(s=>s.done).length===0&&<div style={{fontSize:12,color:C.text2}}>No completed sets</div>}
              </div>);
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveWorkout({workout,setWorkout,onFinish,EXERCISES}) {
  const [elapsed,setElapsed]=useState(0);
  const [showEx,setShowEx]=useState(false);
  const [restLeft,setRestLeft]=useState(0);
  const [restOf,setRestOf]=useState(0);
  const restRef=useRef();
  useEffect(()=>{const t=setInterval(()=>setElapsed(Math.round((Date.now()-workout.startTime)/1000)),1000);return()=>clearInterval(t);},[]);
  const startRest=s=>{setRestOf(s);setRestLeft(s);clearInterval(restRef.current);restRef.current=setInterval(()=>setRestLeft(p=>{if(p<=1){clearInterval(restRef.current);return 0;}return p-1;}),1000);};
  const upd=(ei,si,f,v)=>{const w={...workout};w.exercises[ei].sets[si][f]=v;setWorkout(w);};
  const mark=(ei,si)=>{const w={...workout};const was=w.exercises[ei].sets[si].done;w.exercises[ei].sets[si].done=!was;setWorkout(w);if(!was)startRest(90);};
  const addS=ei=>{const w={...workout};w.exercises[ei].sets.push({weight:"",reps:"",done:false});setWorkout(w);};
  const rmEx=ei=>{const w={...workout};w.exercises.splice(ei,1);setWorkout(w);};
  const addEx=ex=>{const w={...workout};w.exercises.push({...ex,sets:[{weight:"",reps:"",done:false}]});setWorkout(w);setShowEx(false);};
  const done=workout.exercises.reduce((s,e)=>s+e.sets.filter(s=>s.done).length,0);
  return (
    <div style={{paddingBottom:80,background:C.bg,minHeight:"100vh"}}>
      <div style={{position:"sticky",top:0,zIndex:50,background:C.bg2,padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:900,fontSize:17}}>{workout.name}</div><div style={{fontSize:12,color:C.muted}}>⏱ {fmtTime(elapsed)} · {done} sets done</div></div>
          <button onClick={()=>onFinish(workout)} style={{background:C.blue,color:"#fff",border:"none",borderRadius:14,padding:"9px 20px",fontSize:14,fontWeight:800,cursor:"pointer"}}>Finish</button>
        </div>
        {restOf>0&&restLeft>0&&(
          <div style={{marginTop:8,background:C.bg3,borderRadius:12,padding:"6px 12px",display:"flex",alignItems:"center",gap:8,border:`1px solid ${C.border}`}}>
            <span style={{fontSize:12}}>⏳ Rest: {fmtTime(restLeft)}</span>
            <div style={{height:4,background:C.border,borderRadius:9,flex:1}}><div style={{height:4,background:C.blue,borderRadius:9,width:`${(restLeft/restOf)*100}%`,transition:"width 1s linear"}}/></div>
            <button onClick={()=>{clearInterval(restRef.current);setRestLeft(0);setRestOf(0);}} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer"}}>Skip</button>
          </div>
        )}
      </div>
      <div style={{padding:"12px 16px"}}>
        {workout.exercises.map((ex,ei)=>(
          <div key={ei} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:12,overflow:"hidden"}}>
            <div style={{padding:"10px 14px 8px",background:C.bg3,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.blue}}>{ex.name}</div>
                <div style={{fontSize:11,color:C.muted}}>{ex.muscle} · {ex.equipment} · {ex.sets.filter(s=>s.done).length}/{ex.sets.length} sets</div>
              </div>
              <button onClick={()=>rmEx(ei)} style={{background:"none",border:"none",color:C.text2,fontSize:18,cursor:"pointer"}}>×</button>
            </div>
            <div style={{padding:"0 14px"}}>
              <div style={{display:"grid",gridTemplateColumns:"22px 1fr 1fr 1fr 28px",gap:6,padding:"6px 0 4px",fontSize:9,fontWeight:700,color:C.text2,borderBottom:`1px solid ${C.border}`}}>
                <span>#</span><span>PREV</span><span>KG</span><span>REPS</span><span>✓</span>
              </div>
              {ex.sets.map((set,si)=>(
                <div key={si} style={{display:"grid",gridTemplateColumns:"22px 1fr 1fr 1fr 28px",gap:6,alignItems:"center",borderBottom:`1px solid ${C.border}`,background:set.done?"rgba(34,197,94,.08)":"transparent",margin:"0 -14px",padding:"5px 14px"}}>
                  <span style={{fontSize:11,fontWeight:700,color:set.done?C.green:C.text2}}>{si+1}</span>
                  <span style={{fontSize:10,color:"#374151"}}>—</span>
                  <input type="number" value={set.weight} onChange={e=>upd(ei,si,"weight",e.target.value)} placeholder="0"
                    style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 4px",fontSize:13,width:"100%",textAlign:"center",background:set.done?"rgba(34,197,94,.15)":C.bg3,color:"#fff"}}/>
                  <input type="number" value={set.reps} onChange={e=>upd(ei,si,"reps",e.target.value)} placeholder="0"
                    style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 4px",fontSize:13,width:"100%",textAlign:"center",background:set.done?"rgba(34,197,94,.15)":C.bg3,color:"#fff"}}/>
                  <button onClick={()=>mark(ei,si)} style={{width:26,height:26,borderRadius:7,border:"none",background:set.done?C.green:C.border,color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700}}>{set.done?"✓":""}</button>
                </div>
              ))}
            </div>
            <div style={{padding:"8px 14px",display:"flex",gap:6}}>
              <button onClick={()=>addS(ei)} style={{flex:1,background:C.bg3,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px",fontSize:12,fontWeight:600,cursor:"pointer",color:"#fff"}}>+ Set</button>
              {[60,90,180].map(s=><button key={s} onClick={()=>startRest(s)} style={{padding:"7px 10px",background:"rgba(47,128,237,0.15)",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",color:C.blue}}>{s<120?`${s}s`:`${s/60}m`}</button>)}
            </div>
          </div>
        ))}
        <button onClick={()=>setShowEx(true)} style={{width:"100%",background:"transparent",border:"2px dashed #2A2A2A",borderRadius:14,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer",color:C.text2}}>+ Add Exercise</button>
      </div>
      {showEx&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
          <div style={{background:C.bg2,width:"100%",maxWidth:430,margin:"0 auto",borderRadius:"20px 20px 0 0",maxHeight:"82vh",display:"flex",flexDirection:"column",border:`1px solid ${C.border}`}}>
            <ExercisePickerContent EXERCISES={EXERCISES} onClose={()=>setShowEx(false)} onAdd={addEx}/>
          </div>
        </div>
      )}
    </div>
  );
}

function ExercisePickerContent({EXERCISES,onClose,onAdd}) {
  const [q,setQ]=useState("");
  const [muscle,setMuscle]=useState("All");
  const muscles=["All","Chest","Back","Legs","Glutes","Shoulders","Arms","Core","Calves","Cardio","Full Body","Forearms","Traps"];
  const res=EXERCISES.filter(e=>(muscle==="All"||e.muscle===muscle)&&e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div style={{padding:"16px 16px 10px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontWeight:800,fontSize:16}}>Add Exercise ({EXERCISES.length})</span>
          <button onClick={onClose} style={{background:C.bg3,border:"none",borderRadius:8,width:30,height:30,fontSize:18,cursor:"pointer",color:C.muted}}>×</button>
        </div>
        <DarkInput value={q} onChange={e=>setQ(e.target.value)} placeholder="Search exercises…" autoFocus/>
        <div style={{display:"flex",gap:5,marginTop:8,overflowX:"auto",paddingBottom:2}}>
          {muscles.map(m=><button key={m} onClick={()=>setMuscle(m)} style={{padding:"4px 9px",borderRadius:22,border:"none",background:muscle===m?C.blue:C.bg3,color:muscle===m?"#fff":C.muted,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{m}</button>)}
        </div>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {res.map(e=>(
          <div key={e.id} onClick={()=>onAdd(e)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 16px",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:14,fontWeight:600}}>{e.name}</span>
                {e.custom&&<Pill sm color="rgba(139,92,246,0.2)" text={C.purple}>custom</Pill>}
              </div>
              <div style={{fontSize:11,color:C.muted}}>{e.muscle} · {e.equipment}</div>
            </div>
            <div style={{background:C.blue,color:"#fff",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700}}>+</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── PROGRESS TAB ───────────────────────────────────────────────────────────────
function ProgressTab({workouts,diary,goals,weight,setWeight,measurements,setMeasurements,totals,prs,EXERCISES}) {
  const [tab,setTab]=useState("overview");
  const [showWM,setShowWM]=useState(false);
  const [showMM,setShowMM]=useState(false);
  const [wIn,setWIn]=useState("");
  const [mIn,setMIn]=useState({chest:"",waist:"",hips:"",arms:"",thighs:""});
  const last7=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const k=d.toISOString().split("T")[0];return{val:Object.values(diary[k]||{}).flat().reduce((s,f)=>s+f.cal,0),prot:Object.values(diary[k]||{}).flat().reduce((s,f)=>s+f.protein,0),label:d.toLocaleDateString("en-US",{weekday:"short"}).slice(0,1),highlight:k===todayStr()};});
  const weekW=workouts.filter(w=>(new Date()-new Date(w.date))/86400000<7).length;
  const totalVol=workouts.reduce((s,w)=>s+w.exercises.reduce((ss,e)=>ss+e.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((sss,set)=>sss+(parseFloat(set.weight)*parseInt(set.reps)),0),0),0);
  const TABS2=["overview","nutrition","workouts","body","PRs"];

  return (
    <div>
      <div style={{background:C.bg2,padding:"20px 16px 14px",borderBottom:`1px solid ${C.border}`}}><div style={{fontSize:22,fontWeight:900}}>Progress</div></div>
      <div style={{display:"flex",background:C.bg2,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
        {TABS2.map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 4px",border:"none",background:"none",fontWeight:tab===t?700:400,color:tab===t?C.blue:C.muted,fontSize:12,cursor:"pointer",borderBottom:tab===t?"2px solid #2F80ED":"2px solid transparent",whiteSpace:"nowrap",minWidth:60,textTransform:"capitalize"}}>{t}</button>)}
      </div>
      <div style={{padding:16}}>
        {tab==="overview"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[{l:"This week",v:`${weekW} workouts`,i:"💪",c:C.blue},{l:"Cal today",v:totals.cal,i:"🔥",c:C.orange},{l:"Protein today",v:`${totals.protein}g`,i:"🥩",c:C.green},{l:"Total volume",v:`${Math.round(totalVol)}kg`,i:"🏋️",c:C.purple}].map((s,i)=>(
                <div key={i} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px"}}><div style={{fontSize:22}}>{s.i}</div><div style={{fontSize:20,fontWeight:900,color:s.c,marginTop:4}}>{s.v}</div><div style={{fontSize:11,color:C.muted}}>{s.l}</div></div>
              ))}
            </div>
            <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:12}}>
              <div style={{fontWeight:700,marginBottom:10}}>Calories — 7 Days</div>
              <MiniBar data={last7} color={C.blue} height={80}/>
            </div>
            <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px"}}>
              <div style={{fontWeight:700,marginBottom:12}}>Today's Macros</div>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <Donut segments={[{val:totals.carbs,color:"#60A5FA"},{val:totals.fat,color:"#A78BFA"},{val:totals.protein,color:"#34D399"}]} size={80} label={`${totals.cal}`} sub="cal"/>
                <div style={{flex:1}}>
                  {[["Carbs",totals.carbs,goals.carbs,"#60A5FA"],["Fat",totals.fat,goals.fat,"#A78BFA"],["Protein",totals.protein,goals.protein,"#34D399"]].map(([l,v,m,c])=>(
                    <div key={l} style={{marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12,fontWeight:600,color:c}}>{l}</span><span style={{fontSize:11,color:C.muted}}>{v}/{m}g</span></div>
                      <div style={{height:4,background:C.border,borderRadius:9}}><div style={{height:4,background:c,borderRadius:9,width:`${Math.min(100,(v/m)*100)}%`}}/></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {tab==="nutrition"&&(
          <>
            <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:12}}>
              <div style={{fontWeight:700,marginBottom:10}}>Calories — 7 Days</div>
              <MiniBar data={last7} color={C.blue} height={90}/>
              <div style={{display:"flex",justifyContent:"space-around",marginTop:12}}>
                {[{l:"Avg/day",v:Math.round(last7.reduce((s,d)=>s+d.val,0)/7),c:C.blue},{l:"Highest",v:Math.max(...last7.map(d=>d.val),0),c:C.orange},{l:"Goal",v:goals.cal,c:C.green}].map((s,i)=>(
                  <div key={i} style={{textAlign:"center"}}><div style={{fontWeight:800,color:s.c,fontSize:17}}>{s.v}</div><div style={{fontSize:10,color:C.muted}}>{s.l}</div></div>
                ))}
              </div>
            </div>
            <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px"}}>
              <div style={{fontWeight:700,marginBottom:10}}>Protein — 7 Days</div>
              <MiniBar data={last7.map(d=>({...d,val:d.prot}))} color={C.green} height={80}/>
            </div>
          </>
        )}
        {tab==="workouts"&&(
          <>
            <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-around"}}>
                {[{l:"Total",v:workouts.length},{l:"This Week",v:weekW},{l:"Volume (all)",v:`${Math.round(totalVol)}kg`}].map((s,i)=>(
                  <div key={i} style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:C.blue}}>{s.v}</div><div style={{fontSize:11,color:C.muted}}>{s.l}</div></div>
                ))}
              </div>
            </div>
            {workouts.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"30px 0"}}>No workouts yet!</div>}
            {workouts.slice().reverse().map((w,i)=>{
              const v=w.exercises.reduce((s,e)=>s+e.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((ss,set)=>ss+(parseFloat(set.weight)*parseInt(set.reps)),0),0);
              return(<div key={i} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"12px 14px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:700}}>{w.name}</div><span style={{fontSize:11,color:C.muted}}>{fmtDate(w.date)}</span></div>
                <div style={{display:"flex",gap:14,marginTop:6}}>
                  {[["Dur",`${w.duration}m`],["Vol",`${Math.round(v)}kg`],["Ex",w.exercises.length],["Sets",w.exercises.reduce((s,e)=>s+e.sets.filter(s=>s.done).length,0)]].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:10,color:C.muted}}>{l}</div><div style={{fontWeight:700,color:C.blue}}>{v}</div></div>
                  ))}
                </div>
              </div>);
            })}
          </>
        )}
        {tab==="body"&&(
          <>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button onClick={()=>setShowWM(true)} style={{flex:1,padding:"10px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Log Weight</button>
              <button onClick={()=>setShowMM(true)} style={{flex:1,padding:"10px",borderRadius:14,border:`1px solid ${C.border}`,background:"transparent",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Measurements</button>
            </div>
            {weight.length>=2&&<div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:12}}>
              <div style={{fontWeight:700,marginBottom:10}}>Weight Trend</div>
              <div style={{display:"flex",gap:20,marginBottom:12}}>
                <div><div style={{fontSize:10,color:C.muted}}>Current</div><div style={{fontWeight:900,color:C.blue,fontSize:22}}>{weight[weight.length-1].val}kg</div></div>
                <div><div style={{fontSize:10,color:C.muted}}>Change</div><div style={{fontWeight:900,fontSize:22,color:weight[weight.length-1].val<weight[0].val?C.green:C.red}}>{(weight[weight.length-1].val-weight[0].val>0?"+":"")+(weight[weight.length-1].val-weight[0].val).toFixed(1)}kg</div></div>
                <div><div style={{fontSize:10,color:C.muted}}>Start</div><div style={{fontWeight:900,color:C.muted,fontSize:22}}>{weight[0].val}kg</div></div>
              </div>
              <LineChart data={weight.slice(-12).map(w=>({val:w.val,label:new Date(w.date+"T12:00").toLocaleDateString("en-US",{month:"numeric",day:"numeric"})}))} color={C.blue} height={120}/>
            </div>}
            {weight.length===1&&<div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",marginBottom:12}}><div style={{fontWeight:700,marginBottom:4}}>Current Weight</div><div style={{fontWeight:900,color:C.blue,fontSize:26}}>{weight[0].val}kg</div><div style={{fontSize:12,color:C.muted,marginTop:4}}>Log more entries to see trend</div></div>}
            {weight.length===0&&<div style={{textAlign:"center",color:C.muted,padding:"20px 0"}}>No weight entries yet. Start tracking!</div>}
            {measurements.length>0&&<div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"14px"}}>
              <div style={{fontWeight:700,marginBottom:10}}>Latest Measurements</div>
              {Object.entries(measurements[measurements.length-1]).filter(([k])=>k!=="date").map(([k,v])=>v?(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,textTransform:"capitalize"}}>{k}</span><span style={{fontWeight:700,color:C.blue}}>{v}cm</span></div>):null)}
            </div>}
          </>
        )}
        {tab==="PRs"&&(
          <>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Tap any PR to see your strength progression</div>
            {Object.keys(prs).length===0&&<div style={{textAlign:"center",color:C.muted,padding:"30px 0"}}><div style={{fontSize:40,marginBottom:8}}>🏆</div>Complete workouts to see PRs here!</div>}
            {Object.entries(prs).map(([id,rm])=>{
              const ex=EXERCISES.find(e=>e.id===id);if(!ex)return null;
              const prog=workouts.filter(w=>w.exercises.some(e=>e.id===id)).map(w=>{const e2=w.exercises.find(e=>e.id===id);const best=e2.sets.filter(s=>s.done&&s.weight&&s.reps).reduce((b,s)=>{const rm=oneRM(parseFloat(s.weight),parseInt(s.reps));return rm>b?rm:b;},0);return{val:best,label:new Date(w.date+"T12:00").toLocaleDateString("en-US",{month:"numeric",day:"numeric"})};}).filter(d=>d.val>0);
              return(<details key={id} style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,padding:"12px 14px",marginBottom:10}}>
                <summary style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",listStyle:"none"}}>
                  <div><div style={{fontWeight:700,fontSize:14}}>{ex.name.split(" (")[0]}</div><Pill sm color="rgba(47,128,237,0.2)" text={C.blue}>{ex.muscle}</Pill></div>
                  <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:24,color:C.blue}}>{rm}<span style={{fontSize:11,fontWeight:400,color:C.muted}}> kg</span></div><div style={{fontSize:9,color:C.muted}}>Est. 1RM · tap ▼</div></div>
                </summary>
                <div style={{marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:12}}>
                  <LineChart data={prog} color={C.blue} height={110} label="Estimated 1RM (kg)"/>
                  <div style={{display:"flex",gap:6,marginTop:12}}>
                    {[0.95,0.9,0.85,0.8,0.75,0.7].map(p=>(
                      <div key={p} style={{flex:1,textAlign:"center",background:C.bg3,borderRadius:8,padding:"7px 0",border:`1px solid ${C.border}`}}>
                        <div style={{fontWeight:700,fontSize:12,color:C.blue}}>{Math.round(rm*p)}</div>
                        <div style={{fontSize:9,color:C.muted}}>{Math.round(p*100)}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>);
            })}
          </>
        )}
      </div>

      {showWM&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{background:C.bg2,borderRadius:22,padding:24,width:280,border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>Log Weight</div>
          <DarkInput type="number" value={wIn} onChange={e=>setWIn(e.target.value)} placeholder="e.g. 75.5 kg" autoFocus style={{marginBottom:14}}/>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setShowWM(false)} style={{flex:1,padding:"10px",borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:600}}>Cancel</button>
            <button onClick={()=>{if(wIn){setWeight([...weight,{date:todayStr(),val:parseFloat(wIn)}]);setShowWM(false);setWIn("");}}} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:C.blue,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>Save</button>
          </div>
        </div>
      </div>)}
      {showMM&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <div style={{background:C.bg2,borderRadius:22,padding:24,width:"100%",maxWidth:340,border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>Body Measurements (cm)</div>
          {Object.keys(mIn).map(k=>(<div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:14,textTransform:"capitalize"}}>{k}</span><input type="number" value={mIn[k]} onChange={e=>setMIn({...mIn,[k]:e.target.value})} placeholder="—" style={{width:80,padding:"7px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14,textAlign:"center",background:C.bg3,color:"#fff"}}/></div>))}
          <div style={{display:"flex",gap:10,marginTop:6}}>
            <button onClick={()=>setShowMM(false)} style={{flex:1,padding:"10px",borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:600}}>Cancel</button>
            <button onClick={()=>{setMeasurements([...measurements,{date:todayStr(),...mIn}]);setShowMM(false);}} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:C.blue,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>Save</button>
          </div>
        </div>
      </div>)}
    </div>
  );
}

// ── PROFILE TAB ────────────────────────────────────────────────────────────────
function ProfileTab({profile,setProfile,goals,setGoals,workouts,setOnboarded}) {
  const [editing,setEditing]=useState(false);
  const [lp,setLp]=useState(profile);
  const [lg,setLg]=useState(goals);
  const [calcOpen,setCalcOpen]=useState(false);
  const [rmW,setRmW]=useState("");const [rmR,setRmR]=useState("");const [rmRes,setRmRes]=useState(null);
  const [fastOpen,setFastOpen]=useState(false);
  const [fastStart,setFastStart]=useState(null);
  const [fastEl,setFastEl]=useState(0);
  const fastRef=useRef();
  useEffect(()=>{if(!fastStart)return;const t=setInterval(()=>setFastEl(Math.round((Date.now()-fastStart)/1000)),1000);return()=>clearInterval(t);},[fastStart]);
  const save=()=>{setProfile(lp);setGoals(lg);setEditing(false);};
  const weekW=workouts.filter(w=>(new Date()-new Date(w.date))/86400000<7).length;

  return (
    <div>
      <div style={{background:C.bg2,padding:"20px 16px 20px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
          <div style={{width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#8B5CF6,#2F80ED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff"}}>
            {(profile.name||"A").charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{fontWeight:900,fontSize:20}}>{profile.name}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>{profile.goal?.replace(/_/g," ")} · {profile.unit}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:24}}>
          {[{l:"Workouts",v:workouts.length},{l:"This week",v:weekW},{l:"Height",v:`${profile.height}cm`}].map((s,i)=>(
            <div key={i}><div style={{fontWeight:800,fontSize:18,color:C.blue}}>{s.v}</div><div style={{fontSize:11,color:C.muted}}>{s.l}</div></div>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        {/* Goal presets */}
        <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 14px 10px",borderBottom:`1px solid ${C.border}`}}><span style={{fontWeight:700,fontSize:15}}>🎯 Fitness Goal</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            {Object.entries({lose_weight:"🔥 Lose Weight",maintain:"⚖️ Maintain",build_muscle:"💪 Build Muscle",athletic:"⚡ Athletic"}).map(([k,v])=>(
              <button key={k} onClick={()=>{setProfile({...profile,goal:k});setGoals({...goals,...GOAL_PRESETS[k]});}}
                style={{padding:"12px 8px",border:"none",borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,background:profile.goal===k?"rgba(47,128,237,0.15)":"transparent",color:profile.goal===k?C.blue:C.muted,fontWeight:profile.goal===k?700:400,fontSize:12,cursor:"pointer",textAlign:"center"}}>{v}</button>
            ))}
          </div>
        </div>
        {/* Daily goals */}
        <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15}}>📊 Daily Goals</span>
            <button onClick={()=>editing?save():setEditing(true)} style={{background:editing?C.blue:"rgba(47,128,237,0.15)",color:editing?"#fff":C.blue,border:"none",borderRadius:8,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{editing?"Save":"Edit"}</button>
          </div>
          {[{l:"Calories",k:"cal",u:"kcal",e:"🔥"},{l:"Carbs",k:"carbs",u:"g",e:"🌾"},{l:"Fat",k:"fat",u:"g",e:"🥑"},{l:"Protein",k:"protein",u:"g",e:"💪"},{l:"Fiber",k:"fiber",u:"g",e:"🥦"},{l:"Water",k:"water",u:"glasses",e:"💧"}].map(({l,k,u,e})=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:14}}>{e} {l}</span>
              {editing?<input type="number" value={lg[k]} onChange={ev=>setLg({...lg,[k]:parseInt(ev.target.value)||0})} style={{width:90,padding:"5px 8px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14,textAlign:"center",background:C.bg3,color:"#fff"}}/>
                :<span style={{fontWeight:700}}>{goals[k]} {u}</span>}
            </div>
          ))}
        </div>
        {/* 1RM Calculator */}
        <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14}}>
          <div onClick={()=>setCalcOpen(!calcOpen)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15}}>🏋️ 1RM Calculator</span><span style={{color:C.muted}}>{calcOpen?"▲":"▼"}</span>
          </div>
          {calcOpen&&<div style={{padding:"0 14px 14px"}}>
            <div style={{display:"flex",gap:10,marginBottom:10}}>
              <DarkInput type="number" value={rmW} onChange={e=>setRmW(e.target.value)} placeholder="Weight (kg)" style={{flex:1}}/>
              <DarkInput type="number" value={rmR} onChange={e=>setRmR(e.target.value)} placeholder="Reps" style={{width:90}}/>
            </div>
            <button onClick={()=>{if(rmW&&rmR)setRmRes(oneRM(parseFloat(rmW),parseInt(rmR)));}} style={{width:"100%",background:C.blue,color:"#fff",border:"none",borderRadius:12,padding:"10px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Calculate</button>
            {rmRes&&<div style={{marginTop:12,background:"rgba(47,128,237,0.15)",borderRadius:14,padding:"12px 14px",border:"1px solid rgba(47,128,237,0.3)"}}>
              <div style={{fontWeight:900,fontSize:24,color:C.blue,marginBottom:10}}>{rmRes}kg <span style={{fontSize:13,fontWeight:400,color:C.muted}}>est. 1RM</span></div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[0.95,0.9,0.85,0.8,0.75,0.7,0.65,0.6].map(p=>(
                  <div key={p} style={{flex:"0 0 calc(25% - 6px)",textAlign:"center",background:C.bg3,borderRadius:8,padding:"8px 0",minWidth:60,border:`1px solid ${C.border}`}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.blue}}>{Math.round(rmRes*p)}kg</div>
                    <div style={{fontSize:9,color:C.muted}}>{Math.round(p*100)}%</div>
                  </div>
                ))}
              </div>
            </div>}
          </div>}
        </div>
        {/* Intermittent Fasting */}
        <div style={{background:C.card,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:14}}>
          <div onClick={()=>setFastOpen(!fastOpen)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:15}}>⏰ Intermittent Fasting</span><span style={{color:C.muted}}>{fastOpen?"▲":"▼"}</span>
          </div>
          {fastOpen&&<div style={{padding:"0 14px 14px",textAlign:"center"}}>
            {fastStart?(<>
              <div style={{fontSize:38,fontWeight:900,color:C.orange,marginBottom:4}}>{fmtTime(fastEl)}</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:10}}>Fasting · {fmtTime(Math.max(0,16*3600-fastEl))} remaining in 16h window</div>
              <div style={{height:8,background:C.border,borderRadius:9,marginBottom:14}}><div style={{height:8,background:C.orange,borderRadius:9,width:`${Math.min(100,(fastEl/(16*3600))*100)}%`}}/></div>
              <button onClick={()=>{setFastStart(null);setFastEl(0);}} style={{width:"100%",background:C.red,color:"#fff",border:"none",borderRadius:14,padding:"10px",fontSize:13,fontWeight:700,cursor:"pointer"}}>End Fast</button>
            </>):(<>
              <div style={{fontSize:44,marginBottom:8}}>🕐</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:12}}>16:8 Protocol — 16h fasting, 8h eating window</div>
              <button onClick={()=>setFastStart(Date.now())} style={{width:"100%",background:C.orange,color:"#fff",border:"none",borderRadius:14,padding:"10px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Start Fast</button>
            </>)}
          </div>}
        </div>
        <button onClick={()=>{if(window.confirm("Redo onboarding? Your data will be kept."))setOnboarded(false);}}
          style={{width:"100%",padding:"11px",border:`1px solid ${C.border}`,borderRadius:14,background:"transparent",color:C.muted,fontSize:13,cursor:"pointer",marginBottom:8}}>↩ Redo Onboarding</button>
        <button onClick={()=>{if(window.confirm("Clear ALL data? This cannot be undone.")){localStorage.clear();window.location.reload();}}}
          style={{width:"100%",padding:"11px",border:"1px solid rgba(239,68,68,0.3)",borderRadius:14,background:"rgba(239,68,68,0.1)",color:C.red,fontSize:13,cursor:"pointer",fontWeight:700}}>🗑 Clear All Data</button>
      </div>
    </div>
  );
}
