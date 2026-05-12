import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, Card } from '../../components/UI';
import { STATUS_COLORS, STATUS_LABELS, fp } from '../../data/constants';

export default function BookingList() {
  const { T, bookings, cashback } = useApp();
  return (
    <div style={{ paddingBottom:90,background:T.bg,minHeight:'100vh',color:T.text }}>
      <div style={{ padding:'52px 20px 14px' }}>
        <div style={{ fontSize:20,fontWeight:900 }}>Bronlarim</div>
      </div>
      <div style={{ padding:'0 20px' }}>
        <Card style={{ marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',background:'linear-gradient(135deg,#0f2000,#1a3300)',border:'1px solid #C8FF0020' }}>
          <div>
            <div style={{ color:'#555',fontSize:11,marginBottom:3 }}>Cashback balansi</div>
            <div style={{ fontSize:22,fontWeight:900,color:'#C8FF00' }}>{fp(cashback)}</div>
            <div style={{ color:'#333',fontSize:10,marginTop:2 }}>💎 Premium foydalanuvchi</div>
          </div>
          <div style={{ fontSize:32 }}>💰</div>
        </Card>
        {bookings.length===0 && (
          <div style={{ textAlign:'center',padding:'48px 0',color:T.sub }}>
            <div style={{ fontSize:48,marginBottom:12 }}>📅</div>
            <div>Hali bron yo'q</div>
          </div>
        )}
        {bookings.map((b,i)=>(
          <Card key={b.id||i} style={{ marginBottom:10 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
              <div style={{ fontWeight:800,fontSize:14 }}>{b.arenaName}</div>
              <Badge color={STATUS_COLORS[b.status]}>{STATUS_LABELS[b.status]}</Badge>
            </div>
            <div style={{ color:T.sub,fontSize:12,marginBottom:4 }}>📅 {b.date} · {b.time}</div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div style={{ color:T.sub,fontSize:11 }}>{b.sport}</div>
              {b.status!=='cancelled'&&<div style={{ color:T.accent,fontWeight:700,fontSize:13 }}>{fp(b.paid)}</div>}
            </div>
            {b.cashback>0&&<div style={{ color:'#4ECDC4',fontSize:11,marginTop:4 }}>+{fp(b.cashback)} cashback</div>}
          </Card>
        ))}
      </div>
    </div>
  );
}
