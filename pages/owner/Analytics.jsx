import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/UI';
import { WEEKLY_REVENUE, WEEKLY_DAYS } from '../../data/constants';

const SPORTS_DATA = [
  { name:'Futbol',    pct:48, color:'#C8FF00' },
  { name:'Tennis',    pct:24, color:'#FFD700' },
  { name:'Basketbol', pct:18, color:'#FF6B35' },
  { name:'Voleybol',  pct:10, color:'#4ECDC4' },
];
const MONTHLY = [
  { l:'Jami daromad',   v:'14.8M', c:'#C8FF00' },
  { l:'Jami bronlar',   v:'127',   c:'#4ECDC4' },
  { l:'Yangi mijozlar', v:'34',    c:'#A78BFA' },
  { l:'Bekor qilingan', v:'8',     c:'#ff4444' },
  { l:"O'rt. cheq",     v:'116K',  c:'#FFD700' },
];

export default function Analytics() {
  const { T } = useApp();
  const max = Math.max(...WEEKLY_REVENUE);

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:4 }}>Analitika</div>
      <div style={{ color:T.sub,fontSize:13,marginBottom:16 }}>May 2025 hisoboti</div>

      {/* Revenue chart */}
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:4 }}>Haftalik daromad</div>
        <div style={{ color:'#C8FF00',fontSize:20,fontWeight:900,marginBottom:14 }}>4,280,000 so'm</div>
        <div style={{ display:'flex',alignItems:'flex-end',gap:6,height:80 }}>
          {WEEKLY_REVENUE.map((r,i) => (
            <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
              <div style={{ width:'100%',borderRadius:'4px 4px 0 0',background:'linear-gradient(180deg,#C8FF00,#8FBF00)',height:`${(r/max)*70}px`,boxShadow:'0 0 6px #C8FF0030',transition:'height 0.5s' }}/>
              <div style={{ fontSize:8,color:T.sub }}>{WEEKLY_DAYS[i]}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sport distribution */}
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:14 }}>Sport taqsimoti</div>
        {SPORTS_DATA.map(s => (
          <div key={s.name} style={{ marginBottom:12 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
              <span style={{ fontSize:13,color:T.text }}>{s.name}</span>
              <span style={{ fontSize:13,fontWeight:700,color:s.color }}>{s.pct}%</span>
            </div>
            <div style={{ height:6,background:T.input,borderRadius:99,overflow:'hidden' }}>
              <div style={{ height:'100%',width:`${s.pct}%`,background:s.color,borderRadius:99,transition:'width 0.8s' }}/>
            </div>
          </div>
        ))}
      </Card>

      {/* Monthly summary */}
      <Card>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:12 }}>Oylik ko'rsatkichlar</div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
          {MONTHLY.map(s => (
            <div key={s.l} style={{ background:T.input,borderRadius:12,padding:'12px 10px',textAlign:'center' }}>
              <div style={{ fontSize:20,fontWeight:900,color:s.c }}>{s.v}</div>
              <div style={{ color:T.sub,fontSize:11,marginTop:3,lineHeight:1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
