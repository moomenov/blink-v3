import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Badge } from '../../components/UI';
import { CRM_BOOKINGS, CRM_FIELDS, WEEKLY_REVENUE, WEEKLY_DAYS, STATUS_COLORS, STATUS_LABELS, fp } from '../../data/constants';

const STATS = [
  { l:"Bu oy daromad", v:"14,800,000", u:"so'm", c:"#C8FF00", i:"💰" },
  { l:"Jami bronlar",  v:"127",        u:"ta",   c:"#4ECDC4", i:"📋" },
  { l:"Faol maydon",   v:"3/4",        u:"",     c:"#A78BFA", i:"🏟️" },
  { l:"Reyting",       v:"4.8",        u:"★",    c:"#FFD700", i:"⭐" },
];

export default function Dashboard({ setScreen }) {
  const { T, ownerBalance, pendingBalance } = useApp();
  const max = Math.max(...WEEKLY_REVENUE);

  return (
    <div style={{ padding:'24px 20px', color:T.text }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:20,fontWeight:900,marginBottom:2 }}>Xush kelibsiz, Alisher! 👋</div>
        <div style={{ color:T.sub,fontSize:13 }}>Bu hafta 89 ta bron</div>
      </div>

      {/* Balance card */}
      <div style={{ background:'linear-gradient(135deg,#0f2000,#1a3300)',borderRadius:20,padding:20,border:'1px solid #C8FF0025',marginBottom:16,cursor:'pointer' }} onClick={()=>setScreen('withdraw')}>
        <div style={{ color:'#666',fontSize:12,marginBottom:4 }}>Hisob balansi</div>
        <div style={{ fontSize:28,fontWeight:900,color:'#C8FF00',marginBottom:4 }}>{fp(ownerBalance)}</div>
        {pendingBalance>0 && (
          <div style={{ color:'#FFD700',fontSize:12 }}>+ {fp(pendingBalance)} ertaga tushadi ⏳</div>
        )}
        <div style={{ color:'#555',fontSize:11,marginTop:6 }}>→ Pul chiqarish</div>
      </div>

      {/* Stats grid */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16 }}>
        {STATS.map(s => (
          <div key={s.l} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:'14px 12px' }}>
            <div style={{ fontSize:20,marginBottom:6 }}>{s.i}</div>
            <div style={{ fontSize:20,fontWeight:900,color:s.c }}>{s.v}<span style={{ fontSize:11,marginLeft:3,fontWeight:400 }}>{s.u}</span></div>
            <div style={{ color:T.sub,fontSize:11,marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <Card style={{ marginBottom:16 }}>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:14 }}>Haftalik daromad</div>
        <div style={{ display:'flex',alignItems:'flex-end',gap:6,height:80 }}>
          {WEEKLY_REVENUE.map((r,i) => (
            <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
              <div style={{ width:'100%',borderRadius:'4px 4px 0 0',background:'linear-gradient(180deg,#A78BFA,#7C3AED)',height:`${(r/max)*70}px`,boxShadow:'0 0 8px #A78BFA30',transition:'height 0.5s' }}/>
              <div style={{ fontSize:8,color:T.sub }}>{WEEKLY_DAYS[i]}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Today bookings */}
      <Card style={{ marginBottom:16 }}>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:12 }}>Bugungi bronlar</div>
        {CRM_BOOKINGS.slice(0,4).map(b => (
          <div key={b.id} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
            <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[b.status],flexShrink:0,boxShadow:`0 0 5px ${STATUS_COLORS[b.status]}` }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:700,color:T.text }}>{b.user}</div>
              <div style={{ fontSize:11,color:T.sub }}>{b.time} · {b.field}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:12,color:'#C8FF00',fontWeight:700 }}>{(b.amount/1000).toFixed(0)}K</div>
              <div style={{ fontSize:9,color:STATUS_COLORS[b.status] }}>{STATUS_LABELS[b.status]}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Fields */}
      <Card>
        <div style={{ fontWeight:800,fontSize:15,marginBottom:12 }}>Maydonlar holati</div>
        {CRM_FIELDS.map(f => (
          <div key={f.id} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
            <span style={{ fontSize:20 }}>🏟️</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:700,color:T.text }}>{f.name}</div>
              <div style={{ fontSize:11,color:T.sub }}>{fp(f.price)}/soat</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <Badge color={f.status==='active'?'#C8FF00':'#FFD700'}>{f.status==='active'?'Faol':"Ta'mirat"}</Badge>
              <div style={{ fontSize:10,color:'#A78BFA',marginTop:3 }}>{f.today} bron</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
