import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, ThemeToggle } from '../../components/UI';
import ArenaCard from '../../components/ArenaCard';
import { SPORTS, ARENAS, fp } from '../../data/constants';

export default function Home({ nav, setArena }) {
  const { T, cashback, notifications } = useApp();
  const [sport, setSport] = useState(null);
  const filtered = sport ? ARENAS.filter(a=>a.sport===SPORTS.find(s=>s.id===sport)?.name) : ARENAS;
  const unread = notifications.filter(n=>!n.read).length;

  return (
    <div style={{ paddingBottom:90, background:T.bg, minHeight:'100vh' }}>
      <div style={{ background:T.card, padding:'52px 20px 16px', borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
          <div>
            <div style={{ color:T.sub,fontSize:12 }}>📍 Toshkent, O'zbekiston</div>
            <div style={{ fontSize:22,fontWeight:900,color:T.text }}>Salom, Jasur! 👋</div>
          </div>
          <div style={{ display:'flex',gap:10,alignItems:'center' }}>
            <ThemeToggle/>
            <div style={{ position:'relative',cursor:'pointer' }} onClick={()=>nav('notifications')}>
              <div style={{ fontSize:22 }}>🔔</div>
              {unread>0&&<div style={{ position:'absolute',top:-4,right:-4,width:16,height:16,background:'#ff4444',borderRadius:'50%',fontSize:9,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center' }}>{unread}</div>}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,#0f2000,#1a3300)',borderRadius:20,padding:20,border:'1px solid #C8FF0020',position:'relative',overflow:'hidden',marginBottom:14 }}>
          <div style={{ position:'absolute',right:-10,top:-10,fontSize:80,opacity:.1 }}>⚽</div>
          <Badge>🔥 Bugun eng mashhur</Badge>
          <div style={{ fontSize:18,fontWeight:900,margin:'10px 0 4px',color:'#f0f0f0' }}>Pro Sport Arena</div>
          <div style={{ color:'#555',fontSize:12,marginBottom:14 }}>Chilonzor · 150,000 so'm/soat</div>
          <Btn sm onClick={()=>{ setArena(ARENAS[0]); nav('arena'); }}>Batafsil →</Btn>
        </div>

        {/* Search */}
        <div style={{ background:T.input,borderRadius:12,padding:'11px 14px',display:'flex',alignItems:'center',gap:10,border:`1px solid ${T.border}` }}>
          <span style={{ color:T.sub }}>🔍</span>
          <span style={{ color:T.sub,fontSize:13 }}>Arena yoki sport turi...</span>
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        {/* Sports filter */}
        <div style={{ fontWeight:800,fontSize:16,margin:'18px 0 12px',color:T.text }}>Sport turini tanlang</div>
        <div style={{ display:'flex',gap:9,overflowX:'auto',paddingBottom:6 }}>
          {SPORTS.map(s=>(
            <div key={s.id} onClick={()=>setSport(sport===s.id?null:s.id)} style={{ flexShrink:0,background:sport===s.id?s.color+'22':T.card,border:`1.5px solid ${sport===s.id?s.color:T.border}`,borderRadius:14,padding:'10px 14px',textAlign:'center',cursor:'pointer',minWidth:68 }}>
              <div style={{ fontSize:24,marginBottom:2 }}>{s.icon}</div>
              <div style={{ fontSize:10,fontWeight:700,color:sport===s.id?s.color:T.sub }}>{s.name}</div>
            </div>
          ))}
        </div>

        {/* Cashback */}
        <div style={{ background:'linear-gradient(135deg,#C8FF00,#8FBF00)',borderRadius:18,padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',margin:'18px 0' }}>
          <div>
            <div style={{ color:'#0a1000',fontWeight:900,fontSize:15 }}>💎 Cashback balans</div>
            <div style={{ color:'#3a5000',fontSize:12,marginTop:2 }}>{fp(cashback)} · 1% har brondan</div>
          </div>
          <Btn sm style={{ background:'#0a1000',color:'#C8FF00',boxShadow:'none' }} onClick={()=>nav('profile')}>Ko'rish</Btn>
        </div>

        {/* Arenas */}
        <div style={{ fontWeight:800,fontSize:16,marginBottom:12,color:T.text }}>
          {sport ? SPORTS.find(s=>s.id===sport)?.name+' arenalari' : 'Yaqinidagi arenalar'}
        </div>
        {filtered.map(a => <ArenaCard key={a.id} arena={a} onClick={()=>{ setArena(a); nav('arena'); }}/>)}
      </div>
    </div>
  );
}
