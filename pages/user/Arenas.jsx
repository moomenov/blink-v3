import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ArenaCard from '../../components/ArenaCard';
import { SPORTS, ARENAS } from '../../data/constants';

export default function Arenas({ nav, setArena }) {
  const { T } = useApp();
  const [sport, setSport] = useState(null);
  const filtered = sport ? ARENAS.filter(a=>a.sport===sport) : ARENAS;

  return (
    <div style={{ paddingBottom:90,background:T.bg,minHeight:'100vh',color:T.text }}>
      <div style={{ padding:'52px 20px 14px' }}>
        <div style={{ fontSize:20,fontWeight:900,marginBottom:2 }}>Arenalar</div>
        <div style={{ color:T.sub,fontSize:12,marginBottom:14 }}>60+ sport maydonlari</div>
        <div style={{ display:'flex',gap:8,overflowX:'auto' }}>
          <button onClick={()=>setSport(null)} style={{ flexShrink:0,background:!sport?T.accent:T.card,color:!sport?'#0a1000':T.sub,border:`1px solid ${!sport?T.accent:T.border}`,borderRadius:9,padding:'7px 14px',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>Barchasi</button>
          {SPORTS.map(s=>(
            <button key={s.id} onClick={()=>setSport(s.name)} style={{ flexShrink:0,background:sport===s.name?s.color+'22':T.card,color:sport===s.name?s.color:T.sub,border:`1px solid ${sport===s.name?s.color:T.border}`,borderRadius:9,padding:'7px 12px',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>{s.icon} {s.name}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px' }}>
        {filtered.map(a=><ArenaCard key={a.id} arena={a} onClick={()=>{ setArena(a); nav('arena'); }}/>)}
      </div>
    </div>
  );
}
