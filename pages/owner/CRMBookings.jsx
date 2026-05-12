import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, Input } from '../../components/UI';
import { CRM_BOOKINGS, STATUS_COLORS, STATUS_LABELS, fp } from '../../data/constants';

const STATUS_MAP = { "Faol":"active","Kutilmoqda":"pending","Bekor":"cancelled" };

export default function CRMBookings() {
  const { T } = useApp();
  const [filter, setFilter] = useState("Barchasi");
  const [search, setSearch] = useState("");

  const filtered = CRM_BOOKINGS.filter(b => {
    if (filter !== "Barchasi" && b.status !== STATUS_MAP[filter]) return false;
    if (search && !b.user.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
        <div>
          <div style={{ fontSize:20,fontWeight:900,marginBottom:2 }}>Bronlar CRM</div>
          <div style={{ color:T.sub,fontSize:13 }}>Jami {CRM_BOOKINGS.length} ta</div>
        </div>
        <Btn sm>+ Qo'lda qo'shish</Btn>
      </div>

      <Input placeholder="Mijoz nomini qidirish..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:12 }}/>

      <div style={{ display:'flex',gap:8,overflowX:'auto',paddingBottom:8,marginBottom:14 }}>
        {["Barchasi","Faol","Kutilmoqda","Bekor"].map(f => (
          <button key={f} onClick={()=>setFilter(f)} style={{ flexShrink:0,background:filter===f?'#A78BFA22':T.card,color:filter===f?'#A78BFA':T.sub,border:`1px solid ${filter===f?'#A78BFA44':T.border}`,borderRadius:9,padding:'7px 14px',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>{f}</button>
        ))}
      </div>

      {filtered.map(b => (
        <Card key={b.id} style={{ marginBottom:10 }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8 }}>
            <div>
              <div style={{ fontWeight:800,fontSize:14,color:T.text }}>{b.user}</div>
              <div style={{ color:T.sub,fontSize:12 }}>{b.phone}</div>
            </div>
            <Badge color={STATUS_COLORS[b.status]}>{STATUS_LABELS[b.status]}</Badge>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginBottom:10 }}>
            <div style={{ color:T.sub,fontSize:12 }}>📅 {b.date}</div>
            <div style={{ color:T.sub,fontSize:12 }}>⏰ {b.time}</div>
            <div style={{ color:T.sub,fontSize:12 }}>🏟️ {b.field}</div>
            <div style={{ color:T.sub,fontSize:12 }}>⚽ {b.sport}</div>
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${T.border}`,paddingTop:8 }}>
            <span style={{ color:'#C8FF00',fontWeight:800,fontSize:15 }}>{fp(b.amount)}</span>
            <div style={{ display:'flex',gap:6 }}>
              <Btn sm sec>Tahrir</Btn>
              {b.status==='pending' && <Btn sm>Tasdiqlash</Btn>}
            </div>
          </div>
        </Card>
      ))}

      {filtered.length===0 && (
        <div style={{ textAlign:'center',padding:'40px 0',color:T.sub }}>
          <div style={{ fontSize:40,marginBottom:10 }}>📋</div>
          <div>Natija topilmadi</div>
        </div>
      )}
    </div>
  );
}
