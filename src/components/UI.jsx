import React from 'react';
import { useApp } from '../context/AppContext';

export function Btn({ children, onClick, style={}, sec=false, sm=false, danger=false, disabled=false, full=false }) {
  const { T, theme } = useApp();
  const bg = danger
    ? 'linear-gradient(135deg,#ff4444,#cc0000)'
    : sec ? 'transparent'
    : `linear-gradient(135deg,${T.accent},${theme==='dark'?'#8FBF00':'#3d7700'})`;
  const color = danger ? '#fff' : sec ? T.accent : theme==='dark'?'#0a1000':'#fff';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background:bg, color,
      border: sec ? `1.5px solid ${T.accent}44` : 'none',
      borderRadius: sm?10:14,
      padding: sm?'8px 14px':'14px 24px',
      fontSize: sm?12:14, fontWeight:700, fontFamily:'inherit',
      boxShadow: danger?'0 0 20px #ff444430':sec?'none':`0 0 20px ${T.accent}30`,
      cursor: disabled?'not-allowed':'pointer', opacity:disabled?0.4:1,
      width: full?'100%':'auto',
      whiteSpace:'nowrap', transition:'all 0.15s', ...style,
    }}>{children}</button>
  );
}

export function Badge({ children, color }) {
  const { T } = useApp();
  const c = color || T.accent;
  return (
    <span style={{ background:c+'18', color:c, border:`1px solid ${c}33`, borderRadius:7, padding:'3px 9px', fontSize:11, fontWeight:700 }}>
      {children}
    </span>
  );
}

export function Card({ children, style={}, onClick }) {
  const { T } = useApp();
  return (
    <div onClick={onClick} style={{
      background:T.card, borderRadius:18,
      border:`1px solid ${T.border}`,
      padding:16,
      cursor:onClick?'pointer':'default',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Input({ placeholder, value, onChange, type='text', style={} }) {
  const { T } = useApp();
  return (
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        background:T.input, border:`1px solid ${T.border}`,
        borderRadius:10, padding:'11px 14px',
        color:T.text, fontSize:13, fontFamily:'inherit',
        width:'100%', outline:'none', ...style,
      }}
    />
  );
}

export function Select({ value, onChange, children, style={} }) {
  const { T } = useApp();
  return (
    <select value={value} onChange={onChange} style={{
      background:T.input, border:`1px solid ${T.border}`,
      borderRadius:10, padding:'11px 14px',
      color:T.text, fontSize:13, fontFamily:'inherit',
      width:'100%', outline:'none', ...style,
    }}>
      {children}
    </select>
  );
}

export function BackBtn({ onClick }) {
  const { T } = useApp();
  return (
    <button onClick={onClick} style={{
      background:T.card+'aa', border:'none', color:T.text,
      fontSize:20, cursor:'pointer', width:36, height:36,
      borderRadius:'50%', display:'flex', alignItems:'center',
      justifyContent:'center', fontFamily:'inherit',
    }}>&#8592;</button>
  );
}

export function PageHeader({ title, sub, onBack, right }) {
  const { T } = useApp();
  return (
    <div style={{ padding:'52px 20px 14px', display:'flex', alignItems:'center', gap:12 }}>
      {onBack && <BackBtn onClick={onBack}/>}
      <div style={{ flex:1 }}>
        <div style={{ fontSize:20, fontWeight:900, color:T.text }}>{title}</div>
        {sub && <div style={{ color:T.sub, fontSize:12 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, T } = useApp();
  return (
    <button onClick={toggleTheme} style={{
      background:T.card, border:`1px solid ${T.border}`,
      borderRadius:20, padding:'6px 14px',
      color:T.text, fontSize:12, fontWeight:700,
      cursor:'pointer', fontFamily:'inherit',
      display:'flex', alignItems:'center', gap:6,
    }}>
      {theme==='dark' ? 'Yorug' : 'Qorongu'}
    </button>
  );
}

export function Divider() {
  const { T } = useApp();
  return <div style={{ height:1, background:T.border, margin:'8px 0' }}/>;
}

export function EmptyState({ icon, text }) {
  const { T } = useApp();
  return (
    <div style={{ textAlign:'center', padding:'48px 0', color:T.sub }}>
      <div style={{ fontSize:48, marginBottom:12 }}>{icon}</div>
      <div style={{ fontSize:14 }}>{text}</div>
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  const { T } = useApp();
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, background:'#000000aa', zIndex:999, display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.card, borderRadius:'24px 24px 0 0', padding:'24px 20px 40px', width:'100%', maxWidth:480, border:`1px solid ${T.border}` }}>
        <div style={{ width:40, height:4, background:T.border, borderRadius:99, margin:'0 auto 20px' }}/>
        {title && <div style={{ fontSize:18, fontWeight:900, color:T.text, marginBottom:16 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}
