import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from './UI';
import { SPORT_EMOJI, SPORT_COLOR, fp } from '../data/constants';

export default function ArenaCard({ arena, onClick }) {
  const { T } = useApp();
  const color = SPORT_COLOR[arena.sport] || T.accent;
  return (
    <div onClick={onClick} style={{
      background:T.card, borderRadius:18, overflow:'hidden',
      border:`1px solid ${T.accent}15`, cursor:'pointer', marginBottom:12,
    }}>
      <div style={{ height:120, background:`linear-gradient(135deg,#0a1a00,#1a2800)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', fontSize:54 }}>
        {SPORT_EMOJI[arena.sport]||'🏟️'}
        {arena.hot && <div style={{ position:'absolute',top:8,right:8,background:'#ff4444',color:'#fff',borderRadius:7,padding:'3px 8px',fontSize:10,fontWeight:700 }}>🔥 HOT</div>}
        <div style={{ position:'absolute',bottom:7,left:10 }}><Badge color={color}>{arena.sport}</Badge></div>
        <div style={{ position:'absolute',bottom:7,right:10,background:arena.available?color+'15':'#ff444415',color:arena.available?color:'#ff6666',border:`1px solid ${arena.available?color+'30':'#ff444430'}`,borderRadius:7,padding:'3px 8px',fontSize:10,fontWeight:700 }}>
          {arena.available?"Bo'sh":'Band'}
        </div>
      </div>
      <div style={{ padding:'12px 14px' }}>
        <div style={{ fontWeight:800,fontSize:14,marginBottom:3,color:T.text }}>{arena.name}</div>
        <div style={{ color:T.sub,fontSize:11,marginBottom:7 }}>📍 {arena.location} · {arena.distance}</div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <span style={{ color:'#FFD700',fontSize:12 }}>★ {arena.rating} <span style={{ color:T.sub }}>({arena.reviews})</span></span>
          <span style={{ color:T.accent,fontWeight:800,fontSize:14 }}>{fp(arena.price)}<span style={{ color:T.sub,fontSize:10,fontWeight:400 }}>/soat</span></span>
        </div>
      </div>
    </div>
  );
}
