import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Card, Input } from '../../components/UI';
import { fp } from '../../data/constants';

const HISTORY = [
  { id:1, amount:2000000, bank:'Ipoteka Bank', card:'**** 4521', date:'14 May', status:'done'    },
  { id:2, amount:1500000, bank:'Kapitalbank',  card:'**** 8834', date:'7 May',  status:'done'    },
  { id:3, amount:800000,  bank:'Ipoteka Bank', card:'**** 4521', date:'1 May',  status:'done'    },
];

export default function Withdraw() {
  const { T, ownerBalance, pendingBalance, withdrawFunds, confirmPendingPayment } = useApp();
  const [amount, setAmount]   = useState('');
  const [card,   setCard]     = useState('**** 4521');
  const [step,   setStep]     = useState('form'); // form | confirm | done
  const [error,  setError]    = useState('');

  const handleWithdraw = () => {
    const num = parseInt(amount.replace(/\D/g,''));
    if (!num || num < 10000) { setError("Minimal summa: 10,000 so'm"); return; }
    if (num > ownerBalance)  { setError("Balansda yetarli mablag' yo'q"); return; }
    setError('');
    setStep('confirm');
  };

  const handleConfirm = () => {
    const num = parseInt(amount.replace(/\D/g,''));
    withdrawFunds(num);
    setStep('done');
  };

  if (step === 'done') return (
    <div style={{ padding:'24px 20px',color:T.text,textAlign:'center',paddingTop:80 }}>
      <div style={{ fontSize:60,marginBottom:16,filter:`drop-shadow(0 0 20px #C8FF00)` }}>✅</div>
      <div style={{ fontSize:22,fontWeight:900,marginBottom:8 }}>Pul o'tkazildi!</div>
      <div style={{ color:T.sub,fontSize:14,marginBottom:24 }}>{fp(parseInt(amount.replace(/\D/g,'')))} → {card}</div>
      <Btn full onClick={()=>{ setStep('form'); setAmount(''); }}>Yana o'tkazish</Btn>
    </div>
  );

  if (step === 'confirm') return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <button onClick={()=>setStep('form')} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:20 }}>Tasdiqlash</div>
      <Card style={{ marginBottom:20 }}>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:10 }}>
          <span style={{ color:T.sub }}>Summa:</span>
          <span style={{ fontWeight:800,fontSize:16,color:'#C8FF00' }}>{fp(parseInt(amount.replace(/\D/g,'')))}</span>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:10 }}>
          <span style={{ color:T.sub }}>Karta:</span>
          <span style={{ fontWeight:700 }}>{card}</span>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between' }}>
          <span style={{ color:T.sub }}>Balansdagi qoldiq:</span>
          <span style={{ fontWeight:700 }}>{fp(ownerBalance - parseInt(amount.replace(/\D/g,'')))}</span>
        </div>
      </Card>
      <Btn full onClick={handleConfirm}>Tasdiqlash →</Btn>
    </div>
  );

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:4 }}>Pul chiqarish</div>
      <div style={{ color:T.sub,fontSize:13,marginBottom:16 }}>Bank hisobingizga o'tkazish</div>

      {/* Balance */}
      <div style={{ background:'linear-gradient(135deg,#0f2000,#1a3300)',borderRadius:18,padding:20,border:'1px solid #C8FF0025',marginBottom:16 }}>
        <div style={{ color:'#666',fontSize:12,marginBottom:4 }}>Mavjud balans</div>
        <div style={{ fontSize:26,fontWeight:900,color:'#C8FF00' }}>{fp(ownerBalance)}</div>
        {pendingBalance > 0 && (
          <div style={{ marginTop:8,background:'#FFD70015',border:'1px solid #FFD70030',borderRadius:10,padding:'8px 12px' }}>
            <div style={{ color:'#FFD700',fontSize:12,fontWeight:600 }}>⏳ Ertaga tushadi: {fp(pendingBalance)}</div>
            <div style={{ color:'#666',fontSize:11,marginTop:2 }}>Bugungi to'lovlar ertaga hisobingizga o'tadi</div>
            <button onClick={confirmPendingPayment} style={{ marginTop:8,background:'#FFD70020',border:'1px solid #FFD70040',borderRadius:8,padding:'5px 12px',color:'#FFD700',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>
              Test: Hozir tasdiqlash
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <Card style={{ marginBottom:16 }}>
        <div style={{ fontWeight:700,fontSize:14,marginBottom:12 }}>O'tkazma ma'lumotlari</div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:12,color:T.sub,marginBottom:6 }}>Summa (so'm)</div>
          <Input
            placeholder="Masalan: 1000000"
            value={amount}
            onChange={e=>setAmount(e.target.value)}
          />
          <div style={{ display:'flex',gap:8,marginTop:8 }}>
            {[500000,1000000,2000000].map(v=>(
              <button key={v} onClick={()=>setAmount(v.toString())} style={{ flex:1,background:T.input,border:`1px solid ${T.border}`,borderRadius:8,padding:'6px 0',fontSize:11,fontWeight:700,color:T.sub,cursor:'pointer',fontFamily:'inherit' }}>
                {(v/1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:12,color:T.sub,marginBottom:6 }}>Karta raqami</div>
          {['**** 4521','**** 8834'].map(c=>(
            <div key={c} onClick={()=>setCard(c)} style={{ display:'flex',alignItems:'center',gap:10,background:card===c?T.accent+'18':T.input,border:`1px solid ${card===c?T.accent:T.border}`,borderRadius:10,padding:'10px 14px',marginBottom:8,cursor:'pointer' }}>
              <span style={{ fontSize:18 }}>💳</span>
              <span style={{ fontWeight:700,flex:1,color:T.text }}>{c}</span>
              {card===c && <span style={{ color:T.accent }}>✓</span>}
            </div>
          ))}
          <button style={{ width:'100%',background:'none',border:`1px dashed ${T.border}`,borderRadius:10,padding:'10px',color:T.sub,fontSize:12,cursor:'pointer',fontFamily:'inherit' }}>
            + Yangi karta qo'shish
          </button>
        </div>
        {error && <div style={{ color:'#ff6666',fontSize:12,marginBottom:10 }}>⚠️ {error}</div>}
        <Btn full onClick={handleWithdraw}>Pul chiqarish →</Btn>
      </Card>

      {/* History */}
      <div style={{ fontWeight:800,fontSize:15,marginBottom:12 }}>O'tkazma tarixi</div>
      {HISTORY.map(h=>(
        <Card key={h.id} style={{ marginBottom:10,display:'flex',alignItems:'center',gap:12 }}>
          <div style={{ width:40,height:40,borderRadius:'50%',background:'#C8FF0015',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>💸</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text }}>{fp(h.amount)}</div>
            <div style={{ color:T.sub,fontSize:11 }}>{h.bank} · {h.card} · {h.date}</div>
          </div>
          <span style={{ color:'#4ECDC4',fontSize:11,fontWeight:700 }}>✓ O'tdi</span>
        </Card>
      ))}
    </div>
  );
}
