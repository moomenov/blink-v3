import React from 'react';
import { useApp } from '../context/AppContext';

const TABS = [
  { id:'home',    icon:'⌂',  label:'Bosh'     },
  { id:'arenas',  icon:'🏟️', label:'Arenalar' },
  { id:'teams',   icon:'⚡', label:'Jamoalar' },
  { id:'booking', icon:'📅', label:'Bronlar'  },
  { id:'profile', icon:'◯',  label:'Profil'   },
];

export default function BottomNav({ screen, setScreen }) {
  const { T } = useApp();
  return (
    <div style={{
      position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
      width:'100%', maxWidth:480,
      background:T.navBg, backdropFilter:'blur(20px)',
      borderTop:`1px solid ${T.border}`,
      display:'flex', padding:'10px 0 22px', zIndex:100,
    }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setScreen(t.id)} style={{
          flex:1, background:'none', border:'none',
          color: screen===t.id ? T.accent : T.sub,
          fontFamily:'inherit', display:'flex', flexDirection:'column',
          alignItems:'center', gap:3, padding:'4px 0',
        }}>
          <span style={{ fontSize:18, filter:screen===t.id?`drop-shadow(0 0 6px ${T.accent})`:'none' }}>{t.icon}</span>
          <span style={{ fontSize:9, fontWeight:600 }}>{t.label}</span>
          {screen===t.id && <div style={{ width:4,height:4,borderRadius:'50%',background:T.accent }}/>}
        </button>
      ))}
    </div>
  );
}
